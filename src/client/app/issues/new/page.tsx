'use client'

import React from 'react'
import { TextField, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

const newIssuePage = () => {
    return(
        <div className='max-w-xl space-y-3 '>
            <TextField.Root>
                <TextField.Input className='focus:border-blue-500 transition duration-300 ease-in-out' placeholder='title'/>
            </TextField.Root>
            <SimpleMDE  placeholder='what is the issue?' />
            <Button>Submit New Issue</Button>
        </div>
    )
}

export default newIssuePage