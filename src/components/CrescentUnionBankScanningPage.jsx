import React, { useState, useRef } from "react";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const initialBatches = [
  {
    id: "2025-06-01-CRESCENT-UNION-BANK-001",
    cardCount: 300,
    status: "Pending",
  },
  {
    id: "2025-06-01-CRESCENT-UNION-BANK-002",
    cardCount: 300,
    status: "Pending",
  },
  {
    id: "2025-06-01-CRESCENT-UNION-BANK-003",
    cardCount: 300,
    status: "Pending",
  },
  {
    id: "2025-06-01-CRESCENT-UNION-BANK-004",
    cardCount: 300,
    status: "Pending",
  },
];

const batchDetails = {
  "2025-06-01-CRESCENT-UNION-BANK-001": {
    product: "45678",
    lastScan: "2024-03-20 09:26:11",
    lastScannedBy: "Tristan Jacobs",
  },
  // Add more batch details as needed
};

const CrescentUnionBankScanningPage = ({ isAlternateFlow }) => {
  const [batches, setBatches] = useState(initialBatches);
  const [scanStarted, setScanStarted] = useState(false);
  const [firstPan, setFirstPan] = useState("");
  const [lastPan, setLastPan] = useState("");
  const [step, setStep] = useState("first"); // 'first' or 'last'
  const [highlightedBatch, setHighlightedBatch] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const panInputRef = useRef(null);

  // Simulate batch assignment on PAN capture (for demo, always first batch)
  const handlePanCapture = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      if (step === "first") {
        if (isAlternateFlow) {
          setErrorMsg("PAN not first in batch");
          setShowError(true);
          return;
        }
        setFirstPan(e.target.value);
        setHighlightedBatch(batches[0].id); // highlight first batch for demo
        setShowDetails(true);
        setStep("last");
      } else if (step === "last") {
        if (isAlternateFlow) {
          setErrorMsg("PAN not last in batch");
          setShowError(true);
          return;
        }
        setLastPan(e.target.value);
        // Optionally, do something when last PAN is captured
      }
      e.target.value = "";
    }
  };

  const handleCompleteScan = () => {
    // Change the status of the first batch to 'Complete'
    setBatches((prev) =>
      prev.map((batch, idx) =>
        idx === 0 ? { ...batch, status: "Complete" } : batch
      )
    );
    setScanComplete(true);
  };

  const handleScanNewBatch = () => {
    setScanStarted(false);
    setFirstPan("");
    setLastPan("");
    setStep("first");
    setHighlightedBatch(null);
    setShowDetails(false);
    setScanComplete(false);
  };

  const handleDismissError = () => {
    setShowError(false);
    setTimeout(() => {
      if (panInputRef.current) {
        panInputRef.current.value = "";
        panInputRef.current.focus();
      }
    }, 100);
  };

  // Print handler
  const handlePrint = () => {
    const printContents = document.getElementById(
      "print-label-preview"
    ).innerHTML;
    const printWindow = window.open("", "", "width=600,height=400");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Batch Label</title>
          <style>
            body { font-family: sans-serif; padding: 2rem; }
            .barcode { margin: 2rem 0; text-align: center; }
            .batch-id { font-size: 1.5rem; font-weight: bold; text-align: center; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Error Dialog */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col items-center relative">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mb-2" />
            <div className="text-lg font-semibold text-gray-800 mb-2">
              {errorMsg}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center"
              onClick={handleDismissError}
            >
              <XMarkIcon className="h-5 w-5 mr-1" /> Dismiss
            </button>
          </div>
        </div>
      )}
      {/* Print Dialog */}
      {showPrintDialog && highlightedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm flex flex-col items-center relative">
            <div
              id="print-label-preview"
              className="w-full flex flex-col items-center"
            >
              {/* Simple SVG barcode placeholder */}
              <svg
                className="barcode"
                width="200"
                height="60"
                viewBox="0 0 200 60"
              >
                <rect x="10" y="10" width="8" height="40" fill="#222" />
                <rect x="22" y="10" width="4" height="40" fill="#222" />
                <rect x="30" y="10" width="12" height="40" fill="#222" />
                <rect x="46" y="10" width="4" height="40" fill="#222" />
                <rect x="54" y="10" width="8" height="40" fill="#222" />
                <rect x="66" y="10" width="4" height="40" fill="#222" />
                <rect x="74" y="10" width="16" height="40" fill="#222" />
                <rect x="94" y="10" width="4" height="40" fill="#222" />
                <rect x="102" y="10" width="8" height="40" fill="#222" />
                <rect x="114" y="10" width="4" height="40" fill="#222" />
                <rect x="122" y="10" width="12" height="40" fill="#222" />
                <rect x="138" y="10" width="4" height="40" fill="#222" />
                <rect x="146" y="10" width="8" height="40" fill="#222" />
                <rect x="158" y="10" width="4" height="40" fill="#222" />
                <rect x="166" y="10" width="16" height="40" fill="#222" />
              </svg>
              <div className="batch-id mt-4">{highlightedBatch}</div>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handlePrint}
              >
                Print
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() => setShowPrintDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Sidebar with batches */}
      <div className="w-96 bg-white rounded-lg shadow-sm m-6 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Batches</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[50%]">
                  Batch ID
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]">
                  Cards
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[30%]">
                  Status
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
                >
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    {batch.id}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {batch.cardCount}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                    {batch.status === "Complete" ? (
                      <span className="text-green-600 font-semibold">
                        Complete
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center pt-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
          {/* PAN capture at the top */}
          {!scanStarted ? (
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
              onClick={() => setScanStarted(true)}
            >
              Start Scan
            </button>
          ) : !scanComplete ? (
            <div className="w-full mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {step === "first" ? "Scan first PAN:" : "Scan last PAN:"}
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder={
                  step === "first"
                    ? "Scan or enter first PAN..."
                    : "Scan or enter last PAN..."
                }
                onKeyDown={handlePanCapture}
                autoFocus
                ref={panInputRef}
              />
            </div>
          ) : null}
          {/* Batch details below PAN capture */}
          {showDetails && highlightedBatch && (
            <>
              <div className="w-full bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-4">
                <div className="font-semibold text-blue-900 mb-2">
                  Batch: {highlightedBatch}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Total Cards:</span>{" "}
                    {batches.find((b) => b.id === highlightedBatch)?.cardCount}
                  </div>
                  <div>
                    <span className="text-gray-500">Product:</span>{" "}
                    {batchDetails[highlightedBatch]?.product ?? "45678"}
                  </div>
                  <div>
                    <span className="text-gray-500">Last Scan:</span>{" "}
                    {batchDetails[highlightedBatch]?.lastScan ?? "-"}
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Last Scanned By:</span>{" "}
                    {batchDetails[highlightedBatch]?.lastScannedBy ?? "-"}
                  </div>
                </div>
              </div>
              {!scanComplete && lastPan && (
                <button
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-md text-lg font-semibold shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition mt-2"
                  onClick={handleCompleteScan}
                >
                  Complete Scan
                </button>
              )}
              {scanComplete && (
                <div className="w-full flex flex-col gap-3 mt-2">
                  <button
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    onClick={handleScanNewBatch}
                  >
                    Scan new batch
                  </button>
                  <button
                    className="w-full px-6 py-3 bg-gray-700 text-white rounded-md text-lg font-semibold shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                    onClick={() => setShowPrintDialog(true)}
                  >
                    Print Batch Labels
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrescentUnionBankScanningPage;
