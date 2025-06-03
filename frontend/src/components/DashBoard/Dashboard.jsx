import React from 'react'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from '../ui/sidebar'
import Navbar from '../Navbar/Navbar'

const items = [
    { title: "Home", url: "#", icon: Home },
    { title: "Inbox", url: "#", icon: Inbox },
    { title: "Calendar", url: "#", icon: Calendar },
    { title: "Search", url: "#", icon: Search },
    { title: "Settings", url: "#", icon: Settings },
]

function Dashboard() {
    return (
        <div className="min-h-screen">
            {/* Navbar (fixed at top) */}
            <Navbar />

            {/* Main content area with sidebar */}
            <div className="flex pt-16 h-[calc(100vh-4rem)]">

                {/* Transparent Glassy Sidebar */}
                <SidebarProvider>
                    <Sidebar className="sticky top-16 h-[calc(100vh-4rem)] w-64 bg-gray-800/30 backdrop-blur-xl border-r border-gray-700/50 text-white">
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel className="text-gray-300/80 px-4 py-2">
                                    Application
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton asChild>
                                                    <a
                                                        href={item.url}
                                                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-all mx-2"
                                                    >
                                                        <item.icon className="w-5 h-5 flex-shrink-0" />
                                                        <span>{item.title}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                </SidebarProvider>

                {/* Main Content Area */}
                <main className="flex-1 ml-64 p-6 overflow-y-auto">
                    {/* Your page content goes here */}
                    <div className="h-[2000px]">Scrollable content</div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard
