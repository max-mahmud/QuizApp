import React from "react";
import { useLocation } from "react-router-dom";

const AllAnswer = () => {
  const { state } = useLocation();
  const ans = Object.values(state.answers);
  return (
    <div className="container mx-auto">
      <div className="lg:w-[60%] md:w-[70%]  w-full mx-auto">
        {state?.questions.map((question, idx) => (
          <div key={question.id} className="m-3 py-3 px-4 shadow-sm border border-gray-200 rounded ">
            <p className="flex items-center rounded text-xs p-2 cursor-pointer">
              <span className="h-8 w-8 bg-[#FCC822] rounded-full flex justify-center items-center text-green-800 mr-3">
                {idx + 1}
              </span>
              <p className="">{question.question}</p>
            </p>
            <div className="grid grid-cols-2 gap-4 mt-5">
              {question.options.map((option, index) =>
                ans[idx] !== question.answer ? (
                  <div
                    className={`border border-gray-200 rounded text-xs p-2 cursor-pointer ${
                      option == question?.answer ? "bg-gray-300" : ans[idx] == option ? "bg-red-300" : ""
                    }`}
                    key={option}
                  >
                    <p className="text-[10px] mb-1">Option {index + 1}</p>
                    <p>{option}</p>
                  </div>
                ) : (
                  <div
                    className={`border border-gray-200 rounded text-xs p-2 cursor-pointer ${
                      option == question?.answer ? "bg-green-300" : ""
                    }`}
                    key={option}
                  >
                    <p className="text-[10px] mb-1">Option {index + 1}</p>
                    <p>{option}</p>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAnswer;
