import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ProgressChart({ progress }) {
  const data = {
    labels: progress.map((item) => item.topic),
    datasets: [
      {
        label: "Problems Solved",
        data: progress.map(
          (item) => item.problemsSolved
        ),
        borderWidth: 2,
      },
    ],
  };

  return <Line data={data} />;
}

export default ProgressChart;