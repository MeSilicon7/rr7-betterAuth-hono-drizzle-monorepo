import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createAuth } from './lib/createAuth'
import type { AuthContext, Bindings } from './types'



const app = new Hono<{ Variables: AuthContext, Bindings: Bindings }>()

// CORS middleware
app.use(
  '*',
  cors({
    origin: ['http://localhost:5173', 'https://your-production-domain.com'],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['*'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })
)


// Middleware to get session from request headers
app.use('*', async (c, next) => {

  // @ts-ignore
  const auth = createAuth({
    databaseUrl: c.env.DATABASE_URL,
    github_client_id: c.env.GITHUB_CLIENT_ID,
    github_client_secret: c.env.GITHUB_CLIENT_SECRET,
    secret: c.env.SECRET,
  })

  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  if (!session) {
    c.set('user', null)
    c.set('session', null)
    return next()
  }

  // @ts-ignore
  c.set('user', session.user)
  // @ts-ignore
  c.set('session', session.session)
  return next()
})



app.on(["POST", "GET"], "/api/auth/*", async (c) => {

  // @ts-ignore
  const auth = createAuth({
    databaseUrl: c.env.DATABASE_URL,
    github_client_id: c.env.GITHUB_CLIENT_ID,
    github_client_secret: c.env.GITHUB_CLIENT_SECRET,
    secret: c.env.SECRET,
  })

  return auth.handler(c.req.raw)
})


app.get('/api/protected', async (c) => {
  const user = c.get('user')

  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  return c.json({
    message: 'You have accessed a protected route',
    user,
  })
})

app.get('/', (c) => {
  return c.json({ message: 'Hello, world!' })
})


export default app


