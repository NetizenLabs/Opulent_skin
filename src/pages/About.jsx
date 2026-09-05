import React from 'react';

export default function About() {
  return (
    <div className="page-wrapper">
      <section className="page-hero">
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
          Our Science & Heritage[span_5](start_span)[span_5](end_span)
        </span>
        <h1>Clean Beauty Formulated with Precision</h1>
        <p>Bridging botanical potency and dermatological clinical science for high-performing, unfiltered skin[span_6](start_span)[span_6](end_span).</p>
      </section>

      <div className="content-container">
        <div className="grid-2col" style={{ marginBottom: '60px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-gold-dark)', textTransform: 'uppercase' }}>
              The Opulent Philosophy[span_7](start_span)[span_7](end_span)
            </span>
            <h2 style={{ fontSize: '2.2rem', margin: '10px 0 16px 0' }}>Dermatological Integrity Without Compromise</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
              Founded in Lahore, Opulent Skin was established to eliminate the tradeoff between clean organic botanicals and high-potency clinical results[span_8](start_span)[span_8](end_span). Our laboratory formulas are tailored specifically for South Asian weather conditions, preventing congested pores while rebuilding compromised moisture barriers[span_9](start_span)[span_9](end_span).
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              Every product undergoes extensive dermatologist vetting, ensuring zero sulfates, parabens, synthetic perfumes, or toxic fillers[span_10](start_span)[span_10](end_span).
            </p>
          </div>
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-float)' }}>
            <img 
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80" 
              alt="Laboratory Formulation Standards" 
              style={{ width: '100%', height: '380px', objectFit: 'cover' }} 
            />
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '48px' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 32px auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-gold-dark)', textTransform: 'uppercase' }}>
              Frequently Asked Questions[span_11](start_span)[span_11](end_span)
            </span>
            <h2 style={{ fontSize: '2rem', marginTop: '8px' }}>Formulation Transparency</h2>
          </div>

          <div className="faq-list">
            <div className="faq-item">
              <h3>Are all Opulent Skin ingredients 100% Halal and Cruelty-Free?</h3>
              <p>Yes. Every batch is formulated without ethyl alcohols, animal-derived lipids, or synthetic fragrances, adhering strictly to Halal-certified laboratory standards[span_12](start_span)[span_12](end_span).</p>
            </div>
            <div className="faq-item">
              <h3>How do these formulations perform in Pakistani humid weather?</h3>
              <p>Our serums and creams use non-comedogenic lipid carriers that absorb immediately without leaving sticky residue, designed specifically for summer and monsoon humidity[span_13](start_span)[span_13](end_span).</p>
            </div>
            <div className="faq-item">
              <h3>Where are products manufactured and dispatched from?</h3>
              <p>All items are batched and dispatched directly from our flagship fulfillment facility in Gulberg III, Lahore[span_14](start_span)[span_14](end_span).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
