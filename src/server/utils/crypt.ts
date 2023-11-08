import * as bcrypt from 'bcrypt'

export default {
    async cryptPass(plainPassword: string): Promise<string>{
        try {
            const hashedPassword = bcrypt.hashSync(plainPassword, Number(process.env.SALT))
            return hashedPassword
        } catch (error) {
            throw new Error('error hash password')
        }
    },

    async match(password:string, cryptPassword:string):Promise<Boolean>{
        try {
            const matchSucess = await bcrypt.compare(password, cryptPassword)
            return matchSucess
        } catch (error) {
            throw new Error('error compare')
        }
    }
}