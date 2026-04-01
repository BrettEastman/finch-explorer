# Finch Sandbox Explorer

A Next.js application that connects to [Finch](https://tryfinch.com)'s Sandbox API, allowing you to browse employer data across different payroll providers.

## What It Does

- Select a payroll provider (Gusto, BambooHR, ADP, etc.) and establish a sandbox connection
- View company information: legal name, EIN, entity type, departments, locations
- Browse the employee directory and select individual employees
- View each employee's personal information (name, DOB, contact info, address) and employment details (title, department, start date, income, work location)

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A [Finch](https://dashboard.tryfinch.com/signup) account with sandbox credentials

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/BrettEastman/finch-explorer.git
   cd finch-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the example environment file and add your Finch sandbox credentials:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your credentials:

   ```
   FINCH_CLIENT_ID=your_client_id_here
   FINCH_CLIENT_SECRET=your_client_secret_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

### Token Storage

The Finch access token is stored **server-side only** in a module-scoped variable within the Next.js server runtime. It is never sent to or accessible from the browser. The client communicates exclusively through Next.js API routes, which proxy requests to the Finch API with the stored token.

### Product Scoping

When creating a sandbox connection, the app explicitly requests only these products: `company`, `directory`, `individual`, `employment`. This means the access token **cannot** call `/payment` or `/pay-statement` endpoints -- the restriction is enforced at the token level by Finch.

### Null Field Handling

Every data field is rendered through a `FieldValue` component. When a field value is `null` or `undefined`, it displays a muted italic "N/A" rather than blank space, making it clear the data was requested but not available from the provider.

### Provider Error Handling

If a provider does not implement a specific endpoint, the API routes detect the error (HTTP 501 or "not implemented" message) and return a structured error response. The frontend displays a custom error banner explaining that the selected provider does not support that particular endpoint.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **API Client**: `@tryfinch/finch-api` (official Finch SDK)
- **Styling**: Vanilla CSS with CSS custom properties
