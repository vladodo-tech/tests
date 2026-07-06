FROM mcr.microsoft.com/playwright:v1.61.1-noble

WORKDIR /app

COPY package*.json ./
RUN npm ci

RUN npx playwright install --with-deps

COPY . .

ENV CI=true
ENV BASE_URL=http://localhost:5173

CMD ["npx", "playwright", "test"]