import { Hono } from 'hono';
import authRoutes from './routes/auth.route';
import { Bindings } from './utils/types';

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', async (c, next) => {
  console.log('Using global middleware');
  await next();
});
// Use the auth routes as middleware
app.route('/auth', authRoutes);


// Default route
app.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default app;
