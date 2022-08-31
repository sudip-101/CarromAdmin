import React from "react";
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
import { GetRevenueGraph } from "../../api";

const LineChart = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await GetRevenueGraph();
      if (data.success && data.message === "Fetched Successfuly!")
        setData(data.data);
    };
    fetchData();
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const data1 = {
    labels: [...Array(31)].map((_, id) => `${id + 1} August`),
    datasets: [
      {
        label: "Cash-Flow",
        fill: false,
        borderColor: "#91cfff",
        backgroundColor: "#249bf7",
        data: data,
        tension: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            return "₹ " + value;
          },
        },
      },
    },
  };

  return <Line data={data1} height={100} options={options} />;
};

export default LineChart;
