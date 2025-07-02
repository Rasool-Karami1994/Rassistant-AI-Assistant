import { NavItem } from "@lib/types";
import useAdvertisementStore from "@react/store/useAdvertisementStore";
import { Link } from "@tanstack/react-router";
import {
  AdTabIcon,
  InstructionsTabIcon,
  SubscriptionTabIcon,
  InformationTabIcon,
} from "@components/icons";
const BottomNavbar = () => {
  const selectedAdvertisement = useAdvertisementStore(
    (state) => state.selectedAdvertisement,
  );

  const advertisementTo = selectedAdvertisement
    ? {
        to: "/advertisement/$advertisement_id",
        params: { advertisement_id: selectedAdvertisement?.token },
      }
    : { to: "/" };

  const instructionsTo = {
    to: "/instructions",
  };
  const informationTo = {
    to: "/information",
  };
  const subscriptionTo = {
    to: "/subscription",
  };

  const navItems: NavItem[] = [
    { icon: AdTabIcon, label: "آگهی", ...advertisementTo },
    { icon: InstructionsTabIcon, label: "دستورالعمل", ...instructionsTo },
    { icon: SubscriptionTabIcon, label: "اشتراک", ...subscriptionTo },
    { icon: InformationTabIcon, label: "اطلاعات", ...informationTo },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 z-[500] h-[88px] w-full -translate-x-1/2 transform bg-[linear-gradient(180deg,rgba(24,24,28,0)_0%,rgba(24,24,28,0.25)_25%,rgba(24,24,28,0.5)_50%,rgba(24,24,28,0.75)_75%,rgba(24,24,28,0.85)_100%)] backdrop-blur-[20px]">
      <div className="mx-4 mt-4 mb-2 flex h-16 items-center justify-between py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.to}
              activeOptions={{ exact: false }}
              activeProps={{
                className:
                  "min-w-[124px] bg-[var(--green-bg)] text-[var(--tertiary-color)]",
              }}
              inactiveProps={{
                className: "text-[var(--secondary-color)] hover:text-gray-200",
              }}
              className="flex h-[40px] min-w-0 flex-1 items-center justify-center gap-2 rounded-[100px]"
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <Icon
                    className={`h-5 w-5 fill-current ${
                      isActive
                        ? "text-[var(--tertiary-color)]"
                        : "text-[var(--secondary-color)]"
                    }`}
                  />
                  {isActive && (
                    <span className="text-[13px] font-medium">
                      {item.label}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
export default BottomNavbar;
