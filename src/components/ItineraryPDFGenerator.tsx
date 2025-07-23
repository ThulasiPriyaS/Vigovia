import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import Footer from './Footer';

interface Activity {
  time: string;
  title: string;
  description: string;
  image: string;
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
  date: string;
  city: string;
  hotel: string;
  activities: Activity[];
  transfers: Transfer[];
  flights: Flight[];
}

const defaultActivity = (): Activity => ({ time: '', title: '', description: '', image: '' });
const defaultTransfer = (): Transfer => ({ timings: '', price: '', type: '', people: '' });
const defaultFlight = (): Flight => ({ flightNumber: '', departure: '', arrival: '', time: '', price: '' });

const defaultDay = (): Day => ({
  date: '',
  city: '',
  hotel: '',
  activities: [defaultActivity()],
  transfers: [defaultTransfer()],
  flights: [defaultFlight()],
});

const defaultHotel = () => ({ name: '', city: '', checkIn: '', checkOut: '', nights: '', room: '', board: '' });

const ItineraryPDFGenerator: React.FC = () => {
  // Main trip info
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelerName, setTravelerName] = useState('');
  const [numTravelers, setNumTravelers] = useState(1);
  const [packageType, setPackageType] = useState('');

  // Auto-generated days based on date range
  const generateItinerary = (): Day[] => {
    if (!startDate || !endDate || !destination) return [];

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const days: Day[] = [];
    
    // Sample activities for different types of destinations
    const sampleActivities: { [key: string]: Activity[][] } = {
      default: [
        [
          { time: '09:00', title: 'Hotel Check-in', description: 'Arrive and check into your accommodation', image: '' },
          { time: '11:00', title: 'City Orientation Tour', description: 'Get familiar with the local area and key landmarks', image: '' },
          { time: '14:00', title: 'Local Lunch', description: 'Experience authentic local cuisine', image: '' },
          { time: '16:00', title: 'Local Market Visit', description: 'Explore traditional markets and local crafts', image: '' },
          { time: '19:00', title: 'Welcome Dinner', description: 'Enjoy a traditional dinner with local specialties', image: '' }
        ],
        [
          { time: '08:00', title: 'Breakfast', description: 'Start your day with a hearty breakfast', image: '' },
          { time: '09:30', title: 'Sightseeing Tour', description: 'Visit major tourist attractions and historical sites', image: '' },
          { time: '13:00', title: 'Lunch Break', description: 'Relax and enjoy lunch at a scenic location', image: '' },
          { time: '15:00', title: 'Cultural Experience', description: 'Immerse yourself in local culture and traditions', image: '' },
          { time: '18:00', title: 'Sunset Viewing', description: 'Watch the beautiful sunset from a scenic viewpoint', image: '' },
          { time: '20:00', title: 'Dinner', description: 'Enjoy dinner at a recommended restaurant', image: '' }
        ],
        [
          { time: '08:30', title: 'Adventure Activity', description: 'Exciting outdoor activity or adventure sport', image: '' },
          { time: '12:00', title: 'Lunch', description: 'Lunch at a local restaurant', image: '' },
          { time: '14:00', title: 'Relaxation Time', description: 'Free time for shopping or relaxation', image: '' },
          { time: '16:30', title: 'Local Experience', description: 'Unique local experience or workshop', image: '' },
          { time: '19:30', title: 'Farewell Dinner', description: 'Special dinner to celebrate your journey', image: '' }
        ]
      ]
    };

    for (let i = 0; i < diffDays; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      
      const dayActivities = sampleActivities.default[i % sampleActivities.default.length];
      
      days.push({
        date: currentDate.toISOString().split('T')[0],
        city: destination,
        hotel: `${destination} Hotel`,
        activities: dayActivities,
        transfers: [],
        flights: []
      });
    }

    return days;
  };

  // Days
  const [days, setDays] = useState<Day[]>([]);

  // Flights
  const [flights, setFlights] = useState([defaultFlight()]);

  // Transfers
  const [transfers, setTransfers] = useState([defaultTransfer()]);

  // Hotels
  const [hotels, setHotels] = useState([defaultHotel()]);

  // Inclusions, exclusions, notes
  const [inclusions, setInclusions] = useState(['']);
  const [exclusions, setExclusions] = useState(['']);
  const [importantNotes, setImportantNotes] = useState(['']);

  // Payment info
  const [paymentInfo, setPaymentInfo] = useState({ dueDate: '', amount: '', method: '' });

  // PDF Generation
  const generatePDF = () => {
    // Auto-generate itinerary when PDF is created
    const generatedDays = generateItinerary();
    if (generatedDays.length === 0) {
      alert('Please fill in Trip Name, Destination, Start Date, and End Date');
      return;
    }

    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 0;

    // --- VIGOVIA HEADER ---
    doc.setFillColor(108, 46, 183); // #6c2eb7
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    // Add border to header
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.rect(0, 0, pageWidth, 35);
    
    // Add Vigovia logo text (you can replace with actual logo later)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('VIGOVIA', pageWidth / 2, 22, { align: 'center' });
    
    // Add decorative line under header
    doc.setDrawColor(108, 46, 183);
    doc.setLineWidth(2);
    doc.line(0, 35, pageWidth, 35);
    
    y = 45;
    
    // --- USER NAME ---
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    const userName = travelerName || 'User';
    
    // Add border around user welcome section
    doc.setFillColor(248, 249, 250);
    doc.rect(20, y - 5, pageWidth - 40, 18, 'F');
    doc.setDrawColor(108, 46, 183);
    doc.setLineWidth(0.5);
    doc.rect(20, y - 5, pageWidth - 40, 18);
    
    doc.text(`Welcome, ${userName}!`, pageWidth / 2, y + 5, { align: 'center' });
    
    y += 25;
    
    // --- TRIP OVERVIEW TABLE ---
    // Table headers
    const tableHeaders = ['Departure From', 'Departure Date', 'Arrival', 'Destination', 'No. of Travellers'];
    const tableValues = [
      startDate ? new Date(startDate).toLocaleDateString() : 'Not specified',
      startDate || 'Not specified',
      endDate ? new Date(endDate).toLocaleDateString() : 'Not specified',
      destination || 'Not specified',
      numTravelers.toString()
    ];
    
    // Table styling
    const colWidth = (pageWidth - 40) / 5; // 5 columns with 20mm margins
    const rowHeight = 10;
    
    // Draw header row
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y, pageWidth - 40, rowHeight, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    
    for (let i = 0; i < tableHeaders.length; i++) {
      const x = 20 + (i * colWidth) + 2;
      doc.text(tableHeaders[i], x, y + 7);
    }
    
    y += rowHeight;
    
    // Draw value row
    doc.setFillColor(255, 255, 255);
    doc.rect(20, y, pageWidth - 40, rowHeight, 'F');
    doc.setFont('helvetica', 'normal');
    
    for (let i = 0; i < tableValues.length; i++) {
      const x = 20 + (i * colWidth) + 2;
      doc.text(tableValues[i], x, y + 7);
    }
    
    // Draw table borders
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    // Horizontal lines
    doc.line(20, y - rowHeight, pageWidth - 20, y - rowHeight);
    doc.line(20, y, pageWidth - 20, y);
    doc.line(20, y + rowHeight, pageWidth - 20, y + rowHeight);
    // Vertical lines
    for (let i = 0; i <= tableHeaders.length; i++) {
      const x = 20 + (i * colWidth);
      doc.line(x, y - rowHeight, x, y + rowHeight);
    }
    
    y += 30;
    
    // --- DAY-WISE ITINERARY ---
    // Add section border
    doc.setFillColor(248, 249, 250);
    doc.rect(20, y - 8, pageWidth - 40, 20, 'F');
    doc.setDrawColor(108, 46, 183);
    doc.setLineWidth(0.8);
    doc.rect(20, y - 8, pageWidth - 40, 20);
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(108, 46, 183);
    doc.text('Daily Itinerary', pageWidth / 2, y + 2, { align: 'center' });
    y += 25;
    
    // Function to add new page if needed
    const checkPageBreak = (requiredSpace: number) => {
      if (y + requiredSpace > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
    };
    
    generatedDays.forEach((day, dayIndex) => {
      checkPageBreak(40);
      
      // Day header
      doc.setFillColor(108, 46, 183);
      doc.rect(20, y - 5, pageWidth - 40, 12, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`Day ${dayIndex + 1}${day.date ? ` - ${day.date}` : ''}`, 22, y + 3);
      
      y += 15;
      
      if (day.city) {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`City: ${day.city}`, 22, y);
        y += 8;
      }
      
      if (day.hotel) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Hotel: ${day.hotel}`, 22, y);
        y += 8;
      }
      
      // Time-based activities
      const timeSlots = [
        { label: 'Morning', activities: day.activities.filter(a => a.time.toLowerCase().includes('morning') || a.time.includes('AM') || (a.time >= '06:00' && a.time <= '11:59')) },
        { label: 'Afternoon', activities: day.activities.filter(a => a.time.toLowerCase().includes('afternoon') || (a.time >= '12:00' && a.time <= '17:59')) },
        { label: 'Evening', activities: day.activities.filter(a => a.time.toLowerCase().includes('evening') || a.time.toLowerCase().includes('night') || a.time.includes('PM') || (a.time >= '18:00' && a.time <= '23:59')) }
      ];
      
      // If no specific time filtering worked, show all activities under general
      const allFilteredActivities = timeSlots.reduce((acc: Activity[], slot) => acc.concat(slot.activities), [] as Activity[]);
      if (allFilteredActivities.length === 0 && day.activities.length > 0) {
        timeSlots[0].activities = day.activities; // Put all in morning if no time specified
      }
      
      timeSlots.forEach(timeSlot => {
        if (timeSlot.activities.length > 0) {
          checkPageBreak(20);
          
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(108, 46, 183);
          doc.text(`${timeSlot.label}:`, 25, y);
          y += 8;
          
          timeSlot.activities.forEach(activity => {
            if (activity.title || activity.description) {
              checkPageBreak(15);
              
              doc.setTextColor(0, 0, 0);
              doc.setFontSize(10);
              doc.setFont('helvetica', 'normal');
              
              if (activity.time) {
                doc.text(`${activity.time} - `, 30, y);
                doc.text(activity.title || activity.description, 50, y);
              } else {
                doc.text(`• ${activity.title || activity.description}`, 30, y);
              }
              y += 6;
              
              if (activity.description && activity.title) {
                doc.setFontSize(9);
                doc.setTextColor(80, 80, 80);
                const descLines = doc.splitTextToSize(activity.description, pageWidth - 60);
                doc.text(descLines, 35, y);
                y += descLines.length * 4;
              }
            }
          });
          y += 5;
        }
      });
      
      // Add transfers if any
      if (day.transfers && day.transfers.length > 0) {
        const validTransfers = day.transfers.filter(t => t.type || t.timings);
        if (validTransfers.length > 0) {
          checkPageBreak(20);
          
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(108, 46, 183);
          doc.text('Transfers:', 25, y);
          y += 8;
          
          validTransfers.forEach(transfer => {
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`• ${transfer.type || 'Transfer'} ${transfer.timings ? `at ${transfer.timings}` : ''}`, 30, y);
            y += 6;
          });
          y += 5;
        }
      }
      
      y += 10; // Space between days
    });
    
    // --- FLIGHT SUMMARY ---
    doc.addPage();
    y = 20;
    
    // Add decorative border for section header
    doc.setFillColor(248, 249, 250);
    doc.rect(20, y - 8, pageWidth - 40, 20, 'F');
    doc.setDrawColor(108, 46, 183);
    doc.setLineWidth(0.8);
    doc.rect(20, y - 8, pageWidth - 40, 20);
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(108, 46, 183);
    doc.text('Flight Summary', pageWidth / 2, y + 2, { align: 'center' });
    y += 25;
    
    // Flight details table
    const flightData = [
      ['Flight', 'Route', 'Date', 'Time', 'Status'],
      ['VI-101', `Departure → ${destination}`, new Date(startDate).toLocaleDateString(), '09:30 AM', 'Confirmed'],
      ['VI-102', `${destination} → Departure`, new Date(endDate).toLocaleDateString(), '06:45 PM', 'Confirmed']
    ];
    
    // Draw flight table with proper column widths
    const flightColWidths = [25, 60, 35, 25, 25]; // Custom widths for each column
    flightData.forEach((row, rowIndex) => {
      const isHeader = rowIndex === 0;
      
      if (isHeader) {
        doc.setFillColor(108, 46, 183);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFillColor(rowIndex % 2 === 0 ? 240 : 255, rowIndex % 2 === 0 ? 240 : 255, rowIndex % 2 === 0 ? 240 : 255);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
      }
      
      // Draw row background
      doc.rect(20, y, pageWidth - 40, 12, 'F');
      doc.setFontSize(9);
      
      let currentX = 20;
      row.forEach((cell, colIndex) => {
        const colWidth = flightColWidths[colIndex];
        
        // Handle text wrapping for longer content
        if (cell.length > 15 && colIndex === 1) { // Route column
          const lines = doc.splitTextToSize(cell, colWidth - 4);
          doc.text(lines, currentX + 2, y + 7);
        } else {
          doc.text(cell, currentX + 2, y + 7);
        }
        
        // Draw column border
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(currentX, y, currentX, y + 12);
        
        currentX += colWidth;
      });
      
      // Draw right border
      doc.line(currentX, y, currentX, y + 12);
      // Draw horizontal borders
      doc.line(20, y, pageWidth - 20, y);
      doc.line(20, y + 12, pageWidth - 20, y + 12);
      
      y += 12;
    });
    
    y += 20;
    
    // --- HOTEL BOOKINGS ---
    // Add decorative border for section header
    doc.setFillColor(248, 249, 250);
    doc.rect(20, y - 8, pageWidth - 40, 20, 'F');
    doc.setDrawColor(108, 46, 183);
    doc.setLineWidth(0.8);
    doc.rect(20, y - 8, pageWidth - 40, 20);
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(108, 46, 183);
    doc.text('Hotel Bookings', pageWidth / 2, y + 2, { align: 'center' });
    y += 25;
    
    const hotelData = [
      ['Hotel Name', 'City', 'Check-in', 'Check-out', 'Room Type'],
      [`${destination} Grand Hotel`, destination, new Date(startDate).toLocaleDateString(), new Date(endDate).toLocaleDateString(), 'Deluxe Double Room']
    ];
    
    // Draw hotel table with proper column widths
    const hotelColWidths = [50, 30, 30, 30, 30]; // Custom widths for each column
    hotelData.forEach((row, rowIndex) => {
      const isHeader = rowIndex === 0;
      
      if (isHeader) {
        doc.setFillColor(108, 46, 183);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFillColor(245, 245, 245);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
      }
      
      // Draw row background
      doc.rect(20, y, pageWidth - 40, 12, 'F');
      doc.setFontSize(9);
      
      let currentX = 20;
      row.forEach((cell, colIndex) => {
        const colWidth = hotelColWidths[colIndex];
        
        // Handle text wrapping for longer content
        if (cell.length > 15 && colIndex === 0) { // Hotel name column
          const lines = doc.splitTextToSize(cell, colWidth - 4);
          doc.text(lines, currentX + 2, y + 7);
        } else {
          doc.text(cell, currentX + 2, y + 7);
        }
        
        // Draw column border
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(currentX, y, currentX, y + 12);
        
        currentX += colWidth;
      });
      
      // Draw right border and horizontal borders
      doc.line(currentX, y, currentX, y + 12);
      doc.line(20, y, pageWidth - 20, y);
      doc.line(20, y + 12, pageWidth - 20, y + 12);
      
      y += 12;
    });
    
    y += 20;
    
    // --- IMPORTANT NOTES ---
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(108, 46, 183);
    doc.text('Important Notes', 20, y);
    y += 12;
    
    const importantNotesList = [
      'Please carry a valid passport with at least 6 months validity',
      'Check visa requirements for your destination country',
      'Arrive at the airport at least 2 hours before domestic flights and 3 hours before international flights',
      'Keep important documents and emergency contacts handy',
      'Travel insurance is highly recommended for international trips',
      'Check weather conditions and pack accordingly'
    ];
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    importantNotesList.forEach(note => {
      checkPageBreak(8);
      doc.text(`• ${note}`, 25, y);
      y += 7;
    });
    
    y += 15;
    
    // --- SCOPE OF SERVICES ---
    checkPageBreak(60);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(108, 46, 183);
    doc.text('Scope of Services', 20, y);
    y += 12;
    
    const scopeServices = [
      'Professional tour guide and assistance',
      'All transportation as per itinerary',
      'Accommodation in selected hotels',
      'Daily breakfast and selected meals',
      'Entry fees to monuments and attractions',
      '24/7 customer support during travel',
      'Travel coordination and logistics'
    ];
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    scopeServices.forEach(service => {
      checkPageBreak(8);
      doc.text(`✓ ${service}`, 25, y);
      y += 7;
    });
    
    // --- INCLUSION SUMMARY ---
    doc.addPage();
    y = 20;
    
    // Add decorative border for section header
    doc.setFillColor(248, 249, 250);
    doc.rect(20, y - 8, pageWidth - 40, 20, 'F');
    doc.setDrawColor(108, 46, 183);
    doc.setLineWidth(0.8);
    doc.rect(20, y - 8, pageWidth - 40, 20);
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(108, 46, 183);
    doc.text('Inclusion Summary', pageWidth / 2, y + 2, { align: 'center' });
    y += 25;
    
    const inclusionData = [
      ['Service', 'Description', 'Included'],
      ['Accommodation', `${Math.ceil(Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} nights in ${destination}`, 'Yes - Confirmed'],
      ['Meals', 'Daily breakfast + selected lunches/dinners', 'Yes - As per itinerary'],
      ['Transportation', 'Airport transfers + local transport', 'Yes - All included'],
      ['Activities', 'All mentioned sightseeing and activities', 'Yes - Entry fees covered'],
      ['Guide', 'Professional English-speaking guide', 'Yes - Throughout trip'],
      ['Support', '24/7 customer assistance', 'Yes - Emergency hotline']
    ];
    
    // Draw inclusion table with proper spacing
    const inclColWidths = [40, 80, 50]; // Custom widths for better readability
    inclusionData.forEach((row, rowIndex) => {
      const isHeader = rowIndex === 0;
      
      if (isHeader) {
        doc.setFillColor(108, 46, 183);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFillColor(rowIndex % 2 === 0 ? 240 : 255, rowIndex % 2 === 0 ? 240 : 255, rowIndex % 2 === 0 ? 240 : 255);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
      }
      
      const rowHeight = 15; // Increased height for better readability
      doc.rect(20, y, pageWidth - 40, rowHeight, 'F');
      doc.setFontSize(9);
      
      let currentX = 20;
      row.forEach((cell, colIndex) => {
        const colWidth = inclColWidths[colIndex];
        
        // Handle text wrapping for longer content
        if (cell.length > 25 && colIndex === 1) { // Description column
          const lines = doc.splitTextToSize(cell, colWidth - 4);
          doc.text(lines, currentX + 2, y + 8);
        } else {
          doc.text(cell, currentX + 2, y + 10);
        }
        
        // Draw column border
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(currentX, y, currentX, y + rowHeight);
        
        currentX += colWidth;
      });
      
      // Draw right border and horizontal borders
      doc.line(currentX, y, currentX, y + rowHeight);
      doc.line(20, y, pageWidth - 20, y);
      doc.line(20, y + rowHeight, pageWidth - 20, y + rowHeight);
      
      y += rowHeight;
    });
    
    y += 20;
    
    // --- ACTIVITY TABLE ---
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(108, 46, 183);
    doc.text('Activity Summary', 20, y);
    y += 12;
    
    const activityData = [
      ['Day', 'Activity', 'Duration', 'Type'],
      ['1', 'City Orientation Tour', '3 hours', 'Sightseeing'],
      ['1', 'Local Market Visit', '2 hours', 'Cultural'],
      ['2', 'Major Attractions Tour', '4 hours', 'Sightseeing'],
      ['2', 'Cultural Experience', '2 hours', 'Cultural'],
      ['3', 'Adventure Activity', '3 hours', 'Adventure']
    ];
    
    // Draw activity table
    const actColWidth = (pageWidth - 40) / 4;
    activityData.forEach((row, rowIndex) => {
      checkPageBreak(12);
      const isHeader = rowIndex === 0;
      
      if (isHeader) {
        doc.setFillColor(108, 46, 183);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFillColor(rowIndex % 2 === 0 ? 240 : 255, rowIndex % 2 === 0 ? 240 : 255, rowIndex % 2 === 0 ? 240 : 255);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
      }
      
      doc.rect(20, y, pageWidth - 40, 10, 'F');
      doc.setFontSize(9);
      
      row.forEach((cell, colIndex) => {
        const x = 20 + (colIndex * actColWidth) + 2;
        doc.text(cell, x, y + 7);
      });
      
      y += 10;
    });
    
    // --- TERMS AND CONDITIONS ---
    doc.addPage();
    y = 20;
    
    // Add decorative border for section header
    doc.setFillColor(248, 249, 250);
    doc.rect(20, y - 8, pageWidth - 40, 20, 'F');
    doc.setDrawColor(108, 46, 183);
    doc.setLineWidth(0.8);
    doc.rect(20, y - 8, pageWidth - 40, 20);
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(108, 46, 183);
    doc.text('Terms and Conditions', pageWidth / 2, y + 2, { align: 'center' });
    y += 25;
    
    const termsConditions = [
      '1. BOOKING CONFIRMATION',
      '   • Booking is confirmed only after receipt of advance payment',
      '   • All rates are subject to availability at the time of confirmation',
      '',
      '2. PAYMENT TERMS',
      '   • 25% advance payment required at the time of booking',
      '   • 75% balance payment due 15 days before departure',
      '   • Payments can be made via bank transfer, credit card, or cash',
      '',
      '3. CANCELLATION POLICY',
      '   • 45+ days before departure: 10% cancellation charges',
      '   • 30-44 days before departure: 25% cancellation charges',
      '   • 15-29 days before departure: 50% cancellation charges',
      '   • Less than 15 days: 100% cancellation charges',
      '',
      '4. TRAVEL INSURANCE',
      '   • Travel insurance is strongly recommended',
      '   • Vigovia is not liable for any medical emergencies',
      '',
      '5. FORCE MAJEURE',
      '   • Vigovia shall not be liable for any delays or cancellations due to',
      '     natural disasters, political situations, or other unforeseen circumstances'
    ];
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    termsConditions.forEach(term => {
      checkPageBreak(6);
      if (term.startsWith('   ')) {
        doc.text(term, 25, y);
      } else if (term === '') {
        y += 3;
        return;
      } else {
        doc.setFont('helvetica', 'bold');
        doc.text(term, 20, y);
        doc.setFont('helvetica', 'normal');
      }
      y += 6;
    });
    
    y += 15;
    
    // --- PAYMENT PLAN ---
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(108, 46, 183);
    doc.text('Payment Plan', 20, y);
    y += 12;
    
    const totalAmount = numTravelers * 1500; // Base amount per traveler
    const advanceAmount = Math.round(totalAmount * 0.25);
    const balanceAmount = totalAmount - advanceAmount;
    
    const paymentData = [
      ['Payment Stage', 'Amount (USD)', 'Due Date', 'Status'],
      ['Advance Payment (25%)', `$${advanceAmount}`, 'At booking', 'Pending'],
      ['Balance Payment (75%)', `$${balanceAmount}`, '15 days before departure', 'Pending'],
      ['Total Package Cost', `$${totalAmount}`, '', '']
    ];
    
    // Draw payment table with proper column widths
    const paymentColWidths = [50, 35, 45, 30]; // Custom widths for better spacing
    paymentData.forEach((row, rowIndex) => {
      checkPageBreak(15);
      const isHeader = rowIndex === 0;
      const isTotal = rowIndex === paymentData.length - 1;
      
      if (isHeader) {
        doc.setFillColor(108, 46, 183);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
      } else if (isTotal) {
        doc.setFillColor(220, 220, 220);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFillColor(245, 245, 245);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
      }
      
      const rowHeight = 12;
      doc.rect(20, y, pageWidth - 40, rowHeight, 'F');
      doc.setFontSize(10);
      
      let currentX = 20;
      row.forEach((cell, colIndex) => {
        const colWidth = paymentColWidths[colIndex];
        
        // Handle text wrapping for longer content
        if (cell.length > 20 && colIndex === 2) { // Due date column
          const lines = doc.splitTextToSize(cell, colWidth - 4);
          doc.text(lines, currentX + 2, y + 7);
        } else {
          doc.text(cell, currentX + 2, y + 8);
        }
        
        // Draw column border
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(currentX, y, currentX, y + rowHeight);
        
        currentX += colWidth;
      });
      
      // Draw right border and horizontal borders
      doc.line(currentX, y, currentX, y + rowHeight);
      doc.line(20, y, pageWidth - 20, y);
      doc.line(20, y + rowHeight, pageWidth - 20, y + rowHeight);
      
      y += rowHeight;
    });
    
    // --- VISA DETAILS ---
    doc.addPage();
    y = 20;
    
    // Add decorative border for section header
    doc.setFillColor(248, 249, 250);
    doc.rect(20, y - 8, pageWidth - 40, 20, 'F');
    doc.setDrawColor(108, 46, 183);
    doc.setLineWidth(0.8);
    doc.rect(20, y - 8, pageWidth - 40, 20);
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(108, 46, 183);
    doc.text('Visa Requirements & Details', pageWidth / 2, y + 2, { align: 'center' });
    y += 25;
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Visa Requirements for ${destination}:`, 20, y);
    y += 10;
    
    const visaInfo = [
      '• Valid passport with minimum 6 months validity',
      '• Completed visa application form',
      '• Recent passport-size photographs (2 copies)',
      '• Proof of accommodation booking',
      '• Flight itinerary/booking confirmation',
      '• Bank statements for last 3 months',
      '• Travel insurance certificate',
      '• Invitation letter (if applicable)',
      '',
      'PROCESSING TIME: 7-10 working days',
      'VISA FEE: $85 per person (subject to change)',
      '',
      'Note: Vigovia can assist with visa documentation but cannot guarantee visa approval.',
      'Visa fees are non-refundable regardless of visa outcome.'
    ];
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    visaInfo.forEach(info => {
      checkPageBreak(6);
      if (info === '') {
        y += 3;
        return;
      }
      if (info.startsWith('PROCESSING') || info.startsWith('VISA FEE')) {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(108, 46, 183);
      } else if (info.startsWith('Note:')) {
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
      }
      doc.text(info, 20, y);
      y += 6;
    });
    
    y += 20;
    
    // --- VIGOVIA CONTACT INFORMATION ---
    checkPageBreak(60);
    
    // Simple contact section header
    doc.setFillColor(108, 46, 183);
    doc.rect(20, y - 5, pageWidth - 40, 15, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('VIGOVIA TRAVEL SERVICES', pageWidth / 2, y + 5, { align: 'center' });
    
    y += 20;
    
    // Simple contact details without special characters
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const contactInfo = [
      'Address: HD-109 Cinnabar Hills, Links Business Park',
      '         Bangalore North, Bangalore, Karnataka, India - 560071',
      '',
      'Phone: +91 (80) 4567-8900',
      'Mobile: +91 98765-43210',
      '',
      'Email: contact@vigovia.com',
      'Website: www.vigovia.com',
      '',
      'Office Hours: Monday - Friday: 9:00 AM - 6:00 PM',
      '             Saturday: 10:00 AM - 4:00 PM'
    ];
    
    contactInfo.forEach(contact => {
      if (contact === '') {
        y += 3;
        return;
      }
      if (contact.startsWith('Office Hours')) {
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFont('helvetica', 'normal');
      }
      doc.text(contact, 30, y);
      y += 6;
    });
    
    // Add footer to all pages and page borders
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      
      // Add page border
      doc.setDrawColor(108, 46, 183);
      doc.setLineWidth(1.5);
      doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
      
      // Add inner decorative border
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
      
      // Add footer
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(`Generated by Vigovia - Page ${i} of ${totalPages}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
    }
    
    // Save the PDF
    doc.save(`${tripName || 'Travel_Itinerary'}.pdf`);
  };

  // --- FORM RENDERING ---
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#6c2eb7', marginBottom: '30px' }}>
        Personalized Travel Itinerary Generator
      </h2>
      
      <form onSubmit={e => e.preventDefault()} style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Trip Name:
              <input 
                style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                value={tripName} 
                onChange={e => setTripName(e.target.value)} 
                placeholder="e.g., Amazing Europe Tour"
              />
            </label>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Destination:
              <input 
                style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                value={destination} 
                onChange={e => setDestination(e.target.value)} 
                placeholder="e.g., Paris, France"
              />
            </label>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Start Date:
              <input 
                style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                type="date" 
                value={startDate} 
                onChange={e => setStartDate(e.target.value)} 
              />
            </label>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              End Date:
              <input 
                style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                type="date" 
                value={endDate} 
                onChange={e => setEndDate(e.target.value)} 
              />
            </label>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Traveler Name:
              <input 
                style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                value={travelerName} 
                onChange={e => setTravelerName(e.target.value)} 
                placeholder="e.g., John Doe"
              />
            </label>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Number of Travelers:
              <input 
                style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                type="number" 
                min="1" 
                value={numTravelers} 
                onChange={e => setNumTravelers(Number(e.target.value))} 
              />
            </label>
          </div>
        </div>
        
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Package Type:
            <input 
              style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
              value={packageType} 
              onChange={e => setPackageType(e.target.value)} 
              placeholder="e.g., Luxury, Budget, Adventure, Family"
            />
          </label>
        </div>
        
        {/* Show calculated trip duration */}
        {startDate && endDate && (
          <div style={{ 
            backgroundColor: '#e8f4fd', 
            border: '1px solid #6c2eb7', 
            borderRadius: '5px', 
            padding: '15px', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <strong style={{ color: '#6c2eb7' }}>
              Trip Duration: {Math.ceil(Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days
            </strong>
            <br />
            <em style={{ color: '#666', fontSize: '14px' }}>
              Itinerary will be automatically generated for each day when you create the PDF
            </em>
          </div>
        )}
        
        <button 
          type="button" 
          onClick={generatePDF} 
          style={{ 
            width: '100%',
            marginTop: '20px', 
            padding: '15px 20px', 
            backgroundColor: '#6c2eb7', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={e => (e.target as HTMLButtonElement).style.backgroundColor = '#5a2598'}
          onMouseOut={e => (e.target as HTMLButtonElement).style.backgroundColor = '#6c2eb7'}
        >
          🎯 Generate Personalized Itinerary PDF
        </button>
      </form>
      
      <Footer />
    </div>
  );
};

export default ItineraryPDFGenerator;
 