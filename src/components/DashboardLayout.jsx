import React, { useState, useEffect } from "react";
import {
  ArrowRightIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowUturnRightIcon,
  CheckCircleIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

const DashboardLayout = () => {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [scanInput, setScanInput] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isBlazorView, setIsBlazorView] = useState(false);

  const playScanSound = () => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Set a gentle frequency (880 Hz - A5 note)
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);

    // Set a gentle volume
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

    // Fade out
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.3
    );

    // Start and stop the tone
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  // Dummy data for batches
  const batches = [
    { id: "2025-05-28-BANKABC-001", dateCreated: "2025-05-28", cardCount: 350 },
    { id: "2025-05-28-BANKABC-002", dateCreated: "2025-05-28", cardCount: 280 },
    { id: "2025-05-27-BANKABC-003", dateCreated: "2025-05-27", cardCount: 420 },
    { id: "2025-05-27-BANKABC-004", dateCreated: "2025-05-27", cardCount: 150 },
    { id: "2025-05-26-BANKABC-005", dateCreated: "2025-05-26", cardCount: 320 },
  ];

  // Dummy data for cards with timestamps
  const cards = [
    {
      id: "CARD001",
      status: "success",
      lastFour: "1234",
      type: "Credit",
      scannedAt: "2024-03-20 09:15:23",
    },
    {
      id: "CARD002",
      status: "success",
      lastFour: "5678",
      type: "Debit",
      scannedAt: "2024-03-20 09:15:45",
    },
    {
      id: "CARD003",
      status: "pending",
      lastFour: "9012",
      type: "Credit",
      scannedAt: "2024-03-20 09:16:12",
    },
    {
      id: "CARD004",
      status: "success",
      lastFour: "3456",
      type: "Debit",
      scannedAt: "2024-03-20 09:16:34",
    },
    {
      id: "CARD005",
      status: "pending",
      lastFour: "7890",
      type: "Credit",
      scannedAt: "2024-03-20 09:17:01",
    },
    {
      id: "CARD006",
      status: "success",
      lastFour: "2345",
      type: "Debit",
      scannedAt: "2024-03-20 09:17:23",
    },
    {
      id: "CARD007",
      status: "card not in batch",
      lastFour: "6789",
      type: "Credit",
      scannedAt: "2024-03-20 09:17:45",
    },
    {
      id: "CARD008",
      status: "success",
      lastFour: "1357",
      type: "Debit",
      scannedAt: "2024-03-20 09:18:07",
    },
    {
      id: "CARD009",
      status: "success",
      lastFour: "2468",
      type: "Credit",
      scannedAt: "2024-03-20 09:18:29",
    },
    {
      id: "CARD010",
      status: "success",
      lastFour: "3579",
      type: "Debit",
      scannedAt: "2024-03-20 09:18:51",
    },
    {
      id: "CARD011",
      status: "pending",
      lastFour: "4680",
      type: "Credit",
      scannedAt: "2024-03-20 09:19:13",
    },
    {
      id: "CARD012",
      status: "success",
      lastFour: "5791",
      type: "Debit",
      scannedAt: "2024-03-20 09:19:35",
    },
    {
      id: "CARD013",
      status: "success",
      lastFour: "6802",
      type: "Credit",
      scannedAt: "2024-03-20 09:19:57",
    },
    {
      id: "CARD014",
      status: "success",
      lastFour: "7913",
      type: "Debit",
      scannedAt: "2024-03-20 09:20:19",
    },
    {
      id: "CARD015",
      status: "success",
      lastFour: "8024",
      type: "Credit",
      scannedAt: "2024-03-20 09:20:41",
    },
    {
      id: "CARD016",
      status: "success",
      lastFour: "9135",
      type: "Debit",
      scannedAt: "2024-03-20 09:21:03",
    },
    {
      id: "CARD017",
      status: "success",
      lastFour: "0246",
      type: "Credit",
      scannedAt: "2024-03-20 09:21:25",
    },
    {
      id: "CARD018",
      status: "success",
      lastFour: "1357",
      type: "Debit",
      scannedAt: "2024-03-20 09:21:47",
    },
    {
      id: "CARD019",
      status: "success",
      lastFour: "2468",
      type: "Credit",
      scannedAt: "2024-03-20 09:22:09",
    },
    {
      id: "CARD020",
      status: "success",
      lastFour: "3579",
      type: "Debit",
      scannedAt: "2024-03-20 09:22:31",
    },
    {
      id: "CARD021",
      status: "success",
      lastFour: "4680",
      type: "Credit",
      scannedAt: "2024-03-20 09:22:53",
    },
    {
      id: "CARD022",
      status: "success",
      lastFour: "5791",
      type: "Debit",
      scannedAt: "2024-03-20 09:23:15",
    },
    {
      id: "CARD023",
      status: "success",
      lastFour: "6802",
      type: "Credit",
      scannedAt: "2024-03-20 09:23:37",
    },
    {
      id: "CARD024",
      status: "success",
      lastFour: "7913",
      type: "Debit",
      scannedAt: "2024-03-20 09:23:59",
    },
    {
      id: "CARD025",
      status: "success",
      lastFour: "8024",
      type: "Credit",
      scannedAt: "2024-03-20 09:24:21",
    },
    {
      id: "CARD026",
      status: "success",
      lastFour: "9135",
      type: "Debit",
      scannedAt: "2024-03-20 09:24:43",
    },
    {
      id: "CARD027",
      status: "success",
      lastFour: "0246",
      type: "Credit",
      scannedAt: "2024-03-20 09:25:05",
    },
    {
      id: "CARD028",
      status: "success",
      lastFour: "1357",
      type: "Debit",
      scannedAt: "2024-03-20 09:25:27",
    },
    {
      id: "CARD029",
      status: "success",
      lastFour: "2468",
      type: "Credit",
      scannedAt: "2024-03-20 09:25:49",
    },
    {
      id: "CARD030",
      status: "success",
      lastFour: "3579",
      type: "Debit",
      scannedAt: "2024-03-20 09:26:11",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "card not in batch":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <ChevronUpIcon className="h-4 w-4 text-gray-400" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUpIcon className="h-4 w-4 text-gray-900" />
    ) : (
      <ChevronDownIcon className="h-4 w-4 text-gray-900" />
    );
  };

  const handleScan = (e) => {
    if (e.key === "Enter") {
      playScanSound();
      setShowToast(true);
      setScanInput("");
      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <div
      className={`min-h-screen ${isBlazorView ? "bg-[#1a1a1a]" : "bg-gray-50"}`}
    >
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
          <div
            className={`${
              isBlazorView
                ? "bg-[#2d2d2d] border-[#0078d4]"
                : "bg-green-50 border-green-400"
            } border-l-4 p-4 rounded-md shadow-lg`}
          >
            <div className="flex items-center">
              <CheckCircleIcon
                className={`h-5 w-5 ${
                  isBlazorView ? "text-[#0078d4]" : "text-green-400"
                }`}
              />
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${
                    isBlazorView ? "text-white" : "text-green-800"
                  }`}
                >
                  Card in batch!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Dashboard */}
      <div
        className={`${isBlazorView ? "bg-[#2d2d2d]" : "bg-white"} shadow-sm`}
      >
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Batches to be dispatched */}
            <div
              className={`${
                isBlazorView ? "bg-[#1a1a1a]" : "bg-blue-50"
              } rounded-lg p-6`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      isBlazorView ? "text-[#0078d4]" : "text-blue-600"
                    }`}
                  >
                    To Be Dispatched
                  </p>
                  <p
                    className={`mt-2 text-3xl font-semibold ${
                      isBlazorView ? "text-white" : "text-blue-900"
                    }`}
                  >
                    12
                  </p>
                </div>
                <button
                  className={`${
                    isBlazorView
                      ? "text-[#0078d4] hover:text-[#1a88d4]"
                      : "text-blue-600 hover:text-blue-800"
                  } flex items-center text-sm font-medium`}
                >
                  Details
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Last 7 days dispatched */}
            <div
              className={`${
                isBlazorView ? "bg-[#1a1a1a]" : "bg-green-50"
              } rounded-lg p-6`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      isBlazorView ? "text-[#0078d4]" : "text-green-600"
                    }`}
                  >
                    Dispatched (7 Days)
                  </p>
                  <p
                    className={`mt-2 text-3xl font-semibold ${
                      isBlazorView ? "text-white" : "text-green-900"
                    }`}
                  >
                    45
                  </p>
                </div>
                <button
                  className={`${
                    isBlazorView
                      ? "text-[#0078d4] hover:text-[#1a88d4]"
                      : "text-green-600 hover:text-green-800"
                  } flex items-center text-sm font-medium`}
                >
                  Details
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Total dispatched */}
            <div
              className={`${
                isBlazorView ? "bg-[#1a1a1a]" : "bg-purple-50"
              } rounded-lg p-6`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      isBlazorView ? "text-[#0078d4]" : "text-purple-600"
                    }`}
                  >
                    Total Dispatched
                  </p>
                  <p
                    className={`mt-2 text-3xl font-semibold ${
                      isBlazorView ? "text-white" : "text-purple-900"
                    }`}
                  >
                    1,234
                  </p>
                </div>
                <button
                  className={`${
                    isBlazorView
                      ? "text-[#0078d4] hover:text-[#1a88d4]"
                      : "text-purple-600 hover:text-purple-800"
                  } flex items-center text-sm font-medium`}
                >
                  Details
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[95%] mx-auto px-2 sm:px-4 lg:px-6 py-6">
        <div className="flex gap-4 h-[calc(100vh-220px)]">
          {/* Left Sidebar - Batches List */}
          <div
            className={`w-[400px] ${
              isBlazorView ? "bg-[#2d2d2d]" : "bg-white"
            } rounded-lg shadow-sm flex flex-col`}
          >
            <div className="p-3 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Batches to Scan
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[45%]">
                      Batch ID
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[25%]">
                      Date
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[30%]">
                      Cards
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {batches.map((batch) => (
                    <tr
                      key={batch.id}
                      onClick={() => setSelectedBatch(batch)}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedBatch?.id === batch.id ? "bg-green-50" : ""
                      }`}
                    >
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        {batch.id}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                        {batch.dateCreated}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                        {batch.cardCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Batch Summary Card */}
            {selectedBatch && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Batch Summary
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {selectedBatch.id}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Total Cards</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {selectedBatch.cardCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Scanned</p>
                      <p className="mt-1 text-sm font-medium text-green-600">
                        122
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pending</p>
                      <p className="mt-1 text-sm font-medium text-yellow-600">
                        228
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Errors</p>
                      <p className="mt-1 text-sm font-medium text-red-600">1</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duplicate Scans</p>
                      <p className="mt-1 text-sm font-medium text-orange-600">
                        2
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Last Scan</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          2024-03-20 09:26:11
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Scanned By</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          Tristan Jacobs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area - Card List */}
          <div
            className={`flex-1 ${
              isBlazorView ? "bg-[#2d2d2d]" : "bg-white"
            } rounded-lg shadow-sm flex flex-col`}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg text-gray-900">
                    {selectedBatch
                      ? `Batch ${selectedBatch.id}`
                      : "Select a batch to begin scanning"}
                  </h2>
                  {selectedBatch && (
                    <span className="text-sm text-gray-500">
                      (17/{selectedBatch.cardCount})
                    </span>
                  )}
                </div>
                {selectedBatch && (
                  <div className="flex gap-3 items-center">
                    <div className="relative">
                      <input
                        type="text"
                        className="block w-64 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        placeholder="Scan card..."
                        value={scanInput}
                        onChange={(e) => setScanInput(e.target.value)}
                        onKeyDown={handleScan}
                        autoFocus
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <ArrowUturnRightIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                      Start Scanning
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                      Pause Scanning
                    </button>
                  </div>
                )}
              </div>
              {selectedBatch && (
                <div className="mt-3">
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: `${(17 / selectedBatch.cardCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto">
              {selectedBatch ? (
                <div className="p-4">
                  {/* Search and Filter Bar */}
                  <div className="mb-4 flex gap-4">
                    <div className="flex-1 relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        placeholder="Search cards..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="w-48">
                      <select
                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">All Statuses</option>
                        <option value="success">Success</option>
                        <option value="pending">Pending</option>
                        <option value="card not in batch">
                          Card Not in Batch
                        </option>
                      </select>
                    </div>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("id")}
                        >
                          <div className="flex items-center gap-1">
                            Card ID
                            {getSortIcon("id")}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("lastFour")}
                        >
                          <div className="flex items-center gap-1">
                            Last 4 Digits
                            {getSortIcon("lastFour")}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("type")}
                        >
                          <div className="flex items-center gap-1">
                            Type
                            {getSortIcon("type")}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("status")}
                        >
                          <div className="flex items-center gap-1">
                            Status
                            {getSortIcon("status")}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("scannedAt")}
                        >
                          <div className="flex items-center gap-1">
                            Scanned At
                            {getSortIcon("scannedAt")}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cards
                        .filter(
                          (card) =>
                            (statusFilter === "all" ||
                              card.status === statusFilter) &&
                            (card.id
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                              card.lastFour.includes(searchQuery) ||
                              card.type
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                              card.status
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()))
                        )
                        .sort((a, b) => {
                          if (!sortField) return 0;
                          const aValue = a[sortField];
                          const bValue = b[sortField];
                          const modifier = sortDirection === "asc" ? 1 : -1;
                          return aValue.localeCompare(bValue) * modifier;
                        })
                        .map((card) => (
                          <tr key={card.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {card.id}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              ****{card.lastFour}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {card.type}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                  card.status
                                )}`}
                              >
                                {card.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {card.scannedAt}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-gray-400 hover:text-gray-500">
                                <EllipsisVerticalIcon className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select a batch to begin scanning
                </div>
              )}
            </div>
            {/* Action Bar */}
            {selectedBatch && (
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                <div className="flex justify-end gap-3">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Close Batch
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Print Batch
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Assign to Courier
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Print Packing Label
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Toggle Button */}
      <button
        onClick={() => setIsBlazorView(!isBlazorView)}
        className={`fixed bottom-4 right-4 p-2 rounded-full shadow-lg ${
          isBlazorView
            ? "bg-[#0078d4] hover:bg-[#1a88d4]"
            : "bg-gray-800 hover:bg-gray-700"
        } transition-colors duration-200`}
      >
        {isBlazorView ? (
          <SunIcon className="h-5 w-5 text-white" />
        ) : (
          <MoonIcon className="h-5 w-5 text-white" />
        )}
      </button>
    </div>
  );
};

export default DashboardLayout;
