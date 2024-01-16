import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import QuizHeader from "../components/QuizHeader";
import Loading from "./../components/Loading";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  return formattedTime;
};

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const [status, setStatus] = useState("");
  const [quizId, setQuizId] = useState(1)

  useEffect(() => {
    fetch("/quiz.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching quiz data:", error));

    // Set up the timer interval
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        // Check if the timer is greater than 0 before decrementing
        return prevTimer > 0 ? prevTimer - 1 : prevTimer;
      });
    }, 1000);

    setTimerIntervalId(intervalId);

    return () => {
      clearInterval(intervalId);
      if (timer <= 0) {
        setShowResult(true);
      }
    };
  }, [timer]);

  const handleSubmit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    clearInterval(timerIntervalId);
    // Calculate score and show result
    setTimeout(() => {
      const quizScore = calculateScore(answers);
      setScore(quizScore);
      const percentage = (quizScore / questions.length) * 100;
      // Determine the status based on the percentage
      const newStatus = percentage >= 50 ? "Passed" : "Failed";
      setStatus(newStatus);

      setShowResult(true);
      setLoading(false);
    }, 3000);
  };

  const calculateScore = (userAnswers) => {
    const correctAnswers = questions.map((question) => question.answer);
    let score = 0;
    for (const questionId in userAnswers) {
      if (userAnswers[questionId] === correctAnswers[questionId - 1]) {
        score++;
      }
    }
    return score;
  };

  const handleAnswerSelect = (questionId, selectedOption) => {
    // Handle answer selection logic here
    const updatedAnswers = { ...answers, [questionId]: selectedOption };
    setAnswers(updatedAnswers);
  };

  // Reset states and reload the page
  const restartQuiz = () => {
    setAnswers({});
    setScore(0);
    setShowResult(false);
    setLoading(false);
    setTimer(120);
    setQuizId(1)
    navigate("/quiz");
  };

  const allAnswer =()=>{
    navigate("/all-answer", {state:{
        questions,
        answers
    }})
  }
  return (
    <section>
      <QuizHeader timer={timer} />
      <div className="md:w-9/12 w-[90%] flex md:flex-row flex-col mx-auto">
        <div className="md:w-[70%] w-full">
          <div>
            {questions.map(
              (question, index) =>
                question?.id == quizId && (
                  <div key={question.id} className="m-3 py-3 px-4 shadow-sm border border-gray-200 rounded ">
                    <p className="flex items-center rounded text-xs p-2 cursor-pointer">
                      <span className="h-8 w-8 bg-[#FCC822] rounded-full flex justify-center items-center text-green-800 mr-3">
                        {index + 1}
                      </span>
                      <p className="">{question.question}</p>
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-5">
                      {question.options.map((option, index) => (
                        <div
                          className={`border border-gray-200 rounded text-xs p-2 cursor-pointer ${
                            answers[question.id] === option ? "bg-gray-300" : ""
                          }`}
                          key={option}
                          onClick={() => handleAnswerSelect(question.id, option)}
                        >
                          <p className="text-[10px] mb-1">Option {index + 1}</p>
                          <p>{option}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
            )}
            <div className="flex justify-between px-4 py-4">
              <button onClick={()=>setQuizId(prev=>prev-1)} disabled={quizId===1}
               className={` ${quizId===1 ? "bg-gray-200":"bg-gray-600" }  px-6 py-2 text-white rounded`}>
                Prev
              </button>
              <button onClick={()=>setQuizId(prev=>prev+1)} disabled={quizId === questions.length}  className={` ${quizId === questions.length? "bg-gray-200":"bg-gray-600" }  px-6 py-2 text-white rounded`}>
                Next
              </button>
            </div>
            <button onClick={handleSubmit} disabled={showResult} className="bg-[#FCC822] px-6 py-2 text-white rounded">
            {showResult ? "Submitted":"Submit Quiz"}
            </button>
          </div>
        </div>{" "}
        <div className="md:w-[30%] w-full p-4">
          {showResult && (
            <div>
              <h3 className="text-2xl font-medium">Your Score: </h3>
              <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
                <h3 className={`text-xl ${status === "Passed" ? "text-green-800" : "text-red-500"}`}>
                  {status}
                </h3>
                <h1 className="text-3xl font-bold my-2">
                  {score * 10}
                  <span className="text-slate-800">/100</span>
                </h1>
                <p className="text-sm flex justify-center items-center gap-2">
                  Total Time:{" "}
                  <span className="text-xl text-orange-500">
                    {formatTime(120 - timer)}
                    <span className="text-xs">sec</span>
                  </span>
                </p>
              </div>

              <button onClick={allAnswer} className="bg-[#FCC822] text-white w-full py-2 rounded mt-16">
                See Right Answer
              </button>
              <button onClick={restartQuiz} className="bg-[#FCC822] text-white w-full py-2 rounded mt-4">
                Restart
              </button>
            </div>
          )}

          {loading && <Loading text={"Wait Calculting the Result"} />}
        </div>
      </div>
    </section>
  );
};

export default Quiz;
