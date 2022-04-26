import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../middleware/prismaClient"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    body: { order },
  } = req
  const { username, price, shareCount, kind } = order

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
          const adminShare = await prisma.share.findFirst({
            where: { username: "admin" },
          })

          const userShare = await prisma.share.findFirst({
            where: { username },
          })

          if (kind === "Buy") {
            // check if Admin user has enough shares
            if (adminShare.count < shareCount) {
              return res.status(404).json({
                availableShares: adminShare.count,
                error: "Not enough shares",
              })
            } else {
              // update admin shares
              const updatedAdminShare = await prisma.share.update({
                where: { id: 1 },
                data: { count: adminShare.count - shareCount },
              })

              // update user shares
              const updatedUserShare = await prisma.share.update({
                where: { id: 13 },
                data: { count: userShare.count + shareCount },
              })

              // create new order
              const newOrder = await prisma.order.create({
                data: {
                  username,
                  price,
                  shareCount,
                  kind,
                },
              })

              return res.status(201).json({
                order: newOrder,
                updatedAdminShare,
                updatedUserShare,
              })
            }
          } else if (kind === "Sell") {
            // check if user has enough shares
            const userShare = await prisma.share.findFirst({
              where: { username },
            })

            if (userShare.count < shareCount) {
              return res.status(404).json({
                availableShares: userShare.count,
                error: "Not enough shares",
              })
            } else {
              // update admin shares
              const updatedAdminShare = await prisma.share.update({
                where: { id: 1 },
                data: { count: adminShare.count + shareCount },
              })

              // update user shares
              const updatedUserShare = await prisma.share.update({
                where: { id: 13 },
                data: { count: userShare.count - shareCount },
              })

              // create new order
              const newOrder = await prisma.order.create({
                data: {
                  username,
                  price,
                  shareCount,
                  kind,
                },
              })

              return res.status(201).json({
                order: newOrder,
                updatedAdminShare,
                updatedUserShare,
              })
            }
          }
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
