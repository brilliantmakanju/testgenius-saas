'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiSettings, FiLogOut, FiChevronLeft, FiChevronRight, FiSun, FiMoon } from 'react-icons/fi';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useTheme } from 'next-themes';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const { user } = useUser()
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    const navItems = [
        { href: '/dashboard', icon: FiHome, label: 'Dashboard' },
        { href: '/settings', icon: FiSettings, label: 'Settings' },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);
    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    if (!user) return null;

    return (
        <div
            className={`fixed inset-y-0 left-0 z-30 ${isOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transform transition-all duration-300 ease-in-out flex flex-col`}
        >
            {/* Logo and toggle button */}
            <div className={`p-4 flex items-center ${isOpen ? 'justify-between' : 'justify-center'} border-b border-gray-700`}>
                <div className={`flex items-center ${!isOpen && 'flex-col'}`}>
                    {isOpen ? (
                        <>
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">TG</span>
                            </div>
                            <span className="ml-2 font-semibold">TestGenius</span>
                        </>
                    ) : (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">TG</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation links */}
            <nav className="flex-grow py-4">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.href} className="mb-2">
                            <Link
                                href={item.href}
                                className={`flex items-center px-4 py-2 text-sm ${pathname === item.href
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    } ${!isOpen && 'justify-center'}`}
                            >
                                <item.icon className={`${isOpen ? 'mr-3' : 'text-2xl'}`} />
                                {isOpen && item.label}
                            </Link>
                        </li>
                    ))}
                    <li className="mb-2">
                        <button
                            onClick={toggleTheme}
                            className={`w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white ${!isOpen && 'justify-center'}`}
                        >
                            {theme === 'dark' ? (
                                <FiSun className={`${isOpen ? 'mr-3' : 'text-2xl'}`} />
                            ) : (
                                <FiMoon className={`${isOpen ? 'mr-3' : 'text-2xl'}`} />
                            )}
                            {isOpen && (theme === 'dark' ? 'Light Mode' : 'Dark Mode')}
                        </button>
                    </li>
                    <li className="mb-2">
                        <Link
                            href="/api/auth/logout"
                            className={`flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 ${!isOpen && 'justify-center'}`}
                        >
                            <FiLogOut className={`${isOpen ? 'mr-3' : 'text-2xl'}`} />
                            {isOpen && 'Logout'}
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* User profile section at the bottom */}
            <div className={`mt-auto p-4 border-t border-gray-700 ${!isOpen && 'flex justify-center'}`}>
                {isOpen ? (
                    <div className="flex items-center">
                        <img
                            src={user.picture || "/avatar-placeholder.png"}
                            alt="User avatar"
                            className="w-10 h-10 rounded-full flex-shrink-0 mr-3"
                        />
                        <div className="min-w-0 flex-1">
                            <h2 className="font-semibold text-sm truncate">{user.name}</h2>
                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                    </div>
                ) : (
                    <img
                        src={user.picture || "/avatar-placeholder.png"}
                        alt="User avatar"
                        className="w-10 h-10 rounded-full"
                    />
                )}
            </div>

            {/* Toggle button */}
            <button
                onClick={toggleSidebar}
                className="absolute top-1/2 -right-3 bg-gray-800 text-white p-1 rounded-full"
            >
                {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
            </button>
        </div>
    );
};

export default Sidebar;