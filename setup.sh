#!/bin/bash

# cd to the directory of this script
cd "$(dirname "$0")"

echo "Is development mode? [y/n]"
read dev

# check if .env file exists
if [ ! -f .env ]; then
    echo "Please create a .env file with the following content:"
    echo "DATABASE_URL=postgres://[POSTGRES_USER]:[POSTGRES_PASSWORD]@[HOST]/[POSTGRES_DB]?schema=public"
    echo "JWT_SECRET=your secret"
    echo "CORS_ORIGIN=[ origins separated by space ]"
    exit 1
fi

# Install dependencies
cd ./ufca-vegs-frontend/
npm i

if [ "$dev" = "y" ]; then
    echo "provide the backend url: "
    read backend_url
    # substitute the backend url in the .env file
    sed -i "s|VITE_SOCKET_URL=.*|VITE_SOCKET_URL=$backend_url|g" .env
fi

npm run build
cd ..

npm i
npx prisma generate
if [ "$dev" = "y" ]; then
    npx prisma migrate dev
    npm run dev
else
    npx prisma migrate deploy
    npm run build
    npm run start
fi