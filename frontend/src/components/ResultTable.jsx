import React from "react";

export default function ResultTable({ results }) {
  return (
    <table border="1" cellPadding="10" style={{ marginTop: 30 }}>
      <thead>
        <tr>
          <th>Rule</th>
          <th>Status</th>
          <th>Evidence</th>
          <th>Reasoning</th>
          <th>Confidence</th>
        </tr>
      </thead>

      <tbody>
        {results.map((r, i) => (
          <tr key={i}>
            <td>{r.rule}</td>
            <td style={{ color: r.status === "pass" ? "green" : "red" }}>
              {r.status}
            </td>
            <td>{r.evidence}</td>
            <td>{r.reasoning}</td>
            <td>{r.confidence}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
