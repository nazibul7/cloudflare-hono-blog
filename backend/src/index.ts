import { Hono } from 'hono';
import authRoutes from './routes/auth.route';

const app = new Hono();

// Use the auth routes as middleware
app.route('/auth', authRoutes);

// Default route
app.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default app;
