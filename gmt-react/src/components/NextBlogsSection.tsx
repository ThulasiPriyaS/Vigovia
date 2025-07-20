import React from "react";

const NextBlogsSection = () => (
  <div dangerouslySetInnerHTML={{ __html: `
  <div class="max-w-7xl mx-auto">
   <h2 class="text-lg font-extrabold mb-6">
    Blogs Related To
    <span class="text-purple-700">
     New Zealand
    </span>
   </h2>
   <div class="flex justify-end space-x-3 mb-4">
    <button aria-label="Previous" class="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-purple-700 hover:bg-purple-100">
     <i class="fas fa-chevron-left text-sm"></i>
    </button>
    <button aria-label="Next" class="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-purple-700 hover:bg-purple-100">
     <i class="fas fa-chevron-right text-sm"></i>
    </button>
   </div>
   <div class="flex flex-row gap-6">
    <article class="bg-white rounded-md shadow-sm overflow-hidden">
     <img alt="Placeholder image showing a scenic view for blog post 1" class="w-full h-40 object-cover" height="300" src="https://storage.googleapis.com/a1aa/image/93513eef-6419-4ab5-4531-884e7183f4bc.jpg" width="600"/>
     <div class="p-4">
      <div class="flex text-xs text-gray-500 mb-2 space-x-4">
       <div class="flex items-center space-x-1">
        <i class="fas fa-user"></i>
        <span>By admin</span>
       </div>
       <div class="flex items-center space-x-1">
        <i class="fas fa-comments"></i>
        <span>Comments (05)</span>
       </div>
      </div>
      <h3 class="text-sm font-semibold text-purple-900 mb-1 leading-tight">
       Journeys of Discovery Uncovering Hidden Treasures
      </h3>
      <p class="text-xs text-gray-500 mb-4 leading-snug">
       “Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra .Aliquam eros justo, posuere lobortis viverra...”
      </p>
      <button class="bg-purple-900 text-white text-xs px-4 py-1 rounded-full" type="button">
       View
      </button>
     </div>
    </article>
    <article class="bg-white rounded-md shadow-sm overflow-hidden">
     <img alt="Placeholder image showing a scenic view for blog post 2" class="w-full h-40 object-cover" height="300" src="https://storage.googleapis.com/a1aa/image/af5187af-7d38-4462-16ce-c8a38226f1bc.jpg" width="600"/>
     <div class="p-4">
      <div class="flex text-xs text-gray-500 mb-2 space-x-4">
       <div class="flex items-center space-x-1">
        <i class="fas fa-user"></i>
        <span>By admin</span>
       </div>
       <div class="flex items-center space-x-1">
        <i class="fas fa-comments"></i>
        <span>Comments (05)</span>
       </div>
      </div>
      <h3 class="text-sm font-semibold text-purple-900 mb-1 leading-tight">
       Journeys of Discovery Uncovering Hidden Treasures
      </h3>
      <p class="text-xs text-gray-500 mb-4 leading-snug">
       “Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra .Aliquam eros justo, posuere lobortis viverra...”
      </p>
      <button class="bg-purple-900 text-white text-xs px-4 py-1 rounded-full" type="button">
       View
      </button>
     </div>
    </article>
    <article class="bg-white rounded-md shadow-sm overflow-hidden">
     <img alt="Placeholder image showing a scenic view for blog post 3" class="w-full h-40 object-cover" height="300" src="https://storage.googleapis.com/a1aa/image/5169ba6e-f71a-4dee-25ae-7ce3b879c748.jpg" width="600"/>
     <div class="p-4">
      <div class="flex text-xs text-gray-500 mb-2 space-x-4">
       <div class="flex items-center space-x-1">
        <i class="fas fa-user"></i>
        <span>By admin</span>
       </div>
       <div class="flex items-center space-x-1">
        <i class="fas fa-comments"></i>
        <span>Comments (05)</span>
       </div>
      </div>
      <h3 class="text-sm font-semibold text-purple-900 mb-1 leading-tight">
       Journeys of Discovery Uncovering Hidden Treasures
      </h3>
      <p class="text-xs text-gray-500 mb-4 leading-snug">
       “Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra .Aliquam eros justo, posuere lobortis viverra...”
      </p>
      <button class="bg-purple-900 text-white text-xs px-4 py-1 rounded-full" type="button">
       View
      </button>
     </div>
    </article>
   </div>
  </div>
  ` }} />
);

export default NextBlogsSection; 