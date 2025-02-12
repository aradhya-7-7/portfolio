import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ResumeViewer = ({ onClose }) => {
  const { darkMode } = useContext(ThemeContext);
  const resumeUrl = "/resume.pdf";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 md:p-6 lg:p-8">
      <div className={`${
        darkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-white text-gray-900'
        } p-4 md:p-6 rounded-lg shadow-xl w-full max-w-7xl h-[90vh] flex flex-col gap-4`}>
        
        {/* Resume Preview */}
        <div className="flex-1 relative">
          <iframe 
            src={resumeUrl} 
            className={`w-full h-full border rounded-md ${
              darkMode 
                ? 'border-gray-700' 
                : 'border-gray-200'
            }`}
            title="Resume Preview"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              darkMode 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            } sm:order-1`}
          >
            Close
          </button>
          
          <a
            href={resumeUrl}
            download="Aradhya_Srivastava_Resume.pdf"
            className={`px-4 py-2 rounded-md text-center transition-colors duration-200 ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } sm:order-2`}
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
