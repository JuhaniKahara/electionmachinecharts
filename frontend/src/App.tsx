import { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import "./App.css";
import Chart from "./Graph";
import { Option, Summary, Party, Question } from "./types";

function App() {
  const [partyOptions, setPartyOptions] = useState<Option[]>([]);
  const [selectedParties, setSelectedParties] = useState<MultiValue<Option>>(
    []
  );
  const [questionOptions, setQuestionOptions] = useState<MultiValue<Option>>(
    []
  );
  const [selectedQuestion, setSelectedQuestion] = useState<Option | null>({
    value: 0,
    label: "Valitse kysymys",
  });
  const [summary, setSummary] = useState<Summary[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:8080/emv/api/party`, { method: "GET" }),
      fetch(`http://localhost:8080/emv/api/question`, { method: "GET" }),
      fetch(`http://localhost:8080/emv/api/summary`, { method: "GET" }),
    ])
      .then(([resParties, resQuestions, resSummary]) =>
        Promise.all([resParties.json(), resQuestions.json(), resSummary.json()])
      )
      .then(([dataParties, dataQuestions, dataSummary]) => {
        console.log(dataParties);
        console.log(dataQuestions);
        setPartyOptions(
          dataParties.map((x: Party) => ({ value: x.id, label: x.name_fi }))
        );
        setQuestionOptions(
          dataQuestions.map((x: Question) => ({
            value: x.id,
            label: x.text_fi,
          }))
        );
        setSummary(dataSummary);
      });
  }, []);

  return (
    <center>
      <div style={{ maxWidth: "70%", paddingTop: "20px" }}>
        <Select
          placeholder={"Valitse puolue"}
          isMulti={true}
          options={partyOptions}
          value={selectedParties}
          onChange={(value) => setSelectedParties(value)}
        />
        <Select
          placeholder={"Valitse kysymys"}
          options={questionOptions}
          value={selectedQuestion}
          onChange={(value) => setSelectedQuestion(value)}
        />
        <h2>
          {selectedQuestion && selectedQuestion.value !== 0
            ? selectedQuestion.label
            : ""}
        </h2>
        <Chart
          data={summary.filter(
            (x) =>
              selectedParties.map((x) => x.value).includes(x.partyId) &&
              x.questionId === selectedQuestion?.value
          )}
          parties={selectedParties}
        ></Chart>
        <h6 style={{ textAlign: "right" }}>Ylen vaalikone 2023</h6>
      </div>
    </center>
  );
}

export default App;
