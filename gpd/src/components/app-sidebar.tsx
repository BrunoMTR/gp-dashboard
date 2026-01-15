import { Link } from '@tanstack/react-router'
import { useWorkflowState } from '@/store/workflowStore'
import AppIcon from "@/images/ico.png"
import { ChevronRight, FileText, PlusCircle, Layers, Home } from "lucide-react"
import { useAuthStore } from '../store/AuthContext'
import { useUserLogout } from '../api/Auth/queries'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubItem,

} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'


const items = [
  { title: "Registed", url: "/app/workflow", icon: FileText },
  { title: "New Workflow", url: "/app/new-workflow", icon: PlusCircle },
  { title: "Processes", url: "/app/processes", icon: PlusCircle },
]

const otherLinks = { title: "Dashboard", url: "/app", icon: Home }


export function AppSidebar() {
  const setSelectedItem = useWorkflowState((state) => state.setSelectedItem)
  const user = useAuthStore((state) => state.user)
  const logoutStore = useAuthStore((state) => state.logout)
  const userLogout = useUserLogout()

  const handleNavigate = (url: string, id?: number) => {
    if (url === '/app/workflow' && id !== undefined) {
      setSelectedItem(id)
    }
  }

  const handleLogout = async () => {
    try {
      await userLogout.mutateAsync()
      await logoutStore()
      window.location.href = '/login'
    } catch (err) {
      console.error('Erro ao sair', err)
    }
  }

  return (
    <Sidebar>

      <SidebarHeader className="px-4 py-4">
        <div className="flex flex-row items-center">
          <img
            src={AppIcon}
            alt="App Icon"
            className="w-12 h-14 object-contain" />

          <div className="flex flex-col">
            <span className="text-base font-semibold">Flow Hub</span>
            <span className="text-xs text-muted-foreground">
              Verão 1.0
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Dashboard separado, mas no mesmo nível do grupo Workflow */}
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={otherLinks.url} className="flex items-center">
                    <Home className="mr-2" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            {/* Grupo Workflow */}
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem className="list-none">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Layers className="mr-2" />
                    <span>Workflow</span>
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {items.map((item) => (
                      <SidebarMenuSubItem key={item.url}>
                        <SidebarMenuButton asChild>
                          <Link to={item.url} onClick={() => handleNavigate(item.url)}>
                            {item.icon && <item.icon className="mr-2" />}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <DropdownMenuLabel>{'Conta logada'}</DropdownMenuLabel>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>{user?.username || 'Username não disponível'}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={handleLogout} className="w-full text-left">
                    Sair
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}