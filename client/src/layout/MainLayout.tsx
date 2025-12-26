import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from '../components/Footer';
import { User } from '../types';

interface MainLayoutProps {
    user: User | null;
    onLogin: () => void;
    onLogout: () => void;
    onSearchSubmit: (data: any) => void;
    onSearchChange?: (value: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
    user,
    onLogin,
    onLogout,
    onSearchSubmit,
    onSearchChange,
}) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar
                user={user}
                onLogin={onLogin}
                onLogout={onLogout}
                onSearchSubmit={onSearchSubmit}
                onSearchChange={onSearchChange}
            />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
