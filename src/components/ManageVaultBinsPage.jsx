import React, { useState } from "react";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import MainNavigationLayout from "./MainNavigationLayout";

const ManageVaultBinsPage = ({ onNavigate }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedBin, setSelectedBin] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [binSearchTerm, setBinSearchTerm] = useState("");
  const [showScanPrompt, setShowScanPrompt] = useState(false);

  // Mock data for existing bins
  const existingBins = [
    { id: "BIN001", name: "Vault Bin 001", location: "A1-01" },
    { id: "BIN002", name: "Vault Bin 002", location: "A1-02" },
    { id: "BIN003", name: "Vault Bin 003", location: "A1-03" },
    { id: "BIN004", name: "Vault Bin 004", location: "A2-01" },
    { id: "BIN005", name: "Vault Bin 005", location: "A2-02" },
  ];

  // Mock data for PANs in a bin
  const panData = [
    {
      pan: "4111111111111111",
      productCode: "VISA-CLASSIC",
      dateScanned: "2024-01-15 09:30:22",
      scannedBy: "John Smith",
    },
    {
      pan: "5555555555554444",
      productCode: "MASTERCARD-GOLD",
      dateScanned: "2024-01-15 10:15:45",
      scannedBy: "Jane Doe",
    },
    {
      pan: "378282246310005",
      productCode: "AMEX-PLATINUM",
      dateScanned: "2024-01-15 11:20:33",
      scannedBy: "Mike Johnson",
    },
    {
      pan: "6011111111111117",
      productCode: "DISCOVER-CASHBACK",
      dateScanned: "2024-01-15 12:05:18",
      scannedBy: "Sarah Wilson",
    },
    {
      pan: "3530111333300000",
      productCode: "JCB-STANDARD",
      dateScanned: "2024-01-15 13:45:52",
      scannedBy: "David Brown",
    },
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowTable(false);
    setSelectedBin("");
  };

  const handleBinSelect = (binId) => {
    setSelectedBin(binId);
    setShowTable(true);
  };

  const handleBack = () => {
    setSelectedOption("");
    setSelectedBin("");
    setShowTable(false);
    setBinSearchTerm("");
  };

  const handleRemovePan = (panToRemove) => {
    // In a real application, this would make an API call to remove the PAN
    // For now, we'll just show an alert
    if (
      window.confirm(
        `Are you sure you want to remove PAN ${panToRemove.pan} from this bin?`
      )
    ) {
      alert(`PAN ${panToRemove.pan} has been removed from the bin.`);
      // In a real implementation, you would update the panData state here
    }
  };

  const handleRemoveAllPans = () => {
    if (
      window.confirm(
        `Are you sure you want to remove ALL ${panData.length} PANs from bin ${selectedBin}? This action cannot be undone.`
      )
    ) {
      alert(
        `All ${panData.length} PANs have been removed from bin ${selectedBin}.`
      );
      // In a real implementation, you would update the panData state here
    }
  };

  const handleAddToBundle = () => {
    setShowScanPrompt(true);
  };

  const handleScanCard = (scannedPan) => {
    // In a real application, this would validate the PAN and make an API call
    const newPan = {
      pan: scannedPan,
      productCode: "SCANNED-CARD", // This would be determined by the card type
      dateScanned: new Date().toLocaleString(),
      scannedBy: "Current User", // This would be the logged-in user
    };

    // In a real implementation, you would add this to the panData state
    alert(`Card ${scannedPan} has been added to bin ${selectedBin}.`);
    setShowScanPrompt(false);
  };

  // Filter bins based on search term
  const filteredBins = existingBins.filter(
    (bin) =>
      bin.id.toLowerCase().includes(binSearchTerm.toLowerCase()) ||
      bin.name.toLowerCase().includes(binSearchTerm.toLowerCase()) ||
      bin.location.toLowerCase().includes(binSearchTerm.toLowerCase())
  );

  return (
    <MainNavigationLayout onNavigate={onNavigate}>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Vault Bins
            </h1>
            <p className="mt-2 text-gray-600">
              Select an option to manage vault bins.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            {!selectedOption ? (
              // Initial selection screen
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Select an option to manage vault bins
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    onClick={() => handleOptionSelect("open")}
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
                          View and manage cards in an existing vault bin
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleOptionSelect("repack")}
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
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Repack Bundles into New Bin
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Create a new bin and repack bundles
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            ) : selectedOption === "open" ? (
              // Open existing bin screen
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
                      Open Existing Bin
                    </h2>
                  </div>

                  {!showTable ? (
                    <div>
                      <h3 className="text-md font-medium text-gray-700 mb-4">
                        Select a bin to open:
                      </h3>

                      {/* Search Box */}
                      <div className="mb-6">
                        <label
                          htmlFor="bin-search"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Scan Bin:
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="bin-search"
                            value={binSearchTerm}
                            onChange={(e) => setBinSearchTerm(e.target.value)}
                            placeholder="Enter bin ID, name, or location..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          {binSearchTerm && (
                            <button
                              onClick={() => setBinSearchTerm("")}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredBins.map((bin) => (
                          <button
                            key={bin.id}
                            onClick={() => handleBinSelect(bin.id)}
                            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                          >
                            <div className="font-medium text-gray-900">
                              {bin.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {bin.id}
                            </div>
                            <div className="text-sm text-gray-500">
                              Location: {bin.location}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Show PAN table
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Bin: {selectedBin}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Total PANs: {panData.length}
                          </p>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={handleAddToBundle}
                            className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                          >
                            Add to Bundle
                          </button>
                          <button
                            onClick={handleRemoveAllPans}
                            className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                          >
                            Remove All
                          </button>
                          <button
                            onClick={() => setShowTable(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                          >
                            Select Different Bin
                          </button>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                PAN
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product Code
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date Scanned
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
                            {panData.map((pan, index) => (
                              <tr
                                key={index}
                                className="hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {pan.pan}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {pan.productCode}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {pan.dateScanned}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {pan.scannedBy}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                  <button
                                    onClick={() => handleRemovePan(pan)}
                                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                    title="Remove PAN from bin"
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Scan Prompt Modal */}
                      {showScanPrompt && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3 text-center">
                              <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Scan Card
                              </h3>
                              <p className="text-sm text-gray-500 mb-4">
                                Please scan the card you want to add to this
                                bin.
                              </p>
                              <div className="mb-4">
                                <input
                                  type="text"
                                  placeholder="Enter card number or scan barcode..."
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                  autoFocus
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      const value = e.target.value.trim();
                                      if (value) {
                                        handleScanCard(value);
                                      }
                                    }
                                  }}
                                />
                              </div>
                              <div className="flex space-x-3">
                                <button
                                  onClick={() => setShowScanPrompt(false)}
                                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => {
                                    const input = document.querySelector(
                                      'input[placeholder*="Enter card number"]'
                                    );
                                    if (input && input.value.trim()) {
                                      handleScanCard(input.value.trim());
                                    }
                                  }}
                                  className="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                                >
                                  Add Card
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Repack bundles screen
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <button
                    onClick={handleBack}
                    className="mr-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                  </button>
                  <h2 className="text-lg font-medium text-gray-900">
                    Repack Bundles into New Bin
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
                    Repack Functionality
                  </h3>
                  <p className="text-gray-500">
                    This feature will allow you to create a new bin and repack
                    bundles into it. Implementation coming soon.
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

export default ManageVaultBinsPage;
