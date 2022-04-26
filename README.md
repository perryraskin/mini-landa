# Mini Landa Tech Stack

A simple API for Mini Landa utilization.

## Technologies

- [React Hooks](https://reactjs.org/docs/hooks-intro.html) instead of React.Component to create stateful components
- [TypeScript](https://www.typescriptlang.org/) static types for Component Props, Actions & Services
- [Tailwind CSS](https://tailwindcss.com/) for the UI
- [Prisma](https://www.prisma.io/) for the database
- [Eslint](https://eslint.org/) & [Prettier](https://prettier.io/) to lint and format the source code.

Hit the **Star** button if you love this project ⭐️

## Project Details

- Hit the **[POST]** `/api/orders` endpoint to create a new `Order`.
- Hit the **[GET]** `/api/order/[id]/status` endpoint to see the status of an `Order`.
- A player's share count can be calculated via `User.Shares[0].count`. Since there is only 1 type of share for our project, it will be the first (and only) share linked to the user.
- For a `Buy`, the API automatically subtracts shares from the Demo User and adds shares to the Admin User. The Demo User's share count must be equal to or greater than the order's share count for the order to be processed.
- For a `Sell`, the API automatically subtracts shares from the Admin User and adds shares to the Demo User. The Admin User's share count must be equal to or greater than the order's share count for the order to be processed.

## API
### POST `/api/orders`

Sample request:
```json
{
    "order": {
        "username": "demo",
        "price": 41,
        "shareCount": 5,
        "kind": "Buy"
    }
}
```

Sample response:
```json
{
    "order": {
        "id": 12,
        "dateCreated": "2022-04-26T18:31:50.671Z",
        "username": "demo",
        "price": "41",
        "shareCount": 5,
        "kind": "Buy"
    },
    "updatedAdminShare": {
        "id": 1,
        "dateCreated": "2022-04-26T16:37:34.238Z",
        "username": "admin",
        "count": 32
    },
    "updatedUserShare": {
        "id": 13,
        "dateCreated": "2022-04-26T16:37:34.238Z",
        "username": "demo",
        "count": 13
    }
}
```

### GET `/api/order/[id]/status`

Sample endpoint: `/api/order/1/status`

Sample request:
```json
{
  "username": "demo"
}
```

Sample response:
```json
{
    "order": {
        "id": 1,
        "dateCreated": "2022-04-26T16:01:09.060Z",
        "username": "demo",
        "price": "43.11",
        "shareCount": 1,
        "kind": "Buy"
    }
}
```

### Running Locally

Install dependencies

`yarn` or `npm install`

For development

`yarn dev` or `npm run dev`