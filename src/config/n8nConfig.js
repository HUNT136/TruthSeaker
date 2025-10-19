// N8N Configuration
export const N8N_CONFIG = {
  // Local n8n instance
  WEBHOOK_URL: process.env.REACT_APP_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/fact-check',
  
  // Workflow IDs from your n8n setup
  WORKFLOWS: {
    FRONTEND_API_TRIGGER: 'pQB3XB4BgZ3zwkF5',
    MAIN_WORKFLOW: 'EMkGYJhDsghRxIhJ', 
    SCHEDULED_SCRAPER: '43scF9o1L6Xl0UYC'
  },
  
  // API Configuration
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 2,
  
  // Development settings
  LOCAL_MODE: process.env.NODE_ENV === 'development',
  BASE_URL: process.env.REACT_APP_N8N_WEBHOOK_URL?.split('/webhook')[0] || 'http://localhost:5678'
};

// n8n Workflow Configuration
export const N8N_WORKFLOW_CONFIG = {
  EXPECTED_RESPONSE_FORMAT: {
    classification: 'Verified|Potential Misinformation|Unverified',
    confidence: 'number (0-100)',
    reason: 'string explanation',
    sources: 'array of source objects'
  },
  
  WEBHOOK_PAYLOAD_FORMAT: {
    title: 'Content title',
    contentSnippet: 'Main text to verify',
    link: 'Source URL (optional)',
    inputType: 'text|url|image',
    timestamp: 'ISO timestamp',
    source: 'TruthSeaker_Frontend'
  }
};

// Setup validation
export const validateN8nSetup = () => {
  const webhookUrl = process.env.REACT_APP_N8N_WEBHOOK_URL;
  const geminiKey = process.env.REACT_APP_GEMINI_API_KEY;
  
  return {
    n8nConfigured: webhookUrl && !webhookUrl.includes('your-n8n-instance'),
    geminiConfigured: geminiKey && !geminiKey.includes('your_api_key'),
    ready: webhookUrl && geminiKey
  };
};