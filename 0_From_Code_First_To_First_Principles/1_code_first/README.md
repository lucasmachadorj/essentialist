# Code-First

> This is where you'll write your code-first implementation of the User Story from DDDForum. You can [see the assignment page for more details](https://www.essentialist.dev/products/the-software-essentialist/categories/2153149734/posts/2168948146).

### Getting Started

To run the project, you'll need to have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- Docker (optional)

To start using docker, run the following command:

```bash
docker-compose up
```

It'll start the database, a database admin tool, and the API server. You can access the database admin tool at http://localhost:80. The API server will be running at http://localhost:3000.

To run it detached, run the following command:

```bash
docker-compose up -d
```

To stop the containers, run the following command:

```bash
docker-compose down
```

To stop the containers and remove the volumes, run the following command:

```bash
docker-compose down -v
```

To run the project without docker, you need to set the right connection string in the `.env` file. In spite of .env is in the project, in a real project, it should be in the `.gitignore` file.

After having the right connection string, run the following commands:

```bash
npm install
npm run start:dev
```
