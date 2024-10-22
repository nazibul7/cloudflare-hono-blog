import { Hono } from 'hono';
import authRoutes from './routes/auth.route';
import { Bindings } from './utils/types';

const app = new Hono<{ Bindings: Bindings }>()

// Use the auth routes as middleware
app.route('/auth', authRoutes);


// Default route
app.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default app;
