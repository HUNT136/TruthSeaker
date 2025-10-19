// Local n8n workflow simulation for development
import { geminiVerifier } from './geminiVerifier';

export const localN8nWorkflow = {
  async processFactCheck(data) {
    console.log('🔄 Processing with local n8n workflow simulation...');
    
    try {
      // Simulate n8n workflow steps
      const query = data.contentSnippet || data.title || '';
      
      // Step 1: Content preprocessing (simulate n8n data processing)
      const processedData = {
        originalQuery: query,
        processedAt: new Date().toISOString(),
        inputType: data.inputType || 'text',
        source: data.link || 'direct_input'
      };
      
      console.log('📝 Processed data:', processedData);
      
      // Step 2: Call Gemini AI (simulate n8n Gemini node)
      const geminiResult = await geminiVerifier.verifyWithGemini(query);
      
      // Step 3: Format response (simulate n8n response formatting)
      const n8nResponse = {
        classification: geminiResult.classification,
        reason: geminiResult.reason,
        confidence: geminiResult.confidence,
        sources: geminiResult.sources,
        metadata: {
          processedBy: 'n8n-local-workflow',
          timestamp: new Date().toISOString(),
          workflowId: 'local-fact-check-workflow',
          ...processedData
        }
      };
      
      console.log('✅ Local n8n workflow completed:', n8nResponse);
      return n8nResponse;
      
    } catch (error) {
      console.error('❌ Local n8n workflow error:', error);
      throw error;
    }
  }
};