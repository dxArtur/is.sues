import express from 'express'
import routes from './routes/Router'
import bodyParser from 'body-parser'
import { PrismaClient } from '@prisma/client';
import cors from 'cors'

const app = express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())


app.use('/api', routes)



/*
const prisma = new PrismaClient();

async function main() {
  
  // Consulta para criar um novo registro na tabela "Users"
  const newUser = await prisma.user.create({
    data: {
      name: "Mateus novo",
      email: "mateusnovo@example.com",
      idDepartamento: 1,
      occupation: "Ocupação",
      photo: "caminho/para/foto.jpg",
    },
  });
  console.log(newUser);

  // Consulta para buscar todos os registros da tabela "Users"
  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

*/



app.listen(3030, () =>{
  console.log('server running on port 3333')
})