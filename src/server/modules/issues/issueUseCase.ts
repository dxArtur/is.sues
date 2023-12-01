import { prisma } from "../../database/repositoryClient"
import utilsCrypt from '../../utils/crypt'

export class IssueUseCase{
    async createIssue({ title, description, departmentId, labelsId, authorId }){
        try {
            const newIssue = await prisma.issue.create({
                data: {
                    title,
                    description,
                    department : { connect: { id: departmentId } }, 
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

            return newIssue
        } catch (error) {
           throw new Error(error) 
        }

    }

    async getIssuesById({id}) {
        try {
            const issue = await prisma.issue.findUnique({
                where: { 
                    id: id 
                }
            });

            return issue
        } catch (error) {
            throw new Error(error) 
        }
    }

    
    async updateIssue({id, title, description, departmentId, labelsId, authorId}) {
        try {
            const updatedIssue = await prisma.issue.update({
                where: {
                    id: id
                },
                data: {
                    title,
                    description,
                    department : { connect: { id: departmentId } }, 
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
            return updatedIssue
        } catch (error) {
            throw new Error(error) 
        }
    }

    async deleteIssue({id}) {
        try {
            const deletedIssue = await prisma.issue.delete({
                where: {
                    id: id
                }
            })
            return deletedIssue
        } catch (error) {
            throw new Error(error) 
        }
    }
    
    async listIssues({}) {
        try {
            const allIssues = await prisma.issue.findMany({})
            return allIssues
        } catch (error) {
            throw new Error(error) 
        }
    }
}