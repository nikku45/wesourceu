import React, { useState } from "react";
import ResultTable from "./components/ResultTable";

export default function App() {
  const [pdf, setPdf] = useState(null);
  const [rules, setRules] = useState(["", "", ""]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    if (!pdf) {
      alert("Upload a PDF first");
      setLoading(false);
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
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-start px-4 py-12">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-3xl border border-gray-200">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
          NIYAMR – PDF Rule Checker
        </h2>

        {/* PDF Upload Section */}
        <div className="mb-8">
          <label className="block font-semibold text-gray-700 mb-2">
            Upload PDF
          </label>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files[0])}
            className="block w-full bg-gray-50 border border-gray-300 p-3 rounded-xl cursor-pointer transition hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Rules Section */}
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Enter Rules</h3>

        <div className="space-y-4">
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
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleCheck}
          disabled={loading ? true : false}
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition-transform transform hover:scale-[1.02]"
        >
          Check Document
        </button>

        {/* Result Table */}
        {results.length > 0 && (
          <div className="mt-10">
            <ResultTable results={results} />
          </div>
        )}
      </div>
    </div>
  );
}
