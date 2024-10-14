import { Hono } from "hono";

const blog=new Hono()

blog.post('/create',async(c)=>{

})

blog.put('/update/:id',async(c)=>{

})

blog.get('blog',async(c)=>{

})

blog.delete('/delete/:id',async(c)=>{

})

export default blog