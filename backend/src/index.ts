import { Hono, Next } from 'hono';
import { cors } from 'hono/cors';
import authRoutes from './routes/auth.route';
import { Bindings } from './utils/types';

const app = new Hono<{ Bindings: Bindings }>()

//Added Allowed Cors 
app.use("*", async (c, next: Next) => {
  const a = cors({
    origin: c.env.CLIENT_URL,
    credentials: true,
  })
  return a(c, next)
})
// Use the auth routes as middleware
app.route('/auth', authRoutes);

// Default route
app.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default app;
