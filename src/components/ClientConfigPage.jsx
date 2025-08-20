import React, { useState } from "react";
import MainNavigationLayout from "./MainNavigationLayout";

const ClientConfigPage = ({ onNavigate, currentPage }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedConfigTab, setSelectedConfigTab] = useState("general");
  const [packAndTrackMethod, setPackAndTrackMethod] =
    useState("First and Last");
  const [selectedCouriers, setSelectedCouriers] = useState([]);

  const clients = [
    {
      id: 1,
      name: "Nedbank",
      industry: "Banking",
      website: "www.nedbank.co.za",
      address: "135 Rivonia Road, Sandton, Johannesburg",
      email: "info@nedbank.co.za",
      phone: "+27 11 294 4444",
      logo: "nedbank.png",
      contacts: [
        {
          name: "John Smith",
          role: "Account Manager",
          email: "john.smith@nedbank.co.za",
          phone: "+27 11 294 4445",
        },
        {
          name: "Sarah Johnson",
          role: "Operations Manager",
          email: "sarah.johnson@nedbank.co.za",
          phone: "+27 11 294 4446",
        },
      ],
      approvedUsers: [
        {
          name: "Mike Wilson",
          email: "mike.wilson@nedbank.co.za",
          role: "Supervisor",
          accessLevel: "Full",
        },
        {
          name: "Lisa Brown",
          email: "lisa.brown@nedbank.co.za",
          role: "Operator",
          accessLevel: "Limited",
        },
      ],
      generalNotes:
        "Primary banking client with high volume processing requirements.",
    },
    {
      id: 2,
      name: "Lesaka",
      industry: "Financial Services",
      website: "www.lesaka.com",
      address: "200 Main Street, Sandton, Johannesburg",
      email: "info@lesaka.com",
      phone: "+27 11 234 5678",
      logo: "lesaka.png",
      contacts: [
        {
          name: "David Lee",
          role: "Client Relations",
          email: "david.lee@lesaka.com",
          phone: "+27 11 234 5679",
        },
        {
          name: "Emma Davis",
          role: "Operations Director",
          email: "emma.davis@lesaka.com",
          phone: "+27 11 234 5680",
        },
      ],
      approvedUsers: [
        {
          name: "Tom Anderson",
          email: "tom.anderson@lesaka.com",
          role: "Manager",
          accessLevel: "Full",
        },
        {
          name: "Rachel Green",
          email: "rachel.green@lesaka.com",
          role: "Coordinator",
          accessLevel: "Standard",
        },
      ],
      generalNotes:
        "Digital financial services provider with innovative payment solutions.",
    },
    {
      id: 3,
      name: "TymeBank",
      industry: "Digital Banking",
      website: "www.tymebank.co.za",
      address: "150 West Street, Sandton, Johannesburg",
      email: "info@tymebank.co.za",
      phone: "+27 11 345 6789",
      logo: "tymebank.jpg",
      contacts: [
        {
          name: "Alex Turner",
          role: "Business Development",
          email: "alex.turner@tymebank.co.za",
          phone: "+27 11 345 6790",
        },
        {
          name: "Maria Garcia",
          role: "Operations Lead",
          email: "maria.garcia@tymebank.co.za",
          phone: "+27 11 345 6791",
        },
      ],
      approvedUsers: [
        {
          name: "Chris Martinez",
          email: "chris.martinez@tymebank.co.za",
          role: "Team Lead",
          accessLevel: "Full",
        },
        {
          name: "Sophie Chen",
          email: "sophie.chen@tymebank.co.za",
          role: "Specialist",
          accessLevel: "Standard",
        },
      ],
      generalNotes:
        "Digital-only bank with focus on mobile banking and financial inclusion.",
    },
    {
      id: 4,
      name: "Standard Bank",
      industry: "Banking",
      website: "www.standardbank.co.za",
      address: "5 Simmonds Street, Johannesburg",
      email: "info@standardbank.co.za",
      phone: "+27 11 636 9111",
      logo: "standardbank.jpg",
      contacts: [
        {
          name: "Robert Taylor",
          role: "Client Manager",
          email: "robert.taylor@standardbank.co.za",
          phone: "+27 11 636 9112",
        },
        {
          name: "Jennifer White",
          role: "Operations Manager",
          email: "jennifer.white@standardbank.co.za",
          phone: "+27 11 636 9113",
        },
      ],
      approvedUsers: [
        {
          name: "Kevin Rodriguez",
          email: "kevin.rodriguez@standardbank.co.za",
          role: "Supervisor",
          accessLevel: "Full",
        },
        {
          name: "Amanda Thompson",
          email: "amanda.thompson@standardbank.co.za",
          role: "Operator",
          accessLevel: "Limited",
        },
      ],
      generalNotes: "Major South African bank with extensive branch network.",
    },
    {
      id: 5,
      name: "Absa Bank",
      industry: "Banking",
      website: "www.absa.co.za",
      address: "15 Troye Street, Johannesburg",
      email: "info@absa.co.za",
      phone: "+27 11 350 4000",
      logo: "absa.jpg",
      contacts: [
        {
          name: "Daniel Clark",
          role: "Account Executive",
          email: "daniel.clark@absa.co.za",
          phone: "+27 11 350 4001",
        },
        {
          name: "Nicole Lewis",
          role: "Operations Director",
          email: "nicole.lewis@absa.co.za",
          phone: "+27 11 350 4002",
        },
      ],
      approvedUsers: [
        {
          name: "Ryan Hall",
          email: "ryan.hall@absa.co.za",
          role: "Manager",
          accessLevel: "Full",
        },
        {
          name: "Jessica Adams",
          email: "jessica.adams@absa.co.za",
          role: "Coordinator",
          accessLevel: "Standard",
        },
      ],
      generalNotes:
        "Leading African financial services group with strong retail presence.",
    },
  ];

  const availableCouriers = [
    "FedEx",
    "DHL",
    "UPS",
    "Aramex",
    "PostNet",
    "Pargo",
    "Takealot",
    "Mr D",
  ];

  const packAndTrackMethods = [
    "First and Last",
    "Card Scan",
    "Method 3",
    "Method 4",
  ];

  const handleAddCourier = (courier) => {
    if (!selectedCouriers.includes(courier)) {
      setSelectedCouriers([...selectedCouriers, courier]);
    }
  };

  const handleRemoveCourier = (courier) => {
    setSelectedCouriers(selectedCouriers.filter((c) => c !== courier));
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">General Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <p className="text-gray-900">{selectedClient.industry}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <p className="text-gray-900">{selectedClient.website}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <p className="text-gray-900">{selectedClient.address}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <p className="text-gray-900">{selectedClient.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <p className="text-gray-900">{selectedClient.phone}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">General Notes</h3>
        <p className="text-gray-700">{selectedClient.generalNotes}</p>
      </div>
    </div>
  );

  const renderContactsTab = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Contacts</h3>
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
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedClient.contacts.map((contact, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {contact.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderApprovedUsersTab = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Approved Users</h3>
      </div>
      <div className="overflow-x-auto">
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedClient.approvedUsers.map((user, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.accessLevel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProductionSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Pack and Track Method</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Method
          </label>
          <select
            value={packAndTrackMethod}
            onChange={(e) => setPackAndTrackMethod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {packAndTrackMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Allowed Couriers</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Available Couriers
            </h4>
            <div className="border border-gray-300 rounded-md p-3 h-64 overflow-y-auto">
              {availableCouriers
                .filter((courier) => !selectedCouriers.includes(courier))
                .map((courier) => (
                  <div
                    key={courier}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => handleAddCourier(courier)}
                  >
                    <span className="text-sm text-gray-700">{courier}</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      + Add
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Selected Couriers
            </h4>
            <div className="border border-gray-300 rounded-md p-3 h-64 overflow-y-auto">
              {selectedCouriers.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-8">
                  No couriers selected
                </p>
              ) : (
                selectedCouriers.map((courier) => (
                  <div
                    key={courier}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                  >
                    <span className="text-sm text-gray-700">{courier}</span>
                    <button
                      className="text-red-600 hover:text-red-800 text-sm"
                      onClick={() => handleRemoveCourier(courier)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <MainNavigationLayout onNavigate={onNavigate} currentPage={currentPage}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            System Configuration - Clients
          </h1>
          <p className="text-gray-600 mt-2">
            Manage client configurations and settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Client List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Clients</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {clients.map((client) => (
                  <div
                    key={client.id}
                    className={`px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedClient?.id === client.id
                        ? "bg-blue-50 border-r-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedClient(client)}
                  >
                    <div className="flex items-center">
                      <img
                        src={`${process.env.PUBLIC_URL}/${client.logo}`}
                        alt={`${client.name} logo`}
                        className="h-8 w-8 mr-3 rounded object-contain"
                        onError={(e) => {
                          console.error(`Failed to load image: ${client.logo}`);
                        }}
                        onLoad={() =>
                          console.log(`Successfully loaded: ${client.logo}`)
                        }
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {client.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {client.industry}
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
            {selectedClient ? (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedClient.name} Configuration
                  </h2>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: "general", label: "General" },
                      { id: "contacts", label: "Contacts" },
                      { id: "approvedUsers", label: "Approved Users" },
                      {
                        id: "productionSettings",
                        label: "Production Settings",
                      },
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
                  {selectedConfigTab === "productionSettings" &&
                    renderProductionSettingsTab()}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Client Selected
                </h3>
                <p className="text-gray-500">
                  Select a client from the list to view and edit their
                  configuration.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainNavigationLayout>
  );
};

export default ClientConfigPage;
