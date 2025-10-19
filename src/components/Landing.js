import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const [showIntroVideo, setShowIntroVideo] = useState(true);
  const [showShrinkingVideo, setShowShrinkingVideo] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [contentStep, setContentStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // 10s Marvel-style intro video
    const introTimer = setTimeout(() => {
      setShowIntroVideo(false);
      setShowShrinkingVideo(true);
    }, 10000);

    // 2s shrink animation
    const shrinkTimer = setTimeout(() => {
      setShowShrinkingVideo(false);
      setShowBlackScreen(true);
    }, 12000);

    // Black screen for 1s, then content appears
    const blackScreenTimer = setTimeout(() => {
      setShowBlackScreen(false);
      setShowContent(true);
      // Start content reveal sequence
      setTimeout(() => setContentStep(1), 300);
      setTimeout(() => setContentStep(2), 800);
      setTimeout(() => setContentStep(3), 1300);
      setTimeout(() => setContentStep(4), 1800);
      setTimeout(() => setContentStep(5), 2300);
    }, 13000);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(shrinkTimer);
      clearTimeout(blackScreenTimer);
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/fact-check');
  };

  return (
    <div className="landing">
      {/* Fire background video - always playing */}
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
      
      {/* Custom animated intro */}
      {showIntroVideo && (
        <div className="custom-intro-container">
          <div className="intro-animation">
            <div className="search-beam"></div>
            <div className="truth-reveal">
              <div className="magnifying-glass">
                <div className="glass-circle"></div>
                <div className="glass-handle"></div>
              </div>
              <div className="truth-text">
                <span className="truth-word">TRUTH</span>
                <span className="revealed-text">REVEALED</span>
              </div>
            </div>
            <div className="data-particles">
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Shrinking video transition */}
      {showShrinkingVideo && (
        <div className="shrinking-video-container">
          <video
            autoPlay
            muted
            playsInline
            className="shrinking-video"
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      
      {/* Black screen transition */}
      {showBlackScreen && (
        <div className="black-screen">
          <div className="loading-animation">
            <div className="pulse"></div>
          </div>
        </div>
      )}
      {showContent && (
        <div className="split-layout">
          {/* Fixed Left Side */}
          <div className="left-panel">
            <div className={`left-content ${contentStep >= 1 ? 'visible' : ''}`}>
              <div className="brand-section">
                <h1 className="main-title">
                  <span className="truth">Truth</span><span className="only">Seaker</span>
                </h1>
                <p className="tagline">Verify News. Combat Misinformation.</p>
                <p className="description">Our advanced AI-powered fact-checking platform helps you distinguish between reliable information and deceptive content.</p>
              </div>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">🔍</div>
                  <div className="stat-title">Deep Analysis</div>
                  <div className="stat-description">Comprehensive verification using multiple trusted sources</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⚡</div>
                  <div className="stat-title">Instant Results</div>
                  <div className="stat-description">Get fact-check results in seconds</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🛡️</div>
                  <div className="stat-title">Privacy First</div>
                  <div className="stat-description">Your data stays secure and private</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🤝</div>
                  <div className="stat-title">Open and Honest</div>
                  <div className="stat-description">Transparent methodology and reliable sources</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📈</div>
                  <div className="stat-title">Self-development</div>
                  <div className="stat-description">Continuous improvement of our AI models</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Right Side */}
          <div className="right-panel">
            <div className="right-content">
              <div className={`content-section ${contentStep >= 2 ? 'visible' : ''}`}>
                <h2>Start Fact-Checking</h2>
                <p>Choose your verification method and get instant results powered by advanced AI technology.</p>
              </div>

              <div className={`features-section ${contentStep >= 3 ? 'visible' : ''}`}>
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon">🔍</div>
                  </div>
                  <div className="feature-content">
                    <h3>Deep Analysis</h3>
                    <p>Comprehensive verification using multiple trusted sources</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon">⚡</div>
                  </div>
                  <div className="feature-content">
                    <h3>Instant Results</h3>
                    <p>Get fact-check results in seconds</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon">🛡️</div>
                  </div>
                  <div className="feature-content">
                    <h3>Privacy First</h3>
                    <p>Your data stays secure and private</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon">🤝</div>
                  </div>
                  <div className="feature-content">
                    <h3>Open and Honest</h3>
                    <p>Transparent methodology and reliable sources</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon">📈</div>
                  </div>
                  <div className="feature-content">
                    <h3>Self-development</h3>
                    <p>Continuous improvement of our AI models</p>
                  </div>
                </div>
              </div>

              <div className={`cta-section ${contentStep >= 4 ? 'visible' : ''}`}>
                <button className="get-started-btn" onClick={handleGetStarted}>
                  Start Fact-Checking Now
                </button>
                <p className="cta-subtitle">Free to use. No registration required.</p>
              </div>

              <div className={`how-it-works ${contentStep >= 5 ? 'visible' : ''}`}>
                <h2>How It Works</h2>
                <div className="steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <h3>Input Content</h3>
                    <p>Paste a URL, text, or upload an image</p>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <h3>AI Analysis</h3>
                    <p>Our AI cross-references with trusted sources</p>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <h3>Get Results</h3>
                    <p>Receive detailed verification report</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
