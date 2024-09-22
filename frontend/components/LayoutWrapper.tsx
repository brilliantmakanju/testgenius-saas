'use client'
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useUser } from '@auth0/nextjs-auth0/client';
import Loader from './Loader';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

// Dynamically import Sidebar and Nav with no SSR
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });
const Nav = dynamic(() => import('./nav'), { ssr: false });

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, isLoading: isUserLoading, error } = useUser();
    const [hasMounted, setHasMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { theme } = useTheme();

    const isAuthPage = pathname === '/auth' || pathname.startsWith('/auth/');
    const isLandingPage = pathname === '/';

    useEffect(() => {
        setHasMounted(true);
        setIsSidebarOpen(window.innerWidth >= 768);

        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (user && isLandingPage && hasMounted) {
            router.push('/dashboard');
        }
        if (hasMounted && !isUserLoading) {
            setTimeout(() => setIsLoading(false), 1000); // Delay to show loader animation
        }
    }, [user, isLandingPage, router, hasMounted, isUserLoading]);

    const showSidebar = user && !isAuthPage && !isLandingPage;

    const handleLoaderAnimationComplete = () => {
        setShowContent(true);
    };

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            <Loader isLoading={isLoading} onAnimationComplete={handleLoaderAnimationComplete} />
            <AnimatePresence>
                {showContent && (
                    <motion.div
                        className="flex flex-col h-screen overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {!user && <Nav />}
                        <div className="flex flex-1 overflow-hidden">
                            {showSidebar && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
                            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${showSidebar && isSidebarOpen ? 'ml-64' : showSidebar ? 'ml-20' : 'ml-0'}`}>
                                <main className="flex-1 overflow-auto p-4 bg-transparent">
                                    {children}
                                </main>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}