import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../middleware/prismaClient"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { id },
    body: { username },
  } = req

  try {
    switch (method) {
      case "GET":
        // mock authentication by checking if username was passed in body
        if (!username) {
          return res.status(401).json({
            authorized: false,
            error: "Not authorized",
          })
        }

        // check if username exists
        const user = await prisma.user.findUnique({
          where: { username },
        })

        if (!user) {
          return res.status(401).json({
            authorized: false,
            error: "Not authorized",
          })
        } else {
          const order = await prisma.order.findUnique({
            where: { id: Number(id) },
            include: { Share: true },
          })

          // check if order exists
          if (!order) {
            return res.status(404).json({
              error: "Order not found",
            })
          }
          // mock authentication by checking if username matches the order username
          else if (order.username !== username) {
            return res.status(401).json({
              authorized: false,
              error: "Not authorized",
            })
          } else {
            res.status(201)
            res.json({
              order: {
                id: order.id,
                dateCreated: order.dateCreated,
                username: order.username,
                price: order.price,
                shareAmount: order.shareAmount,
                kind: order.kind,
                Share: {
                  id: order.Share.id,
                  currentOwner: order.Share.username,
                  currentPrice: order.Share.price,
                },
              },
            })
          }
        }
        break

      case "POST":
        break
      default:
        return
    }
  } catch (err) {
    console.log(err)
    res.status(500)
    res.json({ authorized: false, error: err.message })
  }
}
