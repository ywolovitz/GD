// Navigation configuration - maps page names to their components
// This makes the navigation system dynamic and maintainable

import MainDashboardPage from "../components/MainDashboardPage";
import BundleAndBinPackingPage from "../components/BundleAndBinPackingPage";
import NedbankCardFinderPage from "../components/NedbankCardFinderPage";
import BulkWorkOrderProcessingPage from "../components/BulkWorkOrderProcessingPage";
import VaultPickingListPage from "../components/VaultPickingListPage";
import BranchOrderDetailsReportPage from "../components/BranchOrderDetailsReportPage";
import ManageVaultBinsPage from "../components/ManageVaultBinsPage";
import ManageDailyOrdersPage from "../components/ManageDailyOrdersPage";
import ProductAndMailerVerificationPage from "../components/ProductAndMailerVerificationPage";

// Map of page names to their components
export const pageComponents = {
  dashboard: MainDashboardPage,
  "Bundle and Bin Packing": BundleAndBinPackingPage,
  "Nedbank Non-mailer Card Finder": NedbankCardFinderPage,
  "Bulk Work Order Processing": BulkWorkOrderProcessingPage,
  "Vault Picking List": VaultPickingListPage,
  "Branch Order Details Report": BranchOrderDetailsReportPage,
  "Manage Vault Bins": ManageVaultBinsPage,
  "Manage Daily Orders": ManageDailyOrdersPage,
  "Product and Mailer Verification": ProductAndMailerVerificationPage,
};

// Navigation menu structure
export const navigationConfig = {
  production: [
    "Bundle and Bin Packing",
    "Booking into Vault",
    "Manage Vault Bins",
    "Manage Daily Orders",
    "Return Dispatched Bundles",
    "Receive 3rd Party Cards",
    "Hand Over",
    "Hand Back",
    "Dispatch",
    "Bulk Work Order Processing",
    "Stock Issue Product Verification",
    "Product and Mailer Verification",
    "Embossing Product and Mailer Verification",
    "Decrypt Work Order",
  ],
  reports: ["Vault Picking List", "Branch Order Details Report"],
  supervisor: [
    "Special Instructions",
    "Delay Cards",
    "Shred Cards",
    "Hand Over - Dispatch Options",
    "Manage Picking Bundels",
    "Nedbank Non-mailer Card Finder",
    "Administrator",
  ],
  courier: [
    // Courier functions - no pages implemented yet
  ],
};

// Helper function to check if a page has a component
export const hasPageComponent = (pageName) => {
  return pageName in pageComponents;
};

// Helper function to get all available pages
export const getAvailablePages = () => {
  return Object.keys(pageComponents);
};
