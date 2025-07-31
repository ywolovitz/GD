import React, { useState } from "react";

// Demo data for PAN report
const demoPanRows = Array.from({ length: 12 }).map((_, i) => ({
  pan: `5355 12** **** ${String(1000 + i).slice(-4)}`,
  batch: `2025-06-01-CRESCENT-UNION-BANK-00${(i % 3) + 1}`,
  status: "Distributed",
}));

// Demo data for batch history report
const demoBatches = [
  {
    id: "2025-06-01-CRESCENT-UNION-BANK-001",
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
    id: "2025-06-01-CRESCENT-UNION-BANK-002",
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
    id: "2025-06-01-CRESCENT-UNION-BANK-003",
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

const sortIcon = (field, sortField, sortDir) => (
  <span className="ml-1 inline-block align-middle">
    {sortField !== field ? (
      <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 20 20">
        <path
          d="M7 7l3-3 3 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 13l3 3 3-3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : sortDir === "asc" ? (
      <svg className="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 20 20">
        <path
          d="M7 7l3-3 3 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg className="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 20 20">
        <path
          d="M7 13l3 3 3-3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </span>
);

const CrescentUnionBankCombinedReportPage = () => {
  const [tab, setTab] = useState("pan");
  const [selectedBatch, setSelectedBatch] = useState(demoBatches[0]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [batchSearch, setBatchSearch] = useState("");

  // PAN report filtering and sorting
  let filteredRows = demoPanRows.filter(
    (row) =>
      row.pan.toLowerCase().includes(search.toLowerCase()) ||
      row.batch.toLowerCase().includes(search.toLowerCase()) ||
      row.status.toLowerCase().includes(search.toLowerCase())
  );
  if (sortField) {
    filteredRows = filteredRows.slice().sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Batch history batch search
  const filteredBatches = demoBatches.filter((batch) =>
    batch.id.toLowerCase().includes(batchSearch.toLowerCase())
  );
  // If selectedBatch is filtered out, select the first visible batch
  React.useEffect(() => {
    if (
      tab === "batch" &&
      filteredBatches.length > 0 &&
      !filteredBatches.some((b) => b.id === selectedBatch.id)
    ) {
      setSelectedBatch(filteredBatches[0]);
    }
  }, [batchSearch, tab]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 pb-20 pt-12">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
        <div className="flex mb-8 w-full">
          <button
            className={`flex-1 py-2 text-center text-sm font-semibold rounded-l ${
              tab === "pan"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-blue-50"
            }`}
            onClick={() => setTab("pan")}
          >
            PAN Report
          </button>
          <button
            className={`flex-1 py-2 text-center text-sm font-semibold rounded-r ${
              tab === "batch"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-blue-50"
            }`}
            onClick={() => setTab("batch")}
          >
            Batch History
          </button>
        </div>
        {tab === "pan" ? (
          <>
            <div className="w-full flex mb-4">
              <input
                type="text"
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Search PAN, batch, or status..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                    onClick={() => handleSort("pan")}
                  >
                    <span className="flex items-center">
                      PAN{sortIcon("pan", sortField, sortDir)}
                    </span>
                  </th>
                  <th
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                    onClick={() => handleSort("batch")}
                  >
                    <span className="flex items-center">
                      Batch Number{sortIcon("batch", sortField, sortDir)}
                    </span>
                  </th>
                  <th
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                    onClick={() => handleSort("status")}
                  >
                    <span className="flex items-center">
                      Status{sortIcon("status", sortField, sortDir)}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRows.map((row, idx) => (
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
          </>
        ) : (
          <div className="flex w-full">
            {/* Sidebar with batches */}
            <div className="w-[350px] bg-gray-50 rounded-lg shadow-inner flex flex-col mr-8">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Batches
                </h2>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Search batch ID..."
                  value={batchSearch}
                  onChange={(e) => setBatchSearch(e.target.value)}
                />
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
                    {filteredBatches.map((batch) => (
                      <tr
                        key={batch.id}
                        className={`hover:bg-gray-100 cursor-pointer ${
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
            <div className="flex-1 flex flex-col items-center">
              {/* Batch Details Card */}
              <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-md p-6 mb-6">
                <div className="flex items-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="7"
                      width="18"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
                    <path d="M7 15h.01" stroke="currentColor" strokeWidth="2" />
                    <path d="M11 15h2" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-800">
                    Batch Details
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500">
                        Number of Cards
                      </div>
                      <div className="text-base font-semibold text-gray-900">
                        300
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17v.01" />
                      <rect x="6" y="4" width="12" height="16" rx="2" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500">Product</div>
                      <div className="text-base font-semibold text-gray-900">
                        456568
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="7" width="18" height="10" rx="2" />
                      <path d="M3 10h18" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500">Card Type</div>
                      <div className="text-base font-semibold text-gray-900">
                        Bank
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 20h5v-2a4 4 0 00-4-4h-1" />
                      <path d="M9 20H4v-2a4 4 0 014-4h1" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500">Branch</div>
                      <div className="text-base font-semibold text-gray-900">
                        Braamfontein: Jorrisen Street
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center min-h-[300px]">
                <h2 className="text-xl font-semibold mb-6">
                  Batch Status History
                </h2>
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
        )}
      </div>
    </div>
  );
};

export default CrescentUnionBankCombinedReportPage;
