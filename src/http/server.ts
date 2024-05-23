import Elysia from "elysia"
import { registerRestaurant } from "./routes/register-restaurant"
import { sendAuthLinks } from "./routes/send-auth-links"
import { authenticateFromLink } from "./routes/authenticate-from-link"
import { signOut } from "./routes/sign-out"
import { getProfile } from "./routes/get-profile"
import { getManagedRestaurant } from "./routes/get-managed-restaurant"

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLinks)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurant)
  .onError(({ code, error, set }) => {
    switch (code) {
      case "VALIDATION": {
        set.status = error.status
        return error.toResponse()
      }

      default: {
        console.error(error)

        return new Response(null, { status: 500 })
      }
    }
  })

app.listen(3000, () =>
  console.log(
    `Server is running at ${app.server?.hostname}:${app.server?.port}`
  )
)
