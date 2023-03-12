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

  const options = {
    indexAxis: "y" as const,
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

  const chartData = {
    labels: props.parties.map((x: Option) => x.label) || [],
    datasets: [
      {
        label: "Täysin eri mieltä",
        data: getData(props.data, "countOnes", props.parties),
        backgroundColor: "rgb(251,39,41)",
        barThickness: 35,
      },
      {
        label: "Jokseenkin eri mieltä",
        data: getData(props.data, "countTwos", props.parties),
        backgroundColor: "rgb(255, 130, 130)",
        barThickness: 35,
      },
      {
        label: "Jokseenkin samaa mieltä",
        data: getData(props.data, "countFours", props.parties),
        backgroundColor: "rgb(131, 252, 135)",
        barThickness: 35,
      },
      {
        label: "Täysin samaa mieltä",
        data: getData(props.data, "countFives", props.parties),
        backgroundColor: "rgb(18, 219, 24)",
        barThickness: 35,
      },
    ],
  };
  return <Bar options={options} data={chartData} />;
}
