import React from "react"
import { NextPage } from "next"
import Router from "next/router"
import withLayout from "../../hocs/withLayout"

import Button from "../Elements/Button"

interface Props {}

const Home: NextPage<Props> = ({}) => {
  return (
    <div className="text-center">
      <h1 className="mb-6 text-2xl font-semibold">Mini Landa Tech Stack</h1>
      <p>A simple API for Mini Landa utilization.</p>
      <div>
        <h3 className="mt-2 mb-2 text-xl font-semibold">Features:</h3>
        <ul>
          <li>
            <a
              className="text-blue-500 underline"
              href="https://reactjs.org/docs/hooks-intro.html"
              target="_blank"
            >
              React Hooks
            </a>
          </li>
          <li>
            <a
              className="text-blue-500 underline"
              href="https://www.typescriptlang.org/"
              target="_blank"
            >
              TypeScript
            </a>
          </li>
          <li>
            <a
              className="text-blue-500 underline"
              href="https://tailwindcss.com/"
              target="_blank"
            >
              Tailwind CSS
            </a>{" "}
            for the UI
          </li>
          <li>
            <a
              className="text-blue-500 underline"
              href="https://www.prisma.io/"
              target="_blank"
            >
              Prisma
            </a>{" "}
            for the database
          </li>
        </ul>
      </div>
      <a href="https://github.com/perryraskin/mini-landa" target="_blank">
        <Button
          text="Get Source Code"
          extend="bg-blue-600 hover:bg-blue-500 text-white"
        />
      </a>
    </div>
  )
}

export default withLayout(Home)
