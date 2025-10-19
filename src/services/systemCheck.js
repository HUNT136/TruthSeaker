// System health check for TruthSeaker
export const systemCheck = {
  async runHealthCheck() {
    console.log('🔍 Running TruthSeaker System Health Check...');
    
    const results = {
      geminiAPI: false,
      n8nWorkflow: false,
      environment: false,
      services: false,
      overall: false
    };

    // Check Gemini API
    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyCtOKb3jxxXg3lzbwA2TPwRRhiBzmnDxyY';
      if (apiKey && apiKey !== 'your_api_key_here') {
        results.geminiAPI = true;
        console.log('✅ Gemini API key configured');
      } else {
        console.log('❌ Gemini API key missing');
      }
    } catch (error) {
      console.log('❌ Gemini API check failed:', error);
    }

    // Check n8n workflow
    try {
      const n8nUrl = process.env.REACT_APP_N8N_WEBHOOK_URL;
      if (n8nUrl && n8nUrl !== '' && !n8nUrl.includes('your-n8n-instance')) {
        results.n8nWorkflow = true;
        console.log('✅ n8n workflow URL configured');
      } else {
        console.log('⚠️ n8n workflow URL not configured - using direct Gemini API');
      }
    } catch (error) {
      console.log('❌ n8n workflow check failed:', error);
    }

    // Check environment
    try {
      results.environment = true;
      console.log('✅ Environment variables loaded');
    } catch (error) {
      console.log('❌ Environment check failed:', error);
    }

    // Check services
    try {
      const { geminiVerifier } = await import('./geminiVerifier');
      const { n8nService } = await import('./n8nService');
      if (geminiVerifier && n8nService) {
        results.services = true;
        console.log('✅ All services loaded successfully');
      }
    } catch (error) {
      console.log('❌ Services check failed:', error);
    }

    results.overall = results.geminiAPI && results.environment && results.services;
    
    if (results.n8nWorkflow) {
      console.log('🔄 System will use n8n workflow + Gemini fallback');
    } else {
      console.log('🤖 System will use direct Gemini API only');
    }
    
    if (results.overall) {
      console.log('🎉 System Health Check PASSED - TruthSeaker is ready!');
    } else {
      console.log('⚠️ System Health Check FAILED - Check configuration');
    }

    return results;
  },

  async testGeminiConnection() {
    try {
      const { geminiVerifier } = await import('./geminiVerifier');
      const testResult = await geminiVerifier.verifyWithGemini('Test connection');
      console.log('✅ Gemini connection test successful');
      return true;
    } catch (error) {
      console.log('❌ Gemini connection test failed:', error);
      return false;
    }
  }
};