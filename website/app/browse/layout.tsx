import Nav from "@/components/nav";
import { ReactNode } from "react";

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="min-h-screen bg-midnight">

        <Nav />
   
        {children}
      </section>
    )
  }