import React, { useState } from "react";
import MainNavigationLayout from "./MainNavigationLayout";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const DispatchVerificationPage = ({ onNavigate }) => {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedCourier, setSelectedCourier] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [batchScanInput, setBatchScanInput] = useState("");
  const [traceIdInput, setTraceIdInput] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [availableBins, setAvailableBins] = useState([]);
  const [verifiedBatches, setVerifiedBatches] = useState([]);
  const [rejectedBatches, setRejectedBatches] = useState([]);
  const [currentBatchId, setCurrentBatchId] = useState("");
  const [showBatchActions, setShowBatchActions] = useState(false);
  const [showRejectionReason, setShowRejectionReason] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  // Nedbank carrier verification state
  const [showCarrierVerification, setShowCarrierVerification] = useState(false);
  const [carrierList, setCarrierList] = useState([]); // { number, verified }
  const [carrierScanInput, setCarrierScanInput] = useState("");
  const [carrierScanError, setCarrierScanError] = useState("");

  // Courier login gating
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [verifiedUserName, setVerifiedUserName] = useState("");

  const clients = [
    "Capitec Bank",
    "Crescent Union Bank",
    "Standard Bank",
    "Nedbank",
    "First National Bank",
    "ABSA Bank",
    "Lesaka",
  ];

  const couriers = ["CCD", "DSV", "FedEx", "DHL"];

  // Mock data for bins available for dispatch verification
  const mockBinsData = [
    {
      binId: "000022599",
      binName: "UTI NED Daily",
      mailerQuantity: 150,
      dispatchStatus: "Pending Verification",
      batchId: "BATCH001",
      traceId: "",
      verifiedBy: "",
      verifiedAt: "",
    },
    {
      binId: "000022600",
      binName: "UTI NED Renewal",
      mailerQuantity: 200,
      dispatchStatus: "Pending Verification",
      batchId: "BATCH002",
      traceId: "",
      verifiedBy: "",
      verifiedAt: "",
    },
    {
      binId: "000022601",
      binName: "UTI NED Daily",
      mailerQuantity: 175,
      dispatchStatus: "Pending Verification",
      batchId: "BATCH003",
      traceId: "",
      verifiedBy: "",
      verifiedAt: "",
    },
    {
      binId: "000022602",
      binName: "UTI NED Renewal",
      mailerQuantity: 125,
      dispatchStatus: "Pending Verification",
      batchId: "BATCH004",
      traceId: "",
      verifiedBy: "",
      verifiedAt: "",
    },
    {
      binId: "000022603",
      binName: "UTI NED Daily",
      mailerQuantity: 300,
      dispatchStatus: "Pending Verification",
      batchId: "BATCH005",
      traceId: "",
      verifiedBy: "",
      verifiedAt: "",
    },
    {
      binId: "000022604",
      binName: "UTI NED Renewal",
      mailerQuantity: 250,
      dispatchStatus: "Pending Verification",
      batchId: "BATCH006",
      traceId: "",
      verifiedBy: "",
      verifiedAt: "",
    },
    {
      binId: "000022605",
      binName: "UTI NED Daily",
      mailerQuantity: 180,
      dispatchStatus: "Pending Verification",
      batchId: "BATCH007",
      traceId: "",
      verifiedBy: "",
      verifiedAt: "",
    },
    {
      binId: "000022606",
      binName: "UTI NED Renewal",
      mailerQuantity: 220,
      dispatchStatus: "Pending Verification",
      batchId: "BATCH008",
      traceId: "",
      verifiedBy: "",
      verifiedAt: "",
    },
  ];

  const handleSearch = () => {
    if (selectedClient && selectedCourier) {
      // Require courier login before showing results
      setShowLoginModal(true);
      setLoginUsername("");
      setLoginPassword("");
      setLoginError("");
    }
  };

  const handleReset = () => {
    setSelectedClient("");
    setSelectedCourier("");
    setShowResults(false);
    setAvailableBins([]);
    setVerifiedBatches([]);
    setRejectedBatches([]);
    setBatchScanInput("");
    setTraceIdInput("");
    setCurrentBatchId("");
    setShowBatchActions(false);
    setShowRejectionReason(false);
    setRejectionReason("");
    setShowReasonModal(false);
    setSelectedReason("");
    setShowError(false);
    setShowCarrierVerification(false);
    setCarrierList([]);
    setCarrierScanInput("");
    setCarrierScanError("");
  };

  const isSearchEnabled = selectedClient && selectedCourier;

  const handleBatchScan = (e) => {
    if (e.key === "Enter" && batchScanInput.trim()) {
      const scannedBatchId = batchScanInput.trim();

      // Check if batch is already verified
      if (verifiedBatches.some((batch) => batch.batchId === scannedBatchId)) {
        setErrorMessage("Batch already verified!");
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return;
      }

      // Check if batch exists in available bins
      const matchingBins = availableBins.filter(
        (bin) => bin.batchId === scannedBatchId
      );

      if (matchingBins.length > 0) {
        setCurrentBatchId(scannedBatchId);
        setBatchScanInput("");
        setShowError(false);

        if (selectedClient === "Nedbank") {
          // Generate 5 unique 10-digit numbers starting with 4555
          const generated = new Set();
          while (generated.size < 5) {
            const suffix = Math.floor(Math.random() * 1_000_000)
              .toString()
              .padStart(6, "0");
            generated.add(`4555${suffix}`);
          }
          const carriers = Array.from(generated).map((n) => ({
            number: n,
            verified: false,
          }));
          setCarrierList(carriers);
          setCarrierScanInput("");
          setCarrierScanError("");
          setShowCarrierVerification(true);
          setShowBatchActions(false);
          setShowRejectionReason(false);
        } else {
          setShowCarrierVerification(false);
          setShowBatchActions(true);
        }
      } else {
        setErrorMessage("Batch ID not found in available bins!");
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    }
  };

  const handleAcceptBatch = () => {
    if (!traceIdInput.trim()) {
      setErrorMessage("Please enter a Trace ID before accepting the batch!");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Update the status of matching bins
    setAvailableBins((prev) =>
      prev.map((bin) =>
        bin.batchId === currentBatchId
          ? {
              ...bin,
              dispatchStatus: "Verified",
              traceId: traceIdInput.trim(),
              verifiedBy: verifiedUserName || "System",
              verifiedAt: new Date().toLocaleString(),
            }
          : bin
      )
    );

    // Add to verified batches
    const verifiedBatch = {
      batchId: currentBatchId,
      traceId: traceIdInput.trim(),
      client: selectedClient,
      courier: selectedCourier,
      timestamp: new Date().toLocaleString(),
    };

    setVerifiedBatches((prev) => [...prev, verifiedBatch]);

    // Reset batch action state
    setCurrentBatchId("");
    setTraceIdInput("");
    setShowBatchActions(false);
    setShowError(false);
  };

  const handleRejectBatch = () => {
    setShowRejectionReason(true);
  };

  const handleConfirmRejection = () => {
    if (!rejectionReason.trim()) {
      setErrorMessage("Please enter a reason for rejection!");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Update the status of matching bins
    setAvailableBins((prev) =>
      prev.map((bin) =>
        bin.batchId === currentBatchId
          ? {
              ...bin,
              dispatchStatus: "Rejected",
              rejectionReason: rejectionReason.trim(),
            }
          : bin
      )
    );

    // Add to rejected batches
    const rejectedBatch = {
      batchId: currentBatchId,
      reason: rejectionReason.trim(),
      client: selectedClient,
      courier: selectedCourier,
      timestamp: new Date().toLocaleString(),
    };

    setRejectedBatches((prev) => [...prev, rejectedBatch]);

    // Reset batch action state
    setCurrentBatchId("");
    setTraceIdInput("");
    setRejectionReason("");
    setShowBatchActions(false);
    setShowRejectionReason(false);
    setShowError(false);
  };

  const handleCancelRejection = () => {
    setCurrentBatchId("");
    setTraceIdInput("");
    setRejectionReason("");
    setShowBatchActions(false);
    setShowRejectionReason(false);
    setShowError(false);
    setShowCarrierVerification(false);
    setCarrierList([]);
    setCarrierScanInput("");
    setCarrierScanError("");
  };

  const showRejectionReasonModal = (reason) => {
    setSelectedReason(reason);
    setShowReasonModal(true);
  };

  const closeReasonModal = () => {
    setShowReasonModal(false);
    setSelectedReason("");
  };

  const handleCarrierVerificationScan = (e) => {
    if (e.key === "Enter" && carrierScanInput.trim()) {
      const scanned = carrierScanInput.trim();
      if (!/^\d+$/.test(scanned)) {
        setCarrierScanError("Only digits are allowed.");
        setCarrierScanInput("");
        return;
      }
      if (scanned.length !== 10) {
        setCarrierScanError("Number must be exactly 10 digits.");
        setCarrierScanInput("");
        return;
      }
      const index = carrierList.findIndex((c) => c.number === scanned);
      if (index === -1) {
        setCarrierScanError("Number not found in this batch list.");
        setCarrierScanInput("");
        return;
      }
      if (carrierList[index].verified) {
        setCarrierScanError("Already scanned.");
        setCarrierScanInput("");
        return;
      } else {
        const updated = [...carrierList];
        updated[index] = { ...updated[index], verified: true };
        setCarrierList(updated);
        setCarrierScanError("");
        setCarrierScanInput("");
      }
    }
  };

  const handleAcceptCarrierBatch = () => {
    // Mark the current batch as Accepted and return to table view
    setAvailableBins((prev) =>
      prev.map((bin) =>
        bin.batchId === currentBatchId
          ? {
              ...bin,
              dispatchStatus: "Accepted",
              verifiedBy: verifiedUserName || "System",
              verifiedAt: new Date().toLocaleString(),
            }
          : bin
      )
    );
    setShowCarrierVerification(false);
    setCarrierList([]);
    setCarrierScanInput("");
    setCarrierScanError("");
  };

  const handleOpenRejectionInScan = () => {
    setShowRejectionReason(true);
    setCarrierScanError("");
  };

  const handleCancelRejectionInline = () => {
    setShowRejectionReason(false);
    setRejectionReason("");
  };

  const hasPrintableBins = availableBins.some(
    (bin) =>
      bin.dispatchStatus === "Verified" || bin.dispatchStatus === "Accepted"
  );

  const handlePrintManifest = () => {
    // Placeholder: trigger browser print or integrate with real manifest printing
    window.print();
  };

  const handleLoginSubmit = (e) => {
    e && e.preventDefault && e.preventDefault();
    const username = loginUsername.trim().toLowerCase();
    const password = loginPassword; // not validated for content in mock

    if (!username || !password) {
      setLoginError("Please enter username and password.");
      return;
    }

    if (username.endsWith("@allowedcourier")) {
      setVerifiedUserName("John Smith");
      setShowLoginModal(false);
      setShowResults(true);
      if (selectedClient === "Lesaka") {
        const prefix = (selectedCourier || "CRR").slice(0, 3).toUpperCase();
        const transformed = mockBinsData.map((bin, idx) => ({
          ...bin,
          binName: `${prefix}LES${String(idx + 1).padStart(2, "0")}`,
          mailerQuantity: 10,
        }));
        setAvailableBins(transformed);
      } else {
        setAvailableBins([...mockBinsData]);
      }
    } else if (username.endsWith("@deniedcourier")) {
      setLoginError("Access denied for this courier. Please contact support.");
    } else {
      setLoginError(
        "Unknown courier. Use user@allowedcourier or user@deniedcourier."
      );
    }
  };

  return (
    <MainNavigationLayout onNavigate={onNavigate}>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Dispatch Verification
            </h1>
            <p className="mt-2 text-gray-600">
              Select criteria to view bins available for dispatch verification
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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Table - Takes 3/4 of the space */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-md">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {showCarrierVerification
                            ? `Carrier Verification - ${currentBatchId}`
                            : "Bins Available for Dispatch Verification"}
                        </h2>
                        {!showCarrierVerification && (
                          <p className="text-sm text-gray-600 mt-1">
                            {availableBins.length} bins found for{" "}
                            {selectedClient} - {selectedCourier}
                          </p>
                        )}
                      </div>
                      {!showCarrierVerification && (
                        <button
                          onClick={handlePrintManifest}
                          disabled={!hasPrintableBins}
                          className={`px-3 py-2 rounded-md text-sm font-medium border transition-colors ${
                            hasPrintableBins
                              ? "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300"
                              : "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                          }`}
                          title={
                            hasPrintableBins
                              ? "Print manifest for verified/accepted bins"
                              : "Enable by verifying at least one bin"
                          }
                        >
                          Print Manifest
                        </button>
                      )}
                      {verifiedUserName && (
                        <div className="ml-4 text-sm text-gray-700 whitespace-nowrap">
                          Verifying Bundles as:{" "}
                          <span className="font-semibold">
                            {verifiedUserName}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Top input: batch scan OR carrier scan */}
                  {!showCarrierVerification && (
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                          Scan Batch ID:
                        </label>
                        <input
                          type="text"
                          value={batchScanInput}
                          onChange={(e) => setBatchScanInput(e.target.value)}
                          onKeyDown={handleBatchScan}
                          placeholder="Scan batch ID..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      {showError && (
                        <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">
                          {errorMessage}
                        </div>
                      )}
                    </div>
                  )}

                  {showBatchActions &&
                    !showRejectionReason &&
                    !showCarrierVerification && (
                      <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-blue-900">
                            Batch Actions - Batch ID: {currentBatchId}
                          </h3>
                          <button
                            onClick={handleCancelRejection}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-blue-900 mb-1">
                              Trace ID:
                            </label>
                            <input
                              type="text"
                              value={traceIdInput}
                              onChange={(e) => setTraceIdInput(e.target.value)}
                              placeholder="Enter trace ID..."
                              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="flex items-end space-x-2">
                            <button
                              onClick={handleAcceptBatch}
                              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                              <CheckCircleIcon className="h-4 w-4 mr-2" />
                              Accept Batch
                            </button>
                            <button
                              onClick={handleRejectBatch}
                              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                              <XMarkIcon className="h-4 w-4 mr-2" />
                              Reject Batch
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                  {showRejectionReason && !showCarrierVerification && (
                    <div className="px-6 py-4 border-b border-gray-200 bg-red-50">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-red-900">
                          Rejection Reason - Batch ID: {currentBatchId}
                        </h3>
                        <button
                          onClick={handleCancelRejection}
                          className="text-red-600 hover:text-red-800"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-red-900 mb-1">
                            Reason for Rejection:
                          </label>
                          <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Enter reason for rejection..."
                            rows="3"
                            className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex items-end space-x-2">
                          <button
                            onClick={handleConfirmRejection}
                            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          >
                            <XMarkIcon className="h-4 w-4 mr-2" />
                            Confirm Rejection
                          </button>
                          <button
                            onClick={handleCancelRejection}
                            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {!showCarrierVerification ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Bin ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Bin Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Mailer Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Batch ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Dispatch Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Verified By
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Verified At
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
                                {bin.binName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {bin.mailerQuantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {bin.batchId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      bin.dispatchStatus === "Verified" ||
                                      bin.dispatchStatus === "Accepted"
                                        ? "bg-green-100 text-green-800"
                                        : bin.dispatchStatus === "Rejected"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {bin.dispatchStatus === "Verified" ||
                                    bin.dispatchStatus === "Accepted" ? (
                                      <CheckCircleIcon className="h-3 w-3 mr-1" />
                                    ) : bin.dispatchStatus === "Rejected" ? (
                                      <XMarkIcon className="h-3 w-3 mr-1" />
                                    ) : (
                                      <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                                    )}
                                    {bin.dispatchStatus}
                                  </span>
                                  {bin.dispatchStatus === "Rejected" &&
                                    bin.rejectionReason && (
                                      <button
                                        onClick={() =>
                                          showRejectionReasonModal(
                                            bin.rejectionReason
                                          )
                                        }
                                        className="text-red-600 hover:text-red-800"
                                        title="View rejection reason"
                                      >
                                        <InformationCircleIcon className="h-4 w-4" />
                                      </button>
                                    )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {bin.verifiedBy || "-"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {bin.verifiedAt || "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      {/* Left list */}
                      <div className="md:col-span-1 border-r border-gray-200 max-h-96 overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Carrier Number
                              </th>
                              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-100">
                            {carrierList.map((c, idx) => (
                              <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-mono text-gray-900">
                                  {c.number}
                                </td>
                                <td className="px-2 py-2 whitespace-nowrap">
                                  {c.verified ? (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      <CheckCircleIcon className="h-3 w-3 mr-1" />
                                      OK
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                      Pending
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Right scan */}
                      <div className="md:col-span-2 p-6">
                        <div className="mb-4">
                          <div className="text-sm text-gray-700">
                            Verified:{" "}
                            {carrierList.filter((c) => c.verified).length} /{" "}
                            {carrierList.length}
                          </div>
                        </div>
                        <div className="bg-white rounded-md border p-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Scan Carrier/Card Number
                          </label>
                          <input
                            type="text"
                            value={carrierScanInput}
                            onChange={(e) =>
                              setCarrierScanInput(e.target.value)
                            }
                            onKeyDown={handleCarrierVerificationScan}
                            placeholder="Scan 10-digit number..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            autoFocus
                          />
                          {carrierScanError && (
                            <div className="mt-2 text-sm text-red-700 bg-red-50 px-3 py-2 rounded-md border border-red-200">
                              {carrierScanError}
                            </div>
                          )}

                          {/* Actions in scanning view */}
                          <div className="mt-4 flex items-center gap-2">
                            {carrierList.length > 0 &&
                              carrierList.every((c) => c.verified) && (
                                <button
                                  onClick={handleAcceptCarrierBatch}
                                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                >
                                  Accept Batch
                                </button>
                              )}
                            <button
                              onClick={handleOpenRejectionInScan}
                              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                              Reject Batch
                            </button>
                          </div>

                          {showRejectionReason && (
                            <div className="mt-4 border-t pt-4">
                              <label className="block text-sm font-medium text-red-900 mb-2">
                                Reason for Rejection
                              </label>
                              <textarea
                                value={rejectionReason}
                                onChange={(e) =>
                                  setRejectionReason(e.target.value)
                                }
                                placeholder="Enter reason for rejection..."
                                rows="3"
                                className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                              <div className="mt-3 flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    if (!rejectionReason.trim()) {
                                      setCarrierScanError(
                                        "Please enter a reason for rejection."
                                      );
                                      return;
                                    }
                                    // mark batch as Rejected and exit scanning view
                                    setAvailableBins((prev) =>
                                      prev.map((bin) =>
                                        bin.batchId === currentBatchId
                                          ? {
                                              ...bin,
                                              dispatchStatus: "Rejected",
                                              rejectionReason:
                                                rejectionReason.trim(),
                                            }
                                          : bin
                                      )
                                    );
                                    setCurrentBatchId("");
                                    setRejectionReason("");
                                    setShowRejectionReason(false);
                                    setShowCarrierVerification(false);
                                    setCarrierList([]);
                                    setCarrierScanInput("");
                                    setCarrierScanError("");
                                  }}
                                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                >
                                  Confirm Rejection
                                </button>
                                <button
                                  onClick={handleCancelRejectionInline}
                                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Rejection Reason Modal */}
          {showReasonModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Rejection Reason
                  </h3>
                  <button
                    onClick={closeReasonModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="flex items-start">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm text-red-800">
                        <p className="font-medium mb-2">
                          Reason for Rejection:
                        </p>
                        <p className="whitespace-pre-wrap">{selectedReason}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end px-6 py-4 border-t border-gray-200">
                  <button
                    onClick={closeReasonModal}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Login Modal */}
          {showLoginModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4">
                <div className="p-5 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Courier Login
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Use user@allowedcourier or user@deniedcourier for testing
                  </p>
                </div>
                <form onSubmit={handleLoginSubmit} className="p-5">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="user@allowedcourier"
                      autoFocus
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter password"
                    />
                  </div>
                  {loginError && (
                    <div className="mb-3 text-sm text-red-700 bg-red-50 px-3 py-2 rounded-md border border-red-200">
                      {loginError}
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowLoginModal(false)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainNavigationLayout>
  );
};

export default DispatchVerificationPage;
