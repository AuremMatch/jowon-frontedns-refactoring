import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import useModal from "../../hooks/useModal";
import ContestButtons from "../ContestDetail/ContestButton";
import ContestModal from "../Survey/ContestModal";
import ApplyCard from "./ApplyCard";
import Footer from "../../components/Footer/Footer";
import { useFetchApplicants } from "../../hooks/useFetchApplicants";

export default function Apply() {
  const { id } = useParams();
  const { navigate } = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  // 커스텀 훅 사용
  const { userData, isLoading, error } = useFetchApplicants(id);

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading applicants: {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center mt-28 mb-12 flex-col">
      <section className="w-5/6 h-5/6 flex flex-col md:flex-row p-6 md:p-12 items-center justify-between bg-gray-800 rounded-lg shadow-lg">
        <div className="w-full mb-8">
          <h1 className="text-3xl font-bold mb-6">지원 현황</h1>
          <div className="text-lg mb-4">총 지원자 수: {userData.length}명</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {userData.map((applicant) => (
              <div key={applicant.user_id} className="p-4">
                <ApplyCard
                  user={applicant}
                  onClick={() => navigate(`/users/${applicant.user_id}`)}
                  image={applicant.avatar}
                  isNew={true}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <ContestModal isOpen={isOpen} closeModal={closeModal} /> */}
    </div>
  );
}
