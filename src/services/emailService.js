// Email reporting service
export const emailService = {
  async sendReport(reportData) {
    try {
      // Using EmailJS for client-side email sending
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_default';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_default';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';

      // Prepare email data
      const emailData = {
        to_email: 'admin@truthseaker.com',
        from_name: reportData.userEmail || 'Anonymous User',
        subject: `Fact-Check Report: ${reportData.classification}`,
        message: `
FACT-CHECK REPORT

Original Claim: "${reportData.originalClaim}"
Our Result: ${reportData.classification} (${reportData.confidence}% confidence)
User Says: ${reportData.userFeedback}

Reason for Report: ${reportData.reportReason}
User Comments: ${reportData.userComments}

Submitted: ${new Date().toLocaleString()}
User Email: ${reportData.userEmail || 'Not provided'}
        `
      };

      // Simulate email sending (replace with actual EmailJS integration)
      console.log('📧 Sending report email:', emailData);
      
      // For now, just log the report
      this.logReport(reportData);
      
      return { success: true, message: 'Report sent successfully' };
      
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, message: 'Failed to send report' };
    }
  },

  // Log report locally for now
  logReport(reportData) {
    const reports = JSON.parse(localStorage.getItem('factCheckReports') || '[]');
    reports.push({
      ...reportData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem('factCheckReports', JSON.stringify(reports));
    console.log('📝 Report logged locally:', reportData);
  }
};