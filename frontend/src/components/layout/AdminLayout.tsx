import React from 'react';
import AdminSideBar from './AdminSideBar';
import AdminHeader from './AdminHeader';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className="bg-white h-screen font-sans flex overflow-hidden">
           
            <div className="flex-shrink-0">
                <AdminSideBar />
            </div>
            
            <div className="flex-1 flex flex-col overflow-hidden">
                
                <div className="flex-shrink-0">
                    <AdminHeader />
                </div>
                
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
