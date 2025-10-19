import { webDataScraper } from './webDataScraper';

// Local simulation of n8n workflow without deployment
export const localN8nSimulator = {
  // Simulate real-time verification from official sources
  async simulateOfficialSourceCheck(query) {
    const lowerQuery = query.toLowerCase();
    const currentTime = new Date();
    const last24Hours = new Date(currentTime - 24 * 60 * 60 * 1000);
    
    // Extract entities (brands, countries, celebrities) from query
    const entities = this.extractEntities(lowerQuery);
    let officialUpdates = [];
    
    // Check official sources for each entity
    for (const entity of entities) {
      const updates = await this.checkOfficialSources(entity, last24Hours);
      officialUpdates = officialUpdates.concat(updates);
    }
    
    return officialUpdates;
  },

  // Extract entities from text
  extractEntities(text) {
    const entities = [];
    
    // Brands
    const brands = [
      'apple', 'google', 'microsoft', 'tesla', 'amazon', 'meta', 'twitter', 'netflix', 'disney', 'coca cola', 'pepsi', 'nike', 'adidas',
      'tata', 'reliance', 'infosys', 'wipro', 'tcs', 'airtel', 'jio', 'ola', 'flipkart', 'paytm', 'zomato', 'swiggy'
    ];
    brands.forEach(brand => {
      if (text.includes(brand)) entities.push({type: 'brand', name: brand});
    });
    
    // Countries/Leaders
    const leaders = [
      'biden', 'trump', 'modi', 'putin', 'xi jinping', 'macron', 'trudeau', 'zelensky',
      'narendra modi', 'rahul gandhi', 'amit shah', 'mamata banerjee', 'arvind kejriwal', 'yogi adityanath'
    ];
    leaders.forEach(leader => {
      if (text.includes(leader)) entities.push({type: 'leader', name: leader});
    });
    
    // Celebrities
    const celebrities = [
      'elon musk', 'bill gates', 'jeff bezos', 'mark zuckerberg', 'taylor swift', 'kim kardashian', 'cristiano ronaldo', 'lionel messi',
      'shah rukh khan', 'salman khan', 'aamir khan', 'amitabh bachchan', 'deepika padukone', 'priyanka chopra', 'virat kohli', 'ms dhoni', 'rohit sharma'
    ];
    celebrities.forEach(celeb => {
      if (text.includes(celeb)) entities.push({type: 'celebrity', name: celeb});
    });
    
    return entities;
  },

  // Check official sources for recent updates
  async checkOfficialSources(entity, since) {
    const officialSources = {
      // International Brands
      'apple': { twitter: '@Apple', website: 'apple.com/newsroom', verified: true },
      'google': { twitter: '@Google', website: 'blog.google', verified: true },
      'tesla': { twitter: '@Tesla', website: 'tesla.com/blog', verified: true },
      'microsoft': { twitter: '@Microsoft', website: 'news.microsoft.com', verified: true },
      
      // Indian Brands
      'tata': { twitter: '@TataCompanies', website: 'tata.com/newsroom', verified: true },
      'reliance': { twitter: '@RIL_Updates', website: 'ril.com/news', verified: true },
      'infosys': { twitter: '@Infosys', website: 'infosys.com/newsroom', verified: true },
      'airtel': { twitter: '@airtelindia', website: 'airtel.in/press-release', verified: true },
      'jio': { twitter: '@JioCare', website: 'jio.com/press-release', verified: true },
      
      // International Leaders
      'biden': { twitter: '@POTUS', website: 'whitehouse.gov/news', verified: true },
      'modi': { twitter: '@narendramodi', website: 'pib.gov.in', verified: true },
      'narendra modi': { twitter: '@narendramodi', website: 'pib.gov.in', verified: true },
      'trudeau': { twitter: '@JustinTrudeau', website: 'pm.gc.ca', verified: true },
      
      // Indian Leaders
      'rahul gandhi': { twitter: '@RahulGandhi', verified: true },
      'amit shah': { twitter: '@AmitShah', verified: true },
      'arvind kejriwal': { twitter: '@ArvindKejriwal', verified: true },
      
      // International Celebrities
      'elon musk': { twitter: '@elonmusk', verified: true },
      'bill gates': { twitter: '@BillGates', verified: true },
      'taylor swift': { twitter: '@taylorswift13', instagram: '@taylorswift', verified: true },
      
      // Indian Celebrities
      'shah rukh khan': { twitter: '@iamsrk', instagram: '@iamsrk', verified: true },
      'salman khan': { twitter: '@BeingSalmanKhan', verified: true },
      'amitabh bachchan': { twitter: '@SrBachchan', verified: true },
      'virat kohli': { twitter: '@imVkohli', instagram: '@virat.kohli', verified: true },
      'ms dhoni': { twitter: '@msdhoni', instagram: '@mahi7781', verified: true }
    };
    
    const source = officialSources[entity.name];
    if (!source) return [];
    
    // Simulate 70% chance of NO official data found (realistic scenario)
    const hasRecentData = Math.random() > 0.7;
    
    if (!hasRecentData) {
      // No official updates found in last 24 hours
      return [];
    }
    
    // Simulate checking recent posts (last 24 hours)
    const recentUpdates = [
      {
        source: source.twitter || source.website,
        title: `Official ${entity.name} statement - Last 24hrs`,
        url: `https://twitter.com/${source.twitter?.replace('@', '') || 'official'}`,
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        verified: source.verified,
        type: 'official_update'
      }
    ];
    
    return recentUpdates;
  },

  // Simulate comprehensive web scraping
  async simulateWebScraping(query) {
    const lowerQuery = query.toLowerCase();
    
    // First check official sources for real-time updates
    const officialUpdates = await this.simulateOfficialSourceCheck(query);
    
    // Scrape data from all web sources
    const webData = await webDataScraper.scrapeAllSources(query);
    
    // Get general fact-check articles
    let relevantArticles = [];
    
    if (lowerQuery.includes('covid') || lowerQuery.includes('vaccine')) {
      relevantArticles = [
        { title: 'WHO COVID-19 Official Guidelines', url: 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019', source: 'WHO' },
        { title: 'CDC COVID-19 Vaccine Information', url: 'https://www.cdc.gov/coronavirus/2019-ncov/vaccines/', source: 'CDC' },
        { title: 'Reuters Fact Check: COVID-19 Vaccines', url: 'https://www.reuters.com/fact-check/covid-vaccines/', source: 'Reuters' }
      ];
    } else if (lowerQuery.includes('climate') || lowerQuery.includes('global warming')) {
      relevantArticles = [
        { title: 'NASA Climate Change Evidence', url: 'https://climate.nasa.gov/evidence/', source: 'NASA' },
        { title: 'IPCC Climate Reports', url: 'https://www.ipcc.ch/reports/', source: 'IPCC' },
        { title: 'Scientific Consensus on Climate Change', url: 'https://climate.nasa.gov/scientific-consensus/', source: 'NASA' }
      ];
    } else if (lowerQuery.includes('election') || lowerQuery.includes('voting')) {
      relevantArticles = [
        { title: 'Official Election Results', url: 'https://www.fec.gov/', source: 'FEC' },
        { title: 'AP Election Coverage', url: 'https://apnews.com/hub/election-2024', source: 'Associated Press' },
        { title: 'Fact Check: Election Claims', url: 'https://www.factcheck.org/tag/elections/', source: 'FactCheck.org' }
      ];
    } else {
      relevantArticles = [
        { title: 'Snopes Fact Check Database', url: 'https://www.snopes.com/', source: 'Snopes' },
        { title: 'Reuters Fact Check', url: 'https://www.reuters.com/fact-check/', source: 'Reuters' },
        { title: 'Associated Press Fact Check', url: 'https://apnews.com/hub/ap-fact-check', source: 'AP News' }
      ];
    }
    
    // Combine all data sources
    return {
      officialUpdates,
      webData: webData.allData,
      articles: webData.articles,
      socialPosts: webData.socialPosts,
      images: webData.images,
      summary: webData.summary,
      allSources: [...officialUpdates, ...relevantArticles, ...webData.allData]
    };
  },

  async simulateMainWorkflow(data) {
    // Simulate the Google Gemini AI analysis from Main Workflow
    const content = data.contentSnippet || data.content || data.text || '';
    
    // Simulate comprehensive web scraping and verification
    const webScrapingResult = await this.simulateWebScraping(content);
    
    // Analyze all scraped data
    const officialUpdates = webScrapingResult.officialUpdates || [];
    const webData = webScrapingResult.webData || [];
    const articles = webScrapingResult.articles || [];
    const socialPosts = webScrapingResult.socialPosts || [];
    const images = webScrapingResult.images || [];
    
    const hasOfficialData = officialUpdates.length > 0;
    const hasWebEvidence = webData.length > 0;
    const verifiedSources = webData.filter(item => item.verified).length;
    const highCredibilitySources = webData.filter(item => item.credibility === 'high').length;
    const entities = this.extractEntities(content);
    
    // Initialize classification and reason variables
    let classification, reason;
    
    // Enhanced classification based on comprehensive data
    if (entities.length > 0 && !hasOfficialData && !hasWebEvidence) {
      classification = 'Potential Misinformation';
      reason = 'No official data or credible web sources found in the last 24-48 hours';
    } else if (hasOfficialData && highCredibilitySources >= 2) {
      classification = 'Verified';
      reason = `Confirmed by ${officialUpdates.length} official sources and ${highCredibilitySources} high-credibility news outlets`;
    } else if (verifiedSources >= 3 && highCredibilitySources >= 1) {
      classification = 'Verified';
      reason = `Supported by ${verifiedSources} verified sources including major news outlets`;
    } else if (hasWebEvidence) {
      classification = 'Potential Misinformation';
      reason = `Found ${webData.length} web sources but no official statement has been released`;
    } else {
      classification = 'Potential Misinformation';
      reason = 'No official statement has been released - this news is not true';
    }
    
    // Simulate AI fact-checking logic with better fake news detection
    const lowerContent = content.toLowerCase();
    
    // Common fake news patterns
    const fakeNewsKeywords = [
      'miracle cure', 'doctors hate', 'secret government', 'they dont want you to know',
      'banned by', 'suppressed by', 'conspiracy', 'hoax', 'fake news media',
      'lizard people', 'illuminati', 'new world order', 'chemtrails',
      'vaccines cause autism', 'microchip', '5g causes', 'flat earth',
      'moon landing fake', 'birds arent real', 'covid hoax'
    ];
    
    const hasFakeKeywords = fakeNewsKeywords.some(keyword => lowerContent.includes(keyword));
    
    if (lowerContent.includes('dead') || lowerContent.includes('died')) {
      classification = 'Potential Misinformation';
      reason = 'Death claims require verification from official sources';
    } else if (lowerContent.includes('flat earth')) {
      classification = 'Potential Misinformation';
      reason = 'Scientific consensus contradicts flat earth claims';
    } else if (lowerContent.includes('covid') && lowerContent.includes('hoax')) {
      classification = 'Potential Misinformation';
      reason = 'COVID-19 is a verified pandemic by WHO and medical authorities';
    } else if (hasFakeKeywords) {
      classification = 'Potential Misinformation';
      reason = 'Content contains common misinformation patterns and unsubstantiated claims';
    } else if (lowerContent.includes('breaking') || lowerContent.includes('urgent')) {
      classification = 'Unverified';
      reason = 'Breaking news requires additional verification';
    } else {
      // More realistic distribution - most random content should be unverified
      const rand = Math.random();
      if (rand > 0.7) {
        // Will be overridden by web data analysis above
      } else {
        // Will be overridden by web data analysis above
      }
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    return { 
      classification, 
      reason, 
      relevantArticles: webScrapingResult.allSources,
      webData: {
        articles,
        socialPosts,
        images,
        summary: webScrapingResult.summary
      }
    };
  },

  async checkFact(data) {
    try {
      const result = await this.simulateMainWorkflow(data);
      
      // Simulate email alert for misinformation (like the workflow does)
      if (result.classification === 'Potential Misinformation') {
        console.log('🚨 Misinformation Alert:', {
          title: data.title,
          classification: result.classification,
          reason: result.reason,
          relevantArticles: result.relevantArticles,
          officialSourcesChecked: result.relevantArticles.filter(a => a.type === 'official_update').length
        });
      }
      
      // Log official source verification
      const officialSources = result.relevantArticles.filter(a => a.type === 'official_update');
      if (officialSources.length > 0) {
        console.log('🔍 Official Sources Checked (Last 24hrs):', officialSources.map(s => s.source));
      }

      return result;
    } catch (error) {
      throw new Error('Local workflow simulation failed');
    }
  }
};