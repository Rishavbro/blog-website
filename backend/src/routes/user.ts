import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {  sign } from 'hono/jwt'
import {signupInput,signinInput} from '@rishav-kumar/blog-common'

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}
>()



userRouter.post('/signup',async (c) => {

    const body =await c.req.json();
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  try {
    
   const  {success} =  signupInput.safeParse(body);
   if(!success){
    return c.json({
      message:'invalid inputs'
    })
   }
    
   let user =  await prisma.user.create({
      data:{
        name:body.name,
        username:body.username,
        password:body.password
    
      }
    })
    const jwt = await sign({
      id:user.id
    },c.env.JWT_SECRET)
    console.log(user);
    return c.text(jwt);
    
  } catch (error) {
    console.log(error);
    c.status(411)
    return c.text('INVALID')
    
  }
  
  
  
    
  })
  
  userRouter.post('/signin',async (c) => {
    const body =await c.req.json();
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  try {
    const {success} =  signinInput.safeParse(body);
    if(!success){
     return c.json({
       message:'invalid inputs'
     })
    }
   let user =  await prisma.user.findFirst({
      where:{
        username:body.username,
        password:body.password
      }
    })
  
    if(!user){
      c.status(403);
      return c.text('User does not exist')
    }
    
    const jwt = await sign({
      id:user.id
    },c.env.JWT_SECRET)
    console.log(user);
    return c.text(jwt);
    
  } catch (error) {
    console.log(error);
    c.status(411)
    return c.text('INVALID')
    
  }
  
    
  })