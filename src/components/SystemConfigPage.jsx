import React, { useState } from "react";
import MainNavigationLayout from "./MainNavigationLayout";
import {
  UserGroupIcon,
  BuildingOfficeIcon,
  TruckIcon,
  CogIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const SystemConfigPage = ({ onNavigate, currentPage }) => {
  const [selectedCourier, setSelectedCourier] = useState("");
  const [selectedConfigTab, setSelectedConfigTab] = useState("General");

  const couriers = [
    {
      id: "CCD",
      name: "CCD",
      contactPerson: "David Wilson",
      phone: "+27 11 555 0123",
      email: "david.wilson@ccd.co.za",
      address: "123 Main Street, Johannesburg, 2000",
      status: "Active",
      generalNotes: "Primary courier for banking clients",
      contacts: [
        {
          name: "David Wilson",
          role: "Operations Manager",
          phone: "+27 11 555 0123",
          email: "david.wilson@ccd.co.za",
        },
        {
          name: "Sarah Johnson",
          role: "Customer Service",
          phone: "+27 11 555 0124",
          email: "sarah.johnson@ccd.co.za",
        },
        {
          name: "Mike Brown",
          role: "Dispatch",
          phone: "+27 11 555 0125",
          email: "mike.brown@ccd.co.za",
        },
      ],
      approvedUsers: [
        {
          username: "ccd_user1",
          fullName: "John Smith",
          role: "Operator",
          status: "Active",
        },
        {
          username: "ccd_user2",
          fullName: "Jane Doe",
          role: "Supervisor",
          status: "Active",
        },
        {
          username: "ccd_user3",
          fullName: "Bob Wilson",
          role: "Manager",
          status: "Active",
        },
      ],
    },
    {
      id: "DSV",
      name: "DSV",
      contactPerson: "Lisa Anderson",
      phone: "+27 11 555 0456",
      email: "lisa.anderson@dsv.com",
      address: "456 Business Park, Cape Town, 8000",
      status: "Active",
      generalNotes: "International logistics partner",
      contacts: [
        {
          name: "Lisa Anderson",
          role: "Account Manager",
          phone: "+27 11 555 0456",
          email: "lisa.anderson@dsv.com",
        },
        {
          name: "Tom Davis",
          role: "Operations",
          phone: "+27 11 555 0457",
          email: "tom.davis@dsv.com",
        },
        {
          name: "Emma Wilson",
          role: "Customer Support",
          phone: "+27 11 555 0458",
          email: "emma.wilson@dsv.com",
        },
      ],
      approvedUsers: [
        {
          username: "dsv_user1",
          fullName: "Alice Johnson",
          role: "Operator",
          status: "Active",
        },
        {
          username: "dsv_user2",
          fullName: "Charlie Brown",
          role: "Supervisor",
          status: "Active",
        },
      ],
    },
    {
      id: "FedEx",
      name: "FedEx",
      contactPerson: "Robert Taylor",
      phone: "+27 11 555 0789",
      email: "robert.taylor@fedex.com",
      address: "789 Logistics Way, Durban, 4000",
      status: "Active",
      generalNotes: "Express delivery services",
      contacts: [
        {
          name: "Robert Taylor",
          role: "Senior Manager",
          phone: "+27 11 555 0789",
          email: "robert.taylor@fedex.com",
        },
        {
          name: "Helen Green",
          role: "Operations",
          phone: "+27 11 555 0790",
          email: "helen.green@fedex.com",
        },
      ],
      approvedUsers: [
        {
          username: "fedex_user1",
          fullName: "David Lee",
          role: "Operator",
          status: "Active",
        },
        {
          username: "fedex_user2",
          fullName: "Mary White",
          role: "Supervisor",
          status: "Active",
        },
      ],
    },
  ];

  const configTabs = [
    { id: "General", name: "General" },
    { id: "Contacts", name: "Contacts" },
    { id: "Approved Users", name: "Approved Users" },
  ];

  const renderGeneralTab = () => {
    if (!selectedCourier) return null;
    const courier = couriers.find((c) => c.id === selectedCourier);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              General Information - {courier.name}
            </h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Edit Configuration
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Courier Name
                </label>
                <p className="text-sm text-gray-900">{courier.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {courier.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  General Notes
                </label>
                <p className="text-sm text-gray-900">{courier.generalNotes}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Contact
                </label>
                <p className="text-sm text-gray-900">{courier.contactPerson}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <p className="text-sm text-gray-900 flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />
                  {courier.phone}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-sm text-gray-900 flex items-center">
                  <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-500" />
                  {courier.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <p className="text-sm text-gray-900 flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
                  {courier.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContactsTab = () => {
    if (!selectedCourier) return null;
    const courier = couriers.find((c) => c.id === selectedCourier);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Contacts - {courier.name}
            </h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Add New Contact
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courier.contacts.map((contact, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contact.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contact.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contact.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderApprovedUsersTab = () => {
    if (!selectedCourier) return null;
    const courier = couriers.find((c) => c.id === selectedCourier);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Approved Users - {courier.name}
            </h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Add New User
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courier.approvedUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainNavigationLayout onNavigate={onNavigate} currentPage={currentPage}>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center">
              <CogIcon className="h-8 w-8 text-gray-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Courier Configuration
                </h1>
                <p className="mt-2 text-gray-600">
                  Manage courier information, contacts, and approved users
                </p>
              </div>
            </div>
          </div>

          {/* Courier Selection and Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Courier List - Left Side */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Courier
                </h3>
                <div className="space-y-2">
                  {couriers.map((courier) => (
                    <button
                      key={courier.id}
                      onClick={() => setSelectedCourier(courier.id)}
                      className={`w-full text-left p-3 rounded-md border transition-colors ${
                        selectedCourier === courier.id
                          ? "bg-blue-50 border-blue-300 text-blue-900"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center">
                        <TruckIcon className="h-5 w-5 mr-2" />
                        <div>
                          <div className="font-medium">{courier.name}</div>
                          <div className="text-sm text-gray-500">
                            {courier.contactPerson}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Configuration Tabs - Right Side */}
            <div className="lg:col-span-3">
              {selectedCourier ? (
                <div>
                  {/* Configuration Tab Navigation */}
                  <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8">
                      {configTabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setSelectedConfigTab(tab.id)}
                          className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                            selectedConfigTab === tab.id
                              ? "border-blue-500 text-blue-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          {tab.name}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Configuration Tab Content */}
                  <div className="mt-6">
                    {selectedConfigTab === "General" && renderGeneralTab()}
                    {selectedConfigTab === "Contacts" && renderContactsTab()}
                    {selectedConfigTab === "Approved Users" &&
                      renderApprovedUsersTab()}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <TruckIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Courier Selected
                  </h3>
                  <p className="text-gray-500">
                    Select a courier from the list on the left to view and
                    manage their configuration.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainNavigationLayout>
  );
};

export default SystemConfigPage;
