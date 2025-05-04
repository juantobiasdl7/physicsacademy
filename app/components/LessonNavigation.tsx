import { useState } from "react";
import { Section } from "~/data/mock-lessons";

interface LessonNavigationProps {
  sections: Section[];
}

export default function LessonNavigation({ sections }: LessonNavigationProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  
  const handleContinue = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };
  
  const handleBreadcrumbClick = (index: number) => {
    setCurrentSectionIndex(index);
  };
  
  const currentSection = sections[currentSectionIndex];
  
  // Get styling based on section kind
  const getSectionStyles = () => {
    switch (currentSection.kind) {
      case "EXPLAINER":
        return {
          bg: "bg-white",
          header: "bg-blue-600 text-white",
          accent: "border-blue-500",
          icon: (
            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          label: "Theory"
        };
      case "EXAMPLE":
        return {
          bg: "bg-white",
          header: "bg-green-600 text-white",
          accent: "border-green-500",
          icon: (
            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          ),
          label: "Example"
        };
      case "EXERCISE":
        return {
          bg: "bg-white",
          header: "bg-purple-600 text-white",
          accent: "border-purple-500",
          icon: (
            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          ),
          label: "Exercise"
        };
      default:
        return {
          bg: "bg-white",
          header: "bg-gray-600 text-white",
          accent: "border-gray-500",
          icon: null,
          label: currentSection.kind
        };
    }
  };
  
  const sectionStyles = getSectionStyles();
  
  return (
    <div className="w-full">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={handlePrevious}
          disabled={currentSectionIndex === 0}
          className={`p-1 rounded ${
            currentSectionIndex === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Previous section"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        <div className="flex items-center space-x-1 flex-1 justify-center">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => handleBreadcrumbClick(index)}
              className={`w-12 h-2 rounded-full transition-colors ${
                index === currentSectionIndex
                  ? "bg-blue-500"
                  : index < currentSectionIndex
                  ? "bg-blue-300"
                  : "bg-gray-200"
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          disabled={currentSectionIndex === sections.length - 1}
          className={`p-1 rounded ${
            currentSectionIndex === sections.length - 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Next section"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      
      {/* Section Content */}
      <div className={`rounded-lg overflow-hidden shadow-lg ${sectionStyles.bg} border-l-4 ${sectionStyles.accent}`}>
        {/* Section Header */}
        <div className={`${sectionStyles.header} p-4 flex items-center gap-2`}>
          {sectionStyles.icon}
          <div className="font-medium">
            {sectionStyles.label}
          </div>
          <div className="text-xs text-white/80 ml-auto">
            Section {currentSectionIndex + 1} of {sections.length}
          </div>
        </div>
        
        {/* Section Content */}
        <div className="bg-white p-6">
          <div className="text-gray-800 text-lg leading-relaxed">
            {currentSection.content}
          </div>
        </div>
      </div>
      
      {/* Continue Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleContinue}
          disabled={currentSectionIndex === sections.length - 1}
          className={`px-8 py-3 rounded-md font-medium text-lg shadow-md ${
            currentSectionIndex === sections.length - 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {currentSectionIndex === sections.length - 1 ? "Completed" : "Continue"}
        </button>
      </div>
    </div>
  );
} 