import { type ReactNode } from "react";

import Navbar from "../components/Navbar";

interface AppLayoutProps {

children: ReactNode;

}

export default function AppLayout(
{
children
}: AppLayoutProps
) {

return (


<div className="h-screen bg-background flex flex-col overflow-hidden">
  <div className="flex-shrink-0">
    <Navbar />
  </div>

  <main className="flex-1 min-h-0 px-8 py-6 overflow-y-auto overscroll-contain">
  
    {children}

  </main>

</div>

);

}
