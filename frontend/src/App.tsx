import  { useState, useEffect } from "react";
import Select, { MultiValue } from 'react-select'
import './App.css';
import Chart from './Graph';



function fetchAPI() {
  return fetch("http://localhost:8080/api/summary?8",{ method: 'GET' }).then(data => data.json()) // Parsing the data into a JavaScript object
  .then(json => alert(JSON.stringify(json)))
}

interface Party {
  id: number
  name_fi: string
  color: string
}

interface Option {
  value: number
  label: string

}


function App() {
  const [partyOptions, setPartyOptions] = useState<Option[]>([]);
  const [selectedParties, setSelectedParties] = useState<MultiValue<Option>>([]);

  const changeSelectedParties = (value: any) => setSelectedParties(value);



  useEffect(() => {
    fetch(
      `http://localhost:8080/api/party`,
      {
        method: "GET",
      }
    )
      .then(res => res.json())
      .then(response => {
        setPartyOptions(response.map((x: Party) => ({"value":x.id, "label": x.name_fi})));
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
       <Select 
          isMulti={true}
          options={partyOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          value={selectedParties}
          onChange={(value) => changeSelectedParties(value)}
        />
        <Chart></Chart>
        <button onClick={()=>console.log(partyOptions)}>test</button>
        <button onClick={()=>console.log(selectedParties)}>test</button>

    </div>
  );
}

export default App;
