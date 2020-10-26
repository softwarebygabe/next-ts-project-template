import express, { Request, Response } from 'express'
import next from 'next'
import { mainModule } from 'process'

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

async function createApp() {
  const app = next({ dev })
  const handle = app.getRequestHandler()
  await app.prepare()

  const server = express()

  server.get('/api/data', (req, res) => {
    console.log(`Request received at ${req.path}`)
    setTimeout(() => {
      res.send({
        location: 'New York City',
        position: 'Software Engineer',
      })
    }, 2000)
  })

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res)
  })

  return server
}

(async () => {
  try {
    const app = await createApp()
    app.listen(port, (err?: any) => {
      if (err) throw err
      console.log('express server listining on port', port)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
