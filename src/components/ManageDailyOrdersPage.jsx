import React, { useState } from "react";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import MainNavigationLayout from "./MainNavigationLayout";

const ManageDailyOrdersPage = ({ onNavigate }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [branchOrderNumber, setBranchOrderNumber] = useState("");
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [scannedNumbers, setScannedNumbers] = useState([]);
  const [scanInput, setScanInput] = useState("");
  const [showScanPrompt, setShowScanPrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  // Mock order summary data
  const [orderSummary, setOrderSummary] = useState({
    productCode: "400123",
    ordered: 100,
    dispatched: 0,
    binned: 0,
    outstanding: 100,
  });

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowOrderSummary(false);
    setBranchOrderNumber("");
    setScannedNumbers([]);
  };

  const handleBranchOrderSubmit = (e) => {
    e.preventDefault();
    if (branchOrderNumber.trim()) {
      setShowOrderSummary(true);
    }
  };

  const handleBack = () => {
    setSelectedOption("");
    setBranchOrderNumber("");
    setShowOrderSummary(false);
    setScannedNumbers([]);
    setScanInput("");
  };

  const handleScanNumber = (scannedNumber) => {
    if (scannedNumber.trim()) {
      const trimmedNumber = scannedNumber.trim();

      // Check for duplicates
      const isDuplicate = scannedNumbers.some(
        (item) => item.number === trimmedNumber
      );

      if (isDuplicate) {
        setErrorMessage(
          `Number ${trimmedNumber} has already been scanned. Please scan a different number.`
        );
        setShowError(true);
        setScanInput("");
        // Auto-hide error after 5 seconds
        setTimeout(() => {
          setShowError(false);
          setErrorMessage("");
        }, 5000);
        return;
      }

      const newScannedItem = {
        id: Date.now(),
        number: trimmedNumber,
        timestamp: new Date().toLocaleString(),
        scannedBy: "Current User", // This would be the logged-in user
      };
      setScannedNumbers([...scannedNumbers, newScannedItem]);

      // Update order summary - decrement outstanding and increment binned by 25
      setOrderSummary((prev) => ({
        ...prev,
        outstanding: prev.outstanding - 25,
        binned: prev.binned + 25,
      }));

      setScanInput("");
      setShowScanPrompt(false);
    }
  };

  const handleRemoveScannedNumber = (idToRemove) => {
    if (
      window.confirm("Are you sure you want to remove this scanned number?")
    ) {
      setScannedNumbers(
        scannedNumbers.filter((item) => item.id !== idToRemove)
      );

      // Update order summary - increment outstanding and decrement binned by 25
      setOrderSummary((prev) => ({
        ...prev,
        outstanding: prev.outstanding + 25,
        binned: prev.binned - 25,
      }));
    }
  };

  const handleRemoveAllScanned = () => {
    if (
      window.confirm(
        `Are you sure you want to remove ALL ${scannedNumbers.length} scanned numbers? This action cannot be undone.`
      )
    ) {
      setScannedNumbers([]);

      // Reset order summary - add back all binned items to outstanding
      setOrderSummary((prev) => ({
        ...prev,
        outstanding: prev.outstanding + prev.binned,
        binned: 0,
      }));
    }
  };

  return (
    <MainNavigationLayout onNavigate={onNavigate}>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Daily Orders
            </h1>
            <p className="mt-2 text-gray-600">
              Select an option to manage daily orders.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            {!selectedOption ? (
              // Initial selection screen
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Select an option to manage daily orders
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    onClick={() => handleOptionSelect("create")}
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Create New Bin
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Create a new bin for daily orders
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleOptionSelect("open")}
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Open Existing Bin
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Open and manage an existing daily orders bin
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            ) : selectedOption === "create" ? (
              // Create new bin screen
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-6">
                    <button
                      onClick={handleBack}
                      className="mr-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    >
                      <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                    <h2 className="text-lg font-medium text-gray-900">
                      Create New Bin
                    </h2>
                  </div>

                  {!showOrderSummary ? (
                    // Branch Order Number Input
                    <div>
                      <h3 className="text-md font-medium text-gray-700 mb-4">
                        Enter Branch Order Number:
                      </h3>
                      <form
                        onSubmit={handleBranchOrderSubmit}
                        className="max-w-md"
                      >
                        <div className="mb-4">
                          <label
                            htmlFor="branch-order"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Branch Order Number:
                          </label>
                          <input
                            type="text"
                            id="branch-order"
                            value={branchOrderNumber}
                            onChange={(e) =>
                              setBranchOrderNumber(e.target.value)
                            }
                            placeholder="Enter branch order number..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                          Load Order
                        </button>
                      </form>
                    </div>
                  ) : (
                    // Order Summary and Scanning Interface
                    <div>
                      {/* Order Summary */}
                      <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg
                                  className="w-5 h-5 text-gray-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-lg font-medium text-gray-900">
                                Order Summary
                              </h3>
                              <p className="text-sm text-gray-500">
                                Branch Order: {branchOrderNumber}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="px-6 py-4">
                          <div className="grid grid-cols-5 gap-4">
                            <div className="text-center">
                              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                Product
                              </div>
                              <div className="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                {orderSummary.productCode}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                Ordered
                              </div>
                              <div className="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                {orderSummary.ordered}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                Dispatched
                              </div>
                              <div className="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                {orderSummary.dispatched}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                Binned
                              </div>
                              <div className="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                {orderSummary.binned}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                Outstanding
                              </div>
                              <div className="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                {orderSummary.outstanding}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Scan Box */}
                      <div className="mb-6">
                        <h3 className="text-md font-medium text-gray-700 mb-4">
                          Scan Numbers:
                        </h3>
                        <div className="flex space-x-3">
                          <input
                            type="text"
                            value={scanInput}
                            onChange={(e) => setScanInput(e.target.value)}
                            placeholder="Scan or enter number..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleScanNumber(scanInput);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleScanNumber(scanInput)}
                            className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                          >
                            Add
                          </button>
                        </div>

                        {/* Error Message */}
                        {showError && (
                          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <svg
                                  className="h-5 w-5 text-red-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <p className="text-sm text-red-800">
                                  {errorMessage}
                                </p>
                              </div>
                              <div className="ml-auto pl-3">
                                <div className="-mx-1.5 -my-1.5">
                                  <button
                                    onClick={() => {
                                      setShowError(false);
                                      setErrorMessage("");
                                    }}
                                    className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                                  >
                                    <span className="sr-only">Dismiss</span>
                                    <svg
                                      className="h-5 w-5"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Scanned Numbers Table */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            Scanned Numbers ({scannedNumbers.length})
                          </h3>
                          {scannedNumbers.length > 0 && (
                            <div className="flex space-x-3">
                              <button
                                onClick={handleRemoveAllScanned}
                                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                              >
                                Remove All
                              </button>
                              <button
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to seal this bin? This action cannot be undone."
                                    )
                                  ) {
                                    alert("Bin has been sealed successfully.");
                                    // In a real implementation, this would make an API call to seal the bin
                                  }
                                }}
                                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                              >
                                Seal Bin
                              </button>
                              <button
                                onClick={() => {
                                  // In a real implementation, this would generate and print a manifest
                                  const manifestData = {
                                    branchOrder: branchOrderNumber,
                                    productCode: orderSummary.productCode,
                                    scannedCount: scannedNumbers.length,
                                    scannedItems: scannedNumbers,
                                    timestamp: new Date().toLocaleString(),
                                  };
                                  console.log(
                                    "Printing manifest:",
                                    manifestData
                                  );
                                  alert("Manifest has been sent to printer.");
                                }}
                                className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                              >
                                Print Manifest
                              </button>
                            </div>
                          )}
                        </div>

                        {scannedNumbers.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Number
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Time Scanned
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Scanned By
                                  </th>
                                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {scannedNumbers.map((item) => (
                                  <tr
                                    key={item.id}
                                    className="hover:bg-gray-50 transition-colors"
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {item.number}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {item.timestamp}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {item.scannedBy}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                      <button
                                        onClick={() =>
                                          handleRemoveScannedNumber(item.id)
                                        }
                                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        title="Remove scanned number"
                                      >
                                        <TrashIcon className="h-4 w-4" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            No numbers scanned yet. Start scanning to see them
                            here.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Open existing bin screen
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <button
                    onClick={handleBack}
                    className="mr-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                  </button>
                  <h2 className="text-lg font-medium text-gray-900">
                    Open Existing Bin
                  </h2>
                </div>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Open Existing Bin Functionality
                  </h3>
                  <p className="text-gray-500">
                    This feature will allow you to open and manage existing
                    daily orders bins. Implementation coming soon.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainNavigationLayout>
  );
};

export default ManageDailyOrdersPage;
