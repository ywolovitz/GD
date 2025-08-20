import React, { useState } from "react";
import MainNavigationLayout from "./MainNavigationLayout";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

const HandoverPage = ({ onNavigate }) => {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedCourier, setSelectedCourier] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [binScanInput, setBinScanInput] = useState("");
  const [handedOverBins, setHandedOverBins] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [availableBins, setAvailableBins] = useState([]);

  const clients = [
    "Capitec Bank",
    "Crescent Union Bank",
    "Standard Bank",
    "Nedbank",
    "First National Bank",
    "ABSA Bank",
  ];

  const couriers = ["CCD", "DSV", "FedEx", "DHL"];

  const types = ["Daily", "Renewal"];

  // Mock data for bins available for handover
  const mockBinsData = [
    {
      binId: "000022599",
      workTicket: "AT11805062103D",
      workOrderId: "14106",
      fileId: "28884",
      status: "All cards binned",
      binType: "UTI NED",
      urgent: "No",
    },
    {
      binId: "000022600",
      workTicket: "AT11805062104E",
      workOrderId: "14106",
      fileId: "28885",
      status: "All cards binned",
      binType: "UTI NED",
      urgent: "Yes",
    },
    {
      binId: "000022601",
      workTicket: "AT11805062105F",
      workOrderId: "14107",
      fileId: "28886",
      status: "All cards binned",
      binType: "UTI NED",
      urgent: "No",
    },
    {
      binId: "000022602",
      workTicket: "AT11805062106G",
      workOrderId: "14107",
      fileId: "28887",
      status: "All cards binned",
      binType: "UTI NED",
      urgent: "No",
    },
    {
      binId: "000022603",
      workTicket: "AT11805062107H",
      workOrderId: "14108",
      fileId: "28888",
      status: "All cards binned",
      binType: "UTI NED",
      urgent: "Yes",
    },
    {
      binId: "000022604",
      workTicket: "AT11805062108I",
      workOrderId: "14109",
      fileId: "28889",
      status: "All cards binned",
      binType: "UTI NED",
      urgent: "No",
    },
    {
      binId: "000022605",
      workTicket: "AT11805062109J",
      workOrderId: "14110",
      fileId: "28890",
      status: "All cards binned",
      binType: "UTI NED",
      urgent: "No",
    },
    {
      binId: "000022606",
      workTicket: "AT11805062110K",
      workOrderId: "14111",
      fileId: "28891",
      status: "All cards binned",
      binType: "UTI NED",
      urgent: "Yes",
    },
    {
      binId: "000022607",
      workTicket: "AT11805062111L",
      workOrderId: "14112",
      fileId: "28892",
      status: "All cards binned",
      binType: "UTI NED",
      urgent: "No",
    },
    {
      binId: "000022608",
      workTicket: "AT11805062112M",
      workOrderId: "14113",
      fileId: "28893",
      status: "All cards binned",
      binType: "UTI NED",
      urgent: "No",
    },
  ];

  const handleSearch = () => {
    if (selectedClient && selectedCourier && selectedType) {
      setShowResults(true);
      setAvailableBins([...mockBinsData]); // Initialize available bins with mock data
    }
  };

  const handleReset = () => {
    setSelectedClient("");
    setSelectedCourier("");
    setSelectedType("");
    setShowResults(false);
    setHandedOverBins([]);
    setAvailableBins([]);
    setBinScanInput("");
    setShowError(false);
  };

  const isSearchEnabled = selectedClient && selectedCourier && selectedType;

  const handleBinScan = (e) => {
    if (e.key === "Enter" && binScanInput.trim()) {
      const scannedBinId = binScanInput.trim();

      // Find the bin in the available bins
      const binIndex = availableBins.findIndex(
        (bin) => bin.binId === scannedBinId
      );

      if (binIndex !== -1) {
        // Check if bin is already handed over
        if (handedOverBins.some((bin) => bin.binId === scannedBinId)) {
          setErrorMessage("Bin already handed over!");
          setShowError(true);
          setTimeout(() => setShowError(false), 3000);
        } else {
          // Add to handed over bins
          const binToHandover = {
            ...availableBins[binIndex],
            status: "Handed Over",
          };
          setHandedOverBins((prev) => [...prev, binToHandover]);

          // Update the status in the main table
          setAvailableBins((prev) =>
            prev.map((bin) =>
              bin.binId === scannedBinId
                ? { ...bin, status: "Handed Over" }
                : bin
            )
          );

          setBinScanInput("");
          setShowError(false);
        }
      } else {
        setErrorMessage("Bin not found in available list!");
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    }
  };

  return (
    <MainNavigationLayout onNavigate={onNavigate}>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Handover</h1>
            <p className="mt-2 text-gray-600">
              Select criteria to view bins available for handover
            </p>
          </div>

          {/* Selection Criteria */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Select your option
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              {/* Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select type...</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
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

          {/* Results Table */}
          {showResults && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Table - Takes 3/4 of the space */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-md">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Bins Available for Handover
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {availableBins.length} bins found for {selectedClient} -{" "}
                      {selectedCourier} - {selectedType}
                    </p>
                  </div>

                  {/* Scan Bin Input */}
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        Scan Bin:
                      </label>
                      <input
                        type="text"
                        value={binScanInput}
                        onChange={(e) => setBinScanInput(e.target.value)}
                        onKeyDown={handleBinScan}
                        placeholder="Scan bin number..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {showError && (
                      <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">
                        {errorMessage}
                      </div>
                    )}
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
                            Urgent
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {availableBins.map((bin, index) => (
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
                                  bin.status === "Handed Over"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                <CheckCircleIcon className="h-3 w-3 mr-1" />
                                {bin.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {bin.binType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  bin.urgent === "Yes"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {bin.urgent === "Yes" && (
                                  <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                                )}
                                {bin.urgent}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Handed Over Bins - Takes 1/4 of the space */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md h-fit">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Handed Over Bins ({handedOverBins.length})
                    </h3>
                  </div>
                  <div className="p-4">
                    {handedOverBins.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">
                        No bins handed over yet
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {handedOverBins.map((bin, index) => (
                          <div
                            key={index}
                            className="p-3 bg-blue-50 rounded-md border border-blue-200"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-blue-900">
                                {bin.binId}
                              </span>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <CheckCircleIcon className="h-3 w-3 mr-1" />
                                Handed Over
                              </span>
                            </div>
                            <div className="text-xs text-blue-700 space-y-1">
                              <div>Work Order: {bin.workOrderId}</div>
                              <div>File: {bin.fileId}</div>
                              <div>Type: {bin.binType}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainNavigationLayout>
  );
};

export default HandoverPage;
