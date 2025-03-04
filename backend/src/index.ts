import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';


const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>()

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);


export default app

//postgresql://blogdb_owner:npg_gxaMh32rJfwc@ep-small-fire-a8hi2b32-pooler.eastus2.azure.neon.tech/blogdb?sslmode=require

//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMTg2ZThhM2EtOWQzOC00YThiLTk3MWUtY2FkNmU3MjllNjU0IiwidGVuYW50X2lkIjoiNGFlYzE3YTNhMDYzZWUzMDkyOWY0MTM2N2E0N2I0MzBjZDRmZThlZTdkMWE4NGEzNTc3OWI3MzI1MTlhODBmZCIsImludGVybmFsX3NlY3JldCI6IjhlZmIyZWU2LWM2NWYtNGM3YS1iMjM0LWZlMzA2ZTlmZjZmYyJ9.081CgSRQEknVJ0TqpmVZ1cfDSagHIeLGbZ_UnDXzzFY"
