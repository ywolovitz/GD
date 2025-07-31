import React, { useState, useRef } from "react";

const initialBatches = [
  {
    id: "2025-06-01-CRESCENT-UNION-BANK-001",
    cardCount: 300,
    status: "Pending Storage",
  },
  {
    id: "2025-06-01-CRESCENT-UNION-BANK-002",
    cardCount: 300,
    status: "Pending Storage",
  },
  {
    id: "2025-06-01-CRESCENT-UNION-BANK-003",
    cardCount: 300,
    status: "Pending Storage",
  },
  {
    id: "2025-06-01-CRESCENT-UNION-BANK-004",
    cardCount: 300,
    status: "Pending Storage",
  },
];

const randomNames = [
  "Tristan Jacobs",
  "Lindiwe Mokoena",
  "Sipho Dlamini",
  "Ayesha Patel",
  "Johan van der Merwe",
  "Nomsa Khumalo",
  "Thabo Nkosi",
  "Sarah Daniels",
];

function getRandomName() {
  return randomNames[Math.floor(Math.random() * randomNames.length)];
}

function getCurrentDateTime() {
  const now = new Date();
  return now.toLocaleString();
}

const CrescentUnionBankStoringPage = () => {
  const [batches, setBatches] = useState(initialBatches);
  const [highlightedBatch, setHighlightedBatch] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const scanInputRef = useRef(null);

  const handleScan = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setShowDialog(true);
      e.target.value = "";
    }
  };

  const handleDismissDialog = () => {
    setShowDialog(false);
    setLoading(true);
    setTimeout(() => {
      if (highlightedBatch) {
        setBatches((prev) =>
          prev.map((batch) =>
            batch.id === highlightedBatch
              ? {
                  ...batch,
                  status: "Stored",
                  location: "C14",
                  storedAt: getCurrentDateTime(),
                  storedBy: "John Smith",
                }
              : batch
          )
        );
      }
      setLoading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setTimeout(() => {
        if (scanInputRef.current) {
          scanInputRef.current.value = "";
          scanInputRef.current.focus();
        }
      }, 100);
    }, 10000);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 pb-20">
      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md shadow-lg flex items-center">
            <svg
              className="h-6 w-6 text-green-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-green-800 font-medium">
              Box successfully stored!
            </span>
          </div>
        </div>
      )}
      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8">
            <svg
              className="animate-spin h-10 w-10 text-blue-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <span className="text-lg font-semibold text-gray-700">
              reading location....
            </span>
          </div>
        </div>
      )}
      {/* Sidebar with batches */}
      <div className="w-[900px] bg-white rounded-lg shadow-sm m-6 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Batches</h2>
        </div>
        <div className="flex-1 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch ID
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cards
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stored At
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stored By
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {batches.map((batch) => (
                <tr
                  key={batch.id}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    highlightedBatch === batch.id ? "bg-blue-100" : ""
                  }`}
                  onClick={() => setHighlightedBatch(batch.id)}
                >
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    {batch.id}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {batch.cardCount}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                    {batch.status === "Stored" ? (
                      <span className="text-green-600 font-semibold">
                        Stored
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        Pending Storage
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {batch.location || "-"}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {batch.storedAt || "-"}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {batch.storedBy || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center pt-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center min-h-[300px]">
          {/* Scan box prompt */}
          <div className="w-full mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scan box:
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Scan or enter barcode..."
              onKeyDown={handleScan}
              autoFocus
              ref={scanInputRef}
            />
          </div>
        </div>
      </div>
      {/* Dialog for Target Location */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col items-center relative">
            <div className="text-lg font-semibold text-gray-800 mb-2">
              Target Location C14
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleDismissDialog}
            >
              Confirm Stored
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrescentUnionBankStoringPage;
