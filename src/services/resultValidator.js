// Result validator to catch obviously incorrect AI responses
export const resultValidator = {
  validateResult(query, result) {
    const lowerQuery = query.toLowerCase();
    console.log('🔍 Validator checking:', query, 'Result:', result);
    
    // Critical fact corrections - override AI if it gets basic facts wrong
    const criticalFacts = [
      // FALSE facts (conspiracy theories/misinformation)
      {
        pattern: /earth.*flat|flat.*earth|earth.*is.*flat|flat.*earth.*is/i,
        correctResult: {
          isTrue: false,
          confidence: 99,
          reason: 'Earth is NOT flat - this is a debunked conspiracy theory. Scientific evidence proves Earth is spherical.',
          corrected: true
        }
      },
      {
        pattern: /vaccines.*autism/,
        correctResult: {
          isTrue: false,
          confidence: 99,
          reason: 'Vaccines do NOT cause autism - this has been thoroughly debunked by medical research.',
          corrected: true
        }
      },
      {
        pattern: /5g.*covid|covid.*5g/,
        correctResult: {
          isTrue: false,
          confidence: 99,
          reason: '5G does NOT cause COVID-19 - this is a conspiracy theory with no scientific basis.',
          corrected: true
        }
      },
      // TRUE facts (established scientific/geographical facts)
      {
        pattern: /earth.*round|round.*earth|earth.*spherical/,
        correctResult: {
          isTrue: true,
          confidence: 99,
          reason: 'Earth is round/spherical - established scientific fact proven by satellite imagery, physics, and space exploration.',
          corrected: true
        }
      },
      {
        pattern: /delhi.*capital.*india|india.*capital.*delhi/,
        correctResult: {
          isTrue: true,
          confidence: 95,
          reason: 'New Delhi is the capital of India - basic geographical fact.',
          corrected: true
        }
      },
      {
        pattern: /sun.*rises.*east|east.*sun.*rises/,
        correctResult: {
          isTrue: true,
          confidence: 95,
          reason: 'Sun rises in the east - basic astronomical fact due to Earth\'s rotation.',
          corrected: true
        }
      },
      {
        pattern: /water.*boils.*100|100.*water.*boils/,
        correctResult: {
          isTrue: true,
          confidence: 90,
          reason: 'Water boils at 100°C at sea level - scientific fact.',
          corrected: true
        }
      }
    ];
    
    // Check for critical facts and always override
    for (const fact of criticalFacts) {
      if (fact.pattern.test(lowerQuery)) {
        console.warn('🚨 Critical fact detected, applying scientific override:', query);
        return {
          classification: fact.correctResult.isTrue ? 'Verified' : 'Potential Misinformation',
          reason: fact.correctResult.reason,
          confidence: fact.correctResult.confidence,
          sources: [{
            title: 'Scientific Fact Correction',
            url: 'https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/what-is-earth-k4.html',
            source: 'Scientific Consensus Override',
            type: 'fact_correction',
            verified: true
          }],
          corrected: true
        };
      }
    }
    
    console.log('✅ No override needed, returning original result');
    return result; // Return original if no correction needed
  }
};