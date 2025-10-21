# Truth Revealed - AI-Powered Fact Checking App

## 📝 **Project Description**

**Truth Revealed** is an advanced fact-checking application that leverages **Agentic AI** to autonomously verify information and combat misinformation. Built with React and powered by Google Gemini AI, this application demonstrates how AI agents can independently analyze, reason, and make decisions about information authenticity.

### 🤖 **Agentic AI Implementation**

This project showcases **Agentic AI** - artificial intelligence that acts autonomously to achieve goals:

- **Autonomous Decision Making**: The AI agent independently analyzes claims and determines TRUE/FALSE without human intervention
- **Multi-Step Reasoning**: Gemini AI performs complex reasoning chains - analyzing context, cross-referencing knowledge, and evaluating evidence
- **Goal-Oriented Behavior**: The AI agent has a clear objective (verify information accuracy) and autonomously chooses the best approach
- **Adaptive Responses**: The agent adapts its analysis based on content type (news, celebrity claims, scientific facts, political statements)
- **Self-Directed Workflow**: Through n8n integration, the AI agent triggers its own verification processes and manages fallback strategies

### 🎯 **Key Agentic Features**
- **Independent Analysis**: AI agent processes claims without predefined rules
- **Dynamic Source Selection**: Automatically chooses relevant fact-checking sources
- **Confidence Assessment**: Agent evaluates its own certainty levels (60-100%)
- **Context-Aware Processing**: Understands different domains (politics, science, entertainment)
- **Real-Time Decision Making**: Instant autonomous fact verification

**Truth Revealed** demonstrates the future of AI applications where intelligent agents work independently to solve real-world problems, making complex decisions and providing reliable results without constant human oversight.

## 🚀 Features

- **Real-time Fact Checking**: Verify text, URLs, and images
- **n8n Workflow Integration**: Automated fact-checking pipeline
- **Google Gemini AI**: Advanced AI analysis and verification
- **Multiple Input Types**: Text, URLs, and image uploads
- **Dynamic Source Verification**: Cross-references multiple fact-checking sources
- **Confidence Scoring**: AI-powered confidence ratings
- **Responsive Design**: Works on desktop and mobile

## 🛠 Tech Stack

- **Frontend**: React 19, React Router
- **AI Engine**: Google Gemini Pro API
- **Automation**: n8n Workflow Engine
- **Styling**: Custom CSS with animations
- **Build Tool**: Create React App

## 📋 Prerequisites

- Node.js 16+ and npm
- Google Gemini API key
- n8n instance 

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TruthRevealed
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your credentials:
   ```env
   # Google Gemini AI API Key
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
   
   # n8n Webhook URL
   REACT_APP_N8N_WEBHOOK_URL=http://localhost:5678/webhook/fact-check
   ```

## 🔄 n8n Workflow Setup

### Option 1: Local n8n Setup

1. **Install n8n globally**
   ```bash
   npm install -g n8n
   ```

2. **Start n8n**
   ```bash
   n8n start
   ```
   Access n8n at: http://localhost:5678

3. **Import workflows**
   - Import `Frontend API Trigger.json`
   - Import `Main Workflow.json`
   - Import `Scheduled Scraper.json`

4. **Configure webhook**
   - Create a Webhook node in your workflow
   - Set HTTP Method: `POST`
   - Set Path: `fact-check`
   - Your webhook URL: `http://localhost:5678/webhook/fact-check`

5. **Add Gemini AI node**
   - Add HTTP Request node for Gemini API
   - Configure with your Gemini API key
   - Set up prompt for fact-checking

6. **Activate workflows**
   - Activate "Frontend API Trigger" workflow
   - Keep "Main Workflow" inactive (triggered by webhook)
   - Activate "Scheduled Scraper" for monitoring

### Option 2: n8n Cloud Setup

1. **Create n8n Cloud account**
   - Sign up at https://n8n.io/cloud/

2. **Import workflows**
   - Upload the provided JSON workflow files

3. **Configure webhook**
   - Get your cloud webhook URL
   - Update `.env` file:
     ```env
     REACT_APP_N8N_WEBHOOK_URL=https://your-instance.app.n8n.cloud/webhook/your-id
     ```

4. **Add credentials**
   - Add Google Gemini API credentials
   - Configure any additional API keys needed

## 🚀 Running the Application

1. **Start the React app**
   ```bash
   npm start
   ```
   
2. **Access the application**
   - Open http://localhost:3000
   - The app will automatically detect if n8n is available

## 📊 How It Works

### Fact-Checking Flow

1. **User Input** → Text, URL, or Image
2. **n8n Workflow** → Primary fact-checking pipeline
3. **Gemini AI** → Fallback if n8n unavailable
4. **Source Verification** → Cross-reference multiple sources
5. **Result Display** → TRUE/FALSE with confidence score

### Architecture

```
User Input → n8n Webhook → Gemini AI → Source Verification → Result
     ↓              ↓              ↓              ↓              ↓
  Frontend    Workflow Engine   AI Analysis   Fact Databases   UI Display
```

## 🔍 Supported Content Types

- **Text Claims**: Direct text input for fact-checking
- **News URLs**: Article links from news websites
- **Images**: Screenshots and images with OCR text extraction
- **Social Media**: Posts and viral claims
- **Celebrity News**: Recent statements and announcements
- **Political Claims**: Government and political fact-checking

## 📈 Features in Detail

### Real-time Analysis
- Processes claims in seconds
- Cross-references multiple fact-checking databases
- Provides confidence scores and detailed reasoning

### Source Verification
- Reuters, BBC, Snopes, PolitiFact
- Academic databases and official sources
- Social media verification systems

### AI-Powered
- Google Gemini Pro for advanced analysis
- Natural language processing
- Context-aware fact-checking

## 🛡️ Error Handling

The app includes robust error handling:
- **n8n Unavailable**: Falls back to direct Gemini API
- **API Rate Limits**: Automatic retry with delays
- **Network Issues**: Offline fallback for basic facts
- **Invalid Input**: User-friendly error messages

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_GEMINI_API_KEY` | Google Gemini API key | Yes |
| `REACT_APP_N8N_WEBHOOK_URL` | n8n webhook endpoint | Optional |

### n8n Workflow Configuration

The n8n workflows expect these input fields:
- `title`: Content title
- `contentSnippet`: Main text to verify
- `link`: Source URL (if applicable)
- `inputType`: Type of input (text/url/image)
- `timestamp`: Request timestamp
- `source`: Always "TruthSeaker_Frontend"

## 🚨 Troubleshooting

### Common Issues

1. **n8n Connection Failed**
   - Check if n8n is running on correct port
   - Verify webhook URL in `.env`
   - Ensure workflow is activated

2. **Gemini API Errors**
   - Verify API key is correct
   - Check API quota and billing
   - Ensure proper network connectivity

3. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear React cache: `npm start -- --reset-cache`

### Debug Mode

Enable debug logging by checking browser console (F12) for:
- `🔄 Using n8n workflow for fact-checking...`
- `🤖 Using Gemini AI for real fact-checking...`
- `⚠️ Falling back to offline mode...`

## 📝 API Response Format

### n8n Workflow Response
```json
{
  "classification": "Verified|Potential Misinformation|Unverified",
  "confidence": 85,
  "reason": "Detailed explanation",
  "sources": [
    {
      "title": "Source Name",
      "url": "https://source.com",
      "source": "Publisher",
      "type": "news_verification",
      "verified": true
    }
  ]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with both n8n and fallback modes
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the troubleshooting section
- Review n8n workflow logs
- Verify API credentials and quotas
- Check browser console for error messages

---

**Built with ❤️ using React, n8n, and Agentic AI (Google Gemini) - Autonomous Truth Verification**
