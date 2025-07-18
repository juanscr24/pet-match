// app/components/MainLayout.js
'use client'

import { Sidebar } from '@/components/Core/Sidebar'
import { usePathname } from 'next/navigation'

export default function MainLayout({ children }) {
    const pathname = usePathname()
    const hideSidebarRoutes = ['/login', '/register']
    const showSidebar = !hideSidebarRoutes.includes(pathname)

    return (
        <div className="app-container">
            {showSidebar && <Sidebar />}
            {
                showSidebar ? 
                (<main className='ml-[350px]'>{children}</main>) 
                : 
                (<main>{children}</main>) 
            }
            
        </div>
    )
}
