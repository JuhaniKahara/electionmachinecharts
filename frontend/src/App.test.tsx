import { MultiValue } from "react-select";

import { render, screen } from "@testing-library/react";
import App from "./App";
import Chart, { getData } from "./Graph";
import { Summary, Option } from "./types";

test("Render the starting screen", () => {
  render(<App />);
  const partySelectorLabel = screen.getByText(/Valitse puolue/i);
  const questionSelectorLabel = screen.getByText(/Valitse kysymys/i);
  expect(partySelectorLabel).toBeInTheDocument();
  expect(questionSelectorLabel).toBeInTheDocument();
});

test("Render the chart without data", () => {
  const { container } = render(<Chart data={[]} parties={[]} />);
  expect(container.innerHTML).toBe("");
  expect;
});

test("Test that data is calculated correctly to the chart", () => {
  const data: Summary[] = [
    {
      partyId: 1,
      questionId: 1,
      countOnes: 20,
      countTwos: 20,
      countFours: 20,
      countFives: 40,
      countTotal: 100,
    },
    {
      partyId: 2,
      questionId: 1,
      countOnes: 30,
      countTwos: 20,
      countFours: 40,
      countFives: 10,
      countTotal: 100,
    },
  ];

  const parties: MultiValue<Option> = [
    { value: 1, label: "Liberaalipuolue" },
    { value: 2, label: "Vasemmistoliitto" },
  ];
  expect(getData(data, "countOnes", parties)).toStrictEqual([0.2, 0.3]);
  expect(getData(data, "countTwos", parties)).toStrictEqual([0.2, 0.2]);
  expect(getData(data, "countFours", parties)).toStrictEqual([0.2, 0.4]);
  expect(getData(data, "countFives", parties)).toStrictEqual([0.4, 0.1]);
});
