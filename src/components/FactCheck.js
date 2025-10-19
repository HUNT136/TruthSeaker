import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { n8nService } from '../services/n8nService';
import './Landing.css';

const FactCheck = () => {
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState('url');
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check input based on type
    if (inputType === 'image') {
      if (!input) return;
    } else {
      if (!input || (typeof input === 'string' && !input.trim())) return;
    }

    setLoading(true);

    try {
      let contentData;
      
      // Process different input types
      if (inputType === 'url') {
        contentData = await n8nService.extractContentFromUrl(input);
      } else if (inputType === 'image') {
        contentData = await n8nService.processImage(input);
      } else {
        contentData = {
          title: 'Text Analysis',
          content: input,
          text: input
        };
      }

      // Send to Gemini AI for fact-checking
      console.log('🚀 Starting fact-check process...');
      const n8nResult = await n8nService.checkFact({
        ...contentData,
        type: inputType
      });
      console.log('✅ Fact-check completed:', n8nResult);

      // Use Gemini result directly
      const result = {
        isTrue: n8nResult.classification === 'Verified',
        confidence: n8nResult.confidence,
        classification: n8nResult.classification,
        reason: n8nResult.reason,
        sources: n8nResult.sources || [],
        relevantArticles: n8nResult.sources || []
      };

      navigate('/result', { state: { result, input, inputType } });
    } catch (error) {
      console.error('Error checking fact:', error);
      
      // Provide user-friendly error message
      const errorMessage = error.message.includes('API') 
        ? 'AI service temporarily unavailable. Please try again in a moment.'
        : 'Failed to verify information. Please check your internet connection and try again.';
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing">
      <div className="background-video-container">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src="/mixkit-fire-background-with-flames-moving-to-the-centre-3757-full-hd.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {showContent && (
        <div className="split-layout">
          {/* Fixed Left Side */}
          <div className="left-panel">
            <div className="left-content visible">
              <div className="brand-section">
                <h1 className="main-title">
                  <span className="truth">Fact</span><span className="only">Check</span>
                </h1>
                <p className="tagline">Verify Information with AI-Powered Analysis</p>
              </div>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">🔍</div>
                  <div className="stat-label">Deep Analysis</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⚡</div>
                  <div className="stat-label">Instant Results</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🛡️</div>
                  <div className="stat-label">Secure & Private</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Right Side */}
          <div className="right-panel">
            <div className="right-content">
              <div className="home-button-container">
                <button onClick={() => navigate('/')} className="home-btn">
                  🏠 Back to Home
                </button>
              </div>
              
              <div className="content-section visible">
                <h2>Choose Your Verification Method</h2>
                <p>Select how you want to verify your information and get instant results.</p>
              </div>

              <div className="fact-check-container">
                <form onSubmit={handleSubmit} className="modern-fact-form">
                  <div className="input-type-grid">
                    <div 
                      className={`input-type-card ${inputType === 'url' ? 'active' : ''}`}
                      onClick={() => setInputType('url')}
                    >
                      <div className="type-icon">🌐</div>
                      <h3>URL</h3>
                      <p>Verify news articles by URL</p>
                    </div>
                    <div 
                      className={`input-type-card ${inputType === 'text' ? 'active' : ''}`}
                      onClick={() => setInputType('text')}
                    >
                      <div className="type-icon">📝</div>
                      <h3>Text</h3>
                      <p>Paste text content directly</p>
                    </div>
                    <div 
                      className={`input-type-card ${inputType === 'image' ? 'active' : ''}`}
                      onClick={() => setInputType('image')}
                    >
                      <div className="type-icon">🖼️</div>
                      <h3>Image</h3>
                      <p>Upload screenshots or images</p>
                    </div>
                  </div>

                  <div className="input-section">
                    {inputType === 'url' && (
                      <div className="input-wrapper">
                        <input
                          type="url"
                          placeholder="Enter news article URL (e.g., https://example.com/news)"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          required
                          className="modern-input"
                        />
                      </div>
                    )}

                    {inputType === 'text' && (
                      <div className="input-wrapper">
                        <textarea
                          placeholder="Paste the news text or claim you want to verify..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          required
                          className="modern-textarea"
                          rows="6"
                        />
                      </div>
                    )}

                    {inputType === 'image' && (
                      <div className="input-wrapper">
                        <div className="file-upload-area">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setInput(e.target.files[0])}
                            required
                            className="file-input"
                            id="file-upload"
                          />
                          <label htmlFor="file-upload" className="file-upload-label">
                            <div className="upload-icon">📁</div>
                            <div className="upload-text">
                              <strong>Click to upload</strong> or drag and drop
                              <br />
                              <small>PNG, JPG, GIF up to 10MB</small>
                            </div>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  <button type="submit" disabled={loading} className="check-fact-btn">
                    {loading ? (
                      <>
                        <div className="spinner"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <span className="btn-icon">🔍</span>
                        Verify Information
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FactCheck;
