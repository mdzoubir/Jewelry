import { TrendingDown, TrendingUp } from "lucide-react";
import type { StatCardProps } from "../../../types/adminTypes";

export const StatCard = ({
  title,
  value,
  change,
  isPositive,
  icon,
  dateRange,
}: StatCardProps) => (
  <div className="bg-white rounded-2xl shadow-xl text-[#746F6A] border border-gray-100 p-6">
    <div className="flex items-start justify-between">
      <p className="text-sm ">{title}</p>
      <div className="w-10 h-10 rounded-xl shadow-lg font-medium text-[#D2B98E] bg-[#F4F3F1] flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="flex items-center justify-start gap-10">
      <div className="">
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-orange-500" />
          )}
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-green-500" : "text-orange-500"
            }`}
          >
            {change}
          </span>
        </div>
      </div>
    </div>
    <div className="pt-3">
      <p className="text-sm text-[#918B84]">{dateRange}</p>
    </div>
  </div>
);