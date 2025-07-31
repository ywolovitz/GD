import React from "react";
import MainNavigationLayout from "./MainNavigationLayout";
import {
  DocumentArrowDownIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

const VaultPickingListPage = ({ onNavigate }) => {
  // Dummy data for the vault picking list

  const handleExportToPDF = () => {
    // Simulate PDF export
    console.log("Exporting to PDF...");
    // In a real application, this would generate and download a PDF
    alert("PDF export functionality would be implemented here");
  };

  const handlePrint = () => {
    // Create a new window for the print report
    const printWindow = window.open("", "_blank", "width=800,height=600");

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vault Picking List Report</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              margin: 20px;
              background: white;
              color: black;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid black;
              padding-bottom: 10px;
              margin-bottom: 20px;
              position: relative;
            }
            .barcode {
              position: absolute;
              top: 10px;
              left: 10px;
              font-family: 'Courier New', monospace;
              font-size: 10px;
              line-height: 1;
            }
            .barcode-line {
              height: 2px;
              background: black;
              margin: 1px 0;
            }
            .barcode-text {
              font-size: 8px;
              text-align: center;
              margin-top: 2px;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .subtitle {
              font-size: 14px;
              margin-bottom: 10px;
            }
            .date {
              font-size: 12px;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
              font-size: 12px;
            }
            th {
              background-color: #f0f0f0;
              font-weight: bold;
            }
            .summary {
              margin-top: 30px;
              border-top: 2px solid black;
              padding-top: 20px;
            }
            .summary-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            }
            .summary-label {
              font-weight: bold;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 10px;
              border-top: 1px solid black;
              padding-top: 10px;
            }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="barcode">
              <div class="barcode-line" style="width: 20px;"></div>
              <div class="barcode-line" style="width: 15px;"></div>
              <div class="barcode-line" style="width: 25px;"></div>
              <div class="barcode-line" style="width: 10px;"></div>
              <div class="barcode-line" style="width: 30px;"></div>
              <div class="barcode-line" style="width: 12px;"></div>
              <div class="barcode-line" style="width: 18px;"></div>
              <div class="barcode-line" style="width: 22px;"></div>
              <div class="barcode-line" style="width: 14px;"></div>
              <div class="barcode-line" style="width: 28px;"></div>
              <div class="barcode-text">VP-2025-001</div>
            </div>
            <div class="title">VAULT PICKING LIST REPORT</div>
            <div class="subtitle">GD System - Vault Operations</div>
            <div class="date">Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Order File</th>
                <th>Product</th>
                <th>Ordered</th>
                <th>In Progress</th>
                <th>Delivered</th>
                <th>Outstanding</th>
              </tr>
            </thead>
            <tbody>
              ${vaultPickingData
                .map(
                  (row) => `
                <tr>
                  <td>${row.orderDate}</td>
                  <td>${row.orderFile}</td>
                  <td>${row.product}</td>
                  <td>${row.ordered.toLocaleString()}</td>
                  <td>${row.inProgress.toLocaleString()}</td>
                  <td>${row.delivered.toLocaleString()}</td>
                  <td>${row.outstanding.toLocaleString()}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          
          <div class="summary">
            <div class="summary-row">
              <span class="summary-label">Total Ordered:</span>
              <span>${vaultPickingData
                .reduce((sum, row) => sum + row.ordered, 0)
                .toLocaleString()}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Total In Progress:</span>
              <span>${vaultPickingData
                .reduce((sum, row) => sum + row.inProgress, 0)
                .toLocaleString()}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Total Delivered:</span>
              <span>${vaultPickingData
                .reduce((sum, row) => sum + row.delivered, 0)
                .toLocaleString()}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Total Outstanding:</span>
              <span>${vaultPickingData
                .reduce((sum, row) => sum + row.outstanding, 0)
                .toLocaleString()}</span>
            </div>
          </div>
          
          <div class="footer">
            <div>Report generated by GD System</div>
            <div>Page 1 of 1</div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = function () {
      printWindow.print();
      printWindow.close();
    };
  };
  const vaultPickingData = [
    {
      orderDate: "2025-01-15",
      orderFile: "Nedbank_4567_2025-01-15.txt",
      product: "456789",
      ordered: 1500,
      inProgress: 1200,
      delivered: 0,
      outstanding: 300,
    },
    {
      orderDate: "2025-01-16",
      orderFile: "Nedbank_4568_2025-01-16.csv",
      product: "456790",
      ordered: 2200,
      inProgress: 1800,
      delivered: 0,
      outstanding: 400,
    },
    {
      orderDate: "2025-01-17",
      orderFile: "Nedbank_4569_2025-01-17.txt",
      product: "456791",
      ordered: 1800,
      inProgress: 1500,
      delivered: 0,
      outstanding: 300,
    },
    {
      orderDate: "2025-01-18",
      orderFile: "Nedbank_4570_2025-01-18.csv",
      product: "456792",
      ordered: 2500,
      inProgress: 2000,
      delivered: 0,
      outstanding: 500,
    },
    {
      orderDate: "2025-01-19",
      orderFile: "Nedbank_4571_2025-01-19.txt",
      product: "456793",
      ordered: 3000,
      inProgress: 2400,
      delivered: 0,
      outstanding: 600,
    },
  ];

  return (
    <MainNavigationLayout onNavigate={onNavigate}>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Vault Picking List Report
              </h1>
              <p className="mt-2 text-gray-600">
                Overview of vault picking orders and their current status
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleExportToPDF}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                Export to PDF
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                <PrinterIcon className="h-5 w-5 mr-2" />
                Print
              </button>
            </div>
          </div>

          {/* Report Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Vault Picking Orders
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order File
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ordered
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      In Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivered
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Outstanding
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vaultPickingData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.orderDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {row.orderFile}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {row.product}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.ordered.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                        {row.inProgress.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                        {row.delivered.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                        {row.outstanding.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Ordered
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {vaultPickingData
                      .reduce((sum, row) => sum + row.ordered, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    In Progress
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {vaultPickingData
                      .reduce((sum, row) => sum + row.inProgress, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Delivered</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {vaultPickingData
                      .reduce((sum, row) => sum + row.delivered, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Outstanding
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {vaultPickingData
                      .reduce((sum, row) => sum + row.outstanding, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainNavigationLayout>
  );
};

export default VaultPickingListPage;
