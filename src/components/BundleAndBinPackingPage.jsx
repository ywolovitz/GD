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

const BundleAndBinPackingPage = ({ onNavigate }) => {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedCourier, setSelectedCourier] = useState("");
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
    isUrgent: false,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const clients = [
    "Capitec Bank",
    "Crescent Union Bank",
    "Standard Bank",
    "Nedbank",
    "First National Bank",
    "ABSA Bank",
  ];

  const couriers = ["CCD", "DSV", "FedEx", "DHL"];

  const handleWorkOrderScan = (e) => {
    if (e.key === "Enter" && workOrderScanInput.trim()) {
      // Simulate work order details based on work order scan
      const mockWorkOrder = {
        workOrderNumber: "ABC-123-XYZ",
        product: "ABC123",
        numberOfCards: 50,
        courier: selectedCourier || "DSV",
        binType: "Standard Card Bin",
        isUrgent: Math.random() > 0.7, // 30% chance of being urgent
      };

      setWorkOrderDetails(mockWorkOrder);
      setWorkOrderScanInput("");
      showToastMessage("Work order scanned successfully!", "success");
    }
  };

  const handleCarrierScan = (e) => {
    if (e.key === "Enter" && carrierScanInput.trim()) {
      const carrierNumber = carrierScanInput.trim();

      // Validate 10-digit number format
      if (carrierNumber.length === 10 && /^\d+$/.test(carrierNumber)) {
        if (!scannedCarriers.includes(carrierNumber)) {
          setScannedCarriers((prev) => [...prev, carrierNumber]);
          showToastMessage("Carrier scanned successfully!", "success");
        } else {
          showToastMessage("Carrier already scanned!", "warning");
        }
      } else {
        showToastMessage("Invalid carrier number format!", "error");
      }

      setCarrierScanInput("");
    }
  };

  const removeCarrier = (carrierToRemove) => {
    setScannedCarriers((prev) =>
      prev.filter((carrier) => carrier !== carrierToRemove)
    );
    showToastMessage("Carrier removed!", "success");
  };

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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
    <MainNavigationLayout onNavigate={onNavigate}>
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

          {/* Setup Fields - Horizontal Line */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Client Selection */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Client Selection
              </h3>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Select Courier
              </h3>
              <select
                value={selectedCourier}
                onChange={(e) => setSelectedCourier(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a courier...</option>
                {couriers.map((courier) => (
                  <option key={courier} value={courier}>
                    {courier}
                  </option>
                ))}
              </select>
            </div>

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
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Work Order Details
            </h3>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Work Order:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {workOrderDetails.workOrderNumber}
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
            </div>
          </div>

          {/* Action Buttons */}
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

          {/* Scan Carrier/Card Section - Full Width */}
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

          {/* Scanned Carriers */}
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
        </div>
      </div>
    </MainNavigationLayout>
  );
};

export default BundleAndBinPackingPage;
