import React, { useState } from "react";
import MainNavigationLayout from "./MainNavigationLayout";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  TruckIcon,
  XMarkIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

const DispatchPage = ({ onNavigate }) => {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedCourier, setSelectedCourier] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [readyBins, setReadyBins] = useState([]);
  const [showDispatchConfirmation, setShowDispatchConfirmation] =
    useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showReprintConfirmation, setShowReprintConfirmation] = useState(false);
  const [selectedBinForReprint, setSelectedBinForReprint] = useState(null);

  const clients = [
    "Capitec Bank",
    "Crescent Union Bank",
    "Standard Bank",
    "Nedbank",
    "First National Bank",
    "ABSA Bank",
  ];

  const couriers = ["CCD", "DSV", "FedEx", "DHL"];

  // Mock data for bins ready for dispatch
  const mockReadyBinsData = [
    {
      binId: "000022599",
      workTicket: "AT11805062103D",
      workOrderId: "14106",
      fileId: "28884",
      status: "Verified",
      binType: "UTI NED",
      dateVerified: "2024-01-15 14:30:00",
      verifiedBy: "John Smith",
      dateDispatched: null,
      dispatchedBy: null,
    },
    {
      binId: "000022600",
      workTicket: "AT11805062104E",
      workOrderId: "14106",
      fileId: "28885",
      status: "Verified",
      binType: "UTI NED",
      dateVerified: "2024-01-15 15:45:00",
      verifiedBy: "John Smith",
      dateDispatched: null,
      dispatchedBy: null,
    },
    {
      binId: "000022601",
      workTicket: "AT11805062105F",
      workOrderId: "14107",
      fileId: "28886",
      status: "Verified",
      binType: "UTI NED",
      dateVerified: "2024-01-15 16:20:00",
      verifiedBy: "John Smith",
      dateDispatched: null,
      dispatchedBy: null,
    },
    {
      binId: "000022602",
      workTicket: "AT11805062106G",
      workOrderId: "14107",
      fileId: "28887",
      status: "Verified",
      binType: "UTI NED",
      dateVerified: "2024-01-15 17:10:00",
      verifiedBy: "John Smith",
      dateDispatched: null,
      dispatchedBy: null,
    },
  ];

  const handleSearch = () => {
    if (selectedClient && selectedCourier) {
      setShowResults(true);
      setReadyBins([...mockReadyBinsData]); // Initialize with mock data
    }
  };

  const handleReset = () => {
    setSelectedClient("");
    setSelectedCourier("");
    setShowResults(false);
    setReadyBins([]);
    setShowDispatchConfirmation(false);
    setShowReprintConfirmation(false);
    setUsername("");
    setPassword("");
    setSelectedBinForReprint(null);
    setShowError(false);
  };

  const isSearchEnabled = selectedClient && selectedCourier;

  const handleDispatch = () => {
    setShowDispatchConfirmation(true);
  };

  const handleConfirmDispatch = () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please enter both username and password!");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // In a real application, you would validate credentials here
    // For demo purposes, we'll accept any non-empty values
    const currentTime = new Date().toLocaleString();

    setReadyBins((prev) =>
      prev.map((bin) => ({
        ...bin,
        status: "Dispatched",
        dateDispatched: currentTime,
        dispatchedBy: "Dispatch User",
      }))
    );

    // Reset confirmation state
    setShowDispatchConfirmation(false);
    setUsername("");
    setPassword("");
    setShowError(false);
  };

  const handleCancelDispatch = () => {
    setShowDispatchConfirmation(false);
    setUsername("");
    setPassword("");
    setShowError(false);
  };

  const handleReprint = (bin) => {
    setSelectedBinForReprint(bin);
    setShowReprintConfirmation(true);
  };

  const handleConfirmReprint = () => {
    // In a real application, this would trigger the printing process
    console.log(`Reprinting dispatch for bin: ${selectedBinForReprint.binId}`);

    // Close the confirmation modal
    setShowReprintConfirmation(false);
    setSelectedBinForReprint(null);
  };

  const handleCancelReprint = () => {
    setShowReprintConfirmation(false);
    setSelectedBinForReprint(null);
  };

  return (
    <MainNavigationLayout onNavigate={onNavigate}>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dispatch</h1>
            <p className="mt-2 text-gray-600">
              Select criteria to view bins ready for dispatch
            </p>
          </div>

          {/* Selection Criteria */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Selection Criteria
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Client Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client
                </label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a client...</option>
                  {clients.map((client) => (
                    <option key={client} value={client}>
                      {client}
                    </option>
                  ))}
                </select>
              </div>

              {/* Courier Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Courier
                </label>
                <select
                  value={selectedCourier}
                  onChange={(e) => setSelectedCourier(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a courier...</option>
                  {couriers.map((courier) => (
                    <option key={courier} value={courier}>
                      {courier}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSearch}
                disabled={!isSearchEnabled}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                Search
              </button>
              <button
                onClick={handleReset}
                className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results Section */}
          {showResults && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Ready for Dispatch
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {readyBins.length} bins found for {selectedClient} -{" "}
                      {selectedCourier}
                    </p>
                  </div>
                  <button
                    onClick={handleDispatch}
                    disabled={readyBins.length === 0}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <TruckIcon className="h-5 w-5 mr-2" />
                    Dispatch
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bin ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Work Ticket / File Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Work Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bin Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Verified
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Verified By
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Dispatched
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dispatched By
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {readyBins.map((bin, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {bin.binId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {bin.workTicket}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {bin.workOrderId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {bin.fileId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              bin.status === "Dispatched"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {bin.status === "Dispatched" ? (
                              <TruckIcon className="h-3 w-3 mr-1" />
                            ) : (
                              <CheckCircleIcon className="h-3 w-3 mr-1" />
                            )}
                            {bin.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {bin.binType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {bin.dateVerified}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {bin.verifiedBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {bin.dateDispatched || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {bin.dispatchedBy || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button
                            onClick={() => handleReprint(bin)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Reprint dispatch"
                          >
                            <PrinterIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Dispatch Confirmation Modal */}
          {showDispatchConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Dispatch Confirmation
                  </h3>
                  <button
                    onClick={handleCancelDispatch}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Please enter your credentials to confirm dispatch of{" "}
                      {readyBins.length} bins.
                    </p>
                    {showError && (
                      <div className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">
                        {errorMessage}
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200">
                  <button
                    onClick={handleCancelDispatch}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDispatch}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <TruckIcon className="h-4 w-4 mr-2" />
                    Confirm Dispatch
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reprint Confirmation Modal */}
          {showReprintConfirmation && selectedBinForReprint && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Reprint Dispatch
                  </h3>
                  <button
                    onClick={handleCancelReprint}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Reprint dispatch for bin{" "}
                      <strong>{selectedBinForReprint.binId}</strong>?
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>
                          <strong>Work Ticket:</strong>{" "}
                          {selectedBinForReprint.workTicket}
                        </div>
                        <div>
                          <strong>Work Order ID:</strong>{" "}
                          {selectedBinForReprint.workOrderId}
                        </div>
                        <div>
                          <strong>File ID:</strong>{" "}
                          {selectedBinForReprint.fileId}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200">
                  <button
                    onClick={handleCancelReprint}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    No
                  </button>
                  <button
                    onClick={handleConfirmReprint}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <PrinterIcon className="h-4 w-4 mr-2" />
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainNavigationLayout>
  );
};

export default DispatchPage;
