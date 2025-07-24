import React from 'react';

export default function AboutBali() {
  return (
    <section style={{ background: '#f7f7fa', padding: '48px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 32, textAlign: 'left', marginLeft: 15, marginTop: '-10px' }}>
          <span style={{ color: '#111' }}>About </span>
          <span style={{ color: '#541c9c' }}>Bali</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 36, background: 'none', borderRadius: 0, overflow: 'visible' }}>
          {/* Left: Tall image with all edges rounded */}
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <img
              src="https://plus.unsplash.com/premium_photo-1716903509002-9cbb23ee8cad?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Bali mountain climbing"
              style={{ width: '100%', height: 430, objectFit: 'cover', borderRadius: 24, boxShadow: '0 4px 24px rgba(84,28,156,0.08)' }}
            />
          </div>
          {/* Right: Split upper/lower with gap */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 430, gap: 32 }}>
            {/* Upper: Gateway section with all rounded corners */}
            <div style={{ background: '#fff', borderRadius: 24, minHeight: 170, padding: 28, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', boxShadow: '0 2px 12px rgba(84,28,156,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, width: '100%', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#321e5d' }}>Your Gateway to Bali Adventures</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg" alt="Indonesia flag" style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', objectFit: 'cover' }} />
              </div>
              <p style={{ margin: 0, color: '#444', fontSize: '1rem', marginLeft: 0, marginTop: 8, textAlign: 'justify', maxWidth: 520 }}>
                Discover Bali, an island of tranquil beaches, vibrant culture, and spiritual journeys. From lush rice terraces to ancient temples and thrilling surf, Bali offers unforgettable experiences for every traveler.
              </p>
            </div>
            {/* Lower: Bento box activity cards */}
            <div style={{ display: 'flex', gap: 16, flex: 1 }}>
              {[
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#541c9c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  ),
                  title: 'Food and Culture',
                  desc: "Savor Balinese cuisine and explore vibrant local markets, or join a cooking class for a true taste of the island."
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#541c9c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  ),
                  title: 'Adventure Activities',
                  desc: "Surf world-class waves, trek up Mount Batur at sunrise, or zipline through lush jungle canopies."
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#541c9c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  ),
                  title: 'Nature Escapades',
                  desc: "Wander through rice terraces, relax on white sand beaches, or meditate in serene jungle retreats."
                }
              ].map(card => (
                <div key={card.title} style={{ flex: 1, background: '#fff', borderRadius: 16, padding: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 90, justifyContent: 'flex-start', position: 'relative', border: '2px solid #541c9c' }}>
                  <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', zIndex: 2, padding: 0, background: '#fff', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {React.cloneElement(card.icon, { width: 38, height: 38, style: { display: 'block' } })}
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: '1.05rem', margin: '28px 0 6px 0', color: '#321e5d', textAlign: 'center' }}>{card.title}</h4>
                  <p style={{ color: '#444', fontSize: '0.97rem', textAlign: 'justify', margin: 0, padding: 3 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 