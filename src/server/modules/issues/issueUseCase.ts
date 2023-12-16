import { prisma } from "../../database/repositoryClient"
import { CreateIssueDto, UpdateIssueDto } from "../../dtos/IssueDTO"
import utilsCrypt from '../../utils/crypt'
import { createIssueSchema, issueIdSchema, updateIssueSchema } from '../../schamas/issuesSchema';
import { ZodError } from 'zod';
import { ValidationError, DatabaseError } from '../../Error/CustomError';

export class IssueUseCase{
    async createIssue(issueData: CreateIssueDto) {
        try {
            const validatedData = createIssueSchema.parse(issueData);
    
            const newIssue = await prisma.issue.create({
                data: {
                    title: validatedData.title,
                    description: validatedData.description,
                    department: { connect: { id: validatedData.departmentId } },
                    author: { connect: { id: validatedData.authorId } }
                }
            });
    
            return newIssue;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError("Erro de validação", error);
            }
            throw new DatabaseError("Erro ao criar a issue.");
        }
    }
    
    
    async getIssuesById({ id }: { id: string }) {
        try {
            const validatedData = issueIdSchema.parse({ id });
    
            const issue = await prisma.issue.findUnique({
                where: { id: validatedData.id },
            });
    
            if (!issue) {
                throw new Error("Issue não encontrada.");
            }
    
            return issue;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError("Erro de validação", error);
            }
            throw new DatabaseError("Erro ao buscar a issue.");
        }
    }

    async updateIssue(issueData: UpdateIssueDto) {
    try {
        const validatedData = updateIssueSchema.parse(issueData);

        const updatedIssue = await prisma.issue.update({
            where: { id: validatedData.id },
            data: {
                ...(validatedData.title && { title: validatedData.title }),
                ...(validatedData.description && { description: validatedData.description }),
                ...(validatedData.departmentId && { department: { connect: { id: validatedData.departmentId } } }),
                ...(validatedData.authorId && { author: { connect: { id: validatedData.authorId } } })
            }
        });

        return updatedIssue;
    } catch (error) {
        if (error instanceof ZodError) {
            throw new ValidationError("Erro de validação", error);
        }
        throw new DatabaseError("Erro ao atualizar a issue.");
    }
}


    async deleteIssue({ id }: { id: string }) {
        try {
            const validatedData = issueIdSchema.parse({ id });

            const deletedIssue = await prisma.issue.delete({
                where: { id: validatedData.id },
            });

            return deletedIssue;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError("Erro de validação", error);
            }
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