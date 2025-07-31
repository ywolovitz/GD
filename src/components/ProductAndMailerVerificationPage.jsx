import React, { useState } from "react";
import MainNavigationLayout from "./MainNavigationLayout";
import {
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  CreditCardIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const ProductAndMailerVerificationPage = ({ onNavigate }) => {
  const [verificationType, setVerificationType] = useState(null);
  const [workOrderNumber, setWorkOrderNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [cardData, setCardData] = useState(null);
  const [currentStep, setCurrentStep] = useState("type-selection");
  const [verificationResult, setVerificationResult] = useState(null);

  // Mock card data - in real implementation this would come from API
  const mockCardData = {
    bank: "Nedbank",
    product: "Nedbank Credit Card",
    pan: "4111111111111111",
    expDate: "12/25",
    securityCode: "123",
    frontImage: "/cardfront.jpg",
    backImage: "/cardback.jpg",
  };

  const handleVerificationTypeSelect = (type) => {
    setVerificationType(type);
    setCurrentStep("work-order-input");
  };

  const handleWorkOrderSubmit = () => {
    if (workOrderNumber.trim()) {
      setCurrentStep("pan-input");
    }
  };

  const handlePanSubmit = () => {
    if (panNumber.trim()) {
      // Simulate API call to get card data
      setCardData(mockCardData);
      setCurrentStep("card-verification");
    }
  };

  const handleVerificationDecision = (decision) => {
    setVerificationResult(decision);
    setCurrentStep("result");
  };

  const handleReset = () => {
    setVerificationType(null);
    setWorkOrderNumber("");
    setPanNumber("");
    setCardData(null);
    setCurrentStep("type-selection");
    setVerificationResult(null);
  };

  const renderTypeSelection = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Product and Mailer Verification
        </h2>
        <p className="text-gray-600">Select verification type</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => handleVerificationTypeSelect("embossing")}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500"
        >
          <div className="text-center">
            <CreditCardIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Verify Embossing
            </h3>
            <p className="text-sm text-gray-600">
              Verify card embossing details and appearance
            </p>
          </div>
        </button>

        <button
          onClick={() => handleVerificationTypeSelect("carrier")}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500"
        >
          <div className="text-center">
            <DocumentTextIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Verify Carrier
            </h3>
            <p className="text-sm text-gray-600">
              Verify carrier/mailer details and packaging
            </p>
          </div>
        </button>
      </div>
    </div>
  );

  const renderWorkOrderInput = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {verificationType === "embossing"
            ? "Verify Embossing"
            : "Verify Carrier"}
        </h2>
        <p className="text-gray-600">Enter or scan the Work Order Number</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Order Number
          </label>
          <div className="flex">
            <input
              type="text"
              value={workOrderNumber}
              onChange={(e) => setWorkOrderNumber(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter or scan work order number"
            />
            <button className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleWorkOrderSubmit}
            disabled={!workOrderNumber.trim()}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );

  const renderPanInput = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Verify Embossing
        </h2>
        <p className="text-gray-600">Enter the PAN of the card</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PAN Number
          </label>
          <input
            type="text"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter PAN number"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handlePanSubmit}
            disabled={!panNumber.trim()}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue
          </button>
          <button
            onClick={() => setCurrentStep("work-order-input")}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );

  const renderCardVerification = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Card Verification
        </h2>
        <p className="text-gray-600">
          Review card details and make verification decision
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Card Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Bank:</span>
              <span className="font-medium">{cardData.bank}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Product:</span>
              <span className="font-medium">{cardData.product}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">PAN:</span>
              <span className="font-medium">{cardData.pan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Exp Date:</span>
              <span className="font-medium">{cardData.expDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Security Code:</span>
              <span className="font-medium">{cardData.securityCode}</span>
            </div>
          </div>
        </div>

        {/* Card Images */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Card Images
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Front</h4>
              <img
                src={cardData.frontImage}
                alt="Card Front"
                className="w-full h-48 object-contain rounded border shadow-sm"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Back</h4>
              <img
                src={cardData.backImage}
                alt="Card Back"
                className="w-full h-48 object-contain rounded border shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Verification Decision */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Verification Decision
        </h3>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleVerificationDecision("accept")}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            Accept
          </button>
          <button
            onClick={() => handleVerificationDecision("reject")}
            className="flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <XCircleIcon className="h-5 w-5 mr-2" />
            Reject
          </button>
        </div>
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Verification Complete
        </h2>
        <p className="text-gray-600">
          Card has been{" "}
          {verificationResult === "accept" ? "accepted" : "rejected"}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          {verificationResult === "accept" ? (
            <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
          ) : (
            <XCircleIcon className="h-16 w-16 text-red-600 mx-auto mb-4" />
          )}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {verificationResult === "accept" ? "Accepted" : "Rejected"}
          </h3>
          <p className="text-gray-600">
            {verificationResult === "accept"
              ? "Card verification completed successfully"
              : "Card verification failed"}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Start New Verification
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentStep) {
      case "type-selection":
        return renderTypeSelection();
      case "work-order-input":
        return renderWorkOrderInput();
      case "pan-input":
        return renderPanInput();
      case "card-verification":
        return renderCardVerification();
      case "result":
        return renderResult();
      default:
        return renderTypeSelection();
    }
  };

  return (
    <MainNavigationLayout onNavigate={onNavigate}>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </div>
    </MainNavigationLayout>
  );
};

export default ProductAndMailerVerificationPage;
