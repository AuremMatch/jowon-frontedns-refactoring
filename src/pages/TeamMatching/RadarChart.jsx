// RadarChart.js
import React from "react";
import { Radar } from "react-chartjs-2";

export default function RadarChart({ data, options }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "800px", height: "800px" }}>
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}
