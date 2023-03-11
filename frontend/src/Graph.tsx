import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y' as const,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
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

const labels = ['Kokoomus', 'Liberaalipuolue'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Täysin eri mieltä',
      data: [5,20],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Jokseenkin eri mieltä',
      data: [5,20],
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Jokseenkin samaa mieltä',
      data: [5,20],
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Täysin samaa mieltä',
      data: [55,20],
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};

export default function Chart() {
  return <Bar options={options} data={data} />;
}