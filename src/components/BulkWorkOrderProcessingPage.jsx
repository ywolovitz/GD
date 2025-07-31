import React, { useState } from "react";
import MainNavigationLayout from "./MainNavigationLayout";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const BulkWorkOrderProcessingPage = ({ onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState("2015-05-12");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Products");
  const [completionData, setCompletionData] = useState({
    emboss: 0,
    check: 0,
    pack: 0,
    dispatch: 0,
  });

  // Mock data for work orders
  const workOrders = [
    {
      id: "1676",
      fileName: "NP114309120515180",
      orderDate: "2025/05/12",
      quantity: 6811,
      done: 0,
    },
  ];

  // Mock data for products
  const products = [
    {
      id: "43...",
      code: "EMD4",
      description: "EMD41205151800WE",
      quantity: 3040,
      done: 0,
    },
    {
      id: "43...",
      code: "EMD7",
      description: "EMD71205151800WE",
      quantity: 1700,
      done: 0,
    },
    {
      id: "43...",
      code: "EMD8",
      description: "EMD81205151800WE",
      quantity: 1460,
      done: 0,
    },
    {
      id: "43...",
      code: "EMD9",
      description: "EMD91205151800WE",
      quantity: 271,
      done: 0,
    },
    {
      id: "43...",
      code: "EME5",
      description: "EME51205151800WE",
      quantity: 340,
      done: 0,
    },
  ];

  // Set the first work order as selected by default
  React.useEffect(() => {
    if (workOrders.length > 0 && !selectedWorkOrder) {
      setSelectedWorkOrder(workOrders[0]);
    }
  }, [workOrders, selectedWorkOrder]);

  const tabs = [
    "Products",
    "WorkFlow Details",
    "Dispatch Details",
    "Journal Details",
  ];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleCompletionChange = (step, value) => {
    setCompletionData((prev) => ({
      ...prev,
      [step]: parseInt(value) || 0,
    }));
  };

  const handleUpdate = () => {
    // Handle update logic here
    console.log("Updating completion data:", completionData);
  };

  const totalDownloaded = 3040;
  const totalProcessed = Object.values(completionData).reduce(
    (sum, val) => sum + val,
    0
  );
  const totalRemaining = totalDownloaded - totalProcessed;

  return (
    <MainNavigationLayout onNavigate={onNavigate}>
      <div className="p-6 h-screen flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Bulk Work Order Processing
          </h1>
          <p className="text-gray-600 mt-1">
            Process bulk work orders and track completion status
          </p>
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Production Date
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <CalendarIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Left Panel - Work Order List */}
          <div className="w-2/5 bg-white rounded-lg shadow border flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="mb-3">
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Nedbank No Mailers</option>
                </select>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Work Orders</h3>
            </div>
            <div className="flex-1 overflow-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                      ID
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                      File Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                      Order Date
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                      Done
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workOrders.map((order, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedWorkOrder === order
                          ? "bg-blue-100 border-l-4 border-blue-500"
                          : ""
                      }`}
                      onClick={() => setSelectedWorkOrder(order)}
                    >
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {order.fileName}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {order.orderDate}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {order.quantity}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {order.done}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Panel - Product Details */}
          <div className="w-3/5 bg-white rounded-lg shadow border flex flex-col">
            <div className="border-b border-gray-200">
              <div className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      selectedTab === tab
                        ? "border-blue-500 text-blue-600 bg-blue-50"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 p-4 overflow-hidden">
              {selectedTab === "Products" && (
                <div className="h-full overflow-auto">
                  {selectedWorkOrder && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <h4 className="text-sm font-medium text-blue-900">
                        Products for Work Order: {selectedWorkOrder.fileName}
                      </h4>
                      <p className="text-xs text-blue-700 mt-1">
                        Order Date: {selectedWorkOrder.orderDate} | Quantity:{" "}
                        {selectedWorkOrder.quantity}
                      </p>
                    </div>
                  )}
                  <table className="min-w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Code
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Done
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {product.id}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {product.code}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {product.description}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {product.quantity}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {product.done}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {selectedTab !== "Products" && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p className="text-lg font-medium mb-2">{selectedTab}</p>
                    <p className="text-sm">Details will be displayed here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section - Completion Tracking */}
        <div className="mt-6 bg-white rounded-lg shadow border">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Enter Completed Cards per Step
            </h3>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border border-gray-200">
                      Step
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-500 border border-gray-200">
                      EMBOSS
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-500 border border-gray-200">
                      CHECK
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-500 border border-gray-200">
                      PACK
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-500 border border-gray-200">
                      DISPATCH
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200">
                      Downloaded
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-center border border-gray-200">
                      {totalDownloaded}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-center border border-gray-200">
                      {totalDownloaded}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-center border border-gray-200">
                      {totalDownloaded}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-center border border-gray-200">
                      {totalDownloaded}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200">
                      Processed
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-center border border-gray-200">
                      {completionData.emboss}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-center border border-gray-200">
                      {completionData.check}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-center border border-gray-200">
                      {completionData.pack}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-center border border-gray-200">
                      {completionData.dispatch}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200">
                      Remaining
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-center border border-gray-200">
                      {totalDownloaded - completionData.emboss}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-center border border-gray-200">
                      {totalDownloaded - completionData.check}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-center border border-gray-200">
                      {totalDownloaded - completionData.pack}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-center border border-gray-200">
                      {totalDownloaded - completionData.dispatch}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200">
                      Enter Completed
                    </td>
                    <td className="px-4 py-2 text-center border border-gray-200">
                      <input
                        type="number"
                        value={completionData.emboss}
                        onChange={(e) =>
                          handleCompletionChange("emboss", e.target.value)
                        }
                        className="w-20 px-2 py-1 text-sm border border-gray-300 rounded text-center"
                      />
                    </td>
                    <td className="px-4 py-2 text-center border border-gray-200">
                      <input
                        type="number"
                        value={completionData.check}
                        onChange={(e) =>
                          handleCompletionChange("check", e.target.value)
                        }
                        className="w-20 px-2 py-1 text-sm border border-gray-300 rounded text-center"
                      />
                    </td>
                    <td className="px-4 py-2 text-center border border-gray-200">
                      <input
                        type="number"
                        value={completionData.pack}
                        onChange={(e) =>
                          handleCompletionChange("pack", e.target.value)
                        }
                        className="w-20 px-2 py-1 text-sm border border-gray-300 rounded text-center"
                      />
                    </td>
                    <td className="px-4 py-2 text-center border border-gray-200">
                      <input
                        type="number"
                        value={completionData.dispatch}
                        onChange={(e) =>
                          handleCompletionChange("dispatch", e.target.value)
                        }
                        className="w-20 px-2 py-1 text-sm border border-gray-300 rounded text-center"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainNavigationLayout>
  );
};

export default BulkWorkOrderProcessingPage;
