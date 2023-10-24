'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { AiOutlineComment } from "react-icons/ai"
import classnames from 'classnames'
import { Badge, Button, Text } from "@radix-ui/themes"
import { MdDashboardCustomize } from "react-icons/md"
import { VscIssueDraft } from "react-icons/vsc"

const NavBar = () => {

    const currentPath = usePathname()
    const links = [
        {label: 'dashboard', href: '/dashboard', icon: <MdDashboardCustomize />},
        {label: 'issues', href: '/issues', icon: <VscIssueDraft />}
    ]

    
    return(
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/"><AiOutlineComment /></Link>
            <ul className="flex space-x-6 ">
                {links.map(link=>
                    <Text size={'4'}>
                        <Link
                            key={link.href}
                            className={classnames({
                                
                                'text-zinc-900': link.href === currentPath,
                                'text-zinc-500': link.href !== currentPath,
                                'hover: text-zinc-800 transition-colors': true,
                                'flex items-center space-x-1': true
                            })}
                            href={link.href}
                        >
                            <span className="text-zinc-600">{link.icon}</span><span  />{link.label}
                        </Link>
                    </Text>
                )}
            </ul>
        </nav>
    )
}

export default NavBar