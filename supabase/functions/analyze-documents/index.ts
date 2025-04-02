
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documentType, imageBase64 } = await req.json();
    
    if (!documentType || !imageBase64) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: documentType and imageBase64 are required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log(`Processing ${documentType} document...`);
    
    // Prepare system message based on document type
    let systemMessage = "You are a document analysis AI specialized in financial documents.";
    let userPrompt = "";
    
    switch (documentType) {
      case 'aadhar':
        systemMessage += " You analyze Aadhar cards and extract personal identification information.";
        userPrompt = "Extract the following information from this Aadhar card image: Name, Aadhar Number, Date of Birth, Gender, and Address. If any information is unclear or not visible, indicate that.";
        break;
      case 'pan':
        systemMessage += " You analyze PAN cards and extract taxation identification information.";
        userPrompt = "Extract the following information from this PAN card image: Full Name, PAN Number, Date of Birth, and Father's Name. If any information is unclear or not visible, indicate that.";
        break;
      case 'salarySlip':
        systemMessage += " You analyze salary slips and extract income and employment information.";
        userPrompt = "Extract the following information from this salary slip: Employee Name, Employee ID, Company Name, Month/Year, Gross Salary, Net Salary, and Deductions. Calculate the annual income based on the monthly figures. If any information is unclear or not visible, indicate that.";
        break;
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid document type. Must be one of: aadhar, pan, salarySlip' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
    }

    // Call OpenAI API with the image
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemMessage },
          { 
            role: 'user', 
            content: [
              { type: 'text', text: userPrompt },
              { 
                type: 'image_url', 
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}` 
                }
              }
            ]
          }
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Error calling OpenAI API', details: errorData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const data = await response.json();
    const analysisResult = data.choices[0].message.content;
    
    // For the salary slip, determine eligibility based on annual income
    let eligibilityScore = 0;
    let eligibilityFeedback = "";
    
    if (documentType === 'salarySlip') {
      // Extract annual income using regex
      const annualIncomeMatch = analysisResult.match(/annual income.*?(\d[\d,]*)/i);
      let annualIncome = 0;
      
      if (annualIncomeMatch && annualIncomeMatch[1]) {
        // Parse the number, removing commas
        annualIncome = parseInt(annualIncomeMatch[1].replace(/,/g, ''), 10);
        
        // Calculate eligibility score based on income
        if (annualIncome >= 1000000) { // 10 Lakhs or more
          eligibilityScore = 90;
          eligibilityFeedback = "Excellent income level, highly eligible for premium loan options.";
        } else if (annualIncome >= 600000) { // 6 Lakhs
          eligibilityScore = 75;
          eligibilityFeedback = "Good income level, eligible for standard loan options.";
        } else if (annualIncome >= 300000) { // 3 Lakhs
          eligibilityScore = 50;
          eligibilityFeedback = "Moderate income level, eligible for basic loan options.";
        } else {
          eligibilityScore = 25;
          eligibilityFeedback = "Low income level, limited loan options available.";
        }
      } else {
        eligibilityScore = 0;
        eligibilityFeedback = "Could not determine income from the document.";
      }
    }

    return new Response(
      JSON.stringify({
        documentType,
        analysisResult,
        eligibilityScore: documentType === 'salarySlip' ? eligibilityScore : null,
        eligibilityFeedback: documentType === 'salarySlip' ? eligibilityFeedback : null
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-documents function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
