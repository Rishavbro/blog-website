import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt'

import {createBlogInput, CreateBlogInput,updateBlogInput} from '@rishav-kumar/blog-common'


export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
//    variables:{
//     userId:string
//    }
Variables: { // ✅ Define userId here
    userId: string;
};
}>();

type JwtPayload = { id: string };

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET) as JwtPayload; // ✅ Explicitly cast type

        if (!user) return c.json({message:'you are not authorized'})

        c.set("userId", user.id); 

        await next();
    } catch (error) {
        c.status(403);
        return c.json({ message: "You are not logged in" });
    }
});




blogRouter.post('/',async (c) => {

   try {
    const body =await c.req.json();
    const authorId = c.get("userId");
    console.log(authorId);

    const {success} = createBlogInput.safeParse(body);
    if(!success){
        return c.json({
            message:'invalid inputs'
        })
    }
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.create({
    data:{
        title:body.title,
        content:body.content,
        authorId:Number(authorId)
    }
  })

    return c.json({
        id:blog.id,
        msg:blog
    })
   } catch (error) {
    console.log(error)
    c.status(411)
    return c.json({
        message:'some error occured'
    })
    
   }
  })
  
  blogRouter.put('/',async (c) => {

    try {
        const body =await c.req.json();
        const {success} = updateBlogInput.safeParse(body);
        if(!success){
            return c.json({
                message:'invalid inputs'
            })
        }
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  let newBlog = await prisma.blog.update({
    where:{
        id:Number(body.id)
    },
    data:{
        title:body.title,
        content:body.content,
        
    }
  })

  return c.json({
    blog:newBlog
})
        
    } catch (error) {
        console.log(error)
        return c.json({
            message:'some error occured'
        })
    }
  })

  //add pagination in this route
  blogRouter.get('/bulk',async (c) => {
    try {
        
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany();
  return c.json({
    blogs:blogs
  })

    } catch (error) {
        console.log(error);
        return c.json({
            Message:'some eroor occccured'
        })
    }
    
    
  })
  
  blogRouter.get('/:id',async (c) => {

   try {
    const id = c.req.param("id");
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.findFirst({
    where:{
        id:Number(id)
    }

  })

    return c.json({
        blog
    })
    
   } catch (error) {
    console.log(error)
    return c.json({
        message:'some error occured'
    })
   }
  })
  
  
  