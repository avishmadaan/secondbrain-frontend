import { DockIcon, Home, Link2, LogOut, LogOutIcon, LucideLogOut, Tag, Twitter,Video } from "lucide-react";
import main_logo from "../../assets/main_logo.png";
import { ReactElement, useContext } from "react";
import { NavbarItem } from "../ui/NavbarItem";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Cookies from "js-cookie"
import { AlertContext } from "../ui/Alert";
import { Button } from "../ui/Button";

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
    icon: <Link2 />,
  },
  {
    name: "Tags",
    icon: <Tag />,
  },
];

export function Navbar() {

  const {showAlert} = useContext(AlertContext);

  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  async function Logout() {

    await Cookies.remove("token");
    console.log("LoggedOut");
    showAlert("Logged Out Successfully", "positive")

    navigate("/signin");


  }
  return (
    <div
      className=" p-5 border-r border-gray-200 h-full  sticky top-0
        "
    >
      <div
        className="
            "
      >
        <Link to={"/home"}>
        <img src={main_logo} className="w-full cursor-pointer" alt="logo" />
        </Link>
      </div>

      <div
        className=" mt-5 text-gray-600
            "
        id="menus"
      >
        <NavbarItem name={"Home"} icon={<Home />} isActive={location.pathname === "/home"} />
        {menu.map((item, index) => {
          return <NavbarItem name={item.name} icon={item.icon} key={index} isActive={location.pathname === `/home/${item.name.toLowerCase()}`} />;
        })}


      </div>

      <Button variant={"primary"} startIcon={<LogOutIcon />} onClick={Logout} className="absolute bottom-5 left-5 right-5 bg-red-500" >   Logout
      </Button>

    </div>
  );
}
