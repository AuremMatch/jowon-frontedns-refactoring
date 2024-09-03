import { useReducer, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// 초기 상태와 리듀서 함수 정의
const initialState = {
  apply: false,
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_LIKE_REQUEST":
      return { ...state, loading: true };
    case "TOGGLE_LIKE_SUCCESS":
      return { ...state, apply: action.payload, loading: false };
    case "TOGGLE_LIKE_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

// 커스텀 훅 작성
export function useToggleLike(videoId, videoData) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (videoData) {
      checkApplyStatus();
    }
  }, [videoData]);

  const checkApplyStatus = async () => {
    const userToken = Cookies.get("csrftoken") || "";
    const axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        "X-CSRFToken": userToken,
      },
    });
    try {
      const response = await axiosInstance.get(
        "http://127.0.0.1:8000/users/me/apply/"
      );
      const isApply = response.data.some((fav) => fav.id === videoId);
      dispatch({ type: "TOGGLE_LIKE_SUCCESS", payload: isApply });
    } catch (error) {
      dispatch({ type: "TOGGLE_LIKE_FAILURE", payload: error.message });
      console.error("Error checking apply status:", error);
    }
  };

  const toggleLike = async (
    e,
    selectedChoices,
    matchingType,
    teamMembers = [],
    isTeam
  ) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("toggleLike 함수가 실행되었습니다");

    dispatch({ type: "TOGGLE_LIKE_REQUEST" });

    try {
      const userToken = Cookies.get("csrftoken") || "";
      const axiosInstance = axios.create({
        withCredentials: true,
        headers: {
          "X-CSRFToken": userToken,
        },
      });

      await axiosInstance.put("http://127.0.0.1:8000/users/me/apply/", {
        id: videoId,
      });

      dispatch({ type: "TOGGLE_LIKE_SUCCESS", payload: !state.apply });

      await axiosInstance.put(
        "http://127.0.0.1:8000/users/update-selected-choices/",
        { selected_choices: selectedChoices, contest_id: videoId }
      );
      console.log("Selected choices updated");

      if (matchingType === "same") {
        const teamMemberResponses = await Promise.all(
          teamMembers.map((memberId) =>
            axiosInstance.get(`http://127.0.0.1:8000/users/${memberId}`)
          )
        );
        const selectedParticipants = teamMemberResponses.map(
          (response) => response.data
        );

        const conversationData = {
          teamName: videoData.제목,
          selected_choices: selectedChoices,
          contest_id: videoId,
          image: videoData.사진,
          matching_type: "same",
          participants: selectedParticipants.map(
            (participant) => participant.id
          ),
        };

        const conversationResponse = await axiosInstance.post(
          "http://127.0.0.1:8000/conversations/",
          conversationData
        );
        const conversationId = conversationResponse.data.id;

        const notiData = {
          receiver: 1,
          message: videoData.제목,
          image: videoData.사진,
          conversation_id: conversationId,
        };
        await axiosInstance.post(
          "http://127.0.0.1:8000/notifications/",
          notiData
        );
        console.log("New notification created");
      } else {
        const applicantsResponse = await axiosInstance.get(
          `http://127.0.0.1:8000/contests/${videoId}/applicants/`
        );
        const applicants = applicantsResponse.data;

        const conversationData = {
          teamName: videoData.제목,
          selected_choices: selectedChoices,
          contest_id: videoId,
          image: videoData.사진,
          matching_type: matchingType,
          participants: applicants.map((applicant) => applicant.user_id),
        };

        const conversationResponse = await axiosInstance.post(
          "http://127.0.0.1:8000/conversations/",
          conversationData
        );
        const conversationId = conversationResponse.data.id;

        const notiData = {
          receiver: 1,
          message: videoData.제목,
          image: videoData.사진,
          conversation_id: conversationId,
        };
        await axiosInstance.post(
          "http://127.0.0.1:8000/notifications/",
          notiData
        );
        console.log("New notification created");
      }
    } catch (error) {
      dispatch({ type: "TOGGLE_LIKE_FAILURE", payload: error.message });
      console.error("Error toggling like:", error);
    }
  };

  return { state, toggleLike };
}
