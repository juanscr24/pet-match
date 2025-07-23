'use client';

import { useState } from 'react';
import { logout } from '@/lib/auth';
import { Button } from '../Button';
import { useUser } from '@/hooks/useUser';
import { User } from '../User';
import LogoutIcon from '@mui/icons-material/Logout';
import { LinkComponent } from '../LinkComponent';
import { ROUTEADMIN, ROUTESUSER } from '@/constants/ROUTES';
import { ProfilePet } from '../ProfilePet';
import InfoIcon from '@mui/icons-material/Info';

export const NavbarMobile = () => {
    const { user } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed min-md:hidden rounded-b-xl w-full py-2 bg-black/90 shadow-xl z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
                {/* Left part: ProfilePet */}
                <div className="flex items-center gap-4">

                    {/* Hamburger menu button (visible on small screens) */}
                    <Button
                        fit
                        className="md:hidden flex flex-col gap-1 cursor-pointer bg-transparent"
                        aria-label="Toggle menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span
                            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''
                                }`}
                        />
                        <span
                            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'
                                }`}
                        />
                        <span
                            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''
                                }`}
                        />
                    </Button>
                    <ProfilePet />
                </div>

                {/* Menu links */}
                <div
                    className={`flex flex-col mt-2 py-3 ml-2 md:flex-row md:items-center gap-8 absolute top-full left-0 w-80 md:w-auto bg-black/90 transition-all duration-500 md:transition-none rounded-xl ${menuOpen ? 'block' : 'hidden'
                        } md:flex`}
                >
                    <div className="flex flex-col md:flex-row max-md:gap-8 px-5 md:px-0 py-4 md:py-0">
                        {ROUTESUSER.map((route, index) => (
                            <LinkComponent
                                key={index}
                                href={route.path}
                                profile
                                icon={route.icon}
                                className="text-white hover:text-cyan-400 px-3 py-2 rounded-md"
                            >
                                {route.label}
                            </LinkComponent>
                        ))}

                        {user?.role === 'admin' &&
                            ROUTEADMIN.map((route, index) => (
                                <LinkComponent
                                    key={index}
                                    href={route.path}
                                    profile
                                    icon={route.icon}
                                    className="text-white hover:text-cyan-400 px-3 py-2 rounded-md"
                                >
                                    {route.label}
                                </LinkComponent>
                            ))}

                        <LinkComponent
                            href="/aboutUs"
                            icon={<InfoIcon />}
                            className="text-white hover:text-cyan-400 px-3 py-2 rounded-md"
                        >
                            Conócenos
                        </LinkComponent>
                    </div>
                </div>

                {/* Right part: User info and logout button */}
                <div className="flex items-center gap-4">
                    <User />
                    <Button
                        onClick={logout}
                        fit
                        className="bg-transparent hover:bg-[rgba(255,255,255,0.3)] p-2 rounded-md"
                        aria-label="Logout"
                    >
                        <LogoutIcon className="text-gray-200" />
                    </Button>
                </div>

                {/* User info + logout for mobile, shown only when menu open */}

            </div>
        </nav>
    );
};
