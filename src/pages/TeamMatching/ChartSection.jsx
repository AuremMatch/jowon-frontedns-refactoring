import React, { useRef } from "react";
import { Radar } from "react-chartjs-2";

const ChartSection = ({ video }) => {
  const chartRef = useRef(null);

  const data = {
    labels: ["프론트", "백엔드", "디자인", "ppt/리더쉽", "배포"],
    datasets: video.participants.map((participant, index) => ({
      label: `팀원 ${index + 1} 데이터`,
      data: [
        participant.frontend_score,
        participant.backend_score,
        participant.design_score,
        participant.ppt_score,
        participant.deploy_score,
      ],
      fill: true,
      backgroundColor: `rgba(${255 - index * 50}, ${
        99 + index * 50
      }, 132, 0.2)`,
      borderColor: `rgba(${255 - index * 50}, ${99 + index * 50}, 132, 1)`,
    })),
  };

  const options = {
    scales: {
      r: {
        angleLines: { display: true },
        ticks: { beginAtZero: true },
      },
    },
    layout: { padding: { top: 100 } },
  };

  return (
    <div className="chart-container container mx-auto mt-24 mb-40">
      <Radar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default ChartSection;
