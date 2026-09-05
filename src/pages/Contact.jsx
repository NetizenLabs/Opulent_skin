import React from 'react';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been received by our Lahore concierge team.');
    e.target.reset();
  };

  return (
    <div className="page-wrapper">
      <section className="page-hero">
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
          Customer Concierge[span_15](start_span)[span_15](end_span)
        </span>
        <h1>We Are Here to Assist You</h1>
        <p>Inquiries regarding formulations, order dispatch schedules, or Lahore flagship consultations[span_16](start_span)[span_16](end_span).</p>
      </section>

      <div className="content-container">
        <div className="grid-2col">
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-gold-dark)', textTransform: 'uppercase' }}>
              Direct Inquiries[span_17](start_span)[span_17](end_span)
            </span>
            <h2 style={{ fontSize: '2.2rem', margin: '8px 0 20px 0' }}>Lahore Flagship & Support</h2>

            <div style={{ marginBottom: '24px' }}>
              <strong>Flagship Address</strong>
              <p style={{ color: 'var(--text-muted)' }}>M.M. Alam Road, Block C-2, Gulberg III, Lahore, Pakistan[span_18](start_span)[span_18](end_span)</p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <strong>WhatsApp & Helpline</strong>
              <p style={{ color: 'var(--text-muted)' }}>+92 300 1234567 (Mon-Sat, 9:00 AM - 9:00 PM PKT)[span_19](start_span)[span_19](end_span)</p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <strong>Email Concierge</strong>
              <p style={{ color: 'var(--text-muted)' }}>orders@opulentskin.pk / support@opulentskin.pk[span_20](start_span)[span_20](end_span)</p>
            </div>

            <div style={{ background: 'var(--bg-surface-subtle)', border: '1px solid var(--border-color)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
              <strong style={{ display: 'block', marginBottom: '4px' }}>Express Cash on Delivery:</strong>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Orders placed before 2:00 PM within Lahore are delivered within 24 hours[span_21](start_span)[span_21](end_span). Karachi, Islamabad, and nationwide orders arrive in 2-4 business days[span_22](start_span)[span_22](end_span).
              </p>
            </div>
          </div>

          <div className="form-card">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Send a Direct Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" className="form-control" required placeholder="e.g. Ayesha Malik" />
              </div>
              <div className="form-group">
                <label>Phone / WhatsApp *</label>
                <input type="tel" className="form-control" required placeholder="0300-1234567" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" placeholder="name@domain.com" />
              </div>
              <div className="form-group">
                <label>Message / Order Inquiry *</label>
                <textarea className="form-control" rows="4" required placeholder="Describe your inquiry..."></textarea>
              </div>
              <button type="submit" className="btn-primary-action">Submit Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
