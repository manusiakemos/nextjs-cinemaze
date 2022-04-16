import Navlink from './Navlink'
import KitButton from './kit-button'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'

const Navbar = ({ user }) => {

    const router = useRouter();

    const userService = useAuth();

    const [scrolled, setScrolled] = useState(false)
    const handleScroll = () => {
        const offset = window.scrollY
        if (offset > 0) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    let fixedClassName
    if (scrolled) {
        fixedClassName =
            'sticky top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-filter backdrop-blur-3xl'
    } else {
        fixedClassName = 'relative'
    }

    const classNameScroll = [
        fixedClassName,
        'py-6 w-full hidden md:block',
    ].join(' ')

    const logoutButton = () => {
        return (
            <div>
                <KitButton
                    className="rounded-full border-2 border-primary-500 hover:bg-primary-500 mr-2"
                    variant="rounded" onClick={()=>logout()}>
                    Logout
                </KitButton>
            </div>
        )
    }

    const loginButton = () => {
        return (
            <KitButton
                className="rounded-full border-2 border-primary-500 hover:bg-primary-500 mr-2"
                variant="link"
                href="/login">
                Login
            </KitButton>
        )
    }

    const userAuthNav = () => {
        return <Navlink className={router.pathname == '/watchlist' ? 'text-primary-500' : 'text-gray-100 '}  href="/watchlist">watchlist</Navlink>
    }

    const logout = () => {
        userService.logout();
    }


    return (
        <nav className={classNameScroll} id="desktop-nav">
            {/* tablet and desktop navbar */}
            <div className="container mx-auto lg:flex hidden md:justify-between justify-center items-center overflow-hidden">
                <div id="left-nav" className="flex items-center">
                    <Navlink
                        href="/"
                        className="mr-6 font-bold text-primary-500 hover:text-primary-700 text-2xl font-display">
                        cinemaze
                    </Navlink>

                    <Navlink className={router.pathname == '/movies' ? 'text-primary-500' : 'text-gray-100 '} href="/movies">movies</Navlink>
                    <Navlink className={router.pathname == '/series' ? 'text-primary-500' : 'text-gray-100 '} href="/movies">series</Navlink>
                    <Navlink className={router.pathname == '/news' ? 'text-primary-500' : 'text-gray-100 '} href="/movies">news</Navlink>
                    <Navlink className={router.pathname == '/coming-soon' ? 'text-primary-500' : 'text-gray-100 '} href="/movies">coming soon</Navlink>
                    <Navlink className={router.pathname == '/top-imdb' ? 'text-primary-500' : 'text-gray-100 '} href="/movies">top imdb</Navlink>

                    {user ? userAuthNav() : ''}
                </div>
                <div id="right-nav" className="flex items-center">
                    {user ? logoutButton() : loginButton()}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
