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


<div className="min-h-screen bg-background">
  <Navbar />

  <main className="px-8 py-6">

    {children}

  </main>

</div>

);

}
