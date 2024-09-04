import { useState, useEffect, useReducer } from "react";

import Cookies from "js-cookie";
import axios from "axios";

const initialState = {
  video: null,
  codingScores: [],
  loading: false,
  error: null,
  messages: "",
  isModalOpen: false,
  isMessageModalOpen: false,
  isModalOpens: false,
  isExpanded: true,
  isThirdExpanded: true,
  selectedFile: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_VIDEO":
      return { ...state, video: action.payload };
    case "SET_CODING_SCORES":
      return { ...state, codingScores: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "TOGGLE_EXPANDED":
      return { ...state, isExpanded: !state.isExpanded };
    case "TOGGLE_THIRD_EXPANDED":
      return { ...state, isThirdExpanded: !state.isThirdExpanded };
    case "TOGGLE_MODAL":
      return { ...state, isModalOpen: !state.isModalOpen };
    case "TOGGLE_MESSAGE_MODAL":
      return { ...state, isMessageModalOpen: !state.isMessageModalOpen };
    case "TOGGLE_MODAL_OPENS":
      return { ...state, isModalOpens: !state.isModalOpens };
    case "SET_SELECTED_FILE":
      return { ...state, selectedFile: action.payload };
    default:
      return state;
  }
}

export const useTeamDetail = (id) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const userToken = Cookies.get("csrftoken") || "";

  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  useEffect(() => {
    const fetchVideo = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await axiosInstance.get(
          `http://127.0.0.1:8000/conversations/${id}`
        );
        dispatch({ type: "SET_VIDEO", payload: response.data });

        if (
          response.data.matching_type === "random" ||
          response.data.matching_type === "same"
        ) {
          const participants = response.data.participants;
          const codingScores = participants.map(
            (participant) => participant.coding
          );
          dispatch({ type: "SET_CODING_SCORES", payload: codingScores });
        }
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchVideo();
  }, [id]);

  return { state, dispatch };
};
