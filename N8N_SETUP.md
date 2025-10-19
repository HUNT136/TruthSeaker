# N8N Integration Setup Guide

## Overview
Your React app is now integrated with n8n workflows for AI-powered fact-checking using Google Gemini.

## Workflow Architecture
1. **Frontend API Trigger** - Receives requests from React app
2. **Main Workflow** - Processes content with Google Gemini AI
3. **Scheduled Scraper** - Monitors news feeds automatically

## Setup Steps

### 1. N8N Instance Setup
- **Option A**: Use n8n Cloud (https://app.n8n.cloud)
- **Option B**: Self-host n8n (https://docs.n8n.io/hosting/)

### 2. Import Workflows
1. In n8n, go to Workflows → Import
2. Import these files in order:
   - `Main Workflow.json`
   - `Frontend API Trigger.json` 
   - `Scheduled Scraper.json`

### 3. Configure Google Gemini API
1. Get API key from Google AI Studio
2. In n8n, go to Credentials → Add Credential
3. Select "Google PaLM API"
4. Enter your API key

### 4. Update Webhook URL
1. In n8n, open "Frontend API Trigger" workflow
2. Copy the webhook URL from the Webhook node
3. Create `.env` file in your React project root:
   ```
   REACT_APP_N8N_WEBHOOK_URL=your_copied_webhook_url
   ```

### 5. Activate Workflows
- **Frontend API Trigger**: Set to ACTIVE
- **Main Workflow**: Keep INACTIVE (auto-triggered)
- **Scheduled Scraper**: Set to ACTIVE for monitoring

### 6. Test Integration
1. Start your React app: `npm start`
2. Go to fact-check page
3. Submit content for verification
4. Check n8n execution logs

## Features Integrated

### Frontend Integration
- URL fact-checking via n8n webhook
- Text analysis with AI classification
- Image processing pipeline
- Real-time results from Google Gemini

### AI Classifications
- **Verified**: Trustworthy content
- **Potential Misinformation**: Suspicious content
- **Unverified**: Needs more verification

### Automated Monitoring
- Hourly RSS feed scraping (BBC News)
- Automatic misinformation detection
- Email alerts for flagged content

## Troubleshooting

### Common Issues
1. **Webhook timeout**: Increase timeout in n8nService.js
2. **CORS errors**: Configure n8n CORS settings
3. **API limits**: Check Google Gemini quota

### Debug Steps
1. Check n8n execution logs
2. Verify webhook URL in browser console
3. Test workflows manually in n8n
4. Check environment variables

## File Structure
```
src/
├── services/
│   └── n8nService.js      # N8N API integration
├── config/
│   └── n8nConfig.js       # Configuration settings
└── components/
    └── FactCheck.js       # Updated with n8n integration
```

## Next Steps
1. Customize AI prompts in Main Workflow
2. Add more news sources to Scheduled Scraper
3. Implement user authentication
4. Add result caching
5. Deploy to production