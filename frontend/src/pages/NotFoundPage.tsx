import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-center p-4 md:p-8">
      <div className="max-w-xl">
        {/* SVG Illustration */}
        <div className="mb-8 w-full max-w-md mx-auto">
          <svg 
            viewBox="0 0 500 300" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            {/* Background elements */}
            <circle cx="250" cy="150" r="130" fill="#f3f4f6" />
            <path d="M70 200 Q 150 120 250 170 T 430 150" stroke="#ddd" strokeWidth="2" fill="none" />
            
            {/* Number 4 */}
            <g transform="translate(100, 90)">
              <path d="M60 0 L60 80 L0 80 L0 110 L60 110 L60 140 L90 140 L90 110 L120 110 L120 80 L90 80 L90 0 Z" fill="#EAB308" />
            </g>
            
            {/* Number 0 */}
            <g transform="translate(230, 90)">
              <path d="M60 0 Q0 0 0 70 Q0 140 60 140 Q120 140 120 70 Q120 0 60 0 Z M60 30 Q90 30 90 70 Q90 110 60 110 Q30 110 30 70 Q30 30 60 30 Z" fill="#EAB308" />
            </g>
            
            {/* Number 4 */}
            <g transform="translate(350, 90)">
              <path d="M60 0 L60 80 L0 80 L0 110 L60 110 L60 140 L90 140 L90 110 L120 110 L120 80 L90 80 L90 0 Z" fill="#EAB308" />
            </g>
            
            {/* Confused character */}
            <g transform="translate(220, 190)">
              {/* Face */}
              <circle cx="30" cy="30" r="30" fill="#FFD8A8" />
              
              {/* Eyes */}
              <circle cx="20" cy="25" r="5" fill="#1F2937" />
              <circle cx="40" cy="25" r="5" fill="#1F2937" />
              
              {/* Confused mouth */}
              <path d="M15 40 Q30 35 45 45" stroke="#1F2937" strokeWidth="3" fill="none" />
              
              {/* Question mark */}
              <g transform="translate(50, -10)">
                <circle cx="0" cy="0" r="15" fill="#EAB308" fillOpacity="0.2" />
                <path d="M-5 -5 L0 -5 Q8 -5 8 0 Q8 5 0 5 L0 10" stroke="#EAB308" strokeWidth="3" fill="none" />
                <circle cx="0" cy="15" r="2" fill="#EAB308" />
              </g>
            </g>
          </svg>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-yellow-500 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We've searched everywhere, but the page you're looking for seems to have taken a different route.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <FiArrowLeft /> Go back Home
          </Link>
          
          <button
            onClick={() => {window.history.back() , window.scrollTo(0, 0)}}
            className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-lg font-medium transition duration-300 shadow-sm hover:shadow-md"
          >
            Return to previous page
          </button>
        </div>
      </div>
      
      <p className="text-gray-500 text-sm mt-12">
        If you believe this is an error, please contact our support team.
      </p>
    </div>
  );
};

export default NotFoundPage;