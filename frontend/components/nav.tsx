'use client'
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useUser } from '@auth0/nextjs-auth0/client';

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme()
  const { user } = useUser()

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {!user &&
        <nav className="bg-white dark:bg-gray-800 w-full container mx-auto">
          <div className="w-full px-[24px]">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                {
                  !user &&
                  <Link href={'/'} className="flex items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                      <span className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-white">TestGenius</span>
                    </div>
                  </Link>
                }
              </div>
              <div className="flex items-center">
                {!user && (
                  <>
                    <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium hidden md:block">
                      Features
                    </Link>
                    <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium hidden md:block">
                      How it works
                    </Link>
                    <Link href="/api/auth/login" className="hidden md:block">
                      <Button variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white rounded-full px-6 py-2 text-sm lg:text-base font-semibold transition-all duration-200">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full ml-4 w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <div className="md:hidden ml-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMobileMenu}
                    className="text-gray-600 dark:text-gray-300"
                  >
                    {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile menu */}
          {isMobileMenuOpen && !user && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Features
                </Link>
                <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  How it works
                </Link>
                <Link href="/api/auth/login">
                  <Button variant="outline" className="w-full text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white rounded-full px-6 py-2 text-sm lg:text-base font-semibold transition-all duration-200">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </nav>
      }
    </>
  );
};

export default Nav;
