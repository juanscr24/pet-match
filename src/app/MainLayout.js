// app/components/MainLayout.js
'use client'

import { Sidebar } from '@/components/Core/Sidebar'
import { usePathname } from 'next/navigation'

export default function MainLayout({ children }) {
    const pathname = usePathname()
    const hideSidebarRoutes = ['/login', '/register']
    const showSidebar = !hideSidebarRoutes.includes(pathname)

    return (
        <div className="app-container relative overflow-hidden">

            <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2022/09/30/12/56/cat-7489398_960_720.jpg')] bg-cover bg-center filter blur-md scale-105"></div>

            <div className="relative z-10">
                {showSidebar && <Sidebar />}
                {
                    showSidebar ?
                        (<main className='ml-[350px]'>{children}</main>)
                        :
                        (<main>{children}</main>)
                }
            </div>
        </div>

    )
}
