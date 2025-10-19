import axios from 'axios';
import { N8N_CONFIG } from '../config/n8nConfig';

import { contentExtractor } from './contentExtractor';
import { geminiVerifier } from './geminiVerifier';
import { localN8nWorkflow } from './localN8nWorkflow';
import { offlineFallback } from './offlineFallback';
import { resultValidator } from './resultValidator';

export const n8nService = {
  // Send fact-check request using n8n workflow first, then Gemini fallback
  async checkFact(data) {
    const query = data.content || data.text || data.title || '';
    
    if (!query.trim()) {
      throw new Error('No content to verify');
    }

    // Try n8n workflow first
    try {
      console.log('🔄 Using n8n workflow for fact-checking...');
      const response = await axios.post(N8N_CONFIG.WEBHOOK_URL, {
        title: data.title || 'User Submitted Content',
        contentSnippet: query,
        link: data.url || '',
        inputType: data.type,
        timestamp: new Date().toISOString(),
        source: 'TruthSeaker_Frontend'
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: N8N_CONFIG.TIMEOUT
      });

      console.log('✅ n8n workflow response:', response.data);
      return this.formatN8nResponse(response.data, query);
    } catch (error) {
      console.log('⚠️ n8n workflow failed, using Gemini fallback:', error.message);
      try {
        const geminiResult = await geminiVerifier.verifyWithGemini(query);
        return geminiResult;
      } catch (geminiError) {
        console.log('⚠️ Gemini also failed, using offline fallback:', geminiError.message);
        return await offlineFallback.basicFactCheck(query);
      }
    }
  },

  // Format n8n response to match expected format
  formatN8nResponse(n8nData, query) {
    // Handle different n8n response formats
    const classification = n8nData.classification || n8nData.result || 'Unverified';
    const confidence = n8nData.confidence || n8nData.score || 75;
    const reason = n8nData.reason || n8nData.explanation || 'Analysis completed via n8n workflow';
    const sources = n8nData.sources || n8nData.relevantArticles || [];

    return {
      classification: classification,
      reason: reason,
      confidence: confidence,
      sources: sources.length > 0 ? sources : [{
        title: 'n8n Workflow Analysis',
        url: N8N_CONFIG.WEBHOOK_URL,
        source: 'n8n Automation',
        type: 'workflow_analysis',
        verified: true
      }],
      metadata: {
        processedBy: 'n8n_workflow',
        timestamp: new Date().toISOString(),
        query: query
      }
    };
  },

  // Extract content from URL (for URL-based fact checking)
  async extractContentFromUrl(url) {
    try {
      console.log('🔍 Extracting content from URL for fact-checking...');
      const extractedData = await contentExtractor.extractTextFromURL(url);
      
      if (extractedData.success) {
        return {
          title: extractedData.title,
          content: extractedData.content,
          url: url,
          author: extractedData.author,
          publishDate: extractedData.publishDate,
          domain: extractedData.domain,
          wordCount: extractedData.wordCount
        };
      } else {
        return {
          title: 'URL Content Extraction Failed',
          content: `Failed to extract content from ${url}. ${extractedData.error}`,
          url: url
        };
      }
    } catch (error) {
      return {
        title: 'URL Processing Error',
        content: `Error processing URL: ${url}`,
        url: url
      };
    }
  },

  // Process image for fact-checking with OCR text extraction
  async processImage(imageFile) {
    try {
      console.log('🖼️ Processing image with OCR for fact-checking...');
      const ocrResult = await contentExtractor.extractTextFromImage(imageFile);
      
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (ocrResult.success) {
            resolve({
              title: `Image OCR: ${imageFile.name}`,
              content: ocrResult.extractedText,
              imageData: reader.result,
              fileName: imageFile.name,
              fileSize: imageFile.size,
              ocrConfidence: ocrResult.confidence,
              language: ocrResult.language,
              textBlocks: ocrResult.textBlocks
            });
          } else {
            resolve({
              title: `Image Processing Failed: ${imageFile.name}`,
              content: `Failed to extract text from image. ${ocrResult.error}`,
              imageData: reader.result,
              fileName: imageFile.name,
              fileSize: imageFile.size
            });
          }
        };
        reader.readAsDataURL(imageFile);
      });
    } catch (error) {
      return {
        title: `Image Error: ${imageFile.name}`,
        content: `Error processing image: ${error.message}`,
        fileName: imageFile.name,
        fileSize: imageFile.size
      };
    }
  }
};