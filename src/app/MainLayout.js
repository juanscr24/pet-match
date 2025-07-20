'use client'

import { Sidebar } from '@/components/Core/Sidebar'
import { usePathname } from 'next/navigation'

export default function MainLayout({ children }) {
    const pathname = usePathname()
    const hideSidebarRoutes = ['/login', '/register']
    const showSidebar = !hideSidebarRoutes.includes(pathname)

    return (
        <div className="relative flex min-h-screen overflow-hidden">
            {/* Fondo difuminado */}
            <div className="fixed inset-0 w-full h-full bg-[url('https://cdn.pixabay.com/photo/2022/09/30/12/56/cat-7489398_960_720.jpg')] bg-cover bg-center filter blur-md scale-105 z-0"></div>

            {/* Contenido con sidebar */}
            <div className="relative z-10 flex w-full">
                {showSidebar && <Sidebar />}
                <main className={`flex-1 ${showSidebar ? 'ml-[350px]' : ''}`}>
                    {children}
                </main>
            </div>
        </div>
    )
}
