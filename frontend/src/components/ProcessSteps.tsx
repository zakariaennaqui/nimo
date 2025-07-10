import React from 'react';

// Define proper interfaces for our data types
interface StepItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  subtitle: string;
  title?: string;
  className?: string;
  className2 ?: string;
  className3?:string ;
  className4?:string ;
  steps?: StepItem[];
  textBreak?:string ;
  defaultSteps:StepItem[];

}

const ProcessSteps: React.FC<ProcessStepsProps> = ({
  subtitle,
  title = "",
  className = "",
  className2 ="",
  className3 ="",
  className4,
  textBreak ,
  steps,
  defaultSteps
}) => {


  // Use provided steps or default steps
  const displaySteps = steps || defaultSteps;

  return (
    <div className={`flex  gap-6  py-10 ${className}`}>
      {/* Subtitle */}
      <div className="flex items-center">
        <h2 className="bg-blue-100 rounded-lg w-fit text-2xl py-2 px-4 uppercase text-blue-600 font-medium">
          {subtitle}
        </h2>
      </div>
      
      {/* Main Title */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 ">
          {title}
          <br />
          <p>{textBreak}</p>
        </h1>
      </div>
      
      {/* Process Steps */}
      <div className={`  md:grid-cols-3 gap-8 mt-4 w-full max-w-4xl ${className2}`}>
        {displaySteps.map((item, index) => (
          <div 
            key={index} 
            className={`flex  gap-3 items-center text-center p-4 rounded-lg transition-all hover:shadow-md ${className3}`}
          >
            <div className="text-4xl text-blue-500 bg-blue-50 p-4 rounded-full">
              {item.icon}
            </div>

           <div className={`${className4}`}>
           <h3 className="text-xl font-semibold text-gray-800 capitalize">
              {item.title}
            </h3>
            <p className="text-gray-600">
              {item.description}
            </p>
           </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;