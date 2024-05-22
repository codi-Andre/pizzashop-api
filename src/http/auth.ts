import jwt from "@elysiajs/jwt"
import Elysia, { t, type Static } from "elysia"
import { env } from "../env"

const jwtPayload = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayload,
    })
  )
  .derive({ as: "scoped" }, ({ jwt, cookie }) => {
    return {
      signUser: async (payload: Static<typeof jwtPayload>) => {
        const token = jwt.sign(payload)

        cookie.auth.set({
          value: token,
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        })
      },
      signOut: () => {
        delete cookie.auth
      },
    }
  })