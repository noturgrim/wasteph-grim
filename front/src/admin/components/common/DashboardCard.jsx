import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "../../contexts/ThemeContext";

const DashboardCard = ({
  title,
  value,
  change,
  icon: Icon,
  trend = "up",
  color = "emerald",
}) => {
  const { theme } = useTheme();

  const colorClassesDark = {
    emerald:
      "bg-gradient-to-br from-[#15803d]/20 to-[#16a34a]/10 text-[#15803d] border-[#15803d]/30",
    blue: "bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30",
    amber:
      "bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/30",
    violet:
      "bg-gradient-to-br from-violet-500/20 to-violet-600/10 text-violet-400 border-violet-500/30",
    rose: "bg-gradient-to-br from-rose-500/20 to-rose-600/10 text-rose-400 border-rose-500/30",
  };

  const colorClassesLight = {
    emerald:
      "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200",
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 border-blue-200",
    amber:
      "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 border-amber-200",
    violet:
      "bg-gradient-to-br from-violet-50 to-violet-100 text-violet-700 border-violet-200",
    rose: "bg-gradient-to-br from-rose-50 to-rose-100 text-rose-700 border-rose-200",
  };

  return (
    <Card
      className={`group backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${
        theme === "dark"
          ? "border-white/10 bg-black/40 hover:border-[#15803d]/40 hover:shadow-[0_0_30px_rgba(21,128,61,0.15)]"
          : "border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg"
      }`}
    >
      <CardContent className="p-4 sm:p-5 lg:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p
              className={`mb-1 truncate text-xs font-semibold uppercase tracking-wide sm:text-sm ${
                theme === "dark" ? "text-white/50" : "text-slate-500"
              }`}
            >
              {title}
            </p>
            <p
              className={`mb-2 truncate text-2xl font-black sm:text-3xl lg:text-4xl ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              {value}
            </p>

            {change && (
              <div className="flex flex-wrap items-center gap-1">
                {trend === "up" ? (
                  <TrendingUp className="h-3 w-3 shrink-0 text-[#15803d] sm:h-4 sm:w-4" />
                ) : (
                  <TrendingDown className="h-3 w-3 shrink-0 text-red-500 sm:h-4 sm:w-4" />
                )}
                <span
                  className={`text-xs font-bold sm:text-sm ${
                    trend === "up" ? "text-[#15803d]" : "text-red-500"
                  }`}
                >
                  {change}
                </span>
                <span
                  className={`whitespace-nowrap text-xs sm:text-sm ${
                    theme === "dark" ? "text-white/40" : "text-slate-400"
                  }`}
                >
                  vs last month
                </span>
              </div>
            )}
          </div>

          <div
            className={`shrink-0 rounded-xl border-2 p-2 transition-transform duration-300 group-hover:scale-110 sm:p-3 ${
              theme === "dark"
                ? colorClassesDark[color]
                : colorClassesLight[color]
            }`}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
