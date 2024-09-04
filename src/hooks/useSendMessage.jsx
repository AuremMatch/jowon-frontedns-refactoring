import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const useSendMessage = (id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      await axiosInstance.post(
        `http://127.0.0.1:8000/conversations/messages/`,
        {
          message,
          conversation_id: id,
          conversation: id,
        }
      );
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Error sending message:", error);
      setError(error);
      setLoading(false);
      return false;
    }
  };

  return { sendMessage, loading, error };
};
