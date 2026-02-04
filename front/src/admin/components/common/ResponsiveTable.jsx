import { Card, CardContent } from "@/components/ui/card";

/**
 * ResponsiveTable - A wrapper that provides different views for mobile and desktop
 * NO HORIZONTAL SCROLLBAR - Tables adapt to available space
 *
 * On mobile/tablet: Shows cards with key information
 * On desktop: Shows full table with responsive columns
 */
const ResponsiveTable = ({ children, mobileCards, className = "" }) => {
  return (
    <>
      {/* Mobile/Tablet Card View - Hidden on xl and up */}
      {mobileCards && <div className="xl:hidden space-y-3">{mobileCards}</div>}

      {/* Desktop Table View - Hidden on mobile/tablet, NO overflow */}
      <div className={`hidden xl:block ${className}`}>
        <div className="w-full">{children}</div>
      </div>
    </>
  );
};

/**
 * MobileCard - Reusable card component for mobile table rows
 */
export const MobileCard = ({ children, onClick, className = "" }) => {
  return (
    <Card
      className={`transition-all border-slate-200 bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  );
};

/**
 * MobileCardRow - A single row within a mobile card
 */
export const MobileCardRow = ({ label, value, className = "" }) => {
  return (
    <div className={`flex justify-between items-start gap-3 ${className}`}>
      <span
        className="text-xs font-medium shrink-0 text-slate-600 dark:text-white/60"
      >
        {label}:
      </span>
      <span
        className="text-sm text-right text-slate-900 dark:text-white/90"
      >
        {value}
      </span>
    </div>
  );
};

export default ResponsiveTable;
