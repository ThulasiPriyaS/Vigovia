import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import Footer from './Footer';

interface Activity {
  id: string;
  name: string;
  description: string;
  price: string;
}

interface Transfer {
  timings: string;
  price: string;
  type: string;
  people: string;
}

interface Flight {
  flightNumber: string;
  departure: string;
  arrival: string;
  time: string;
  price: string;
}

interface Day {
  activities: Activity[];
  transfers: Transfer[];
  flights: Flight[];
}

const defaultActivity = (): Activity => ({ id: '', name: '', description: '', price: '' });
const defaultTransfer = (): Transfer => ({ timings: '', price: '', type: '', people: '' });
const defaultFlight = (): Flight => ({ flightNumber: '', departure: '', arrival: '', time: '', price: '' });

const ItineraryPDFGenerator: React.FC = () => {
  const [numDays, setNumDays] = useState(1);
  const [days, setDays] = useState<Day[]>([{ activities: [defaultActivity()], transfers: [], flights: [] }]);

  // Handle number of days change
  const handleNumDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = Math.max(1, parseInt(e.target.value) || 1);
    setNumDays(n);
    setDays(prev => {
      const copy = [...prev];
      while (copy.length < n) copy.push({ activities: [defaultActivity()], transfers: [], flights: [] });
      while (copy.length > n) copy.pop();
      return copy;
    });
  };

  // Activity handlers
  const handleActivityChange = (dayIdx: number, actIdx: number, field: keyof Activity, value: string) => {
    setDays(prev => {
      const copy = [...prev];
      copy[dayIdx].activities[actIdx][field] = value;
      return [...copy];
    });
  };
  const addActivity = (dayIdx: number) => {
    setDays(prev => {
      const copy = [...prev];
      copy[dayIdx].activities.push(defaultActivity());
      return copy;
    });
  };
  const removeActivity = (dayIdx: number, actIdx: number) => {
    setDays(prev => {
      const copy = [...prev];
      copy[dayIdx].activities.splice(actIdx, 1);
      if (copy[dayIdx].activities.length === 0) copy[dayIdx].activities.push(defaultActivity());
      return copy;
    });
  };

  // Transfer handlers
  const handleTransferChange = (dayIdx: number, trIdx: number, field: keyof Transfer, value: string) => {
    setDays(prev => {
      const copy = [...prev];
      copy[dayIdx].transfers[trIdx][field] = value;
      return [...copy];
    });
  };
  const addTransfer = (dayIdx: number) => {
    setDays(prev => {
      const copy = [...prev];
      copy[dayIdx].transfers.push(defaultTransfer());
      return copy;
    });
  };
  const removeTransfer = (dayIdx: number, trIdx: number) => {
    setDays(prev => {
      const copy = [...prev];
      copy[dayIdx].transfers.splice(trIdx, 1);
      return copy;
    });
  };

  // Flight handlers
  const handleFlightChange = (dayIdx: number, flIdx: number, field: keyof Flight, value: string) => {
    setDays(prev => {
      const copy = [...prev];
      copy[dayIdx].flights[flIdx][field] = value;
      return [...copy];
    });
  };
  const addFlight = (dayIdx: number) => {
    setDays(prev => {
      const copy = [...prev];
      copy[dayIdx].flights.push(defaultFlight());
      return copy;
    });
  };
  const removeFlight = (dayIdx: number, flIdx: number) => {
    setDays(prev => {
      const copy = [...prev];
      copy[dayIdx].flights.splice(flIdx, 1);
      return copy;
    });
  };

  // PDF Generation
  const generatePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 12;

    // --- HEADER ---
    doc.setFillColor(108, 46, 183); // #6c2eb7
    doc.rect(0, 0, pageWidth, 32, 'F');
    doc.setFillColor(255,255,255);
    doc.circle(18, 16, 8, 'F');
    doc.setFontSize(18);
    doc.setTextColor(255,255,255);
    doc.text('Vigovia', 32, 20);
    doc.setFontSize(14);
    doc.text('My Bali Travel', pageWidth/2, 14, { align: 'center' });
    doc.setFontSize(10);
    doc.text('5 Nights / 6 Days - Sample Itinerary', pageWidth/2, 22, { align: 'center' });
    y = 36;

    // --- DAY CARDS ---
    const sampleDays = [
      {
        title: 'Arrival & Ubud Exploration',
        activities: [
          'Arrive at Bali airport, transfer to Ubud hotel',
          'Visit Monkey Forest, Ubud Palace, and local market',
          'Evening at leisure',
        ],
        hotel: 'Ubud Resort',
      },
      {
        title: 'Kintamani & Rice Terraces',
        activities: [
          'Breakfast at hotel',
          'Kintamani Volcano view',
          'Tegallalang Rice Terraces',
          'Coffee plantation tour',
        ],
        hotel: 'Ubud Resort',
      },
      {
        title: 'Transfer to Seminyak & Beach',
        activities: [
          'Check out from Ubud hotel',
          'Transfer to Seminyak',
          'Relax at Seminyak Beach',
        ],
        hotel: 'Seminyak Beach Hotel',
      },
    ];
    sampleDays.forEach((day, idx) => {
      if (y > 220) { doc.addPage(); y = 20; addFooter(); }
      const cardHeight = 24 + day.activities.length * 6 + 12; // 24 for title+first activity, 6 per activity, 12 for hotel and padding
      doc.setFillColor(245, 244, 250); // #f5f4fa
      doc.roundedRect(10, y, pageWidth-20, cardHeight, 4, 4, 'F');
      doc.setFillColor(200, 200, 255);
      doc.circle(22, y+cardHeight/2, 12, 'F');
      doc.setFontSize(12);
      doc.setTextColor(84, 28, 156);
      doc.text(`Day ${idx+1}: ${day.title}`, 38, y+12);
      doc.setFontSize(10);
      doc.setTextColor(60,60,60);
      day.activities.forEach((act, i) => {
        doc.text(`• ${act}`, 38, y+22+i*6);
      });
      doc.text(`Hotel: ${day.hotel}`, 38, y+22+day.activities.length*6+4);
      y += cardHeight + 8; // 8px gap between cards
    });

    // --- INCLUSIONS/EXCLUSIONS TABLE ---
    if (y > 200) { doc.addPage(); y = 20; addFooter(); }
    const inclusions = ['Breakfast daily', 'Airport transfers', 'All sightseeing as per itinerary'];
    const exclusions = ['Personal expenses', 'Lunch & Dinner', 'Travel insurance'];
    doc.setFillColor(108, 46, 183);
    doc.roundedRect(10, y, (pageWidth-20)/2, 10, 3, 3, 'F');
    doc.roundedRect(10+(pageWidth-20)/2, y, (pageWidth-20)/2, 10, 3, 3, 'F');
    doc.setFontSize(11);
    doc.setTextColor(255,255,255);
    doc.text('Inclusions', 10+((pageWidth-20)/4), y+7, { align: 'center' });
    doc.text('Exclusions', 10+((pageWidth-20)*3/4), y+7, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(60,60,60);
    let maxRows = Math.max(inclusions.length, exclusions.length);
    for (let i=0; i<maxRows; i++) {
      if (inclusions[i]) doc.text(`• ${inclusions[i]}`, 14, y+16+i*6);
      if (exclusions[i]) doc.text(`• ${exclusions[i]}`, 14+(pageWidth-20)/2, y+16+i*6);
    }
    y += 16 + maxRows*6;

    // --- SPECIAL NOTES ---
    if (y > 220) { doc.addPage(); y = 20; addFooter(); }
    doc.setFillColor(236, 224, 255); // light purple
    doc.roundedRect(10, y, pageWidth-20, 18, 3, 3, 'F');
    doc.setFontSize(11);
    doc.setTextColor(84, 28, 156);
    doc.text('Special Notes', 14, y+7);
    doc.setFontSize(10);
    doc.setTextColor(60,60,60);
    doc.text('• Please carry a valid ID proof.\n• Itinerary is subject to change based on local conditions.', 14, y+13);
    y += 24;

    // --- GENERAL NOTES ---
    doc.setFillColor(236, 224, 255);
    doc.roundedRect(10, y, pageWidth-20, 18, 3, 3, 'F');
    doc.setFontSize(11);
    doc.setTextColor(84, 28, 156);
    doc.text('General Notes', 14, y+7);
    doc.setFontSize(10);
    doc.setTextColor(60,60,60);
    doc.text('• Check-in time is 2 PM.\n• Early check-in/late check-out subject to availability.', 14, y+13);
    y += 24;

    // --- HOTEL TABLE ---
    if (y > 200) { doc.addPage(); y = 20; addFooter(); }
    doc.setFillColor(108, 46, 183);
    doc.roundedRect(10, y, pageWidth-20, 10, 3, 3, 'F');
    doc.setFontSize(11);
    doc.setTextColor(255,255,255);
    doc.text('Hotel Details', pageWidth/2, y+7, { align: 'center' });
    y += 12;
    doc.setFontSize(10);
    doc.setTextColor(60,60,60);
    doc.text('Hotel Name', 14, y);
    doc.text('Location', 64, y);
    doc.text('Nights', 114, y);
    doc.text('Room Type', 154, y);
    y += 6;
    doc.text('Ubud Resort', 14, y);
    doc.text('Ubud', 64, y);
    doc.text('2', 114, y);
    doc.text('Deluxe', 154, y);
    y += 6;
    doc.text('Seminyak Beach Hotel', 14, y);
    doc.text('Seminyak', 64, y);
    doc.text('3', 114, y);
    doc.text('Suite', 154, y);
    y += 10;

    // --- FLIGHT TABLE ---
    if (y > 200) { doc.addPage(); y = 20; addFooter(); }
    doc.setFillColor(108, 46, 183);
    doc.roundedRect(10, y, pageWidth-20, 10, 3, 3, 'F');
    doc.setFontSize(11);
    doc.setTextColor(255,255,255);
    doc.text('Flight Details', pageWidth/2, y+7, { align: 'center' });
    y += 12;
    doc.setFontSize(10);
    doc.setTextColor(60,60,60);
    doc.text('Flight No.', 14, y);
    doc.text('From', 54, y);
    doc.text('To', 94, y);
    doc.text('Time', 134, y);
    doc.text('Price', 174, y);
    y += 6;
    doc.text('AI-302', 14, y);
    doc.text('DEL', 54, y);
    doc.text('DPS', 94, y);
    doc.text('10:00', 134, y);
    doc.text('₹25,000', 174, y);
    y += 6;
    doc.text('AI-303', 14, y);
    doc.text('DPS', 54, y);
    doc.text('DEL', 94, y);
    doc.text('18:00', 134, y);
    doc.text('₹25,000', 174, y);
    y += 10;

    // --- ACTIVITY TABLE ---
    if (y > 200) { doc.addPage(); y = 20; addFooter(); }
    doc.setFillColor(108, 46, 183);
    doc.roundedRect(10, y, pageWidth-20, 10, 3, 3, 'F');
    doc.setFontSize(11);
    doc.setTextColor(255,255,255);
    doc.text('Activity Details', pageWidth/2, y+7, { align: 'center' });
    y += 12;
    doc.setFontSize(10);
    doc.setTextColor(60,60,60);
    doc.text('Activity', 14, y);
    doc.text('Description', 64, y);
    doc.text('Price', 174, y);
    y += 6;
    doc.text('Monkey Forest', 14, y);
    doc.text('Sanctuary of monkeys in Ubud', 64, y);
    doc.text('₹1,000', 174, y);
    y += 6;
    doc.text('Rice Terraces', 14, y);
    doc.text('Famous rice fields of Bali', 64, y);
    doc.text('₹800', 174, y);
    y += 10;

    // --- FOOTER (on every page) ---
    function addFooter() {
      doc.setDrawColor(230, 224, 247);
      doc.setLineWidth(0.5);
      doc.line(10, 287, pageWidth-10, 287);
      doc.setFontSize(9);
      doc.setTextColor(108, 46, 183);
      doc.text('Vigovia Travel Technologies (P) Ltd. | PLAN.PACK.GO', pageWidth/2, 293, { align: 'center' });
      doc.setTextColor(120,120,120);
      doc.text('HD-109 Cinnabar Hills, Links Business Park, Bangalore, India - 560071', pageWidth/2, 299, { align: 'center' });
    }
    addFooter();

    doc.save('itinerary.pdf');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#faf9fa', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: 800, margin: '32px auto 0 auto', background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(80,40,120,0.08)', padding: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#541c9c', marginBottom: 24 }}>Itinerary PDF Generator</h1>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 600 }}>Number of Days: </label>
          <input type="number" min={1} value={numDays} onChange={handleNumDaysChange} style={{ width: 60, marginLeft: 8, padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
        </div>
        {days.map((day, dayIdx) => (
          <div key={dayIdx} style={{ border: '1px solid #eee', borderRadius: 8, padding: 20, marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#351c5c', marginBottom: 12 }}>Day {dayIdx + 1}</h2>
            {/* Activities */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Activities</div>
              {day.activities.map((act, actIdx) => (
                <div key={actIdx} style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                  <input placeholder="ID" value={act.id} onChange={e => handleActivityChange(dayIdx, actIdx, 'id', e.target.value)} style={{ width: 60, padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
                  <input placeholder="Name" value={act.name} onChange={e => handleActivityChange(dayIdx, actIdx, 'name', e.target.value)} style={{ width: 120, padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
                  <input placeholder="Price" value={act.price} onChange={e => handleActivityChange(dayIdx, actIdx, 'price', e.target.value)} style={{ width: 80, padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
                  <input placeholder="Description" value={act.description} onChange={e => handleActivityChange(dayIdx, actIdx, 'description', e.target.value)} style={{ flex: 1, minWidth: 120, padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
                  <button type="button" onClick={() => removeActivity(dayIdx, actIdx)} style={{ background: '#eee', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addActivity(dayIdx)} style={{ background: '#6c2eb7', color: 'white', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer', marginTop: 4 }}>Add Activity</button>
            </div>
            {/* Transfers */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Transfers</div>
              {day.transfers.map((tr, trIdx) => (
                <div key={trIdx} style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                  <input placeholder="Timings" value={tr.timings} onChange={e => handleTransferChange(dayIdx, trIdx, 'timings', e.target.value)} style={{ width: 120, padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
                  <input placeholder="Price" value={tr.price} onChange={e => handleTransferChange(dayIdx, trIdx, 'price', e.target.value)} style={{ width: 80, padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
                  <input placeholder="Type" value={tr.type} onChange={e => handleTransferChange(dayIdx, trIdx, 'type', e.target.value)} style={{ width: 100, padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
                  <input placeholder="People Allowed" value={tr.people} onChange={e => handleTransferChange(dayIdx, trIdx, 'people', e.target.value)} style={{ width: 80, padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
                  <button type="button" onClick={() => removeTransfer(dayIdx, trIdx)} style={{ background: '#eee', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addTransfer(dayIdx)} style={{ background: '#6c2eb7', color: 'white', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer', marginTop: 4 }}>Add Transfer</button>
            </div>
            {/* Flights */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Flights</div>
              {day.flights.map((fl, flIdx) => (
                <div key={flIdx} style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                  <input placeholder="Flight No." value={fl.flightNumber} onChange={e => handleFlightChange(dayIdx, flIdx, 'flightNumber', e.target.value)} style={{ width: 100, padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
                  <input placeholder="Departure" value={fl.departure} onChange={e => handleFlightChange(dayIdx, flIdx, 'departure', e.target.value)} style={{ width: 100, padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
                  <input placeholder="Arrival" value={fl.arrival} onChange={e => handleFlightChange(dayIdx, flIdx, 'arrival', e.target.value)} style={{ width: 100, padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
                  <input placeholder="Time" value={fl.time} onChange={e => handleFlightChange(dayIdx, flIdx, 'time', e.target.value)} style={{ width: 80, padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
                  <input placeholder="Price" value={fl.price} onChange={e => handleFlightChange(dayIdx, flIdx, 'price', e.target.value)} style={{ width: 80, padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
                  <button type="button" onClick={() => removeFlight(dayIdx, flIdx)} style={{ background: '#eee', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addFlight(dayIdx)} style={{ background: '#6c2eb7', color: 'white', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer', marginTop: 4 }}>Add Flight</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={generatePDF} style={{ background: '#541c9c', color: 'white', border: 'none', borderRadius: 6, padding: '12px 32px', fontWeight: 700, fontSize: 18, cursor: 'pointer', marginTop: 12 }}>Generate PDF</button>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <Footer />
      </div>
    </div>
  );
};

export default ItineraryPDFGenerator; 