import { Summary, Option } from "./types";
import { MultiValue } from "react-select";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  plugins: {
    title: {
      display: true,
      text: "Yle vaalikonevastaukset 2023",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export function getData(
  allData: Summary[],
  field: "countOnes" | "countTwos" | "countFours" | "countFives",
  parties: MultiValue<Option>
) {
  let data: number[] = [];
  parties.forEach((party) => {
    data.push(
      allData.filter((x: Summary) => x.partyId === party.value)[0][field] /
        allData.filter((x: Summary) => x.partyId === party.value)[0][
          "countTotal"
        ]
    );
  });
  return data;
}

export default function Chart(props: {
  data: Summary[];
  parties: MultiValue<Option>;
}) {
  if (props.parties.length === 0 || props.data.length === 0) return null;
  const chartData = {
    labels: props.parties.map((x: Option) => x.label) || [],
    datasets: [
      {
        label: "Täysin eri mieltä",
        data: getData(props.data, "countOnes", props.parties),
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Jokseenkin eri mieltä",
        data: getData(props.data, "countTwos", props.parties),
        backgroundColor: "rgb(235, 195, 52)",
      },
      {
        label: "Jokseenkin samaa mieltä",
        data: getData(props.data, "countFours", props.parties),
        backgroundColor: "rgb(53, 162, 235)",
      },
      {
        label: "Täysin samaa mieltä",
        data: getData(props.data, "countFives", props.parties),
        backgroundColor: "rgb(10, 201, 57)",
      },
    ],
  };
  return <Bar options={options} data={chartData} />;
}
