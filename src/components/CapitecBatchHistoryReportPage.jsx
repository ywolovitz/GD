import React, { useState } from "react";

const demoBatches = [
  {
    id: "2025-06-01-CAPITEC-001",
    status: "Distributed",
    history: [
      {
        timestamp: "2024-06-01 08:00:00",
        user: "Tristan Jacobs",
        event: "Scanned",
      },
      {
        timestamp: "2024-06-01 09:00:00",
        user: "Lindiwe Mokoena",
        event: "Stored",
      },
      {
        timestamp: "2024-06-01 10:00:00",
        user: "Sipho Dlamini",
        event: "Ready to Pick",
      },
      {
        timestamp: "2024-06-01 11:00:00",
        user: "Ayesha Patel",
        event: "Distributed",
      },
    ],
  },
  {
    id: "2025-06-01-CAPITEC-002",
    status: "Distributed",
    history: [
      {
        timestamp: "2024-06-01 08:10:00",
        user: "Johan van der Merwe",
        event: "Scanned",
      },
      {
        timestamp: "2024-06-01 09:15:00",
        user: "Nomsa Khumalo",
        event: "Stored",
      },
      {
        timestamp: "2024-06-01 10:20:00",
        user: "Thabo Nkosi",
        event: "Ready to Pick",
      },
      {
        timestamp: "2024-06-01 11:30:00",
        user: "Sarah Daniels",
        event: "Distributed",
      },
    ],
  },
  {
    id: "2025-06-01-CAPITEC-003",
    status: "Distributed",
    history: [
      {
        timestamp: "2024-06-01 08:20:00",
        user: "John Smith",
        event: "Scanned",
      },
      {
        timestamp: "2024-06-01 09:25:00",
        user: "Tristan Jacobs",
        event: "Stored",
      },
      {
        timestamp: "2024-06-01 10:30:00",
        user: "Lindiwe Mokoena",
        event: "Ready to Pick",
      },
      {
        timestamp: "2024-06-01 11:40:00",
        user: "Sipho Dlamini",
        event: "Distributed",
      },
    ],
  },
];

const CapitecBatchHistoryReportPage = () => {
  const [selectedBatch, setSelectedBatch] = useState(demoBatches[0]);

  return (
    <div className="min-h-screen flex bg-gray-50 pb-20 pt-12">
      {/* Sidebar with batches */}
      <div className="w-[350px] bg-white rounded-lg shadow-sm m-6 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Batches</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch ID
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {demoBatches.map((batch) => (
                <tr
                  key={batch.id}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    selectedBatch.id === batch.id ? "bg-blue-100" : ""
                  }`}
                  onClick={() => setSelectedBatch(batch)}
                >
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    {batch.id}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                    <span className="text-green-600 font-semibold">
                      {batch.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Main content: history log */}
      <div className="flex-1 flex flex-col items-center pt-12">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-xl font-semibold mb-6">Batch Status History</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedBatch.history.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 font-mono">
                    {row.timestamp}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {row.user}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {row.event}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CapitecBatchHistoryReportPage;
