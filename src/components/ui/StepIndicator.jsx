import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'

const StepIndicator = ({ steps, currentStep, completedSteps }) => {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="hidden md:flex items-center w-full max-w-3xl">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex items-center flex-1">
            {/* Step Circle */}
            <Link
              to={step.path}
              className={`step-indicator flex-shrink-0 z-10 transition-all duration-200 ${
                step.id < currentStep || completedSteps.includes(step.id)
                  ? 'step-indicator-completed'
                  : step.id === currentStep
                  ? 'step-indicator-active'
                  : 'step-indicator-upcoming'
              }`}
            >
              {step.id < currentStep || completedSteps.includes(step.id) ? (
                <FaCheck />
              ) : (
                step.id
              )}
            </Link>
            
            {/* Label */}
            <span className={`absolute -bottom-6 w-full text-center text-xs font-medium ${
              step.id === currentStep ? 'text-primary-600' : 'text-gray-500'
            }`}>
              {step.name}
            </span>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div 
                className={`step-line ml-2 ${
                  step.id < currentStep || completedSteps.includes(step.id)
                    ? 'step-line-completed'
                    : ''
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Mobile Step Indicator */}
      <div className="md:hidden w-full">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step) => (
            <Link
              key={step.id}
              to={step.path}
              className={`step-indicator ${
                step.id < currentStep || completedSteps.includes(step.id)
                  ? 'step-indicator-completed'
                  : step.id === currentStep
                  ? 'step-indicator-active'
                  : 'step-indicator-upcoming'
              }`}
            >
              {step.id < currentStep || completedSteps.includes(step.id) ? (
                <FaCheck />
              ) : (
                step.id
              )}
            </Link>
          ))}
        </div>
        <div className="text-center">
          <p className="text-primary-600 font-medium">
            {steps.find(step => step.id === currentStep)?.name || 'Trip Details'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StepIndicator