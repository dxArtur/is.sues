'use client'

import React, { useEffect, useState } from 'react'
import { Text, TextField, Button, DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Separator, Flex } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor"
import {AiOutlineClose } from 'react-icons/ai'
import {FaChevronDown} from 'react-icons/fa'
import "easymde/dist/easymde.min.css"
import { fetchLabels } from '@/app/utils/api'


const newIssuePage = () => {

    const [labels, setLabels] = useState([])

    const [ issue, setIssue ] = useState({
        title: '',
        description: '',
        labelIds: []
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
            setIssue({title: '', description: '', labelIds: []})
        } else {
            console.log('error add issue')
        }
    } catch (error) {
        console.log(error)
    }
    }

    useEffect(()=>{
        
        fetchLabels().then((arrayLabels)=>setLabels(arrayLabels))
        .catch((error)=> console.error(error))
    }, [issue.labelIds])

    const handleAddLabelInIssue = (labelId) => {
        if (issue.labelIds && !issue.labelIds.includes(labelId)) {
            // Copia o array de labelIds e adiciona a nova labelId
            const newLabelIds = [...issue.labelIds, labelId];
            setIssue({ ...issue, labelIds: newLabelIds });
            console.log(issue.labelIds)
        }
    }

    const handleRemoveLabelFromIssue = (labelIdToRemove) =>{
        const updatedLabelIds = issue.labelIds.filter((labelId)=>labelId !==labelIdToRemove)
        setLabels({...labels, labelIds: updatedLabelIds })
    }
    

    return(
        <div className='max-w-full grid grid-cols-2 gap-4 '>
            <div>
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
            </div>
            <div className='space-y-3'>
                <DropdownMenuRoot>
                    <DropdownMenuTrigger>
                        <Button variant='soft'>
                            Labels
                            <FaChevronDown />
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
                <Separator  my={''} size={'4'} />
                <div className='space-x-2'>
                    {issue.labelIds && issue.labelIds.map((label)=>(
                        <Button key={label} variant='outline' className=' border-dashed border-black border-2' >
                            {label}
                            <AiOutlineClose color='red' onClick={()=>handleRemoveLabelFromIssue(label)} />
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default newIssuePage