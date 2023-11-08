import express from 'express'
import routes from './routes/Router'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'
import cookieParser from 'cookie-parser'


dotenv.config()
const app = express()


app.use(cors())
app.use(express.json())
app.use(bodyParser.json())


app.use(cookieParser())
app.use(session({
      secret: process.env.SECRET,
      name: 'sessionId',
      resave: false,
      saveUninitialized: true,
      cookie: {  maxAge : 7  *  24  *  60  *  60  *  1000 } 
  })
)



app.use('/api', routes)

app.listen(3030, () =>{
  console.log('server running on port 3030')
})