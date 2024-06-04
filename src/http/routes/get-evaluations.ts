import Elysia, { t } from "elysia"
import { z } from "zod"
import { auth } from "../auth"
import { db } from "../../db/connection"
import { UnauthorizedError } from "../errors/unauthorized-error"

export const getEvaluations = new Elysia().use(auth).get(
  "/evaluations",
  async ({ query, getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError()
    }

    const { pageIndex } = z
      .object({
        pageIndex: z.coerce.number().default(0),
      })
      .parse(query)

    const evaluations = await db.query.evaluations.findMany({
      offset: pageIndex * 10,
      limit: 10,
      orderBy: (evaluations, { desc }) => desc(evaluations.createdAt),
    })

    return evaluations
  },
  {
    query: t.Object({
      pageIndex: t.Numeric({ minimum: 0 }),
    }),
  }
)
