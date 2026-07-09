import {
  BarChart3,
  Code,
  FileCode2,
  LayoutDashboard,
  Settings
} from "lucide-react";

import UserAvatar from "./UserAvtar";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Problems", icon: FileCode2, path: "/problems" },
    { label: "Analytics", icon: BarChart3, path: null },
    { label: "Settings", icon: Settings, path: null },
  ];

  return (

    <header className="
      h-16
      border-b
      border-gray-200 shadow-md
      bg-background
      px-8
      flex
      items-center
      justify-between
    ">

      {/* Left Section */}
      <div className="flex items-center gap-12">

        {/* Logo */}
        <div className="
          flex
          items-center
          gap-2
          text-xl
          font-bold
          cursor-pointer
        " onClick={() => navigate("/")}>
          
          <Code className="bg-black text-white px-1 rounded" size={35} />

          <span>
            CodexLedger
          </span>

        </div>

        {/* Navigation */}
        <nav className="
          flex
          items-center
          gap-8
          text-sm
          font-medium
        ">

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path
              ? location.pathname === item.path
              : false;

            return (
              <button
                key={item.label}
                className={cn(
                  "flex items-center gap-2 pb-1 border-b-2 transition-colors cursor-pointer",
                  isActive
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
                onClick={() => item.path && navigate(item.path)}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}

        </nav>

      </div>

      {/* Right Section */}
      <UserAvatar />

    </header>

  );

}
