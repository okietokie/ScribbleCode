import { Outlet } from 'react-router-dom'

interface MainLayoutProps {
  children?: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-paper">
      {/* TODO: Add Navbar */}
      {/* TODO: Add Sidebar */}
      
      <main className="container mx-auto px-4 py-8">
        {children ? children : <Outlet />}
      </main>
      
      {/* TODO: Add Footer */}
    </div>
  )
}
