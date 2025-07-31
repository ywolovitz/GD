import React, { useState } from "react";
import CrescentUnionBankScanningPage from "./components/CrescentUnionBankScanningPage";
import CrescentUnionBankStoringPage from "./components/CrescentUnionBankStoringPage";
import CrescentUnionBankPickingPage from "./components/CrescentUnionBankPickingPage";
import CrescentUnionBankDistributionPage from "./components/CrescentUnionBankDistributionPage";
import CrescentUnionBankCombinedReportPage from "./components/CrescentUnionBankCombinedReportPage";
import MainNavigationLayout from "./components/MainNavigationLayout";
import { pageComponents } from "./config/navigationConfig";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

function App() {
  const [tab, setTab] = useState("main");
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isAlternateFlow, setIsAlternateFlow] = useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative min-h-screen pb-16">
      {tab === "main" ? (
        (() => {
          const Component = pageComponents[currentPage];
          if (Component) {
            return <Component onNavigate={handleNavigation} />;
          }
          // Default to dashboard if no component found
          const DashboardComponent = pageComponents["dashboard"];
          return <DashboardComponent onNavigate={handleNavigation} />;
        })()
      ) : tab === "scanning" ? (
        <CrescentUnionBankScanningPage isAlternateFlow={isAlternateFlow} />
      ) : tab === "storing" ? (
        <CrescentUnionBankStoringPage isAlternateFlow={isAlternateFlow} />
      ) : tab === "picking" ? (
        <CrescentUnionBankPickingPage />
      ) : tab === "distribution" ? (
        <CrescentUnionBankDistributionPage isAlternateFlow={isAlternateFlow} />
      ) : (
        <CrescentUnionBankCombinedReportPage />
      )}
      {/* Normal/Alternative Toggle */}
      {tab !== "main" && (
        <button
          onClick={() => setIsAlternateFlow((v) => !v)}
          className={`fixed bottom-20 right-4 p-2 rounded-full shadow-lg z-50 transition-colors duration-200 ${
            isAlternateFlow
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          title="Toggle alternate flow mode"
        >
          {isAlternateFlow ? (
            <ExclamationTriangleIcon className="h-5 w-5 text-white" />
          ) : (
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
          )}
        </button>
      )}
      {/* Bottom Navigation */}
      {tab !== "main" && (
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-center z-40">
          <button
            className={`flex-1 py-3 text-center text-sm font-semibold transition-colors ${
              tab === "main"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setTab("main")}
          >
            Main Dashboard
          </button>
          <button
            className={`flex-1 py-3 text-center text-sm font-semibold transition-colors ${
              tab === "scanning"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setTab("scanning")}
          >
            Crescent Union Bank Scanning
          </button>
          <button
            className={`flex-1 py-3 text-center text-sm font-semibold transition-colors ${
              tab === "storing"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setTab("storing")}
          >
            Crescent Union Bank Storing
          </button>
          <button
            className={`flex-1 py-3 text-center text-sm font-semibold transition-colors ${
              tab === "picking"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setTab("picking")}
          >
            Crescent Union Bank Picking
          </button>
          <button
            className={`flex-1 py-3 text-center text-sm font-semibold transition-colors ${
              tab === "distribution"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setTab("distribution")}
          >
            Crescent Union Bank Distribution
          </button>
          <button
            className={`flex-1 py-3 text-center text-sm font-semibold transition-colors ${
              tab === "reports"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setTab("reports")}
          >
            Reports
          </button>
        </nav>
      )}
    </div>
  );
}

export default App;
