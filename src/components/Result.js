import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Landing.css';

const Result = () => {
  const [showContent, setShowContent] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { result, input, inputType } = location.state || {};

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  if (!result) {
    return (
      <div className="landing">
        <div className="background-video-container">
          <video autoPlay muted loop playsInline className="background-video">
            <source src="/mixkit-fire-background-with-flames-moving-to-the-centre-3757-full-hd.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="split-layout">
          <div className="left-panel">
            <div className="left-content visible">
              <div className="brand-section">
                <h1 className="main-title">
                  <span className="truth">Error</span>
                </h1>
                <p className="tagline">No result data available</p>
              </div>
            </div>
          </div>
          <div className="right-panel">
            <div className="right-content">
              <div className="content-section visible">
                <h2>Something went wrong</h2>
                <p>Please try checking your information again.</p>
                <button onClick={() => navigate('/fact-check')} className="get-started-btn">
                  Back to Fact Check
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { isTrue, confidence, sources } = result;

  return (
    <div className="landing">
      <div className="background-video-container">
        <video autoPlay muted loop playsInline className="background-video">
          <source src="/mixkit-fire-background-with-flames-moving-to-the-centre-3757-full-hd.mp4" type="video/mp4" />
        </video>
      </div>
      
      {showContent && (
        <div className="split-layout">
          <div className="left-panel">
            <div className="left-content visible">
              <div className="brand-section">
                <h1 className="main-title">
                  <span className={isTrue ? 'truth' : 'only'}>{isTrue ? 'Verified' : 'Disputed'}</span>
                </h1>
                <p className="tagline">Fact-checking complete</p>
              </div>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">{isTrue ? '✅' : '❌'}</div>
                  <div className="stat-label">{isTrue ? 'Likely True' : 'Likely False'}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number gradient-text">{confidence}%</div>
                  <div className="stat-label">Confidence</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-label">{inputType.toUpperCase()}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="right-panel">
            <div className="right-content">
              <div className="content-section visible">
                <h2>Analysis Results</h2>
                <p>Our AI has analyzed your content and cross-referenced it with trusted sources.</p>
              </div>

              <div className="result-details">
                <div className="input-summary-card">
                  <h3>Input Summary</h3>
                  <div className="input-info">
                    <span className="input-type">{inputType.toUpperCase()}</span>
                    <p className="input-content">{typeof input === 'string' ? input : 'File uploaded'}</p>
                  </div>
                </div>

                <div className={`verdict-card ${isTrue ? 'true' : 'false'}`}>
                  <div className="verdict-header">
                    <div className="verdict-icon">{isTrue ? '✅' : '❌'}</div>
                    <h3>{isTrue ? 'Information Verified' : 'Information Disputed'}</h3>
                  </div>
                  <div className="confidence-bar">
                    <div className="confidence-label">Confidence Level</div>
                    <div className="confidence-progress">
                      <div 
                        className="confidence-fill" 
                        style={{width: `${confidence}%`}}
                      ></div>
                    </div>
                    <div className="confidence-text">{confidence}%</div>
                  </div>
                </div>

                <div className="sources-card">
                  <h3>Verified Sources</h3>
                  <div className="sources-list">
                    {sources.map((source, index) => (
                      <div key={index} className="source-item">
                        <div className="source-icon">🔗</div>
                        {typeof source === 'object' ? (
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="source-link"
                          >
                            {source.name}
                          </a>
                        ) : (
                          <span>{source}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="result-actions">
                <button onClick={() => navigate('/fact-check')} className="get-started-btn">
                  Check Another
                </button>
                <button onClick={() => navigate('/')} className="secondary-btn">
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
