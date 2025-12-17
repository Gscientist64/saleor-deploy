FROM node:20-alpine AS builder

WORKDIR /app

# Accept build arguments
ARG NEXT_PUBLIC_SALEOR_API_URL=https://demo.saleor.io/graphql/
ARG NEXT_PUBLIC_STOREFRONT_URL=http://localhost:3000
ARG NEXT_PUBLIC_DEFAULT_CHANNEL=default-channel

# Set environment variables
ENV NEXT_PUBLIC_SALEOR_API_URL=${NEXT_PUBLIC_SALEOR_API_URL}
ENV NEXT_PUBLIC_STOREFRONT_URL=${NEXT_PUBLIC_STOREFRONT_URL}
ENV NEXT_PUBLIC_DEFAULT_CHANNEL=${NEXT_PUBLIC_DEFAULT_CHANNEL}
ENV NEXT_TELEMETRY_DISABLED=1

# Copy package files
COPY react-storefront/package.json react-storefront/pnpm-lock.yaml ./

# Install dependencies
RUN corepack enable
RUN pnpm install --frozen-lockfile

# Copy all source code
COPY react-storefront/ .

# SOLUTION: Remove prebuild hooks to skip generation
RUN npm pkg delete scripts.prebuild scripts.predev

# Build the application
RUN pnpm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]