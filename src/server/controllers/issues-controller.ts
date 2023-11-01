import {Request,Response} from 'express'
import Issue from '../models/issue-interface'
import uuidv4 from 'uuidv4'
import { prisma } from '../database'




export default {
    async addIssue(req: Request, res: Response) {
        try {
            const {title, description, departament, labelsId, authorId} = req.body
            
            const issueAdd = await prisma.issue.create({
                data: {
                    title,
                    description,
                    departament,
                    labelsId: {
                        set: labelsId
                    },
                    author: {
                        connect: {
                            id: authorId
                        }
                    }
                },
            })

            res.status(201).json({message: 'issue add with sucessfull', content: issueAdd})
            
        } catch (error) {
            res.status(500).json({error: error})
        }
    },
    async getIssue(req: Request, res: Response){
        try {
            const {issueId} = req.body

            const issueFound = await prisma.issue.findUnique({
                where: {
                    id: issueId
                }
            })

            if (!issueFound) {
                res.status(404).json({message: 'issue not found'})
            }

            res.status(201).json({message: 'issue found', content: issueFound})

        } catch (error) {
            res.status(500).json({error: error})
        }
    },
    
    async updateIssue(req: Request, res: Response) {
        try {
            const {issueId} = req.body
            const {title, description, departament, labelsId, authorId} = req.body

            const issueFound = await prisma.issue.update({
                where: {
                    id: issueId
                },
                data: {
                   title,
                   description,
                   departament,
                   labelsId: {
                    set: labelsId
                },
                author: {
                    connect: {
                        id: authorId
                    }
                }
                }
            })

            if (!issueFound) {
                res.status(404).json({message: 'issue not found'})
            }

            res.status(201).json({message: 'issue updated', content: issueFound})

        } catch (error) {
            console.log(error)
            res.status(500).json({error: error})
        }
    },

    async deleteIssue(req: Request, res: Response){
        try {
            const {issueId} = req.body

            const issueFound = await prisma.issue.delete({
                where: {
                    id: issueId
                }
            })

            if (!issueFound) {
                res.status(404).json({message: 'issue not found'})
            }

            res.status(201).json({message: 'issue deleted', content: issueFound})

        } catch (error) {
            res.status(500).json({error: error})
        }
    },

    async getAllIssues(req: Request, res:Response) {
        try {
            const allIssues = await prisma.issue.findMany()

            if (!allIssues) {
                res.status(404).json({message: 'not be issues record'})
            }

            res.status(201).json({message: 'all issues', content: allIssues})

        } catch (error) {
            res.status(500).json({error: error})
        }
    }
}