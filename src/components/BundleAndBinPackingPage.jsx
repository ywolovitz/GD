import React, { useState } from "react";
import MainNavigationLayout from "./MainNavigationLayout";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PrinterIcon,
  TrashIcon,
  XMarkIcon,
  ArchiveBoxIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

const BundleAndBinPackingPage = ({ onNavigate, currentPage }) => {
  const [workOrderScanInput, setWorkOrderScanInput] = useState("");
  const [carrierScanInput, setCarrierScanInput] = useState("");
  const [scannedCarriers, setScannedCarriers] = useState([
    "1234567890",
    "2345678901",
    "3456789012",
    "4567890123",
    "5678901234",
    "6789012345",
    "7890123456",
    "8901234567",
    "9012345678",
    "0123456789",
  ]);
  const [workOrderDetails, setWorkOrderDetails] = useState({
    workOrderNumber: "ABC-123-XYZ",
    product: "ABC123",
    numberOfCards: 50,
    courier: "DSV",
    binType: "Standard Card Bin",
    binNumber: "BIN-001",
    isUrgent: false,
    packAndTrackMode: "",
    clientName: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [outerBoxScanned, setOuterBoxScanned] = useState("");
  const [firstCardScanned, setFirstCardScanned] = useState("");
  const [lastCardScanned, setLastCardScanned] = useState("");
  const [scanStep, setScanStep] = useState("outerBox"); // outerBox, innerBox, firstCard, lastCard
  const [innerBoxes] = useState([
    "12345678",
    "12345679",
    "12345680",
    "12345681",
    "12345682",
    "12345683",
    "12345684",
    "12345685",
    "12345686",
    "12345687",
  ]);
  const [scannedInnerBoxes, setScannedInnerBoxes] = useState([]);
  const [currentInnerBox, setCurrentInnerBox] = useState("");
  const [innerBoxFirstCards, setInnerBoxFirstCards] = useState({});
  const [innerBoxLastCards, setInnerBoxLastCards] = useState({});

  const handleWorkOrderScan = (e) => {
    if (e.key === "Enter" && workOrderScanInput.trim()) {
      // Determine Client and Pack & Track Mode from work order format
      // Supported formats:
      //   WO-LES-001  -> Lesaka  -> First and Last
      //   WO-NED-001  -> Nedbank -> Card Scan
      //   WO-TYM-001  -> TymeBank -> First and Last
      const scanned = workOrderScanInput.trim().toUpperCase();
      let packAndTrackMode = "Standard";
      let clientName = "";
      if (scanned.startsWith("WO-LES-")) {
        clientName = "Lesaka";
        packAndTrackMode = "First and Last";
      } else if (scanned.startsWith("WO-NED-")) {
        clientName = "Nedbank";
        packAndTrackMode = "Card Scan";
      } else if (scanned.startsWith("WO-TYM-")) {
        clientName = "TymeBank";
        packAndTrackMode = "First and Last";
      }

      // Simulate work order details based on work order scan
      const mockWorkOrder = {
        workOrderNumber: workOrderScanInput.trim(),
        product: "ABC123",
        numberOfCards: 50,
        courier: "DSV",
        binType: "Standard Card Bin",
        binNumber: "BIN-001",
        isUrgent: Math.random() > 0.7, // 30% chance of being urgent
        packAndTrackMode: packAndTrackMode,
        clientName: clientName,
      };

      setWorkOrderDetails(mockWorkOrder);
      setWorkOrderScanInput("");
      setIsSetupComplete(true);
      showToastMessage("Work order scanned successfully!", "success");
    }
  };

  const handleCarrierScan = (e) => {
    if (e.key === "Enter" && carrierScanInput.trim()) {
      const carrierNumber = carrierScanInput.trim();

      // Validate number format with specific messages
      if (!/^\d+$/.test(carrierNumber)) {
        showToastMessage(
          "Invalid carrier number: only digits are allowed.",
          "error",
          7000
        );
      } else if (carrierNumber.length !== 10) {
        showToastMessage(
          "Invalid carrier number: must be exactly 10 digits.",
          "error",
          7000
        );
      } else if (!scannedCarriers.includes(carrierNumber)) {
        setScannedCarriers((prev) => [...prev, carrierNumber]);
        showToastMessage("Carrier scanned successfully!", "success", 5000);
      } else {
        showToastMessage("Carrier already scanned!", "warning", 5000);
      }

      setCarrierScanInput("");
    }
  };

  const handleOuterBoxScan = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const outerBoxNumber = e.target.value.trim();
      setOuterBoxScanned(outerBoxNumber);
      setScanStep("innerBox");
      showToastMessage(
        "Outer box scanned successfully! Now scan inner boxes.",
        "success"
      );
      e.target.value = "";
    }
  };

  const handleInnerBoxScan = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const innerBoxNumber = e.target.value.trim();

      if (innerBoxes.includes(innerBoxNumber)) {
        if (!scannedInnerBoxes.includes(innerBoxNumber)) {
          setScannedInnerBoxes((prev) => [...prev, innerBoxNumber]);
          setCurrentInnerBox(innerBoxNumber);
          setScanStep("firstCard");
          showToastMessage(
            `Inner box ${innerBoxNumber} scanned! Now scan first card.`,
            "success"
          );
        } else {
          showToastMessage("Inner box already scanned!", "warning");
        }
      } else {
        showToastMessage("Inner box not found in list!", "error");
      }

      e.target.value = "";
    }
  };

  const handleFirstCardScan = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const firstCardNumber = e.target.value.trim();
      setInnerBoxFirstCards((prev) => ({
        ...prev,
        [currentInnerBox]: firstCardNumber,
      }));
      setScanStep("lastCard");
      showToastMessage(
        `First card for ${currentInnerBox} scanned! Now scan last card.`,
        "success"
      );
      e.target.value = "";
    }
  };

  const handleLastCardScan = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const lastCardNumber = e.target.value.trim();
      setInnerBoxLastCards((prev) => ({
        ...prev,
        [currentInnerBox]: lastCardNumber,
      }));

      // Check if all inner boxes are complete
      const completedBoxes = Object.keys(innerBoxFirstCards).length + 1;
      if (completedBoxes === innerBoxes.length) {
        setScanStep("complete");
        showToastMessage(
          "All inner boxes completed! Packing finished.",
          "success"
        );
      } else {
        setScanStep("innerBox");
        showToastMessage(
          `Inner box ${currentInnerBox} completed! Scan next inner box.`,
          "success"
        );
      }

      e.target.value = "";
    }
  };

  const removeCarrier = (carrierToRemove) => {
    setScannedCarriers((prev) =>
      prev.filter((carrier) => carrier !== carrierToRemove)
    );
    showToastMessage("Carrier removed!", "success");
  };

  const showToastMessage = (message, type, durationMs = 5000) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), durationMs);
  };

  const handleSealBin = () => {
    if (scannedCarriers.length === 0) {
      showToastMessage("No carriers scanned to seal bin!", "error");
      return;
    }
    showToastMessage("Bin sealed successfully!", "success");
  };

  const handleRemoveBundle = () => {
    if (scannedCarriers.length === 0) {
      showToastMessage("No bundles to remove!", "error");
      return;
    }
    setScannedCarriers([]);
    showToastMessage("Bundle removed from bin!", "success");
  };

  const handleClearBin = () => {
    setScannedCarriers([]);
    setWorkOrderDetails(null);
    showToastMessage("Bin cleared!", "success");
  };

  const handleCancelBin = () => {
    setScannedCarriers([]);
    setWorkOrderDetails(null);
    setWorkOrderScanInput("");
    setCarrierScanInput("");
    showToastMessage("Bin cancelled!", "success");
  };

  const handlePrintManifest = () => {
    if (scannedCarriers.length === 0) {
      showToastMessage("No carriers to print manifest!", "error");
      return;
    }
    showToastMessage("Bundle manifest printed!", "success");
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
    <MainNavigationLayout onNavigate={onNavigate} currentPage={currentPage}>
      <div className="p-8">
        <div className="w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Bundle and Bin Packing
            </h1>
            <p className="mt-2 text-gray-600">
              Scan bins and carriers to create bundles
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

          {/* Setup Fields - Work Order Scan Only */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            {/* Work Order Scan */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Scan Work Order
              </h3>
              <input
                type="text"
                value={workOrderScanInput}
                onChange={(e) => setWorkOrderScanInput(e.target.value)}
                onKeyDown={handleWorkOrderScan}
                placeholder="Scan work order..."
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Work Order Details */}
          {isSetupComplete && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Work Order Details
                </h3>
                <button
                  onClick={() => {
                    setWorkOrderScanInput("");
                    setWorkOrderDetails({
                      workOrderNumber: "ABC-123-XYZ",
                      product: "ABC123",
                      numberOfCards: 50,
                      courier: "DSV",
                      binType: "Standard Card Bin",
                      binNumber: "BIN-001",
                      isUrgent: false,
                      packAndTrackMode: "",
                      clientName: "",
                    });
                    setScannedCarriers([]);
                    setIsSetupComplete(false);
                    setOuterBoxScanned("");
                    setFirstCardScanned("");
                    setLastCardScanned("");
                    setScanStep("outerBox");
                    setScannedInnerBoxes([]);
                    setCurrentInnerBox("");
                    setInnerBoxFirstCards({});
                    setInnerBoxLastCards({});
                  }}
                  className="px-3 py-1 text-xs bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Reset
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Work Order:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {workOrderDetails.workOrderNumber}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Client:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {workOrderDetails.clientName || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Product:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {workOrderDetails.product}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Cards:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {workOrderDetails.numberOfCards}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Courier:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {workOrderDetails.courier}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Bin Type:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {workOrderDetails.binType}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Bin Number:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {workOrderDetails.binNumber}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Urgent:</span>
                  <span
                    className={`ml-2 font-medium ${
                      workOrderDetails.isUrgent
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {workOrderDetails.isUrgent ? "YES" : "NO"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Pack and Track Mode:</span>
                  <span
                    className={`ml-2 font-medium px-2 py-1 rounded text-sm ${
                      workOrderDetails.packAndTrackMode === "First and Last"
                        ? "bg-blue-100 text-blue-800"
                        : workOrderDetails.packAndTrackMode === "Card Scan"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {workOrderDetails.packAndTrackMode}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {isSetupComplete && (
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleSealBin}
                className="flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <ArchiveBoxIcon className="h-4 w-4 mr-2" />
                Seal Bin
              </button>

              <button
                onClick={handleRemoveBundle}
                className="flex items-center justify-center px-4 py-2 bg-orange-50 text-orange-700 border border-orange-200 rounded-md hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
              >
                <ArchiveBoxIcon className="h-4 w-4 mr-2" />
                Remove Bundle
              </button>

              <button
                onClick={handleClearBin}
                className="flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                <TrashIcon className="h-4 w-4 mr-2" />
                Clear Bin
              </button>

              <button
                onClick={handleCancelBin}
                className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                <XMarkIcon className="h-4 w-4 mr-2" />
                Cancel Bin
              </button>

              <button
                onClick={handlePrintManifest}
                className="flex items-center justify-center px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print Manifest
              </button>
            </div>
          )}

          {/* Scanning Section - Conditional based on Pack and Track Mode */}
          {isSetupComplete &&
            workOrderDetails.packAndTrackMode === "Card Scan" && (
              <div className="bg-white rounded-lg shadow p-6 mt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Scan Carrier / Card
                </h2>
                <input
                  type="text"
                  value={carrierScanInput}
                  onChange={(e) => setCarrierScanInput(e.target.value)}
                  onKeyDown={handleCarrierScan}
                  placeholder="Scan carrier/card PAN..."
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!workOrderDetails}
                  autoFocus
                />
              </div>
            )}

          {/* First and Last Mode Scanning Section */}
          {isSetupComplete &&
            workOrderDetails.packAndTrackMode === "First and Last" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {/* Inner Boxes List - Left Side */}
                {outerBoxScanned && (
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Inner Boxes ({Object.keys(innerBoxFirstCards).length}/
                          {innerBoxes.length})
                        </h3>
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                          Outer: {outerBoxScanned}
                        </span>
                      </div>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {innerBoxes.map((boxNumber, index) => (
                          <div
                            key={index}
                            className={`p-2 rounded border text-sm font-mono ${
                              scannedInnerBoxes.includes(boxNumber) &&
                              innerBoxFirstCards[boxNumber] &&
                              innerBoxLastCards[boxNumber]
                                ? "bg-green-100 border-green-300 text-green-800"
                                : scannedInnerBoxes.includes(boxNumber)
                                ? "bg-yellow-100 border-yellow-300 text-yellow-800"
                                : "bg-gray-50 border-gray-200 text-gray-700"
                            }`}
                          >
                            {scannedInnerBoxes.includes(boxNumber) &&
                              innerBoxFirstCards[boxNumber] &&
                              innerBoxLastCards[boxNumber] && (
                                <span className="mr-2">✓</span>
                              )}
                            {scannedInnerBoxes.includes(boxNumber) &&
                              (!innerBoxFirstCards[boxNumber] ||
                                !innerBoxLastCards[boxNumber]) && (
                                <span className="mr-2">⟳</span>
                              )}
                            {boxNumber}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Scanning Interface - Right Side */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      First and Last Mode - Packing Process
                    </h2>

                    {/* Outer Box Scan */}
                    {scanStep === "outerBox" && (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Step 1: Scan Outer Box
                        </label>
                        <input
                          type="text"
                          onKeyDown={handleOuterBoxScan}
                          placeholder="Scan outer box..."
                          className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          autoFocus
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          Scan the outer box to begin the packing process
                        </p>
                      </div>
                    )}

                    {/* Inner Box Scan */}
                    {scanStep === "innerBox" && (
                      <div className="mb-6">
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                          <span className="text-sm font-medium text-green-800">
                            ✓ Outer Box: {outerBoxScanned}
                          </span>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Step 2: Scan Inner Box
                        </label>
                        <input
                          type="text"
                          onKeyDown={handleInnerBoxScan}
                          placeholder="Scan inner box..."
                          className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          autoFocus
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          Scan an inner box to begin processing
                        </p>
                      </div>
                    )}

                    {/* First Card Scan */}
                    {scanStep === "firstCard" && (
                      <div className="mb-6">
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                          <span className="text-sm font-medium text-green-800">
                            ✓ Outer Box: {outerBoxScanned} | Inner Box:{" "}
                            {currentInnerBox}
                          </span>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Step 3: Scan First Card
                        </label>
                        <input
                          type="text"
                          onKeyDown={handleFirstCardScan}
                          placeholder="Scan first card..."
                          className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          autoFocus
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          Scan the first card for inner box {currentInnerBox}
                        </p>
                      </div>
                    )}

                    {/* Last Card Scan */}
                    {scanStep === "lastCard" && (
                      <div className="mb-6">
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                          <span className="text-sm font-medium text-green-800">
                            ✓ Outer Box: {outerBoxScanned} | First Card:{" "}
                            {firstCardScanned}
                          </span>
                        </div>
                        <label className="text-sm font-medium text-gray-700 mb-2">
                          Step 3: Scan Last Card
                        </label>
                        <input
                          type="text"
                          onKeyDown={handleLastCardScan}
                          placeholder="Scan last card..."
                          className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          autoFocus
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          Scan the last card for inner box {currentInnerBox}
                        </p>
                      </div>
                    )}

                    {/* Completion Status */}
                    {scanStep === "complete" && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">
                          ✓ Packing Complete!
                        </h3>
                        <div className="space-y-2 text-sm text-blue-800">
                          <div>
                            <strong>Outer Box:</strong> {outerBoxScanned}
                          </div>
                          <div>
                            <strong>Completed Inner Boxes:</strong>{" "}
                            {Object.keys(innerBoxFirstCards).length}
                          </div>
                          <div>
                            <strong>Total Inner Boxes:</strong>{" "}
                            {innerBoxes.length}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          {/* Scanned Carriers - Only for Card Scan Mode */}
          {isSetupComplete &&
            workOrderDetails.packAndTrackMode === "Card Scan" && (
              <div className="bg-white rounded-lg shadow p-6 mt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Scanned Cards / Carriers: {scannedCarriers.length}/
                  {workOrderDetails.numberOfCards}
                </h2>
                {scannedCarriers.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No carriers scanned yet
                  </p>
                ) : (
                  <div className="max-h-64 overflow-y-auto">
                    <div className="space-y-2">
                      {scannedCarriers.map((carrier, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded border"
                        >
                          <span className="text-sm font-mono">{carrier}</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => removeCarrier(carrier)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              title="Remove card"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                            <button
                              className="text-gray-500 hover:text-gray-700 transition-colors"
                              title="More info"
                            >
                              <EllipsisVerticalIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </MainNavigationLayout>
  );
};

export default BundleAndBinPackingPage;
