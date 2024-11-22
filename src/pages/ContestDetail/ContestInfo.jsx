import React from "react";

export default function ContestInfo({ video }) {
  return (
    <div className="grid grid-cols-1 gap-6 font-writeFont text-3xl">
      <InfoItem label="연관학과" value={video.연관학과} />
      <InfoItem label="시상금" value={video.상금} />
      <InfoItem label="학년" value={video.학년} />
      <InfoItem label="분야" value={video.분야} />
      <InfoItem label="위치" value={video.위치} />
      <InfoItem label="응모분야" value={video.응모분야} />
      <InfoItem label="참가대상" value={video.참가대상} />
      <InfoItem label="접수기간" value={video.접수기간} />
      <InfoItem label="접수방법" value={video.접수방법} />
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="flex items-center">
      <span className="text-3xl font-writeFont font-semibold w-1/3 ">
        {label}
      </span>
      <span className=" text-2xl w-2/3">{value}</span>
    </div>
  );
}
