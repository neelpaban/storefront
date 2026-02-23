import {
  TruckIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

export default function ProductTrust() {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
      <Trust icon={ArrowPathIcon} label="Easy 15 Day Return" />
      <Trust icon={ShieldCheckIcon} label="Lifetime Plating" />
      <Trust icon={TruckIcon} label="6-Month Warranty" />
      <Trust icon={CheckBadgeIcon} label="Fine 925 Silver" />
    </div>
  );
}

function Trust({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-rose-500" />
      <span>{label}</span>
    </div>
  );
}
