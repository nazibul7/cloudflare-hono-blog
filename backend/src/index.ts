import { Hono, Next } from 'hono';
import { cors } from 'hono/cors';
import authRoutes from './routes/auth.route';
import { Bindings } from './utils/types';

const app = new Hono<{ Bindings: Bindings }>()

//Added Allowed Cors 
app.use("*", async (c, next: Next) => {
  const allowedOrigins = c.env.CLIENT_URL.split(",");
  const origin = c.req.header("Origin") as string;

  if (allowedOrigins.includes(origin)) {
    cors({
      origin: origin,
      credentials: true,
    })(c, next);
  } else {
    return c.json("CORS policy does not allow this origin", 403);
  }

  await next();
})
// Use the auth routes as middleware
app.route('/auth', authRoutes);

// Default route
app.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default app;
