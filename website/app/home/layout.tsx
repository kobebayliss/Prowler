import Nav from "@/components/nav";
import { ReactNode } from "react";

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="min-h-screen bg-midnight">
        {/* Include shared UI here e.g. a header or sidebar */}

        <Nav />
   
        {children}
      </section>
    )
  }