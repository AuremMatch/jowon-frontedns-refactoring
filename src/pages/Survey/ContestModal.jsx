// ContestModal.js

import React, { useEffect, useReducer, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { useFetchQuestions } from "../../hooks/useFetchQuestions";
import { useSubmitResponse } from "../../hooks/useSubmitResponse";
import { reducer, initialState } from "../../reducer/useSurveyReducer";
import ButtonGroup from "./ButtonGroup";

import SubmitButtons from "./SubmitButtons";

import TeamMembers from "./TeamMembers";
import QuestionsForm from "./QuestionForm";

export default function ContestModal({ isOpen, closeModal, toggleLike }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);
  const modalRef = useRef(null);

  useFetchQuestions(id, dispatch);
  const submitResponse = useSubmitResponse();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div
        className="bg-white p-10 rounded-lg w-full max-w-4xl max-h-screen overflow-y-scroll"
        ref={modalRef}
      >
        <ButtonGroup isTeam={state.isTeam} dispatch={dispatch} />
        {state.isLoading ? (
          <p>Loading...</p>
        ) : state.error ? (
          <p>Error: {state.error}</p>
        ) : (
          <form>
            {!state.isTeam && (
              <>
                <QuestionsForm
                  questions={state.questions}
                  responses={state.responses}
                  dispatch={dispatch}
                />
                <SubmitButtons
                  submitResponse={submitResponse}
                  closeModal={closeModal}
                  state={state}
                  dispatch={dispatch}
                  toggleLike={toggleLike}
                />
              </>
            )}

            {state.isTeam && (
              <>
                <TeamMembers
                  teamMembers={state.teamMembers}
                  questions={state.questions}
                  dispatch={dispatch}
                  responses={state.responses}
                />
                <SubmitButtons
                  submitResponse={submitResponse}
                  closeModal={closeModal}
                  state={state}
                  dispatch={dispatch}
                  toggleLike={toggleLike}
                />
              </>
            )}
          </form>
        )}
      </div>
    </Modal>
  );
}
