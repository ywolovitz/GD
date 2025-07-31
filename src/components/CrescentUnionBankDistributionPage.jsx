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

const demoBatches = Array.from({ length: 3 }).map((_, i) => ({
  id: `2025-06-01-CRESCENT-UNION-BANK-00${i + 1}`,
  cardCount: 300,
  status: "Weight Check",
  location: sequentialLocations[i],
  storedAt: getRandomTimeToday(),
  pickedAt: getRandomTimeToday(),
  storedBy: getRandomName(),
  product: "45678",
  batchType: "Bank Card",
  destination: "Braamfontein: Jorisson Street",
}));

const CrescentUnionBankDistributionPage = ({ isAlternateFlow }) => {
  const [deliveryNote, setDeliveryNote] = useState("");
  const [deliveryNoteScanned, setDeliveryNoteScanned] = useState(false);
  const [batches] = useState(demoBatches);
  const [weighValue, setWeighValue] = useState("");
  const [showError, setShowError] = useState(false);
  const [step, setStep] = useState("scanNote"); // scanNote, showBatches, weigh

  const handleScanNote = () => {
    if (deliveryNote.trim()) {
      setDeliveryNoteScanned(true);
      setStep("showBatches");
    }
  };

  const handleContinueToWeigh = () => {
    setStep("weigh");
  };

  const handleWeighConfirm = () => {
    if (isAlternateFlow) {
      setShowError(true);
      return;
    }
    // For demo, just reset to scan note
    setStep("scanNote");
    setDeliveryNote("");
    setDeliveryNoteScanned(false);
    setWeighValue("");
  };

  const handleDismissError = () => {
    setShowError(false);
    setTimeout(() => {
      setWeighValue("");
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 pb-20">
      {/* Error Dialog for alternative flow */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col items-center relative">
            <div className="text-lg font-semibold text-red-600 mb-2">
              Unexpected Weight detected. Please check batch
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleDismissError}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      <div
        className={`w-full ${
          step === "showBatches" ? "max-w-3xl" : "max-w-xl"
        } bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center min-h-[300px] mt-12`}
      >
        {step === "scanNote" && (
          <div className="w-full mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scan Delivery Note:
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter or scan delivery note number..."
              value={deliveryNote}
              onChange={(e) => setDeliveryNote(e.target.value)}
              autoFocus
            />
            <button
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleScanNote}
            >
              Confirm
            </button>
          </div>
        )}
        {step === "showBatches" && (
          <>
            <div className="w-full mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Batches in Delivery Note
              </h3>
              <div>
                <table className="w-full divide-y divide-gray-200 mb-4">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[160px]">
                        Batch ID
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                        Cards
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                        Location
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                        Product
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                        Card Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {batches.map((batch) => (
                      <tr key={batch.id}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {batch.id}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {batch.cardCount}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {batch.location}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {batch.product}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {batch.batchType}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={handleContinueToWeigh}
                >
                  Continue to Weigh
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={() => {
                    setStep("scanNote");
                    setDeliveryNote("");
                    setDeliveryNoteScanned(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
        {step === "weigh" && (
          <div className="w-full mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weigh box for delivery note:{" "}
              <span className="font-semibold">{deliveryNote}</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter or scan weight..."
              value={weighValue}
              onChange={(e) => setWeighValue(e.target.value)}
              autoFocus
            />
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handleWeighConfirm}
              >
                Confirm
              </button>
              <button
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() => {
                  setStep("scanNote");
                  setDeliveryNote("");
                  setDeliveryNoteScanned(false);
                  setWeighValue("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrescentUnionBankDistributionPage;
