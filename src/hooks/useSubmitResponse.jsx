import axios from "axios";
import Cookies from "js-cookie";

export function useSubmitResponse() {
  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  const submitResponse = async (e, state, dispatch, toggleLike, closeModal) => {
    e.preventDefault();
    // 사용하려는 부분에서 toggleLike가 함수로 전달되었는지 확인
    if (typeof toggleLike !== "function") {
      throw new TypeError("toggleLike is not a function");
    }
    const { questions, responses, isTeam, teamMembers } = state;

    const selectedChoices = questions.map(
      (question, index) => responses[`question${index + 1}`]
    );

    const currentMatchingType = isTeam ? "same" : "random";

    if (isTeam) {
      const teamResponses = teamMembers.map((memberId) => {
        return questions.map((question, questionIndex) => ({
          question: question.id,
          choice: responses[`question${questionIndex + 1}`],
          survey: question.survey,
          userId: memberId,
        }));
      });

      try {
        for (let memberResponses of teamResponses) {
          for (let response of memberResponses) {
            await axiosInstance.post(
              "http://127.0.0.1:8000/survey/responses/",
              response
            );
          }
        }
        console.log("Team survey responses submitted:", teamResponses);
        toggleLike(
          e,
          selectedChoices,
          currentMatchingType,
          teamMembers,
          isTeam
        );
      } catch (error) {
        console.error("Error submitting team survey responses:", error);
      }
    } else {
      const formattedResponses = questions.map((question, index) => ({
        question: question.id,
        choice: responses[`question${index + 1}`],
        survey: question.survey,
      }));

      try {
        for (let response of formattedResponses) {
          await axiosInstance.post(
            "http://127.0.0.1:8000/survey/responses/",
            response
          );
        }
        console.log("Survey responses submitted:", formattedResponses);
        toggleLike(e, selectedChoices, currentMatchingType, [], isTeam);
        closeModal();
      } catch (error) {
        console.error("Error submitting survey responses:", error);
      }
    }
  };

  return submitResponse;
}
