const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex justify-between mb-10">
      {["Connect Wallet", "Create Coinshift Account", "Join Waitlist"].map(
        (step, index) => (
          <>
            <div key={index} className="flex flex-col items-center z-10 step">
              <div
                className={`step-circle w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`step-label text-sm ${
                  currentStep >= index + 1 ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {step}
              </div>
            </div>
            {index < 2 && (
              <div
                className={`step-line w-[40%] h-1 mt-5 ${
                  currentStep > index + 1 ? "bg-blue-600" : "bg-gray-300 "
                }`}
              ></div>
            )}
          </>
        )
      )}
    </div>
  );
};

export default Stepper;
