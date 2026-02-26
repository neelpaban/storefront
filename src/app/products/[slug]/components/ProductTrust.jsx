import {
  TruckIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

export default function ProductTrust() {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
      <Trust icon={ArrowPathIcon} label="Easy 20 Day Return" />
      <Trust icon={ShieldCheckIcon} label="18K Gold Plated" />
      <Trust icon={TruckIcon} label="1-Year Warranty" />
      <Trust icon={CheckBadgeIcon} label="316L Stainless Steel" />
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
