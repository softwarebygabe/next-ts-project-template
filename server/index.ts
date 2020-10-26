import express, { Request, Response } from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

async function createApp() {
  // create and prepare the next app
  const nextApp = next({ dev })
  await nextApp.prepare()

  const server = express()

  // create and attach backend routes here
  server.get('/api/data', (req, res) => {
    console.log(`Request received at ${req.path}`)
    const fakeLoadingTime = 2000 // ms
    setTimeout(() => {
      res.send({
        location: 'New York City',
        position: 'Software Engineer',
      })
    }, fakeLoadingTime)
  })

  // handle all other requests with the next app's handler
  server.all('*', (req: Request, res: Response) => {
    const handle = nextApp.getRequestHandler()
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
