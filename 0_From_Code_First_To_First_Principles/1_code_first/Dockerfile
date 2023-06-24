FROM node:18-alpine
ENV PORT=3000
EXPOSE $PORT
WORKDIR /app/
COPY package.json package-lock.json tsconfig.json ./
RUN npm i
CMD npm run start:db && npm run start:dev
