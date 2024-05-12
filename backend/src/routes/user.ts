import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "mediumclone";
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Incorrect inputs",
    });
  }
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });
  let secret = c.env.JWT_SECRET;
  const token = await sign({ id: user.id }, secret);
  return c.json({ jwt: token });
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Incorrect inputs",
    });
  }
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  if (!user) {
    c.status(403);
    return c.json({ error: "User not found" });
  }
  let secret = c.env.JWT_SECRET;
  const token = await sign({ id: user.id }, secret);

  return c.json({ jwt: token });
});
