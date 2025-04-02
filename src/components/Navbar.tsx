
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  User, 
  LogOut 
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Simulating user authentication check
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-loan-blue rounded-md w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold">FL</span>
          </div>
          <span className="text-xl font-bold text-loan-darkBlue">FastLoan</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-loan-blue transition-colors">
            Home
          </Link>
          <Link to="/eligibility" className="text-gray-700 hover:text-loan-blue transition-colors">
            Check Eligibility
          </Link>
          <Link to="/loan-types" className="text-gray-700 hover:text-loan-blue transition-colors">
            Loan Types
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-loan-blue transition-colors">
                Dashboard
              </Link>
              <Button 
                variant="ghost" 
                className="flex items-center space-x-1 text-loan-gray"
                onClick={toggleLogin}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="border-loan-blue text-loan-blue hover:bg-loan-blue hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-loan-blue hover:bg-loan-darkBlue text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-fadeIn">
          <div className="flex flex-col space-y-4 p-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-loan-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/eligibility" 
              className="text-gray-700 hover:text-loan-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Check Eligibility
            </Link>
            <Link 
              to="/loan-types" 
              className="text-gray-700 hover:text-loan-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Loan Types
            </Link>
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-loan-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start space-x-1 text-loan-gray"
                  onClick={() => {
                    toggleLogin();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full border-loan-blue text-loan-blue hover:bg-loan-blue hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link 
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full bg-loan-blue hover:bg-loan-darkBlue text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
