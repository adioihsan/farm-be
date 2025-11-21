# --- STAGE 1: BUILD + PRISMA GENERATE ---
FROM node:22-alpine AS builder

WORKDIR /app

# 1. copy package dan install deps (termasuk devDependencies)
COPY package*.json ./
RUN npm install

# 2. copy prisma + tsconfig + source code
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# 3. generate prisma client & build Typescript
RUN npm run prisma:generate
RUN npm run build

# --- STAGE 2: RUNTIME ---
FROM node:22-alpine

WORKDIR /app

# hanya butuh deps production
COPY package*.json ./
RUN npm install --omit=dev

# copy hasil build + prisma client
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# kalau kamu butuh file lain (misal email templates), bisa ditambah di sini
# COPY some-folder ./some-folder

ENV NODE_ENV=production
ENV PORT=7000
EXPOSE 7000

CMD ["node", "dist/server.js"]
