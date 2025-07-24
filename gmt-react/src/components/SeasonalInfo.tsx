import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const seasonalData = {
  spring: {
    title: 'Spring',
    color: 'from-green-400 to-blue-500',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#6ee7b7" /><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z" fill="#059669"/></svg>
    ),
    intro: "Discover everything you need to know for a smooth and memorable Spring journey. From visa rules to what you can do, we've got you covered!",
    sections: [
      {
        title: 'Visa Validity',
        desc: 'Your visa is valid from the date of issue. Be sure to check if you have a single, double, or multiple-entry visa for your travel plans.'
      },
      {
        title: 'Duration of Stay',
        desc: 'Most visas allow a maximum stay per visit (e.g., 90 days within a 180-day period). Review your visa type for specific rules.'
      },
      {
        title: 'Permitted Activities',
        desc: 'Tourism, study, or work? Make sure your visa covers your planned activities. Restrictions may apply for work or study on tourist visas.'
      },
      {
        title: 'Entry Bans & Restrictions',
        desc: 'Some nationalities may face travel bans or limited stay periods. Always check for the latest entry requirements and transit rules.'
      }
    ]
  },
  summer: {
    title: 'Summer',
    color: 'from-yellow-400 to-orange-500',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#fde68a" /><path d="M12 7A5 5 0 0 1 12 17A5 5 0 0 1 12 7M12 9A3 3 0 0 0 12 15A3 3 0 0 0 12 9M12 2L14.39 5.42C13.65 5.15 12.84 5 12 5C11.16 5 10.35 5.15 9.61 5.42L12 2M12 22L9.61 18.58C10.35 18.85 11.16 19 12 19C12.84 19 13.65 18.85 14.39 18.58L12 22M2 12L5.42 14.39C5.15 13.65 5 12.84 5 12C5 11.16 5.15 10.35 5.42 9.61L2 12M22 12L18.58 9.61C18.85 10.35 19 11.16 19 12C19 12.84 18.85 13.65 18.58 14.39L22 12Z" fill="#f59e42"/></svg>
    ),
    intro: "Summer is the peak tourist season with higher prices and larger crowds. Advance booking is highly recommended for accommodations and activities.",
    sections: [
      {
        title: 'Peak Season Information',
        desc: 'Summer is the peak tourist season with higher prices and larger crowds. Advance booking is highly recommended.'
      },
      {
        title: 'Weather Considerations',
        desc: 'Hot and humid weather with occasional rain showers. Best time for beach activities and water sports.'
      },
      {
        title: 'Cultural Events',
        desc: 'Various festivals and cultural celebrations throughout the summer months.'
      },
      {
        title: 'Travel Tips',
        desc: 'Stay hydrated and use sun protection during outdoor activities. Consider early morning or late afternoon visits to popular attractions.'
      }
    ]
  },
  autumn: {
    title: 'Autumn',
    color: 'from-orange-400 to-red-500',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#fdba74" /><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z" fill="#ea580c"/></svg>
    ),
    intro: "Moderate temperatures and fewer crowds compared to peak season. Better availability and more competitive pricing for accommodations.",
    sections: [
      {
        title: 'Shoulder Season Benefits',
        desc: 'Moderate temperatures and fewer crowds compared to peak season. Better availability and more competitive pricing.'
      },
      {
        title: 'Natural Beauty',
        desc: 'Beautiful fall colors and changing landscapes. Ideal weather for hiking and outdoor exploration.'
      },
      {
        title: 'Cultural Experiences',
        desc: 'Harvest festivals and traditional autumn celebrations.'
      },
      {
        title: 'Travel Planning',
        desc: 'Flexible booking options with good availability. Pleasant weather for both indoor and outdoor activities.'
      }
    ]
  },
  winter: {
    title: 'Winter',
    color: 'from-blue-400 to-purple-500',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#a5b4fc" /><path d="M12 2A10 10 0 0 0 2 12A10 10 0 0 0 12 22A10 10 0 0 0 22 12A10 10 0 0 0 12 2M12 4A8 8 0 0 1 20 12A8 8 0 0 1 12 20A8 8 0 0 1 4 12A8 8 0 0 1 12 4M12 6A6 6 0 0 0 6 12A6 6 0 0 0 12 18A6 6 0 0 0 18 12A6 6 0 0 0 12 6M12 8A4 4 0 0 1 16 12A4 4 0 0 1 12 16A4 4 0 0 1 8 12A4 4 0 0 1 12 8Z" fill="#6366f1"/></svg>
    ),
    intro: "Lowest prices and minimal crowds for a peaceful experience. Excellent availability for last-minute bookings and upgrades.",
    sections: [
      {
        title: 'Off-Season Advantages',
        desc: 'Lowest prices and minimal crowds for a peaceful experience. Excellent availability for last-minute bookings and upgrades.'
      },
      {
        title: 'Weather Conditions',
        desc: 'Cooler temperatures and occasional rainfall. Perfect for indoor cultural activities and spa experiences.'
      },
      {
        title: 'Unique Experiences',
        desc: 'Winter-specific activities and seasonal traditions. Intimate cultural experiences with fewer tourists.'
      },
      {
        title: 'Travel Considerations',
        desc: 'Some outdoor activities may be weather-dependent. Pack appropriate clothing for cooler temperatures.'
      }
    ]
  }
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SeasonalInfo: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const season = query.get('season') as keyof typeof seasonalData | null;
  const data = season && seasonalData[season] ? seasonalData[season] : null;

  if (!data) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center relative">
          <button
            className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
            onClick={() => navigate('/')}
            aria-label="Close"
          >
            ×
          </button>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid or Missing Season</h1>
          <p className="text-gray-700 mb-6">Please select a valid season from the main page.</p>
          <button
            className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow hover:from-purple-600 hover:to-blue-600 transition"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-10 relative animate-fadeIn">
        <button
          className="absolute top-6 left-6 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow hover:from-purple-600 hover:to-blue-600 transition"
          // onClick={() => navigate('/')}
        >
          ← Back
        </button>
        <button
          className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-gray-600"
          // onClick={() => navigate('/')}
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex items-center gap-4 mb-6">
          <div>{data.icon}</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 tracking-tight">
            {data.title} Travel Essentials
          </h1>
        </div>
        <p className="text-gray-700 mb-8 text-lg text-justify">
          {data.intro}
        </p>
        {/* Bento grid layout for info sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.sections.map((section, idx) => (
            <div
              key={idx}
              className={
                `rounded-2xl shadow-lg p-6 flex flex-col justify-between h-full bento-box ` +
                (idx % 2 === 0 ? 'bg-gradient-to-br from-blue-50 to-white border-l-8 border-blue-400' : 'bg-gradient-to-br from-purple-50 to-white border-l-8 border-purple-400')
              }
            >
              <div className="font-bold text-blue-800 text-lg mb-2 text-left">
                {section.title}
              </div>
              <div className="text-gray-700 text-base text-justify">
                {section.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonalInfo; 