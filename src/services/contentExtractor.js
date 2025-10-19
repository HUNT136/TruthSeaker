// Content extraction from URLs and images
export const contentExtractor = {
  // Extract text content from article URLs
  async extractTextFromURL(url) {
    try {
      console.log(`📄 Extracting text from URL: ${url}`);
      
      // Simulate web scraping and text extraction
      const extractedContent = await this.simulateWebScraping(url);
      
      return {
        url: url,
        title: extractedContent.title,
        content: extractedContent.content,
        author: extractedContent.author,
        publishDate: extractedContent.publishDate,
        domain: new URL(url).hostname,
        wordCount: extractedContent.content.split(' ').length,
        extractedAt: new Date().toISOString(),
        success: true
      };
    } catch (error) {
      console.error('URL extraction failed:', error);
      return {
        url: url,
        error: 'Failed to extract content from URL',
        success: false
      };
    }
  },

  // Extract text from images using OCR simulation
  async extractTextFromImage(imageFile) {
    try {
      console.log(`🖼️ Extracting text from image: ${imageFile.name}`);
      
      // Simulate OCR processing
      const ocrResult = await this.simulateOCR(imageFile);
      
      return {
        fileName: imageFile.name,
        fileSize: imageFile.size,
        extractedText: ocrResult.text,
        confidence: ocrResult.confidence,
        language: ocrResult.language,
        textBlocks: ocrResult.textBlocks,
        extractedAt: new Date().toISOString(),
        success: true
      };
    } catch (error) {
      console.error('Image OCR failed:', error);
      return {
        fileName: imageFile.name,
        error: 'Failed to extract text from image',
        success: false
      };
    }
  },

  // Simulate web scraping for article content
  async simulateWebScraping(url) {
    const domain = new URL(url).hostname;
    
    // Simulate different content based on domain
    const contentTemplates = {
      'timesofindia.indiatimes.com': {
        title: 'Breaking News from Times of India',
        content: 'This is a simulated article content from Times of India. The article discusses recent developments in Indian politics and economy. Key points include government policies, market trends, and social issues affecting the nation.',
        author: 'TOI Reporter'
      },
      'ndtv.com': {
        title: 'NDTV News Report',
        content: 'NDTV reports on current affairs with detailed analysis. This simulated content covers breaking news, political updates, and comprehensive coverage of national and international events.',
        author: 'NDTV Correspondent'
      },
      'cnn.com': {
        title: 'CNN Breaking News',
        content: 'CNN provides comprehensive coverage of global events. This simulated article includes analysis of international politics, business news, and social developments affecting worldwide communities.',
        author: 'CNN Reporter'
      },
      'bbc.com': {
        title: 'BBC World News',
        content: 'BBC delivers trusted news coverage with in-depth reporting. This simulated content focuses on global affairs, technology trends, and cultural developments across different regions.',
        author: 'BBC Correspondent'
      }
    };

    const template = contentTemplates[domain] || {
      title: 'News Article',
      content: 'This is simulated article content extracted from the provided URL. The content includes relevant information about the topic being fact-checked.',
      author: 'News Reporter'
    };

    // Add some randomization to make it realistic
    const publishDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    
    return {
      ...template,
      publishDate: publishDate.toISOString(),
      content: template.content + ` Published on ${publishDate.toDateString()}.`
    };
  },

  // Simulate OCR text extraction from images
  async simulateOCR(imageFile) {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate different OCR results based on file name patterns
    const fileName = imageFile.name.toLowerCase();
    
    let extractedText = '';
    let confidence = Math.floor(Math.random() * 20) + 80; // 80-100%
    
    if (fileName.includes('news') || fileName.includes('article')) {
      extractedText = 'BREAKING NEWS: This is simulated text extracted from a news image. The headline reads about recent developments in current affairs. Additional text includes details about the story and relevant quotes from officials.';
    } else if (fileName.includes('social') || fileName.includes('post')) {
      extractedText = 'Social media post text: "This is a simulated social media post extracted from the image. It contains claims about recent events and includes hashtags and mentions."';
    } else if (fileName.includes('screenshot')) {
      extractedText = 'Screenshot text: This appears to be a screenshot containing text about current events. The content discusses various claims and statements that need verification.';
    } else {
      extractedText = 'Image contains text: This is simulated OCR text extraction from the uploaded image. The text discusses various topics and claims that require fact-checking verification.';
    }

    return {
      text: extractedText,
      confidence: confidence,
      language: 'en',
      textBlocks: [
        {
          text: extractedText.substring(0, 50) + '...',
          confidence: confidence,
          boundingBox: { x: 10, y: 10, width: 200, height: 30 }
        }
      ]
    };
  },

  // Process multiple URLs in batch
  async extractFromMultipleURLs(urls) {
    const results = [];
    
    for (const url of urls) {
      const result = await this.extractTextFromURL(url);
      results.push(result);
    }
    
    return results;
  },

  // Analyze extracted content for fact-checking
  analyzeExtractedContent(extractedData) {
    if (!extractedData.success) {
      return {
        canAnalyze: false,
        reason: extractedData.error
      };
    }

    const content = extractedData.content || extractedData.extractedText || '';
    const wordCount = content.split(' ').length;
    
    return {
      canAnalyze: true,
      contentLength: content.length,
      wordCount: wordCount,
      hasEnoughContent: wordCount > 10,
      extractionQuality: extractedData.confidence || 95,
      contentPreview: content.substring(0, 200) + '...'
    };
  }
};