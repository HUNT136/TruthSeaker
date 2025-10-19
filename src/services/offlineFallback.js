// Offline fallback for when AI services are unavailable
export const offlineFallback = {
  async basicFactCheck(query) {
    console.log('🔄 Using offline fallback analysis...');
    
    const lowerQuery = query.toLowerCase();
    
    // Basic fact patterns - CRITICAL: Ensure scientific accuracy
    const knownFacts = [
      { pattern: /delhi.*capital.*india|india.*capital.*delhi/, isTrue: true, confidence: 95, reason: 'New Delhi is the capital of India - basic geographical fact' },
      { pattern: /earth.*round|round.*earth|earth.*spherical/, isTrue: true, confidence: 99, reason: 'Earth is round/spherical - established scientific fact proven by satellite imagery, physics, and space exploration' },
      { pattern: /earth.*flat|flat.*earth/, isTrue: false, confidence: 99, reason: 'Earth is NOT flat - this is a debunked conspiracy theory. Scientific evidence proves Earth is spherical' },
      { pattern: /sun.*rises.*east|east.*sun.*rises/, isTrue: true, confidence: 95, reason: 'Sun rises in the east - basic astronomical fact due to Earth\'s rotation' },
      { pattern: /water.*boils.*100|100.*water.*boils/, isTrue: true, confidence: 90, reason: 'Water boils at 100°C at sea level - scientific fact' },
      { pattern: /vaccines.*autism/, isTrue: false, confidence: 99, reason: 'Vaccines do NOT cause autism - this has been thoroughly debunked by medical research' },
      { pattern: /5g.*covid|covid.*5g/, isTrue: false, confidence: 99, reason: '5G does NOT cause COVID-19 - this is a conspiracy theory with no scientific basis' }
    ];
    
    // Check for known patterns
    for (const fact of knownFacts) {
      if (fact.pattern.test(lowerQuery)) {
        return {
          classification: fact.isTrue ? 'Verified' : 'Potential Misinformation',
          reason: fact.reason,
          confidence: fact.confidence,
          sources: [{
            title: 'Offline Basic Fact Check',
            url: '#',
            source: 'Built-in Knowledge Base',
            type: 'offline_analysis',
            verified: true
          }]
        };
      }
    }
    
    // Default uncertain response
    return {
      classification: 'Unverified',
      reason: 'Unable to verify - AI service temporarily unavailable. Please try again later.',
      confidence: 50,
      sources: [{
        title: 'Service Unavailable',
        url: '#',
        source: 'Offline Mode',
        type: 'offline_fallback',
        verified: false
      }]
    };
  }
};