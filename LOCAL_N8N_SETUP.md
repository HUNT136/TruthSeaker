# Local n8n Setup for TruthSeaker

## Quick Start (Option 1: Use Built-in Simulation)
Your app is already configured to work locally! Just run:
```bash
npm start
```
The app will automatically use the local n8n workflow simulation.

## Full n8n Setup (Option 2: Real n8n Server)

### 1. Install n8n locally
```bash
npm install -g n8n
```

### 2. Start n8n server
```bash
n8n start
```
n8n will be available at: http://localhost:5678

### 3. Import your workflow
1. Open http://localhost:5678
2. Go to Workflows
3. Click "Import from File"
4. Import your `Frontend API Trigger.json` and `Main Workflow.json`

### 4. Create webhook
1. In your workflow, add a "Webhook" node
2. Set HTTP Method: POST
3. Set Path: `fact-check`
4. Your webhook URL will be: `http://localhost:5678/webhook/fact-check`

### 5. Activate workflow
1. Click the "Active" toggle in your workflow
2. Make sure the webhook is listening

## Testing
Test your setup by running the React app:
```bash
npm start
```

The app will:
1. ✅ Try your local n8n workflow first
2. ✅ Fall back to local simulation if n8n is not running
3. ✅ Always provide results

## Troubleshooting
- If n8n is not running: App uses local simulation
- If webhook fails: Check n8n workflow is active
- If Gemini fails: Check API key in .env file

Your app is ready to run locally with or without n8n!