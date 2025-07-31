import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { navigationConfig, hasPageComponent } from "../config/navigationConfig";

const MainNavigationLayout = ({ children, onNavigate }) => {
  const [expandedMenus, setExpandedMenus] = useState({
    production: false,
    reports: false,
    supervisor: false,
  });

  const toggleMenu = (menuName) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const mainMenuItems = [
    {
      name: "Production",
      hasSubMenu: true,
      subMenus: navigationConfig.production,
    },
    { name: "Reports", hasSubMenu: true, subMenus: navigationConfig.reports },
    {
      name: "Supervisor Functions",
      hasSubMenu: true,
      subMenus: navigationConfig.supervisor,
    },
    { name: "Courier Functions", hasSubMenu: false },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Navigation Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">GD System</h1>
        </div>

        <nav className="mt-4">
          {mainMenuItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() =>
                  item.hasSubMenu && toggleMenu(item.name.toLowerCase())
                }
                className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  item.hasSubMenu ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <span className="text-gray-700 font-medium">{item.name}</span>
                {item.hasSubMenu &&
                  (expandedMenus[item.name.toLowerCase()] ? (
                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                  ))}
              </button>

              {item.hasSubMenu && expandedMenus[item.name.toLowerCase()] && (
                <div className="bg-gray-50 border-l-2 border-blue-500">
                  {item.subMenus.map((subMenu, index) => {
                    const hasComponent = hasPageComponent(subMenu);
                    return (
                      <div key={subMenu}>
                        <button
                          className={`w-full px-6 py-2 text-left text-sm transition-colors ${
                            hasComponent
                              ? "text-gray-900 font-semibold hover:bg-gray-100"
                              : "text-gray-400 cursor-not-allowed"
                          }`}
                          onClick={() =>
                            hasComponent && onNavigate && onNavigate(subMenu)
                          }
                          disabled={!hasComponent}
                        >
                          {subMenu}
                          {!hasComponent && (
                            <span className="ml-2 text-xs text-gray-400">
                              (Coming Soon)
                            </span>
                          )}
                        </button>
                        {/* Add separators after specific items */}
                        {[
                          "Bundle and Bin Packing",
                          "Receive 3rd Party Cards",
                          "Dispatch",
                          "Bulk Work Order Processing",
                          "Embossing Product and Mailer Verification",
                        ].includes(subMenu) &&
                          index < item.subMenus.length - 1 && (
                            <div className="border-t border-gray-200 mx-6 my-1"></div>
                          )}
                        {/* Add separators for Supervisor Functions */}
                        {item.name === "Supervisor Functions" &&
                          [
                            "Shred Cards",
                            "Hand Over - Dispatch Options",
                            "Nedbank Non-mailer Card Finder",
                          ].includes(subMenu) &&
                          index < item.subMenus.length - 1 && (
                            <div className="border-t border-gray-200 mx-6 my-1"></div>
                          )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Log Out Button */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <button className="w-full flex items-center px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors">
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
              Log Out
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default MainNavigationLayout;
