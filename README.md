# Full-Stack Interview Exercise: LLM Insights Viewer

A Next.js 14 application for uploading documents and generating AI-powered insights using Ollama (local LLM).

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Install and setup Ollama**
   ```bash
   # Install Ollama (macOS)
   brew install ollama
   
   # Or download from: https://ollama.com/download
   
   # Start Ollama service
   OLLAMA_ORIGINS="*" OLLAMA_HOST=0.0.0.0 ollama serve

   # Pull a model (in another terminal)
   ollama pull llama3.2:1b
   ```

3. **Environment Variables** (Optional)
   - Copy `.env.example` to `.env.local`
   - Customize Ollama settings if needed:
     ```
     DATABASE_URL="file:./dev.db"
     OLLAMA_HOST=http://localhost:11434
     OLLAMA_MODEL=llama3.2
     ```

## Running the Project

1. **Start Ollama service** (in one terminal)
   ```bash
   ollama serve
   ```

2. **Start the development server** (in another terminal)  
   ```bash
   npm run dev
   ```

3. Navigate to [http://localhost:3000](http://localhost:3000)

## Database Migrations

**Migration files are stored in:** `prisma/migrations/`

**Run migrations:**
```bash
npm run db:push        # Apply schema changes
npm run db:generate    # Generate Prisma client
npm run db:studio      # Database GUI
```

**⚠️ Important:** After updating the Prisma schema, always run `npm run db:generate` to regenerate TypeScript types. If you see type errors, restart your TypeScript language server (VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server").


## Implementation Instructions

### **Part 1: Request Insights from Ollama**
**Location:** `app/api/insights/route.ts`

**Task:** Implement Ollama API integration to generate document insights and display them.

**Requirements:**
- Call Ollama API with document text using local model
- Extract and return: summary, sentiment, needsEditing
- Display insights on document details page

**Local API:** Uses Ollama running on `http://localhost:11434`

**Expected Response:**
```typescript
{
  summary: "Summary",
}
```

### **Part 2: Store and Sort Documents by Needs Editing**
**Locations:** 
- Database schema: `prisma/migrations/20240102000000_add_additional_columns/migration.sql`
- Store API: `app/api/store-insights/route.ts`
- Retrieve API: `app/api/get-all-insights/route.ts`

**Task:** Store insights in database and sort documents by needsEditing status.

**Steps:**
1. **Updaet the schema** in `prisma/schema.prisma`
2. **Generate and run the migration** `npm db:migrate`
3. **Update store-insights API** to save sentiment and needsEditing fields
4. **Update get-all-insights API** to return all insight fields
5. **Implement sorting** to show documents needing editing first

### **Part 3: Architecture
How would you make this a production system?

## What's Implemented

✅ File upload (.txt, .docx)  
✅ Document parsing and storage  
✅ Database with Prisma/SQLite  
✅ Basic UI and routing  
✅ 10 sample documents  
✅ Ollama integration setup

❌ Ollama API implementation (Part 1)  
❌ Extended database schema (Part 2)

## Troubleshooting Ollama

**If you see "Ollama is not running" error:**
1. Make sure Ollama is installed: `ollama --version`
2. Start Ollama service: `ollama serve`  
3. Pull a model: `ollama pull llama3.2:1b`
4. Test Ollama: `ollama list` should show your downloaded models

**Recommended models:**
- `llama3.2` (3B) - Fast and lightweight
- `llama3.2:1b` - Even faster for testing
- `qwen2.5:3b` - Good alternative



## For Candidates Who Can't Run Ollama
Interviewer: 
1. ngrok http http://localhost:11434
2. Give candidate 