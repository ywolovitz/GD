import React, { useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  PrinterIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const BatchScanningPage = () => {
  const [autoScroll, setAutoScroll] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for recent scans
  const recentScans = [
    {
      id: "8952341",
      recipient: "John Mokoena",
      status: "Scanned",
      bin: "Bin 3",
      time: "14:05:22",
    },
    {
      id: "8952342",
      recipient: "Nandi Mokoena",
      status: "Packed",
      bin: "Bin 3",
      time: "14:06:03",
    },
    {
      id: "8952343",
      recipient: "Ayanda Smith",
      status: "Error",
      bin: "—",
      time: "—",
    },
  ];

  // Dummy data for full card list
  const cardList = [
    {
      id: "8952341",
      recipient: "John Mokoena",
      status: "Scanned",
      address: "JHB",
      bin: "Bin 3",
      courier: "—",
    },
    {
      id: "8952342",
      recipient: "Nandi Mokoena",
      status: "Packed",
      address: "PTA",
      bin: "Bin 3",
      courier: "—",
    },
    {
      id: "8952343",
      recipient: "Ayanda Smith",
      status: "Error",
      address: "CPT",
      bin: "—",
      courier: "—",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top Header - Batch Metadata Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Batch ID</p>
            <p className="font-semibold">2025-05-28-BANKABC-001</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-semibold text-blue-600">In Progress</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Cards</p>
            <p className="font-semibold">350</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Cards Scanned</p>
            <p className="font-semibold">122</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Cards Packed</p>
            <p className="font-semibold">95</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Product</p>
            <p className="font-semibold">Gold Debit</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Template</p>
            <p className="font-semibold">Promo May2025</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Courier Assigned</p>
            <p className="font-semibold text-gray-400">None</p>
          </div>
        </div>
      </div>

      {/* Batch Summary & Controls */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 mr-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "35%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">35% scanned</p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
              <PlayIcon className="h-5 w-5 mr-2" />
              Start Scan Session
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <PauseIcon className="h-5 w-5 mr-2" />
              Pause
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <PrinterIcon className="h-5 w-5 mr-2" />
              Print Summary
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-500">Last Scanned: 3 minutes ago</p>
          <select className="border rounded-lg px-3 py-1">
            <option>Filter by Bin</option>
          </select>
          <select className="border rounded-lg px-3 py-1">
            <option>Filter by Status</option>
          </select>
          <select className="border rounded-lg px-3 py-1">
            <option>Filter by Recipient</option>
          </select>
        </div>
      </div>

      {/* Scanning Console */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scan Card Barcode
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Scan or enter barcode..."
          />
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`px-3 py-1 rounded-lg ${
              autoScroll
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Auto-scroll {autoScroll ? "ON" : "OFF"}
          </button>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600"
          >
            {soundEnabled ? (
              <SpeakerWaveIcon className="h-5 w-5" />
            ) : (
              <SpeakerXMarkIcon className="h-5 w-5" />
            )}
          </button>
          <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 flex items-center">
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Clear List
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Card ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Bin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Time Scanned
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentScans.map((scan) => (
                <tr key={scan.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {scan.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {scan.recipient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {scan.status === "Scanned" && (
                      <span className="text-status-green">✅ Scanned</span>
                    )}
                    {scan.status === "Packed" && (
                      <span className="text-status-yellow">📦 Packed</span>
                    )}
                    {scan.status === "Error" && (
                      <span className="text-status-red">❌ Error</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {scan.bin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {scan.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card Drill-down Table */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search cards..."
              className="w-full border rounded-lg pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Card ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Bin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Courier
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cardList.map((card) => (
                <tr key={card.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {card.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {card.recipient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {card.status === "Scanned" && (
                      <span className="text-status-green">Scanned</span>
                    )}
                    {card.status === "Packed" && (
                      <span className="text-status-yellow">Packed</span>
                    )}
                    {card.status === "Error" && (
                      <span className="text-status-red">Error</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {card.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {card.bin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {card.courier}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Courier Assignment Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-4">
          <select className="border rounded-lg px-4 py-2">
            <option>Select Courier</option>
            <option>Courier A</option>
            <option>Courier B</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <PrinterIcon className="h-5 w-5 mr-2" />
            Generate Delivery Sheet (PDF)
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
            <PrinterIcon className="h-5 w-5 mr-2" />
            Print Package Label
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-500">
            Shipment Barcode:{" "}
            <span className="font-mono">SHIP-2025-000239</span>
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Mark Batch as Ready for Dispatch
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchScanningPage;
