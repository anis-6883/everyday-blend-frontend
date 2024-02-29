import { routes } from "@/config/routes";
import { FaCogs } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbUserCog } from "react-icons/tb";

// Note: do not add href in the label object, it is rendering as label
export const menuItems = {
  admin: [
    {
      name: "Dashboard",
      href: routes.admin.dashboard,
      icon: <LuLayoutDashboard />
    },
    {
      name: "Settings",
      href: "#",
      icon: <FaCartShopping />,
      dropdownItems: [
        {
          name: "New Orders",
          href: routes.admin.generalSettings
        }
      ]
    },
    {
      name: "Manage Admins",
      href: routes.admin.generalSettings,
      icon: <TbUserCog />
    },
    {
      name: "General Settings",
      href: routes.admin.generalSettings,
      icon: <FaCogs />
    }
  ]
};
