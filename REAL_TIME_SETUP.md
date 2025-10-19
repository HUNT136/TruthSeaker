# Real-Time Verification Setup

## 🌐 Live API Integration

Your app now supports **REAL-TIME verification** using actual APIs instead of synthetic data.

## Required API Keys

### 1. Google Custom Search API
- Go to: https://console.developers.google.com/
- Enable "Custom Search API"
- Create API key
- Set up Custom Search Engine: https://cse.google.com/

### 2. News API
- Go to: https://newsapi.org/
- Sign up for free account
- Get API key (free tier: 1000 requests/day)

### 3. Twitter API v2 (Optional)
- Go to: https://developer.twitter.com/
- Apply for developer account
- Get Bearer Token

### 4. Google Fact Check Tools API
- Go to: https://console.developers.google.com/
- Enable "Fact Check Tools API"
- Uses same API key as Google Search

## Setup Instructions

1. **Get API Keys** from above services
2. **Update .env file**:
   ```
   REACT_APP_USE_REAL_TIME_VERIFICATION=true
   REACT_APP_GOOGLE_API_KEY=your_actual_api_key
   REACT_APP_GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id
   REACT_APP_NEWS_API_KEY=your_news_api_key
   REACT_APP_TWITTER_BEARER_TOKEN=your_twitter_token
   ```
3. **Restart the app**: `npm start`

## How It Works

### Real-Time Verification Process:
1. **Google Search** - Searches for recent mentions
2. **News API** - Checks major news outlets
3. **Twitter API** - Looks for official tweets
4. **Fact Check API** - Cross-references with fact-checkers

### Classification Logic:
- **TRUE NEWS**: Found on official government sites OR 3+ major news outlets
- **FAKE NEWS**: No credible sources found OR fact-checkers marked as false
- **UNVERIFIED**: Some sources but needs official confirmation

## Benefits of Real-Time Verification

✅ **Live Data** - No synthetic/fake results
✅ **Official Sources** - Checks .gov, WHO, CDC, PIB websites
✅ **Major News** - BBC, CNN, Reuters, Times of India, NDTV
✅ **Fact Checkers** - Google Fact Check Tools integration
✅ **Social Media** - Official Twitter accounts verification

## Fallback Mode

If APIs are not configured, the app falls back to local simulation with a warning message.

## Cost Considerations

- **Google APIs**: Free tier available
- **News API**: Free tier (1000 requests/day)
- **Twitter API**: Free tier available
- **Total Cost**: $0-10/month for moderate usage