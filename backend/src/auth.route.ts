import { Hono } from 'hono';

const auth = new Hono();

auth.get('/signup', (c) => {
    return c.text('Hello World');
});

export default auth;
