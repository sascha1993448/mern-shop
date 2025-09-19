FROM node:20-alpine
WORKDIR /app

# Nur package-Dateien zuerst kopieren (bessere Caching-Effizienz)
COPY package*.json ./
# Produktionsabhängigkeiten installieren (Fallback auf npm install, falls kein lockfile)
RUN npm ci --omit=dev || npm install --omit=dev

# Restlichen Code
COPY . .

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "src/index.js"]
