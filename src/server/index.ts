import express from 'express'
import routes from './routes/Router'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())


app.use('/api', routes)

app.listen(3030, () =>{
  console.log('server running on port 3333')
})