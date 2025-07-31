import React, { useState } from "react";

const randomNames = [
  "Tristan Jacobs",
  "Lindiwe Mokoena",
  "Sipho Dlamini",
  "Ayesha Patel",
  "Johan van der Merwe",
  "Nomsa Khumalo",
  "Thabo Nkosi",
  "Sarah Daniels",
  "John Smith",
];

const sequentialLocations = [
  "C14",
  "C15",
  "C16",
  "C17",
  "C18",
  "C19",
  "C20",
  "C21",
  "C22",
  "C23",
  "C24",
  "C25",
];

function getRandomName() {
  return randomNames[Math.floor(Math.random() * randomNames.length)];
}

function getRandomTimeToday() {
  const now = new Date();
  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    8,
    0,
    0
  ); // 8am today
  const end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    18,
    0,
    0
  ); // 6pm today
  const randomTime = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomTime.toLocaleString();
}

const initialBatches = Array.from({ length: 6 }).map((_, i) => ({
  id: `2025-06-01-CRESCENT-UNION-BANK-00${i + 1}`,
  cardCount: 300,
  status: "Ready to Pick",
  location: sequentialLocations[i],
  storedAt: getRandomTimeToday(),
  storedBy: getRandomName(),
  product: "45678",
  batchType: "Bank Card",
  destination: "Braamfontein: Jorisson Street",
  pickedAt: "-",
}));

const CrescentUnionBankPickingPage = () => {
  const [batches, setBatches] = useState(initialBatches);
  const [highlightedBatch, setHighlightedBatch] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogBatch, setDialogBatch] = useState(null);
  const [scanValue, setScanValue] = useState("");

  const handleConfirm = () => {
    // For demo, use the highlighted batch or the first batch
    const batch = batches.find((b) => b.id === highlightedBatch) || batches[0];
    // Set Picked At to now
    setBatches((prev) =>
      prev.map((b) =>
        b.id === batch.id ? { ...b, pickedAt: getRandomTimeToday() } : b
      )
    );
    setDialogBatch(batch);
    setShowDialog(true);
    setScanValue("");
  };

  const handleDismissDialog = () => {
    setShowDialog(false);
    if (dialogBatch) {
      setBatches((prev) =>
        prev.map((batch) =>
          batch.id === dialogBatch.id
            ? { ...batch, status: "Weight Check" }
            : batch
        )
      );
      setDialogBatch(null); // Clear dialogBatch to force re-render
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 pb-20">
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
                  Picked At
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
                    {batch.status === "Ready to Pick" && (
                      <span className="text-blue-600 font-semibold">
                        Ready to Pick
                      </span>
                    )}
                    {batch.status === "Weight Check" && (
                      <span className="text-purple-600 font-semibold">
                        Weight Check
                      </span>
                    )}
                    {batch.status !== "Ready to Pick" &&
                      batch.status !== "Weight Check" && (
                        <span className="text-yellow-600 font-semibold">
                          {batch.status}
                        </span>
                      )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {batch.location}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {batch.storedAt}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {batch.pickedAt || "-"}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {batch.storedBy}
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
          <div className="w-full mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scan Box:
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Scan or enter barcode..."
              value={scanValue}
              onChange={(e) => setScanValue(e.target.value)}
              autoFocus
            />
            <button
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      {/* Dialog for batch details */}
      {showDialog && dialogBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col items-center relative">
            <div className="text-lg font-semibold text-gray-800 mb-4">
              Batch Details
            </div>
            <div className="w-full text-sm text-gray-700 space-y-2 mb-4">
              <div>
                <span className="font-medium">Batch number:</span>{" "}
                {dialogBatch.id}
              </div>
              <div>
                <span className="font-medium">Destination:</span>{" "}
                {dialogBatch.destination}
              </div>
              <div>
                <span className="font-medium">Product:</span>{" "}
                {dialogBatch.product}
              </div>
              <div>
                <span className="font-medium">Batch type:</span>{" "}
                {dialogBatch.batchType}
              </div>
            </div>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleDismissDialog}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrescentUnionBankPickingPage;
