import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { BreadcrumbNav } from "../../components/BreadcrumbNav"
import { CommandMenu } from "../../components/command-menu"
import { ThemeToggle } from "../../components/theme-toggle"
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import { AppSidebar } from "../../components/app-sidebar"
import { GlobalLoader } from "../../components/global-loader"
import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"
import { useAuthStore } from '../../store/AuthContext'
import { GlobalAlertProvider } from "../../components/common/GlobalAlertProvider"
import { DocAlert } from '@/components/DocAlert'
export const Route = createFileRoute('/app')({
  beforeLoad: async () => {
    const auth = useAuthStore.getState()


    if (!auth.isAuthenticated && !auth.user) {
      await auth.checkAuth()
    }

    if (!auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <GlobalAlertProvider>
        <DocAlert />
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
              <Toaster position="bottom-left" />
            </main>
          </div>
        </SidebarProvider>
      </GlobalAlertProvider>
    </ThemeProvider>
  )
}
