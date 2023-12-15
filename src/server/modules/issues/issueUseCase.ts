import { prisma } from "../../database/repositoryClient"
import { CreateIssueDto, UpdateIssueDto } from "../../dtos/IssueDTO"
import utilsCrypt from '../../utils/crypt'

export class IssueUseCase{
    async createIssue(issueData: CreateIssueDto) {
        try {
            const newIssue = await prisma.issue.create({
                data: {
                    title: issueData.title,
                    description: issueData.description,
                    department: { connect: { id: issueData.departmentId } },
                    author: { connect: { id: issueData.authorId } }
                }
            });

            return newIssue;
        } catch (error) {
           throw new Error("Erro ao criar a issue.");
        }
    }
    
    async getIssuesById({ id }: { id: string }) {
        try {
            const issue = await prisma.issue.findUnique({
                where: { id }
            });

            return issue;
        } catch (error) {
            throw new Error("Erro ao buscar a issue.");
        }
    }
    async updateIssue(issueData: UpdateIssueDto) {
        try {
            const updatedIssue = await prisma.issue.update({
                where: { id: issueData.id },
                data: {
                    ...(issueData.title && { title: issueData.title }),
                    ...(issueData.description && { description: issueData.description }),
                    ...(issueData.departmentId && { department: { connect: { id: issueData.departmentId } } }),
                    ...(issueData.authorId && { author: { connect: { id: issueData.authorId } } })
                }
            });
            return updatedIssue;
        } catch (error) {
            throw new Error("Erro ao atualizar a issue.");
        }
    }

    async deleteIssue({ id }: { id: string }) {
        try {
            const deletedIssue = await prisma.issue.delete({
                where: { id }
            });
            return deletedIssue;
        } catch (error) {
            throw new Error("Erro ao deletar a issue.");
        }
    }
    
    async listIssues({}) {
        try {
            const allIssues = await prisma.issue.findMany()
            return allIssues
        } catch (error) {
            throw new Error("Erro ao buscar issues.");
        }
    }
}