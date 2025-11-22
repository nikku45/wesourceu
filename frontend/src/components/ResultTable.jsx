import React from "react";

export default function ResultTable({ results }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
      <table className="min-w-full text-left bg-white rounded-2xl overflow-hidden">

        {/* Table Header */}
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold tracking-wide">Rule</th>
            <th className="px-6 py-4 text-sm font-semibold tracking-wide">Status</th>
            <th className="px-6 py-4 text-sm font-semibold tracking-wide">Evidence</th>
            <th className="px-6 py-4 text-sm font-semibold tracking-wide">Reasoning</th>
            <th className="px-6 py-4 text-sm font-semibold tracking-wide">Confidence</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {results.map((r, i) => (
            <tr
              key={i}
              className="border-b last:border-none hover:bg-gray-50 transition text-gray-700"
            >
              <td className="px-6 py-4 font-medium">{r.rule}</td>

              <td
                className={`px-6 py-4 font-semibold capitalize ${
                  r.status === "pass"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {r.status}
              </td>

              <td className="px-6 py-4">{r.evidence}</td>
              <td className="px-6 py-4">{r.reasoning}</td>
              <td className="px-6 py-4">{r.confidence}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
