import React, { useState } from "react";
import ResultTable from "./components/ResultTable";

export default function App() {
  const [pdf, setPdf] = useState(null);
  const [rules, setRules] = useState(["", "", ""]);
  const [results, setResults] = useState([]);

  const handleCheck = async () => {
    if (!pdf) {
      alert("Upload a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("rules", JSON.stringify(rules));

    const res = await fetch("http://localhost:5000/api/check", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setResults(data.results);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>NIYAMR – PDF Rule Checker</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdf(e.target.files[0])}
      />

      <h3>Enter 3 Rules</h3>
      {rules.map((r, i) => (
        <input
          key={i}
          value={r}
          onChange={(e) => {
            const newRules = [...rules];
            newRules[i] = e.target.value;
            setRules(newRules);
          }}
          placeholder={`Rule ${i + 1}`}
          style={{ display: "block", margin: "10px 0", width: "300px" }}
        />
      ))}

      <button onClick={handleCheck}>Check Document</button>

      {results.length > 0 && <ResultTable results={results} />}
    </div>
  );
}
