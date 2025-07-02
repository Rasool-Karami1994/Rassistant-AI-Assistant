# Stage 1: Install dependencies
FROM node:18.17.1-slim AS dependencies

ARG VITE_HOST
ARG VITE_PORT

WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm install
RUN npm install -g serve

# Stage 2: Copy code and build
FROM node:18.17.1-slim AS build

ARG VITE_HOST
ARG VITE_PORT

ENV VITE_HOST=$VITE_HOST
ENV VITE_PORT=$VITE_PORT

WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .

# Optional: disable ESLint plugin to avoid build issues
ENV DISABLE_ESLINT_PLUGIN=true
RUN npm run build

# Stage 3: Serve the app
FROM node:18.17.1-slim

RUN npm install -g serve
WORKDIR /app

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]