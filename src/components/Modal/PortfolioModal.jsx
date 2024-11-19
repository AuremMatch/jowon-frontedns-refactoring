import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance"; // axiosInstance import
import axios from "axios";

const PortfolioModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDocument(file);
  };

  const handleSubmit = async () => {
    // Form 데이터 생성
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("link", link);

    // document가 파일 객체일 경우에만 추가
    if (document instanceof File) {
      formData.append("document", document);
    }

    // FormData 내용 로그 찍기
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      setLoading(true); // 로딩 상태 시작

      // Content-Type 헤더 제거
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/conversations/1/add_portfolio/",
        formData
      );

      console.log("포트폴리오 성공적으로 전송됨:", response.data);
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("포트폴리오 전송 중 오류 발생:", error);
      setError(error); // 오류 상태 설정
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl mb-4">성과 올리기</h2>
        <div className="mb-4">
          <label className="block text-sm mb-2">제목</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">설명</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">링크</label>
          <input
            type="url"
            className="w-full p-2 border border-gray-300 rounded"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">이미지 URL</label>
          <input
            type="url"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">문서 업로드</label>
          <input
            type="file"
            className="w-full p-2"
            onChange={handleFileChange}
            id="fileInput"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "제출 중..." : "제출"}
          </button>
        </div>
        {error && (
          <p className="text-red-500 mt-4">
            오류가 발생했습니다: {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PortfolioModal;
