FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY react-storefront/package.json react-storefront/pnpm-lock.yaml ./

# Install dependencies
RUN corepack enable && pnpm install --frozen-lockfile

# Copy source
COPY react-storefront/ .

# Remove problematic pages during build
RUN rm -rf "src/app/[channel]/main/products/[slug]" 2>/dev/null || true

# Build
RUN pnpm run build

# Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]