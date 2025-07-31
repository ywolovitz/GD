import React from "react";

const demoRows = Array.from({ length: 12 }).map((_, i) => ({
  pan: `5355 12** **** ${String(1000 + i).slice(-4)}`,
  batch: `2025-06-01-CAPITEC-00${(i % 3) + 1}`,
  status: "Distributed",
}));

const CapitecPanReportPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 pb-20 pt-12">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-6">PAN Distribution Report</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PAN
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batch Number
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {demoRows.map((row, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-mono text-gray-900">
                  {row.pan}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {row.batch}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  <span className="text-green-600 font-semibold">
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CapitecPanReportPage;
