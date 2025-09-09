import { Link } from '@tanstack/react-router'
import { useWorkflowState } from '@/store/workflowStore'
import AppIcon from "@/images/ico.png"
import { ChevronRight, FileText, PlusCircle, Layers } from "lucide-react"

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
  { title: "Registed", url: "/workflow", icon: FileText },
  { title: "New Workflow", url: "/new-workflow", icon: PlusCircle },
  { title: "Processes", url: "/processes", icon: PlusCircle }
]

export function AppSidebar() {
  const setSelectedItem = useWorkflowState((state) => state.setSelectedItem)

  const handleNavigate = (url: string, id?: number) => {
    if (url === '/workflow' && id !== undefined) {
      setSelectedItem(id)
    }
  }
 
  return (
    <Sidebar>

      <SidebarHeader className="px-4 py-4">
        <div className="flex flex-row items-center">
          <img
            src={AppIcon}
            alt="App Icon"
            className="w-12 h-14 object-contain"
          />

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
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}