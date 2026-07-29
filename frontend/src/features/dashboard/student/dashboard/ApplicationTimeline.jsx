
export default function ApplicationTimeline() {
  const steps = [
    { label: 'Applied', completed: true, date: 'Jan 10, 2024' },
    { label: 'Under Review', completed: true, date: 'Jan 12, 2024' },
    { label: 'Interview Scheduled', completed: true, date: 'Jan 15, 2024' },
    { label: 'Selected', completed: true, date: 'Jan 18, 2024' },
    { label: 'Internship Started', completed: false, date: 'Jan 20, 2024' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Application Status Timeline</h2>
      
      <div className="relative">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4 mb-8 last:mb-0">
            {index < steps.length - 1 && (
              <div className={`absolute left-[19px] top-10 w-0.5 h-16 ${step.completed ? 'bg-gradient-to-b from-blue-500 to-purple-500' : 'bg-gray-200'}`}></div>
            )}
            
            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              step.completed 
                ? 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg' 
                : 'bg-gray-200'
            }`}>
              {step.completed ? (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div className="w-3 h-3 bg-white rounded-full"></div>
              )}
            </div>

            <div className="flex-1 pt-1">
              <h3 className={`font-semibold mb-1 ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                {step.label}
              </h3>
              <p className="text-sm text-gray-500">{step.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
