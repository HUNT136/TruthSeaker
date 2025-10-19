// Real-time verification using actual APIs
export const realTimeVerifier = {
  // Real-time Google Search API integration
  async searchGoogle(query) {
    try {
      // Using Google Custom Search API (requires API key)
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      const searchEngineId = process.env.REACT_APP_GOOGLE_SEARCH_ENGINE_ID;
      
      if (!apiKey || !searchEngineId) {
        console.warn('Google API credentials not configured');
        return this.fallbackSearch(query);
      }

      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&num=10`
      );
      
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Google Search API error:', error);
      return this.fallbackSearch(query);
    }
  },

  // Real Twitter API integration
  async searchTwitter(query) {
    try {
      // Using Twitter API v2 (requires bearer token)
      const bearerToken = process.env.REACT_APP_TWITTER_BEARER_TOKEN;
      
      if (!bearerToken) {
        console.warn('Twitter API credentials not configured');
        return [];
      }

      const response = await fetch(
        `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=10&tweet.fields=created_at,author_id,public_metrics`,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        }
      );
      
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Twitter API error:', error);
      return [];
    }
  },

  // Real news API integration
  async searchNews(query) {
    try {
      // Using NewsAPI (requires API key)
      const apiKey = process.env.REACT_APP_NEWS_API_KEY;
      
      if (!apiKey) {
        console.warn('News API credentials not configured');
        return this.fallbackNews(query);
      }

      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`
      );
      
      const data = await response.json();
      return data.articles || [];
    } catch (error) {
      console.error('News API error:', error);
      return this.fallbackNews(query);
    }
  },

  // Real fact-checking API integration
  async checkFactCheckOrg(query) {
    try {
      // Using Google Fact Check Tools API
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      
      if (!apiKey) {
        console.warn('Fact Check API credentials not configured');
        return [];
      }

      const response = await fetch(
        `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(query)}&key=${apiKey}`
      );
      
      const data = await response.json();
      return data.claims || [];
    } catch (error) {
      console.error('Fact Check API error:', error);
      return [];
    }
  },

  // Real-time comprehensive verification
  async verifyInRealTime(query) {
    console.log(`🔍 Starting REAL-TIME verification for: "${query}"`);
    
    // Parallel API calls for real-time data
    const [googleResults, twitterResults, newsResults, factCheckResults] = await Promise.all([
      this.searchGoogle(query),
      this.searchTwitter(query),
      this.searchNews(query),
      this.checkFactCheckOrg(query)
    ]);

    // Analyze real results
    const analysis = this.analyzeRealResults({
      googleResults,
      twitterResults,
      newsResults,
      factCheckResults,
      query
    });

    console.log(`📊 Real-time analysis complete: ${analysis.totalSources} sources found`);
    
    return analysis;
  },

  // Analyze real API results
  analyzeRealResults(data) {
    const { googleResults, twitterResults, newsResults, factCheckResults, query } = data;
    
    // Count credible sources
    const credibleDomains = [
      'bbc.com', 'cnn.com', 'reuters.com', 'apnews.com', 'nytimes.com',
      'timesofindia.indiatimes.com', 'hindustantimes.com', 'ndtv.com'
    ];
    
    const credibleNews = newsResults.filter(article => 
      credibleDomains.some(domain => article.url?.includes(domain))
    );

    const officialTwitter = twitterResults.filter(tweet => 
      tweet.author_id && tweet.public_metrics?.retweet_count > 100
    );

    // Check for official government/organization websites
    const officialSites = googleResults.filter(result =>
      result.link?.includes('.gov') || 
      result.link?.includes('pib.gov.in') ||
      result.link?.includes('who.int') ||
      result.link?.includes('cdc.gov')
    );

    // Determine classification based on REAL data
    let classification, reason;
    
    if (officialSites.length > 0) {
      classification = 'Verified';
      reason = `Confirmed by ${officialSites.length} official government/organization websites`;
    } else if (credibleNews.length >= 3) {
      classification = 'Verified';
      reason = `Reported by ${credibleNews.length} major news outlets`;
    } else if (factCheckResults.length > 0) {
      const factCheckRating = factCheckResults[0].claimReview?.[0]?.textualRating;
      if (factCheckRating?.toLowerCase().includes('false') || factCheckRating?.toLowerCase().includes('fake')) {
        classification = 'Potential Misinformation';
        reason = `Fact-checkers rated this as: ${factCheckRating}`;
      } else {
        classification = 'Verified';
        reason = `Fact-checkers confirmed this information`;
      }
    } else if (credibleNews.length === 0 && officialTwitter.length === 0) {
      classification = 'Potential Misinformation';
      reason = 'No credible news sources or official statements found in real-time search';
    } else {
      classification = 'Unverified';
      reason = `Found ${newsResults.length} news articles but need official confirmation`;
    }

    return {
      classification,
      reason,
      totalSources: googleResults.length + twitterResults.length + newsResults.length,
      credibleNews: credibleNews.length,
      officialSites: officialSites.length,
      factCheckResults: factCheckResults.length,
      sources: [
        ...credibleNews.map(article => ({
          title: article.title,
          url: article.url,
          source: article.source?.name,
          type: 'news_article',
          verified: true
        })),
        ...officialSites.map(site => ({
          title: site.title,
          url: site.link,
          source: 'Official Website',
          type: 'official_source',
          verified: true
        }))
      ]
    };
  },

  // Fallback when APIs are not configured
  fallbackSearch(query) {
    console.log('⚠️ Using fallback - configure real APIs for live verification');
    return [];
  },

  fallbackNews(query) {
    console.log('⚠️ Using fallback - configure News API for live verification');
    return [];
  }
};