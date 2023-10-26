'use client'

import React, { useEffect, useState } from 'react'
import { Text, TextField, Button, DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { fetchLabels } from '@/app/utils/api'


const newIssuePage = () => {

    const [labels, setLabels] = useState([])

    const [ issue, setIssue ] = useState({
        title: '',
        description: '',
        labelI: []
    })

    const handleSubmit = async (event) =>{
        console.log('client side'+ JSON.stringify(issue))
        event.preventDefault()
    

    try {
        const response = await fetch('http://localhost:3030/new', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify(issue)
        })

        if (response.ok) {
            setIssue({title: '', description: ''})
        } else {
            console.log('error add issue')
        }
    } catch (error) {
        console.log(error)
    }
    }

    useEffect(()=>{
        
        fetchLabels().then((arrayLabels)=>setLabels(arrayLabels))
        .catch((error)=> console.error(error)); console.log(labels)
    }, [])

    const handleAddLabelInIssue = (labelId) => {
        
    }
    

    return(
        <div className='max-w-xl space-y-3'>
            <form onSubmit={handleSubmit} className='space-y-3'>
                <TextField.Root> 
                    <TextField.Input
                        value={issue.title}
                        onChange={(event) => setIssue({ ...issue, title: event.target.value })} 
                        className='focus:border-blue-500 transition duration-300 ease-in-out'
                        placeholder='title'
                    />
                </TextField.Root>
                <SimpleMDE
                value={issue.description}
                onChange={(value) => setIssue({ ...issue, description: value })}
                placeholder='what is the issue?'
                />
                <Button onClick={handleSubmit}>Submit New Issue</Button>
            </form>
            <div>
                <Text>
                    <DropdownMenuRoot>
                        <DropdownMenuTrigger>
                            <Button variant='soft'>
                                Labels
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {labels && labels.map((label)=>(
                                <DropdownMenuItem
                                key={label.id}
                                onClick={()=> handleAddLabelInIssue(label.id)}
                                >
                                    {label.name}
                                </DropdownMenuItem>
                                
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenuRoot>
                </Text>
            </div>
        </div>
    )
}

export default newIssuePage