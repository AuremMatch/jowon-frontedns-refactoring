import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchDetail } from "../../hooks/useFetchDetail";
import ContestInfo from "./ContestInfo";
import ContestButtons from "./ContestButton";
import useModal from "../../hooks/useModal";
import ContestModal from "../Survey/ContestModal";
import { useToggleLike } from "../../hooks/useToggleLike";

export default function ContestDetail() {
  const { id } = useParams();
  const { navigate } = useNavigate();

  const navToApply = () => {
    navigate(`/contests/${id}/apply`);
  };
  const { video, loading, error } = useFetchDetail(id);
  const { isOpen, openModal, closeModal } = useModal(); // useModal 훅 사용

  const { state, toggleLike } = useToggleLike(id, video); // useToggleLike 훅 사용

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        Error loading video: {error.message}
      </div>
    );

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center mt-28 mb-12">
      <section className="w-5/6 h-5/6 flex flex-col md:flex-row p-6 md:p-12 items-center justify-between bg-gray-800 rounded-lg shadow-lg">
        <div className="w-full mb-8">
          <h1 className="text-3xl font-bold mb-6">{video.제목}</h1>
          <img
            src={video.사진}
            className="w-full rounded-lg shadow-md"
            alt={video.제목}
          />
        </div>

        <div className="w-full md:w-1/2 ml-24">
          <ContestInfo video={video} />
          <ContestButtons
            nav={navToApply}
            openModal={openModal}
            apply={state.apply}
          />{" "}
          {/* openModal 함수를 전달 */}
        </div>
      </section>
      <ContestModal
        toggleLike={toggleLike}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </div>
  );
}
