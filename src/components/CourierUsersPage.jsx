import React, { useState } from "react";
import MainNavigationLayout from "./MainNavigationLayout";
import {
  UserGroupIcon,
  TruckIcon,
  PlusIcon,
  XMarkIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const CourierUsersPage = ({ onNavigate, currentPage }) => {
  const [selectedCourier, setSelectedCourier] = useState("CCD");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showUserLogsModal, setShowUserLogsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const couriers = ["CCD", "DSV", "FedEx", "DHL"];

  // Mock data for approved users per courier
  const [approvedUsers, setApprovedUsers] = useState({
    CCD: [
      {
        id: 1,
        name: "John",
        lastName: "Wilson",
        email: "john.wilson@ccd.co.za",
        mobile: "+27 82 123 4567",
        status: "Active",
        lastLogin: "2024-01-15 14:30:00",
        totalLogins: 45,
      },
      {
        id: 2,
        name: "Sarah",
        lastName: "Thompson",
        email: "sarah.thompson@ccd.co.za",
        mobile: "+27 82 234 5678",
        status: "Active",
        lastLogin: "2024-01-15 16:45:00",
        totalLogins: 32,
      },
    ],
    DSV: [
      {
        id: 3,
        name: "Michael",
        lastName: "Anderson",
        email: "michael.anderson@dsv.co.za",
        mobile: "+27 82 345 6789",
        status: "Active",
        lastLogin: "2024-01-15 15:20:00",
        totalLogins: 28,
      },
    ],
    FedEx: [
      {
        id: 4,
        name: "Lisa",
        lastName: "Brown",
        email: "lisa.brown@fedex.co.za",
        mobile: "+27 82 456 7890",
        status: "Inactive",
        lastLogin: "2024-01-10 09:15:00",
        totalLogins: 12,
      },
    ],
    DHL: [],
  });

  const handleViewLogs = (user) => {
    setSelectedUser(user);
    setShowUserLogsModal(true);
  };

  const handleCloseLogsModal = () => {
    setShowUserLogsModal(false);
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleCloseAddUserModal = () => {
    setShowAddUserModal(false);
  };

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <MainNavigationLayout onNavigate={onNavigate} currentPage={currentPage}>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center">
              <UserGroupIcon className="h-8 w-8 text-gray-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Courier Users
                </h1>
                <p className="mt-2 text-gray-600">
                  Manage approved users for each courier
                </p>
              </div>
            </div>
          </div>

          {/* Courier Selection */}
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Select Courier
                  </h2>
                  <div className="flex space-x-4">
                    {couriers.map((courier) => (
                      <button
                        key={courier}
                        onClick={() => setSelectedCourier(courier)}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${
                          selectedCourier === courier
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <div className="flex items-center">
                          <TruckIcon className="h-4 w-4 mr-2" />
                          {courier}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleAddUser}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add User
                </button>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Approved Users - {selectedCourier}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {approvedUsers[selectedCourier]?.length || 0} users found
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mobile Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {approvedUsers[selectedCourier]?.length > 0 ? (
                    approvedUsers[selectedCourier].map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.mobile}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              user.status
                            )}`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewLogs(user)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Logs"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button
                              className="text-green-600 hover:text-green-900"
                              title="Edit User"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              title="Delete User"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center">
                          <UserGroupIcon className="h-12 w-12 text-gray-300 mb-2" />
                          <p className="text-lg font-medium">No users found</p>
                          <p className="text-sm">
                            No approved users for {selectedCourier}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Logs Modal */}
          {showUserLogsModal && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    User Logs - {selectedUser.name} {selectedUser.lastName}
                  </h3>
                  <button
                    onClick={handleCloseLogsModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Email:</span>{" "}
                        {selectedUser.email}
                      </div>
                      <div>
                        <span className="font-medium">Mobile:</span>{" "}
                        {selectedUser.mobile}
                      </div>
                      <div>
                        <span className="font-medium">Status:</span>{" "}
                        {selectedUser.status}
                      </div>
                      <div>
                        <span className="font-medium">Total Logins:</span>{" "}
                        {selectedUser.totalLogins}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Recent Activity
                    </h4>
                    <p className="text-sm text-gray-600">
                      User logs and activity history will be displayed here.
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      This section can be expanded to show login history,
                      dispatch activities, verification actions, and other
                      user-specific logs.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end px-6 py-4 border-t border-gray-200">
                  <button
                    onClick={handleCloseLogsModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add User Modal */}
          {showAddUserModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Add New User - {selectedCourier}
                  </h3>
                  <button
                    onClick={handleCloseAddUserModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Add user form will be implemented here with fields for name,
                    last name, email, mobile number, and status.
                  </p>
                </div>
                <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200">
                  <button
                    onClick={handleCloseAddUserModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Add User
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainNavigationLayout>
  );
};

export default CourierUsersPage;
