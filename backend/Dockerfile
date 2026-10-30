# ─────────────────────────────────────────────
# Backend - Node.js + Express
# ─────────────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

# Install dependencies first (Docker cache layer)
COPY package.json .
RUN npm install --omit=dev

# Copy source
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
