import React from "react";

const blogData = [
  {
    img: "https://storage.googleapis.com/a1aa/image/93513eef-6419-4ab5-4531-884e7183f4bc.jpg",
    alt: "Placeholder image showing a scenic view for blog post 1",
  },
  {
    img: "https://storage.googleapis.com/a1aa/image/af5187af-7d38-4462-16ce-c8a38226f1bc.jpg",
    alt: "Placeholder image showing a scenic view for blog post 2",
  },
  {
    img: "https://storage.googleapis.com/a1aa/image/5169ba6e-f71a-4dee-25ae-7ce3b879c748.jpg",
    alt: "Placeholder image showing a scenic view for blog post 3",
  },
];

const BlogsSectionJSX = () => (
  <div className="bg-[#f9f9f9] p-6">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-lg font-extrabold mb-6">
        Blogs Related To{" "}
        <span className="text-purple-700">New Zealand</span>
      </h2>
      <div className="flex justify-end space-x-3 mb-4">
        <button
          aria-label="Previous"
          className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-purple-700 hover:bg-purple-100"
        >
          {/* Chevron Left SVG */}
          <svg className="w-4 h-4 text-sm" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          aria-label="Next"
          className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-purple-700 hover:bg-purple-100"
        >
          {/* Chevron Right SVG */}
          <svg className="w-4 h-4 text-sm" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData.map((blog, idx) => (
          <article key={idx} className="bg-white rounded-md shadow-sm overflow-hidden">
            <img
              alt={blog.alt}
              className="w-full h-40 object-cover"
              height={300}
              src={blog.img}
              width={600}
            />
            <div className="p-4">
              <div className="flex text-xs text-gray-500 mb-2 space-x-4">
                <div className="flex items-center space-x-1">
                  {/* User SVG */}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>By admin</span>
                </div>
                <div className="flex items-center space-x-1">
                  {/* Comments SVG */}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h2"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h-6a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2z"></path>
                  </svg>
                  <span>Comments (05)</span>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-purple-900 mb-1 leading-tight">
                Journeys of Discovery Uncovering Hidden Treasures
              </h3>
              <p className="text-xs text-gray-500 mb-4 leading-snug">
                “Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra .Aliquam eros justo, posuere lobortis viverra..."
              </p>
              <button className="bg-purple-900 text-white text-xs px-4 py-1 rounded-full" type="button">
                View
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
);

export default BlogsSectionJSX; 