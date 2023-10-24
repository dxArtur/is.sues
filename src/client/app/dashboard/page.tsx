'use client'

import React from 'react'
import { Flex, Text, Strong, Separator, Avatar, HoverCard, Box, Button } from '@radix-ui/themes'
import { GoIssueTrackedBy } from 'react-icons/go'
import Link from 'next/link'
import classnames from 'classnames'

const dashboardPage = () =>{
  const issues = [
    {
      id: 'cde3e92a',
      title: "Erro ao carregar página",
      status: false,
      department: "Suporte",
      description: "A página não carrega corretamente no navegador.",
      authorId: '1a2b3c4d',
      labelIds: [1, 2],
      createdAt: new Date("2023-10-23T10:00:00Z"),
    },
    {
      id: 'f1aa3b4c',
      title: "Problema com o login",
      status: false,
      department: "Suporte",
      description: "Não consigo fazer login na minha conta.",
      authorId: '5e6f7g8h',
      labelIds: [1],
      createdAt: new Date("2023-10-23T10:30:00Z"),
    },
    {
      id: '94e4fd50',
      title: "Sugestão de melhoria",
      status: false,
      department: "Desenvolvimento",
      description: "Seria interessante adicionar uma funcionalidade X ao sistema.",
      authorId: '9i0j1k2l',
      labelIds: [4, 5],
      createdAt: new Date("2023-10-23T11:00:00Z"),
    },
    {
      id: 'bb4f27b5',
      title: 'Erro de digitação no formulário',
      status: false,
      department: 'Desenvolvimento',
      description: 'O formulário apresenta um erro de digitação na seção Y.',
      authorId: 'm3n4o5p6',
      labelIds: [1, 2, 5],
      createdAt: new Date('2023-10-23T11:30:00Z'),
    },
    {
      id: '78d9f3e2',
      title: 'Problema com o carrinho de compras',
      status: false,
      department: 'Suporte',
      description: 'O carrinho de compras não está funcionando corretamente.',
      authorId: 'q7r8s9t0',
      labelIds: [1, 4],
      createdAt: new Date('2023-10-23T12:00:00Z'),
    }
  ]

  const users = [
    {
      id: '1a2b3c4d',
      name: "Maria da Silva",
      email: "maria@example.com",
      idDepartament: 1, // TI
      occupation: "Desenvolvedor",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww"
    },
    {
      id: '5e6f7g8h',
      name: "José Souza",
      email: "jose@example.com",
      idDepartament: 1, // TI
      occupation: "Analista de Sistemas",
      photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: '9i0j1k2l',
      name: "Ana Oliveira",
      email: "ana@example.com",
      idDepartament: 2, // Suporte Técnico
      occupation: "Analista de Suporte",
      photo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 'm3n4o5p6',
      name: "Carlos Santos",
      email: "carlos@example.com",
      idDepartament: 3, // Marketing
      occupation: "Gerente de Marketing",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 'q7r8s9t0',
      name: "Lúcia Lima",
      email: "lucia@example.com",
      idDepartament: 1, // TI
      occupation: "Engenheiro de Software",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 'u1v2w3x4',
      name: "Rafaela Almeida",
      email: "rafaela@example.com",
      idDepartament: 1, // TI
      occupation: "Analista de Qualidade",
    },
    {
      id: 'y5z6a7b8',
      name: "Fernando Oliveira",
      email: "fernando@example.com",
      idDepartament: 2, // Suporte Técnico
      occupation: "Técnico de Suporte",
    },
    {
      id: 'c9d0e1f2',
      name: "Mariana Barbosa",
      email: "mariana@example.com",
      idDepartament: 2, // Suporte Técnico
      occupation: "Analista de Suporte",
    },
    {
      id: 'g3h4i5j6',
      name: "Gustavo Pereira",
      email: "gustavo@example.com",
      idDepartament: 3, // Marketing
      occupation: "Gerente de Marketing",
    },
    {
      id: 'k7l8m9n0',
      name: "Isabela Ribeiro",
      email: "isabela@example.com",
      idDepartament: 1, // TI
      occupation: "Desenvolvedor Frontend",
    },
    ]

    const labels = [
      { id: 1, name: "bug", color: "purple", description: "Report an error or issue." },
      { id: 2, name: "feature", color: "blue", description: "Suggest a new feature." },
      { id: 3, name: "documentation", color: "pink", description: "Documentation or instructions." },
      { id: 4, name: "enhancement", color: "cyan", description: "Improvements to existing features." },
      { id: 5, name: "questions", color: "orange", description: "Questions or inquiries." },
    ]

    function selectLabel(labelIdIssue: number){
      const selected = labels.find(selected => selected.id === labelIdIssue)
      return selected
    }

    function selectUser(userId: string ) {
      const selected = users.find(selected => selected.id === userId)
      return selected
    }

    return(
        <div>
        {issues.map(issue=>
            <div //className='text-zinc-600  border border-zinc-400 rounded-lg p-4 mb-4'>
                className='border border-zinc-400 rounded-lg p-4 mb-4 hover:bg-zinc-200 text-white '>
                    <Flex gap='3' className='items-center'>
                        <GoIssueTrackedBy color='red' size='20'/>
                        <Text size='3' className={classnames({
                            'text-red-500' : issue.status=== false,
                            'text-green-500' : issue.status!== false,
                            //'hover:text-white': true 
                        })}>
                        <Strong>
                            {issue.title }
                        </Strong>
                        </Text>
                        <Avatar
                            size={'3'} 
                            src={selectUser(issue.authorId)?.photo}
                            fallback={'d'}
                        />
                    </Flex>
                <Link href='/issues/see' >
                
                    
                    <Separator  my={'4'} size={'4'} />
                    
                    <Flex gap='3' className='items-center flex justify-between'>
                        <Text size="2" color='gray'>
                          #{issue.id} opened on {(issue.createdAt).toLocaleDateString('en-US', {month: 'short', day:'2-digit', year:'numeric'})} by {selectUser(issue.authorId)?.name}
                        </Text>
                        {issue.labelIds.map((issueLabel)=>
                        <Button className='' variant='surface' color={`${selectLabel(issueLabel)?.color}`} radius='full' > 
                            <HoverCard.Root>
                                <HoverCard.Trigger >
                                    <Text className={`text-${selectLabel(issueLabel)?.color}-800`}
                                    // substitui a linha de codigo abaixo o uso do && {labels.map((label)=> label.id === issueLabel && label.name)}
                                    >
                                      {selectLabel(issueLabel)?.name}
                                      
                                    </Text>
                                </HoverCard.Trigger>
                                <HoverCard.Content>
                                    <Box>
                                      <Text as="div" size="2" color="gray">
                                        {selectLabel(issueLabel)?.description}
                                      </Text>
                                    </Box>
                                </HoverCard.Content>
                            </HoverCard.Root>
                        </Button>
                      )}  
                    </Flex>
                </Link>
            </div>
            )}    
        </div>
    )
}

export default dashboardPage