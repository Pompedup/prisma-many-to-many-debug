# prisms-many-to-many-debug

This repository demonstrates a bug in Prisma where disconnecting records in a many-to-many relationship leads to an error when the number of bind variables in the SQL statement exceeds 32,767.

## Problem Description

```js
Invalid `prisma.user.update()` invocation:
Assertion violation on the database: `too many bind variables in prepared statement, expected maximum of 32767, received 32771`
```

This happens because Prisma combines the number of connected records with the records being disconnected, causing the total number of bind variables to exceed the database's limit.


## Steps to Reproduce

1. Install dependencies
```bash
npm install
```
2. Set up the database
Ensure you have a supported database set up (e.g., PostgreSQL, MySQL).
```bash
docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```
3. Set up the .env
Update the DATABASE_URL in your .env file with the appropriate connection string for your database.

```bash
DATABASE_URL="postgresql://postgres:randompassword@localhost:5432/mydb?schema=public"
```
4. Migrate the database
Run the Prisma migration to set up the User and PointOfSale tables.

```bash
npx prisma migrate dev --name init
````
5. Seed the database
Seed the database with a large number of PointOfSale records (32,767) connected to a single user.

```bash
npm run seed
```
6. Run the reproduction script
To reproduce the bug, run the script that attempts to disconnect a few PointOfSale records.

```bash
npm run reproduce
```
7. Expected Output
You should see the following error:

```go
Invalid `prisma.user.update()` invocation:
Assertion violation on the database: `too many bind variables in prepared statement, expected maximum of 32767, received 32771`
```
Project Structure

prisma/schema.prisma: Prisma schema defining the User and PointOfSale models.
seed.ts: Script to populate the database with a user and 32,767 PointOfSale records.
reproduce.ts: Script to trigger the bug by disconnecting PointOfSale records from the user.
Possible Workaround

The issue may be resolved by filtering the point of sale ids when we are getting the relations between user and pointOfSale to avoid exceeding the 32,767 bind variable limit.

Environment

Prisma version: 5.18.0
Database: PostgreSQL
Node.js version: v18.20.2
License

This project is licensed under the MIT License.
