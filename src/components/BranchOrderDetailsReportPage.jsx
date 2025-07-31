import React from "react";
import MainNavigationLayout from "./MainNavigationLayout";
import {
  DocumentArrowDownIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

const BranchOrderDetailsReportPage = ({ onNavigate }) => {
  // Dummy data for branch order details
  const branchOrderData = [
    {
      branchOrderNumber: "BO-2025-001",
      branchName: "Nedbank Sandton",
      orderDate: "2025-01-15",
      status: "Complete",
      totalCards: 2500,
      completedCards: 2500,
    },
    {
      branchOrderNumber: "BO-2025-002",
      branchName: "Nedbank Rosebank",
      orderDate: "2025-01-16",
      status: "Complete",
      totalCards: 1800,
      completedCards: 1800,
    },
    {
      branchOrderNumber: "BO-2025-003",
      branchName: "Nedbank Fourways",
      orderDate: "2025-01-17",
      status: "Complete",
      totalCards: 3200,
      completedCards: 3200,
    },
    {
      branchOrderNumber: "BO-2025-004",
      branchName: "Nedbank Midrand",
      orderDate: "2025-01-18",
      status: "Complete",
      totalCards: 1500,
      completedCards: 1500,
    },
    {
      branchOrderNumber: "BO-2025-005",
      branchName: "Nedbank Centurion",
      orderDate: "2025-01-19",
      status: "Complete",
      totalCards: 2800,
      completedCards: 2800,
    },
  ];

  const handleExportToPDF = () => {
    // Simulate PDF export
    console.log("Exporting Branch Order Details to PDF...");
    alert("PDF export functionality would be implemented here");
  };

  const handlePrint = () => {
    // Create a new window for the print report
    const printWindow = window.open("", "_blank", "width=800,height=600");

    // Get the first branch order
    const firstOrder = branchOrderData[0];

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Branch Order Report - ${firstOrder.branchOrderNumber}</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              margin: 20px;
              background: white;
              color: black;
              page-break-after: always;
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
            .branch-order-number {
              font-size: 28px;
              font-weight: bold;
              text-align: center;
              margin: 40px 0 20px 0;
              border: 2px solid black;
              padding: 20px;
              background-color: #f8f8f8;
            }
            .branch-order-barcode {
              text-align: center;
              margin: 20px 0;
              border: 1px solid #ccc;
              padding: 15px;
              background-color: #f9f9f9;
            }
            .branch-order-barcode .barcode-text {
              font-size: 12px;
              font-weight: bold;
              text-align: center;
              margin-top: 5px;
            }
            .order-details {
              margin: 30px 0;
              border: 1px solid black;
              padding: 20px;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
              font-size: 14px;
            }
            .detail-label {
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
              <div class="barcode-text">BO-2025-001</div>
            </div>
            <div class="title">BRANCH ORDER REPORT</div>
            <div class="subtitle">GD System - Branch Operations</div>
            <div class="date">Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
          </div>
          
          <div class="branch-order-number">
            ${firstOrder.branchOrderNumber}
          </div>
          
          <div class="branch-order-barcode">
            <img src="/barcode.png" alt="Branch Order Barcode" style="max-width: 300px; height: auto; margin: 10px 0;">
            <div class="barcode-text">${firstOrder.branchOrderNumber}</div>
          </div>
          
          <div class="order-details">
            <div class="detail-row">
              <span class="detail-label">Branch Name:</span>
              <span>${firstOrder.branchName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Order Date:</span>
              <span>${firstOrder.orderDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status:</span>
              <span>${firstOrder.status}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Total Cards:</span>
              <span>${firstOrder.totalCards.toLocaleString()}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Completed Cards:</span>
              <span>${firstOrder.completedCards.toLocaleString()}</span>
            </div>
          </div>
          
          <div class="footer">
            <div>Report generated by GD System</div>
            <div>Page 1 of ${branchOrderData.length}</div>
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

  return (
    <MainNavigationLayout onNavigate={onNavigate}>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Branch Order Details Report
              </h1>
              <p className="mt-2 text-gray-600">
                Overview of branch orders and their current status
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
                Print Branch Orders
              </button>
            </div>
          </div>

          {/* Report Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Branch Orders
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Branch Order Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Branch Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Cards
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completed Cards
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {branchOrderData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {row.branchOrderNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.branchName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.orderDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.totalCards.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                        {row.completedCards.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    Total Orders
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {branchOrderData.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-purple-600"
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
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Cards
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {branchOrderData
                      .reduce((sum, row) => sum + row.totalCards, 0)
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
                  <p className="text-sm font-medium text-gray-600">
                    Completed Cards
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {branchOrderData
                      .reduce((sum, row) => sum + row.completedCards, 0)
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

export default BranchOrderDetailsReportPage;
