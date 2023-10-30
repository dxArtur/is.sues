'use client'

import React, { useState } from "react"
import { Avatar, Text, Button, Flex, Separator, Strong } from "@radix-ui/themes"
import classnames from 'classnames'
import { RiTeamLine } from 'react-icons/ri'
import { CgDanger } from 'react-icons/cg'
import { MdOutlineModeEditOutline } from 'react-icons/md'


const profilePage =()=>{

    const sessionUser = 
    {
        id: '1a2b3c4d',
        name: "Maria da Silva",
        email: "maria@example.com",
        idDepartament: 1, // TI
        occupation: "Desenvolvedor",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww"
      }

        
    const [isHovered, setIsHovered] = useState(false)
    return(
        <div className="space-y-3">
            <div className="flex items-center">
                <Avatar
                    src={sessionUser.photo}
                    size={'9'}
                />
                <div className=" p-4 max-w-4xl border border-zinc-500 rounded-md ml-4">
                    <Text as="p" size={'4'}>
                        <Strong>
                            {sessionUser.name}
                        </Strong>
                    </Text>
                    <Text size={'3'}>
                        {sessionUser.occupation}
                    </Text>
                </div>
            </div>

            <div className=" space-y-3 ">
                <Button className={classnames({
                    'hover:text-red-500  border-4 border-red-500': true 
                })}
                variant="soft"
                color="gray"
                onMouseEnter={()=> setIsHovered(true)}
                onMouseLeave={()=> setIsHovered(false)}
                >
                    { isHovered ?
                    <>
                    <CgDanger />  {'Danger zone'}
                    </>
                    :
                    <>
                    <MdOutlineModeEditOutline /> {'Edit profile'}
                    </>}
                </Button>
                <Separator  color="red"/>
                <Text as='div' className="items-center flex text-zinc-500 ">
                    <RiTeamLine />is a member of departament {sessionUser.idDepartament}
                </Text>
                <Button>Send me a email</Button>
            </div>
        </div>
    )
}

export default profilePage