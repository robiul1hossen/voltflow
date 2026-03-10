import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  Search,
  User,
} from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen bg-[#0f1115]">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-slate-800 bg-[#16191f] lg:block">
        <div className="flex h-16 items-center border-b border-slate-800 px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-xl font-bold text-white">Nexus</span>
          </div>
        </div>
        <nav className="space-y-1 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-blue-400 bg-blue-400/10">
            <LayoutDashboard className="mr-3 h-5 w-5" /> Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800">
            <Users className="mr-3 h-5 w-5" /> Contacts
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800">
            <Settings className="mr-3 h-5 w-5" /> Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-800 bg-[#0f1115]/80 px-8 backdrop-blur-md">
          <div className="flex items-center gap-4 lg:hidden">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
          </div>
          <div className="hidden max-w-md flex-1 md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                placeholder="Global search..."
                className="w-full bg-[#16191f] border-slate-800 pl-10 text-slate-300 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
              <User className="h-5 w-5" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="mx-auto max-w-7xl p-8">
          <Dashboard />
        </div>
      </main>
    </div>
  );
};

export default page;
