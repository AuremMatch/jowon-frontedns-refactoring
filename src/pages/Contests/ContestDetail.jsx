import React from "react";
import { useParams } from "react-router-dom";
import { useFetchDetail } from "../../hooks/useFetchDetail";

export default function ContestDetail() {
  const { id } = useParams();
  console.log(id);

  const { video, loading, error } = useFetchDetail(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading video: {error.message}</div>;
  return (
    <div className="">
      <section className="flex flex-col md:flex-row p-4 items-center justify-center mt-40">
        <div className="w-1/6  basis-5/12 mr-24">
          <div className="text-2xl font-dongle_light mb-12  ">{video.제목}</div>
          <img src={video.사진} className="w-full" />
        </div>

        <div className="w-full basis-5/12 flex flex-col p-4">
          <div className="flex items-center py-2 ">
            <span className="text-2xl  font-dongle w-1/3 mr-40">연관학과</span>
            <span className="text-2xl  font-dongle w-2/3 ">
              {video.연관학과}
            </span>
          </div>
          <div className="flex items-center py-2 ">
            <span className="text-2xl font-dongle w-1/3 mr-40">시상금 </span>
            <span className="text-2xl font-dongle w-2/3">{video.상금}</span>
          </div>
          <div className="flex items-center py-4">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              학년{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.학년}
            </span>
          </div>
          <div className="flex items-center py-4 ">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              분야{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.분야}
            </span>
          </div>
          <div className="flex items-center py-4">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              위치{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.위치}
            </span>
          </div>
          <div className="flex items-center py-4">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              응모분야{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.응모분야}
            </span>
          </div>
          <div className="flex items-center py-4">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              참가대상{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.참가대상}
            </span>
          </div>
          <div className="flex items-center py-4">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              접수기간{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.접수기간}
            </span>
          </div>
          <div className="flex items-center py-4">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              접수방법{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.접수방법}
            </span>
          </div>

          <div className="flex justify-center mt-8">
            {/* <Button
              className="mt-32 mr-24 relative"
              text="신청자조회"
              onClick={handleButtonClick}
            ></Button> */}

            {/* {apply ? (
              <Button className="" text="완료" onClick={toggleLike} />
            ) : (
              <Button className="" text="신청하기" onClick={toggleModal} />
            )} */}
            {/* <Button
              onClick={() => (
                (window.location.href =
                  "https://www.notion.so/e035871677eb43b7bf71d168b8e9981e?pvs=4"),
                "_blank"
              )}
              className="mt-32 mr-24 bg-cover text-white"
              text="노션게시판"
              style={{}}
            /> */}
          </div>
        </div>
      </section>
    </div>
  );
}
