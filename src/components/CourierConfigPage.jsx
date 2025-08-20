import React, { useState } from "react";
import MainNavigationLayout from "./MainNavigationLayout";
import {
  TruckIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  UserGroupIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const CourierConfigPage = ({ onNavigate, currentPage }) => {
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [selectedConfigTab, setSelectedConfigTab] = useState("general");

  const couriers = [
    {
      id: 1,
      name: "CCD",
      industry: "Logistics",
      website: "www.ccd.co.za",
      address: "123 Main Street, Johannesburg, 2000",
      email: "info@ccd.co.za",
      phone: "+27 11 555 0123",
      contacts: [
        {
          name: "David Wilson",
          role: "Operations Manager",
          email: "david.wilson@ccd.co.za",
          phone: "+27 11 555 0123",
        },
        {
          name: "Sarah Johnson",
          role: "Customer Service",
          email: "sarah.johnson@ccd.co.za",
          phone: "+27 11 555 0124",
        },
        {
          name: "Mike Brown",
          role: "Dispatch",
          email: "mike.brown@ccd.co.za",
          phone: "+27 11 555 0125",
        },
      ],
      approvedUsers: [
        {
          name: "John Smith",
          email: "john.smith@ccd.co.za",
          role: "Operator",
          accessLevel: "Full",
        },
        {
          name: "Jane Doe",
          email: "jane.doe@ccd.co.za",
          role: "Supervisor",
          accessLevel: "Full",
        },
        {
          name: "Bob Wilson",
          email: "bob.wilson@ccd.co.za",
          role: "Manager",
          accessLevel: "Full",
        },
      ],
      generalNotes:
        "Primary courier for banking clients with high volume processing requirements.",
      serviceAreas: ["Gauteng", "Western Cape", "KwaZulu-Natal"],
      operatingHours: "24/7",
      fleetSize: 45,
    },
    {
      id: 2,
      name: "DSV",
      industry: "International Logistics",
      website: "www.dsv.com",
      address: "456 Business Park, Cape Town, 8000",
      email: "info@dsv.com",
      phone: "+27 11 555 0456",
      contacts: [
        {
          name: "Lisa Anderson",
          role: "Account Manager",
          email: "lisa.anderson@dsv.com",
          phone: "+27 11 555 0456",
        },
        {
          name: "Tom Davis",
          role: "Operations",
          email: "tom.davis@dsv.com",
          phone: "+27 11 555 0457",
        },
        {
          name: "Emma Wilson",
          role: "Customer Support",
          email: "emma.wilson@dsv.com",
          phone: "+27 11 555 0458",
        },
      ],
      approvedUsers: [
        {
          name: "Alice Johnson",
          email: "alice.johnson@dsv.com",
          role: "Operator",
          accessLevel: "Standard",
        },
        {
          name: "Charlie Brown",
          email: "charlie.brown@dsv.com",
          role: "Supervisor",
          accessLevel: "Full",
        },
      ],
      generalNotes:
        "International logistics partner with extensive global network.",
      serviceAreas: ["National", "International"],
      operatingHours: "Business Hours",
      fleetSize: 120,
    },
    {
      id: 3,
      name: "FedEx",
      industry: "Express Delivery",
      website: "www.fedex.com",
      address: "789 Logistics Way, Durban, 4000",
      email: "info@fedex.com",
      phone: "+27 11 555 0789",
      contacts: [
        {
          name: "Robert Taylor",
          role: "Senior Manager",
          email: "robert.taylor@fedex.com",
          phone: "+27 11 555 0789",
        },
        {
          name: "Helen Green",
          role: "Operations",
          email: "helen.green@fedex.com",
          phone: "+27 11 555 0790",
        },
      ],
      approvedUsers: [
        {
          name: "David Lee",
          email: "david.lee@fedex.com",
          role: "Operator",
          accessLevel: "Standard",
        },
        {
          name: "Mary White",
          email: "mary.white@fedex.com",
          role: "Supervisor",
          accessLevel: "Full",
        },
      ],
      generalNotes:
        "Express delivery services with premium tracking capabilities.",
      serviceAreas: ["National", "International Express"],
      operatingHours: "24/7",
      fleetSize: 85,
    },
  ];

  const renderGeneralTab = () => {
    if (!selectedCourier) return null;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Courier Name
              </label>
              <p className="text-sm text-gray-900">{selectedCourier.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <p className="text-sm text-gray-900">
                {selectedCourier.industry}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <p className="text-sm text-gray-900">{selectedCourier.website}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Areas
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedCourier.serviceAreas.map((area, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Operating Hours
              </label>
              <p className="text-sm text-gray-900">
                {selectedCourier.operatingHours}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fleet Size
              </label>
              <p className="text-sm text-gray-900">
                {selectedCourier.fleetSize} vehicles
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                General Notes
              </label>
              <p className="text-sm text-gray-900">
                {selectedCourier.generalNotes}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Contact
            </label>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center">
                <UserGroupIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedCourier.contacts[0]?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedCourier.contacts[0]?.role}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    {selectedCourier.contacts[0]?.phone}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <EnvelopeIcon className="h-4 w-4 mr-2" />
                    {selectedCourier.contacts[0]?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContactsTab = () => {
    if (!selectedCourier) return null;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Courier Contacts
          </h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Contact
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
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
              {selectedCourier.contacts.map((contact, index) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <PencilIcon className="h-4 w-4 inline mr-1" />
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-4 w-4 inline mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderApprovedUsersTab = () => {
    if (!selectedCourier) return null;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Approved Users</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add User
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Access Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedCourier.approvedUsers.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.accessLevel === "Full"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.accessLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <PencilIcon className="h-4 w-4 inline mr-1" />
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-4 w-4 inline mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <MainNavigationLayout onNavigate={onNavigate} currentPage={currentPage}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            System Configuration - Couriers
          </h1>
          <p className="text-gray-600 mt-2">
            Manage courier configurations and settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Courier List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Couriers
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {couriers.map((courier) => (
                  <div
                    key={courier.id}
                    className={`px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedCourier?.id === courier.id
                        ? "bg-blue-50 border-r-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedCourier(courier)}
                  >
                    <div className="flex items-center">
                      <TruckIcon className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {courier.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {courier.industry}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Configuration Details */}
          <div className="lg:col-span-3">
            {selectedCourier ? (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedCourier.name} Configuration
                  </h2>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: "general", label: "General" },
                      { id: "contacts", label: "Contacts" },
                      { id: "approvedUsers", label: "Approved Users" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedConfigTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          selectedConfigTab === tab.id
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {selectedConfigTab === "general" && renderGeneralTab()}
                  {selectedConfigTab === "contacts" && renderContactsTab()}
                  {selectedConfigTab === "approvedUsers" &&
                    renderApprovedUsersTab()}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <TruckIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Courier Selected
                </h3>
                <p className="text-gray-500">
                  Select a courier from the list on the left to view and manage
                  their configuration.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainNavigationLayout>
  );
};

export default CourierConfigPage;

