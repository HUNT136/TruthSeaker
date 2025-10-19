import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { emailService } from '../services/emailService';
import './Landing.css';
import './TrueFakeStyles.css';

const Result = () => {
  const [showContent, setShowContent] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState({
    userFeedback: '',
    reportReason: '',
    userComments: '',
    userEmail: ''
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { result, input, inputType } = location.state || {};

  // Convert technical reasons to simple language
  const getSimpleReason = (reason, classification, confidence) => {
    if (!reason) {
      return newsStatus === 'TRUE' 
        ? 'Our AI analysis confirms this information is accurate.'
        : 'Our AI analysis indicates this information is not accurate.';
    }
    
    if (newsStatus === 'TRUE') {
      return reason.includes('well-established') || reason.includes('confirmed')
        ? reason
        : 'We found reliable sources and evidence confirming this information.';
    } else {
      return reason.includes('contradicts') || reason.includes('false')
        ? reason
        : 'This information contradicts verified facts and reliable sources.';
    }
  };

  // Handle report submission
  const handleReport = async () => {
    const reportPayload = {
      originalClaim: typeof input === 'string' ? input : 'File/Image input',
      classification: newsStatus,
      confidence: confidence,
      ...reportData
    };

    const result = await emailService.sendReport(reportPayload);
    
    if (result.success) {
      alert('Thank you! Your report has been sent. We will review it shortly.');
      setShowReportModal(false);
    } else {
      alert('Failed to send report. Please try again.');
    }
  };

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

  const { isTrue, confidence, sources, classification, reason, relevantArticles, webData } = result;
  
  // Determine news status - simplified to TRUE/FALSE only
  let newsStatus, statusColor;
  
  // Check both classification and isTrue field
  const isVerified = classification === 'Verified' || isTrue === true;
  
  if (isVerified) {
    newsStatus = 'TRUE';
    statusColor = 'true-news';
  } else {
    newsStatus = 'FALSE';
    statusColor = 'fake-news';
  }

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
                  <span className={statusColor}>{newsStatus}</span>
                </h1>
                <p className="tagline">News Verification Complete</p>
              </div>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    {newsStatus === 'TRUE' ? '✅' : '❌'}
                  </div>
                  <div className="stat-label">{newsStatus}</div>
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
                  <h3>What We Checked</h3>
                  <div className="input-info">
                    <div className="simple-summary">
                      {inputType === 'url' ? (
                        <>
                          <div className="check-type">📰 News Article Link</div>
                          <div className="check-content">
                            We read the full article from: {typeof input === 'string' ? new URL(input).hostname : 'the website'}
                          </div>
                        </>
                      ) : inputType === 'image' ? (
                        <>
                          <div className="check-type">🖼️ Image/Screenshot</div>
                          <div className="check-content">
                            We read the text from your image: {typeof input === 'object' ? input.name : 'uploaded image'}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="check-type">📝 Text Message</div>
                          <div className="check-content">
                            "{typeof input === 'string' ? `${input.substring(0, 80)}...` : 'Your text message'}"
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`verdict-card ${statusColor}`}>
                  <div className="verdict-header">
                    <div className="verdict-icon">
                      {newsStatus === 'TRUE' ? '✅' : '❌'}
                    </div>
                    <h3 className="news-verdict">
                      {newsStatus === 'TRUE' ? 'TRUE' : 'FALSE'}
                    </h3>
                    <div className="simple-confidence">
                      {newsStatus === 'TRUE' ? 'This information is TRUE' : 'This information is FALSE'}
                    </div>
                  </div>
                  {reason && (
                    <div className="verdict-reason">
                      <strong>Why:</strong> {getSimpleReason(reason, classification, confidence)}
                    </div>
                  )}
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
                  <h3>Where We Checked ({webData?.summary?.totalSources || relevantArticles?.length || 0} Places)</h3>
                  
                  {webData?.summary && (
                    <div className="data-summary">
                      <div className="summary-stats">
                        <span className="stat">📰 {webData.summary.articlesCount} Articles</span>
                        <span className="stat">📱 {webData.summary.socialPostsCount} Social Posts</span>
                        <span className="stat">🖼️ {webData.summary.imagesCount} Images</span>
                        <span className="stat">✅ {webData.summary.verifiedSources} Verified</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="sources-list">
                    {(relevantArticles && relevantArticles.length > 0 ? relevantArticles : sources).map((source, index) => (
                      <div key={index} className={`source-item ${
                        source.type === 'official_update' ? 'official-source' :
                        source.type === 'news_article' ? 'news-source' :
                        source.type === 'social_post' ? 'social-source' :
                        source.type === 'image' ? 'image-source' : ''
                      }`}>
                        <div className="source-icon">
                          {source.type === 'official_update' ? '✅' :
                           source.type === 'news_article' ? '📰' :
                           source.type === 'social_post' ? '📱' :
                           source.type === 'image' ? '🖼️' : '🔗'}
                        </div>
                        <div className="source-content">
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="source-link"
                          >
                            {source.title || source.name}
                          </a>
                          <div className="source-details">
                            {source.source && (
                              <span className="source-publisher">{source.source}</span>
                            )}
                            {source.platform && (
                              <span className="platform-badge">{source.platform}</span>
                            )}
                            {source.type === 'official_update' && (
                              <span className="official-badge">OFFICIAL</span>
                            )}
                            {source.verified && source.type !== 'official_update' && (
                              <span className="verified-badge">VERIFIED</span>
                            )}
                            {source.credibility === 'high' && (
                              <span className="credibility-badge">HIGH CREDIBILITY</span>
                            )}
                            {source.timestamp && (
                              <span className="timestamp">{new Date(source.timestamp).toLocaleString()}</span>
                            )}
                          </div>
                        </div>
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
                <button onClick={() => setShowReportModal(true)} className="report-btn">
                  📧 Report Issue
                </button>
              </div>

              {/* Report Modal */}
              {showReportModal && (
                <div className="modal-overlay">
                  <div className="report-modal">
                    <h3>Report an Issue</h3>
                    <p>Help us improve by reporting incorrect results</p>
                    
                    <div className="report-form">
                      <label>What's wrong with our result?</label>
                      <select 
                        value={reportData.userFeedback} 
                        onChange={(e) => setReportData({...reportData, userFeedback: e.target.value})}
                      >
                        <option value="">Select issue type</option>
                        <option value="Should be TRUE">This should be marked as TRUE</option>
                        <option value="Should be FAKE">This should be marked as FAKE</option>
                        <option value="Wrong confidence">Confidence score is wrong</option>
                        <option value="Other">Other issue</option>
                      </select>

                      <label>Why do you think this is incorrect?</label>
                      <textarea
                        placeholder="Please explain why you believe our result is wrong..."
                        value={reportData.userComments}
                        onChange={(e) => setReportData({...reportData, userComments: e.target.value})}
                        rows="4"
                      />

                      <label>Your email (optional)</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={reportData.userEmail}
                        onChange={(e) => setReportData({...reportData, userEmail: e.target.value})}
                      />
                    </div>

                    <div className="modal-actions">
                      <button onClick={handleReport} className="submit-report-btn">
                        Send Report
                      </button>
                      <button onClick={() => setShowReportModal(false)} className="cancel-btn">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
