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
     OLLAMA_MODEL=llama3.2:1b
     ```

## Running the Project

1. **Start Ollama service** (in one terminal)
   ```bash
   ollama serve
   ```

2. **Initialize the database** (first time only)
   ```bash
   npm run db:generate
   ```
   Note: This will generate the Prisma client and create a `dev.db` SQLite database file in the prisma directory.

3. **Start the development server** (in another terminal)
   ```bash
   npm run dev
   ```

4. Navigate to [http://localhost:3000](http://localhost:3000)

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
- Update the Document page to display the document alongside the AI generated insights. Use your judgement to make the UI useful and usable. Feel free to add whatever styling library you would like to use.

**Local API:** Uses Ollama running on `http://localhost:11434`

**Hint:** Example Ollama API call structure:
```typescript
const ollama = new Ollama({ host: ollamaHost });
const response = await ollama.chat({
  model: ollamaModel,
  messages: [
    { role: 'user', content: `Analyze: ${text}` }
  ]
});
```

### **Part 2: Store and Sort Documents by Needs Editing**
**Locations:** 
- Database schema: `prisma/schema.prisma`
- Store API: `app/api/store-insights/route.ts`
- Retrieve API: `app/api/get-all-insights/route.ts`

**Task:** Store insights in database and sort documents by needsEditing status.

**Steps:**
1. **Update the schema** in `prisma/schema.prisma`
``` Sample:
model Insights {
  documentId String @id
  summary    String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  yourFieldHere String
}
```
2. **Generate and run the migration** `npm run db:migrate`
3. **Update store-insights API** to store all generated insights (summary, sentiment, needsEditing). This API should be called after insights are generated in Part 1.
4. **Update get-all-insights API** to return all insight fields
5. **Implement sorting** on the documents list on the home page (`app/page.tsx`) to show documents needing editing first

### **Part 3: Architecture**
How would you make this a production system?

**(Freeform discussion)**

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
- `llama3.2:1b` - Fast and lightweight (recommended)
- `llama3.2` (3B) - Larger model with better accuracy
- `qwen2.5:3b` - Good alternative



## For Candidates Who Can't Run Ollama
Interviewer:
1. ngrok http http://localhost:11434
2. Give candidate ngrok endpoint and set OLLAMA_HOST=ngrok_url in the .env file