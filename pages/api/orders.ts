import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../middleware/prismaClient"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    body: { order },
  } = req
  const { username, price, shareAmount, kind, shareId } = order

  try {
    switch (method) {
      case "GET":
        break
      case "PUT":
        break

      case "POST":
        console.log(req.body)

        // check that username exists
        const user = await prisma.user.findUnique({
          where: { username },
        })

        if (!user) {
          return res.status(404).json({
            authorized: false,
            error: "User not found",
          })
        } else {
          const order = await prisma.order.create({
            data: {
              username,
              price,
              shareAmount,
              kind,
              shareId,
            },
          })

          res.status(201)
          res.json({ order })
        }

        break
      default:
        return
    }
  } catch (err) {
    res.status(500)
    res.json({ authorized: false, error: err.message })
  }
}
