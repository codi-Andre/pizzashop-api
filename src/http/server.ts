import Elysia from "elysia"
import { registerRestaurant } from "./routes/register-restaurant"
import { sendAuthLinks } from "./routes/send-auth-links"
import { authenticateFromLink } from "./routes/authenticate-from-link"
import { signOut } from "./routes/sign-out"
import { getProfile } from "./routes/get-profile"
import { getManagedRestaurant } from "./routes/get-managed-restaurant"
import { getOrderDetails } from "./routes/get-order-details"
import { approveOrder } from "./routes/approve-order"
import { cancelOrder } from "./routes/cancel-order"
import { dispatchOrder } from "./routes/dispatch-order"
import { deliverOrder } from "./routes/deliver-order"
import { getOrders } from "./routes/get-orders"
import { getMonthRevenue } from "./routes/get-month-revenue"
import { getDayOrdersAmount } from "./routes/get-day-orders-amount"
import { getMonthOrdersAmount } from "./routes/get-month-orders-amount"
import { getMonthCancelledOrdersAmount } from "./routes/get-month-cancelled-orders-amount"
import { getPopularProducts } from "./routes/get-popular-products"
import { getDailyRevenueInPeriod } from "./routes/get-daily-revenue-in-period"

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLinks)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurant)
  .use(getOrderDetails)
  .use(approveOrder)
  .use(cancelOrder)
  .use(dispatchOrder)
  .use(deliverOrder)
  .use(getOrders)
  .use(getMonthRevenue)
  .use(getDayOrdersAmount)
  .use(getMonthOrdersAmount)
  .use(getMonthCancelledOrdersAmount)
  .use(getPopularProducts)
  .use(getDailyRevenueInPeriod)
  .onError(({ code, error, set }) => {
    switch (code) {
      case "VALIDATION": {
        set.status = error.status
        return error.toResponse()
      }
      case "NOT_FOUND": {
        return new Response(null, { status: 404 })
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
