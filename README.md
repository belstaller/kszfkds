# simple counter (agent not optimized)

A production-ready boilerplate built with Next.js, TypeScript, Tailwind CSS, Node.js, and PostgreSQL, organized using Clean Architecture.

## Features

- Next.js App Router entry points in the interfaces layer
- TypeScript with strict mode enabled
- Tailwind CSS for styling
- PostgreSQL integration via `pg`
- Clean Architecture layering with clear dependency boundaries
- Example counter domain, repository contract, use case, infrastructure implementation, and HTTP route

## Getting Started

1. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start a PostgreSQL instance and ensure `DATABASE_URL` is valid.

4. Create the example table:

   ```sql
   CREATE TABLE counters (
     id TEXT PRIMARY KEY,
     value INTEGER NOT NULL DEFAULT 0,
     updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
   );

   INSERT INTO counters (id, value) VALUES ('default', 0)
   ON CONFLICT (id) DO NOTHING;
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open http://localhost:3000

## Scripts

- `npm run dev` — start development server
- `npm run build` — build production app
- `npm run start` — start production server
- `npm run lint` — run ESLint
- `npm run typecheck` — run TypeScript checks
- `npm run format` — format code with Prettier

## Clean Architecture Layers

- `src/domain/` — entities, value objects, domain services, repository interfaces
- `src/application/` — use cases and DTOs that orchestrate domain behavior
- `src/infrastructure/` — PostgreSQL adapters and external implementations
- `src/interfaces/` — Next.js pages, route handlers, and controllers

### Dependency Rule

- `interfaces -> application -> domain`
- `infrastructure -> application -> domain`
- `domain` imports nothing outside itself

## Example Flow

The included counter example works like this:

1. A Next.js API route in `src/interfaces/` receives a request.
2. It validates input and invokes an application use case.
3. The use case loads a domain entity through a repository interface.
4. An infrastructure repository implementation persists changes to PostgreSQL.
5. A DTO is returned to the interface layer and serialized as JSON.
