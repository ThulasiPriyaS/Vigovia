import React from 'react';

const Footer = () => (
  <footer style={{ background: 'linear-gradient(90deg, #f8f7fa 60%, #e7e0f7 100%)', width: '100%', marginTop: 60 }}>
    {/* Top row: tour package links */}
    <div style={{ borderBottom: '1px solid #e5e3ee', padding: '14px 0 6px 0', fontSize: 13, color: '#444', textAlign: 'center', fontWeight: 500 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
        {[
          'Bali Tour Packages', 'JapanTour Packages', 'Vietnam Tour Packages', 'Malaysia Tour Packages', 'Thailand Tour Packages', 'Europe Tour Packages', 'Cultural Tour Packages', 'Luxury Tour packages',
          'Dubai Tour Packages', 'Turkey Tour Packages', 'UAE Tour Packages', 'Singapore Tour Packages', 'Australia Tour Packages', 'South Korea Tour Packages', 'Honeymoon Tour packages', 'Adventure Tour packages'
        ].map(link => (
          <span key={link} style={{ margin: '0 4px', whiteSpace: 'nowrap', cursor: 'pointer' }}>{link}</span>
        ))}
      </div>
    </div>
    {/* Middle row: columns */}
    <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '40px 0 24px 0', borderBottom: '1px solid #e5e3ee', color: '#222' }}>
      <div style={{ flex: '1 1 160px', minWidth: 140, marginBottom: 24 }}>
        <div style={{ fontWeight: 700, marginBottom: 18 }}>Our offerings</div>
        <div style={{ marginBottom: 10 }}>Holidays</div>
        <div style={{ marginBottom: 10 }}>Visa</div>
        <div style={{ marginBottom: 10 }}>Forex</div>
        <div style={{ marginBottom: 10 }}>Hotels</div>
        <div>Flights</div>
      </div>
      <div style={{ flex: '1 1 160px', minWidth: 140, marginBottom: 24 }}>
        <div style={{ fontWeight: 700, marginBottom: 18 }}>Popular destinations</div>
        <div style={{ marginBottom: 10 }}>Dubai</div>
        <div style={{ marginBottom: 10 }}>Bali</div>
        <div style={{ marginBottom: 10 }}>Thailand</div>
        <div style={{ marginBottom: 10 }}>Singapore</div>
        <div>Malaysia</div>
      </div>
      <div style={{ flex: '1 1 160px', minWidth: 140, marginBottom: 24 }}>
        <div style={{ fontWeight: 700, marginBottom: 18 }}>Vigovia Specials</div>
        <div style={{ marginBottom: 10 }}>Featured Experience</div>
        <div style={{ marginBottom: 10 }}>Group Tours</div>
        <div style={{ marginBottom: 10 }}>Backpackers Club</div>
        <div>Offline Events</div>
      </div>
      <div style={{ flex: '1 1 160px', minWidth: 140, marginBottom: 24 }}>
        <div style={{ fontWeight: 700, marginBottom: 18 }}>Company</div>
        <div style={{ marginBottom: 10 }}>About Us</div>
        <div style={{ marginBottom: 10 }}>Careers</div>
        <div style={{ marginBottom: 10 }}>Vigovia Blog</div>
        <div style={{ marginBottom: 10 }}>Partner Portal</div>
        <div>Accreditations</div>
      </div>
      <div style={{ flex: '1 1 160px', minWidth: 140, marginBottom: 24 }}>
        <div style={{ fontWeight: 700, marginBottom: 18 }}>More</div>
        <div style={{ marginBottom: 10 }}>Investor Relations</div>
        <div style={{ marginBottom: 10 }}>Forex</div>
        <div style={{ marginBottom: 10 }}>FAQs</div>
        <div>Domestic Holidays</div>
      </div>
      <div style={{ flex: '1 1 260px', minWidth: 220, marginBottom: 24, color: '#222', fontSize: 15 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ background: '#6c2eb7', color: 'white', borderRadius: 16, fontSize: 13, padding: '2px 12px', marginRight: 10 }}>Need help? Call us</span>
          <span style={{ fontWeight: 700, fontSize: 17 }}>+91-98xxx64641</span>
        </div>
        <div style={{ marginBottom: 10 }}><span style={{ fontWeight: 700 }}>Email</span><br />contact@vigovia.com</div>
        <div><span style={{ fontWeight: 700 }}>Address</span><br />HD-109 Cinnabar Hills,Links Business Park,Bangalore North,Bangalore,Karnataka,India-560071</div>
      </div>
    </div>
    {/* New row: logo and payments above purple bg */}
    <div style={{ width: '100%', background: 'transparent', marginTop: 0, padding: '10px 0 0 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', fontSize: 12 }}>
        {/* Left: Logo and PLAN.PACK.GO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 120 }}>
          <img src="/Logo.png" alt="Vigovia Logo" style={{ height: 28, marginRight: 4 }} />
          <span style={{ fontSize: 10, color: '#6c2eb7', fontWeight: 600, marginLeft: 2 }}>PLAN.PACK.GO</span>
        </div>
        {/* Center: Payments */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center', minWidth: 180 }}>
          <span style={{ fontWeight: 700, fontSize: 12, color: '#3b267a', marginRight: 4 }}>Payments</span>
          <img src="https://w7.pngwing.com/pngs/93/992/png-transparent-razorpay-logo-tech-companies-thumbnail.png" alt="Razorpay" style={{ height: 16, marginRight: 4, background: 'white', borderRadius: 3, padding: 1 }} />
          <img src="https://icon2.cleanpng.com/20180409/fue/kisspng-stripe-payment-gateway-e-commerce-payment-system-b-strips-5acb36b2bc4914.4929750615232672507712.jpg" alt="Stripe" style={{ height: 16, background: 'white', borderRadius: 3, padding: 1 }} />
        </div>
        {/* Right: Empty for spacing */}
        <div style={{ minWidth: 120 }}></div>
      </div>
    </div>
    {/* Bottom row: copyright and policy */}
    <div style={{ width: '100%', background: '#3b267a', marginTop: 0, padding: '10px 0 10px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', fontSize: 12 }}>
        <span style={{ color: '#e0d6f7', fontSize: 11, marginRight: 16 }}>© 2025 Vigovia Travel Technologies (P) Ltd. All rights reserved.</span>
        <a href="#" style={{ color: '#e0d6f7', textDecoration: 'none', fontSize: 12, margin: '0 10px' }}>Privacy policy</a>
        <a href="#" style={{ color: '#e0d6f7', textDecoration: 'none', fontSize: 12, margin: '0 10px' }}>Legal notice</a>
        <a href="#" style={{ color: '#e0d6f7', textDecoration: 'none', fontSize: 12, margin: '0 10px' }}>Accessibility</a>
      </div>
    </div>
  </footer>
);

export default Footer; 