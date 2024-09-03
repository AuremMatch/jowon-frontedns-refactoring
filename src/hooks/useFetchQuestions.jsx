import { useEffect } from "react";
import axios from "axios";

export function useFetchQuestions(id, dispatch) {
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/contests/${id}/survey/`
        );

        if (response.data && response.data.questions) {
          dispatch({ type: "SET_QUESTIONS", payload: response.data.questions });
        } else {
          dispatch({ type: "SET_QUESTIONS", payload: [] });
          console.error("Invalid response data format");
        }
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    fetchQuestions();
  }, [id, dispatch]);
}
