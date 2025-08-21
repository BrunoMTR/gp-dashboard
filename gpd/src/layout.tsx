import { Outlet } from "@tanstack/react-router";
import { BreadcrumbNav } from "./components/BreadcrumbNav";
import { CommandMenu } from "./components/command-menu";
import { ThemeToggle } from "./components/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { GlobalLoader } from "./components/global-loader";
import { ThemeProvider } from "next-themes";

export default function Layout() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
          <AppSidebar />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <SidebarTrigger />
            <GlobalLoader />
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-4">
                <BreadcrumbNav />
              </div>
              <div className="flex items-center gap-2">
                <CommandMenu />
                <ThemeToggle />
              </div>
            </div>
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
