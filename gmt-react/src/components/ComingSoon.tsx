import { useLocation } from 'react-router-dom';

const videoMap: Record<string, string> = {
  malaysia: require('../assets/malaysia.mp4'),
  srilanka: require('../assets/srilanka.mp4'),
  paris: require('../assets/paris.mp4'),
  barcelona: require('../assets/barcelona.mp4'),
  rome: require('../assets/rome.mp4'),
};

const itineraries: Record<string, { title: string; days: { day: string; activities: string[] }[] }> = {
  malaysia: {
    title: 'Malaysia Itinerary',
    days: [
      { day: 'Day 1: Kuala Lumpur', activities: ['Petronas Twin Towers', 'Batu Caves', 'Bukit Bintang'] },
      { day: 'Day 2: Penang', activities: ['George Town Street Art', 'Penang Hill', 'Kek Lok Si Temple'] },
      { day: 'Day 3: Langkawi', activities: ['Langkawi Sky Bridge', 'Island Hopping', 'Eagle Square'] },
    ],
  },
  srilanka: {
    title: 'Sri Lanka Itinerary',
    days: [
      { day: 'Day 1: Colombo', activities: ['Galle Face Green', 'Gangaramaya Temple', 'Pettah Market'] },
      { day: 'Day 2: Kandy', activities: ['Temple of the Tooth', 'Royal Botanical Gardens', 'Kandy Lake'] },
      { day: 'Day 3: Sigiriya', activities: ['Sigiriya Rock Fortress', 'Dambulla Cave Temple', 'Village Safari'] },
    ],
  },
  paris: {
    title: 'Paris Itinerary',
    days: [
      { day: 'Day 1: Classic Paris', activities: ['Eiffel Tower', 'Seine River Cruise', 'Champs-Élysées'] },
      { day: 'Day 2: Art & Culture', activities: ['Louvre Museum', 'Montmartre', 'Sacre-Cœur'] },
      { day: 'Day 3: Day Trips', activities: ['Versailles Palace', 'Disneyland Paris', 'Latin Quarter'] },
    ],
  },
  barcelona: {
    title: 'Barcelona Itinerary',
    days: [
      { day: 'Day 1: City Highlights', activities: ['Sagrada Família', 'Gothic Quarter', 'La Rambla'] },
      { day: 'Day 2: Art & Architecture', activities: ['Park Güell', 'Casa Batlló', 'Picasso Museum'] },
      { day: 'Day 3: Beach & Markets', activities: ['Barceloneta Beach', 'Boqueria Market', 'Magic Fountain'] },
    ],
  },
  rome: {
    title: 'Rome Itinerary',
    days: [
      { day: 'Day 1: Ancient Rome', activities: ['Colosseum', 'Roman Forum', 'Palatine Hill'] },
      { day: 'Day 2: Vatican & More', activities: ['Vatican Museums', 'St. Peter’s Basilica', 'Castel Sant’Angelo'] },
      { day: 'Day 3: Piazzas & Fountains', activities: ['Trevi Fountain', 'Piazza Navona', 'Pantheon'] },
    ],
  },
};

const ComingSoon = () => {
  const location = useLocation();
  const path = location.pathname.replace('/', '').toLowerCase();
  const itinerary = itineraries[path];
  const videoSrc = videoMap[path];

  if (!itinerary) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
        <h1 style={{ fontSize: 40, fontWeight: 700, color: '#6c2eb7', textAlign: 'center' }}>Coming Soon</h1>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', padding: '0', background: '#faf9fa' }}>
      {videoSrc && (
        <div style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', minWidth: '100vw', maxWidth: '100vw', overflow: 'hidden', background: '#000' }}>
          <video src={videoSrc} autoPlay loop muted style={{ width: '100vw', height: '48vw', minHeight: 320, maxHeight: 600, objectFit: 'cover', display: 'block', borderRadius: 0, boxShadow: 'none', margin: 0 }} />
        </div>
      )}
      <div style={{ maxWidth: 900, margin: '0 auto', background: 'white', borderRadius: 24, boxShadow: '0 4px 24px rgba(80,40,120,0.08)', padding: 40, marginTop: 32 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#541c9c', marginBottom: 24 }}>{itinerary.title}</h1>
        {itinerary.days.map((day, idx) => (
          <div key={day.day} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#351c5c', marginBottom: 10 }}>{day.day}</h2>
            <ul style={{ margin: 0, paddingLeft: 24, color: '#444', fontSize: 17 }}>
              {day.activities.map((act, i) => (
                <li key={i} style={{ marginBottom: 6 }}>{act}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComingSoon; 