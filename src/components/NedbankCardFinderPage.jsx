import React, { useState } from "react";
import MainNavigationLayout from "./MainNavigationLayout";
import {
  MagnifyingGlassIcon,
  TrashIcon,
  PrinterIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const NedbankCardFinderPage = ({ onNavigate }) => {
  const [workOrderNumber, setWorkOrderNumber] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [lastFourDigits, setLastFourDigits] = useState("");
  const [foundCards, setFoundCards] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleWorkOrderScan = (e) => {
    if (e.key === "Enter" && workOrderNumber.trim()) {
      showToastMessage("Work order scanned successfully!", "success");
    }
  };

  const handleBranchCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setBranchCode(value);
  };

  const handleLastFourDigitsChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setLastFourDigits(value);
  };

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleFindCard = () => {
    if (!workOrderNumber.trim()) {
      showToastMessage("Please scan a work order number first!", "error");
      return;
    }
    if (!branchCode || branchCode.length !== 4) {
      showToastMessage("Please enter a valid 4-digit branch code!", "error");
      return;
    }
    if (!lastFourDigits || lastFourDigits.length !== 4) {
      showToastMessage("Please enter a valid 4-digit PAN!", "error");
      return;
    }

    // Simulate finding cards
    const mockFoundCards = [
      {
        id: "CARD001",
        pan: `****${lastFourDigits}`,
        branchCode: branchCode,
        workOrder: workOrderNumber,
        status: "Active",
        cardType: "Debit",
        foundAt: new Date().toLocaleString(),
      },
      {
        id: "CARD002",
        pan: `****${lastFourDigits}`,
        branchCode: branchCode,
        workOrder: workOrderNumber,
        status: "Active",
        cardType: "Credit",
        foundAt: new Date().toLocaleString(),
      },
      {
        id: "CARD003",
        pan: `****${lastFourDigits}`,
        branchCode: branchCode,
        workOrder: workOrderNumber,
        status: "Inactive",
        cardType: "Debit",
        foundAt: new Date().toLocaleString(),
      },
    ];

    setFoundCards(mockFoundCards);
    showToastMessage(
      `Found ${mockFoundCards.length} matching cards!`,
      "success"
    );
  };

  const handleClearDetails = () => {
    setWorkOrderNumber("");
    setBranchCode("");
    setLastFourDigits("");
    showToastMessage("Details cleared!", "success");
  };

  const handlePrintReport = () => {
    if (foundCards.length === 0) {
      showToastMessage("No cards to print report!", "error");
      return;
    }
    showToastMessage("Report printed successfully!", "success");
  };

  const handleClearList = () => {
    setFoundCards([]);
    showToastMessage("Card list cleared!", "success");
  };

  const getToastIcon = () => {
    switch (toastType) {
      case "success":
        return <CheckCircleIcon className="h-5 w-5 text-green-400" />;
      case "warning":
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />;
      case "error":
        return <XMarkIcon className="h-5 w-5 text-red-400" />;
      default:
        return <CheckCircleIcon className="h-5 w-5 text-green-400" />;
    }
  };

  const getToastStyles = () => {
    switch (toastType) {
      case "success":
        return "bg-green-50 border-green-400 text-green-800";
      case "warning":
        return "bg-yellow-50 border-yellow-400 text-yellow-800";
      case "error":
        return "bg-red-50 border-red-400 text-red-800";
      default:
        return "bg-green-50 border-green-400 text-green-800";
    }
  };

  return (
    <MainNavigationLayout onNavigate={onNavigate}>
      <div className="p-8">
        <div className="w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Nedbank Non-mailer Card Finder
            </h1>
            <p className="mt-2 text-gray-600">
              Search for cards by work order, branch code, and PAN
            </p>
          </div>

          {/* Toast Notification */}
          {showToast && (
            <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
              <div
                className={`border-l-4 p-4 rounded-md shadow-lg ${getToastStyles()}`}
              >
                <div className="flex items-center">
                  {getToastIcon()}
                  <div className="ml-3">
                    <p className="text-sm font-medium">{toastMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Input Fields */}
            <div className="space-y-6">
              {/* Work Order Scan */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Scan Work Order Number
                </h2>
                <input
                  type="text"
                  value={workOrderNumber}
                  onChange={(e) => setWorkOrderNumber(e.target.value)}
                  onKeyDown={handleWorkOrderScan}
                  placeholder="Scan work order barcode..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoFocus
                />
              </div>

              {/* Branch Code Input */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Enter 4-Digit Branch Code
                </h2>
                <input
                  type="text"
                  value={branchCode}
                  onChange={handleBranchCodeChange}
                  placeholder="Enter 4-digit branch code..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  maxLength={4}
                />
              </div>

              {/* Last 4 Digits Input */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Enter Last 4 Digits of PAN
                </h2>
                <input
                  type="text"
                  value={lastFourDigits}
                  onChange={handleLastFourDigitsChange}
                  placeholder="Enter last 4 digits..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  maxLength={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Actions
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleFindCard}
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                    Find Card
                  </button>

                  <button
                    onClick={handleClearDetails}
                    className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Clear Details
                  </button>

                  <button
                    onClick={handlePrintReport}
                    className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <PrinterIcon className="h-4 w-4 mr-2" />
                    Print Report
                  </button>

                  <button
                    onClick={handleClearList}
                    className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <XMarkIcon className="h-4 w-4 mr-2" />
                    Clear List
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Found Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Found Cards ({foundCards.length})
              </h2>
              {foundCards.length === 0 ? (
                <div className="text-center py-12">
                  <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No cards found yet</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Enter search criteria and click "Find Card" to search
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-800 overflow-y-auto pr-2">
                  {foundCards.map((card, index) => (
                    <div
                      key={card.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 min-h-fit"
                    >
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Card ID:</span>
                          <span className="ml-2 font-medium">{card.id}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">PAN:</span>
                          <span className="ml-2 font-medium">{card.pan}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Branch Code:</span>
                          <span className="ml-2 font-medium">
                            {card.branchCode}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Work Order:</span>
                          <span className="ml-2 font-medium">
                            {card.workOrder}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <span
                            className={`ml-2 font-medium ${
                              card.status === "Active"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {card.status}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Card Type:</span>
                          <span className="ml-2 font-medium">
                            {card.cardType}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500">Found At:</span>
                          <span className="ml-2 font-medium">
                            {card.foundAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainNavigationLayout>
  );
};

export default NedbankCardFinderPage;
