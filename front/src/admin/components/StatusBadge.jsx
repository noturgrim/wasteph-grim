/**
 * Reusable status badge component with soft pill design
 * Temperature-based color coding:
 *
 * 🔵 COLD (Blue) - Needs information gathering:
 *    - initial_comms, waiting_for_feedback
 *
 * 🟠 WARM (Orange) - In progress, actively working:
 *    - to_call, submitted_company_profile
 *
 * 🔴 HOT (Red) - Information gathered, ready to close:
 *    - negotiating, submitted_proposal
 *
 * ✅ WON (Green) - Deal closed:
 *    - on_boarded
 *
 * ⚫ NEUTRAL (Gray) - Inactive/Closed:
 *    - na, declined
 */

const defaultColorMap = {
  // COLD - Needs information (Blue)
  initial_comms:
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  waiting_for_feedback:
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",

  // WARM - In progress (Orange)
  to_call:
    "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",
  submitted_company_profile:
    "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",

  // HOT - Ready to close (Red)
  negotiating:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  proposal_created:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  submitted_proposal:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",

  // WON - Deal closed (Green)
  on_boarded:
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",

  // NEUTRAL - Inactive/Closed (Gray)
  na: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700",
  declined:
    "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700",

  // Lead statuses
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-purple-50 text-purple-700 border-purple-200",
  proposal_sent: "bg-blue-50 text-blue-700 border-blue-200",
  won: "bg-green-50 text-green-700 border-green-200",
  lost: "bg-red-50 text-red-700 border-red-200",

  // User/Generic statuses
  active: "bg-green-50 text-green-700 border-green-200",
  inactive: "bg-gray-50 text-gray-700 border-gray-200",
  suspended: "bg-red-50 text-red-700 border-red-200",
};

const statusLabels = {
  // Inquiry statuses
  proposal_created: "Proposal Created",
  submitted_proposal: "Proposal Sent",
  initial_comms: "Initial Comms",
  negotiating: "Negotiating",
  to_call: "To Call",
  submitted_company_profile: "Submitted Company Profile",
  na: "N/A",
  waiting_for_feedback: "Waiting for Feedback",
  declined: "Declined",
  on_boarded: "On Boarded",

  // Lead statuses
  new: "New",
  contacted: "Contacted",
  proposal_sent: "Proposal Sent",
  won: "Won",
  lost: "Lost",

  // User/Generic statuses
  active: "Active",
  inactive: "Inactive",
  suspended: "Suspended",
};

export function StatusBadge({ status, colorMap = {} }) {
  const mergedColorMap = { ...defaultColorMap, ...colorMap };
  const colorClass = mergedColorMap[status] || mergedColorMap.initial_comms;
  const label = statusLabels[status] || status;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}
    >
      {label}
    </span>
  );
}
