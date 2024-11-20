import { DockIcon, Link, Tag, Twitter, Video } from "lucide-react";
import main_logo from "../../assets/main_logo.png";
import { ReactElement } from "react";
import { NavbarItem } from "../ui/NavbarItem";

interface menusInterface {
  name: string;
  icon: ReactElement;
}

const menu: menusInterface[] = [
  {
    name: "Tweets",
    icon: <Twitter />,
  },

  {
    name: "Videos",
    icon: <Video />,
  },
  {
    name: "Documents",
    icon: <DockIcon />,
  },
  {
    name: "Links",
    icon: <Link />,
  },
  {
    name: "Tags",
    icon: <Tag />,
  },
];

export function Navbar() {
  return (
    <div
      className=" p-5 border-r border-gray-200 h-screen
        "
    >
      <div
        className="
            "
      >
        <img src={main_logo} className="w-full cursor-pointer" alt="logo" />
      </div>

      <div
        className=" mt-5 text-gray-600
            "
        id="menus"
      >
        {menu.map((item, index) => {
          return <NavbarItem name={item.name} icon={item.icon} key={index} />;
        })}


      </div>
    </div>
  );
}
