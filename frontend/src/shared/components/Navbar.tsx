import {
  BarChart3,
  Code,
  FileCode2,
  LayoutDashboard,
  Settings
} from "lucide-react";

import UserAvatar from "./UserAvtar";

export default function Navbar() {

  return (

    <header className="
      h-16
      border-b
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
        ">
          
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

          <button className="
            flex
            items-center
            gap-2
            text-muted-foreground
            hover:text-foreground
          ">

            <LayoutDashboard size={18} />

            Dashboard

          </button>

          <button className="
            flex
            items-center
            gap-2
            text-muted-foreground
            hover:text-foreground
          ">

            <FileCode2 size={18} />

            Problems

          </button>

          <button className="
            flex
            items-center
            gap-2
            text-muted-foreground
            hover:text-foreground
          ">

            <BarChart3 size={18} />

            Analytics

          </button>

          <button className="
            flex
            items-center
            gap-2
            text-muted-foreground
            hover:text-foreground
          ">

            <Settings size={18} />

            Settings

          </button>

        </nav>

      </div>

      {/* Right Section */}
      <UserAvatar />

    </header>

  );

}