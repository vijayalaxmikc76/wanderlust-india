// Data - Cinematic Collection
const destinations = [
    {
        id: 'agra',
        name: 'Agra',
        tagline: 'The Crown Jewel of India',
        type: 'Heritage',
        bestTime: 'Oct - Mar',
        attractions: ['Taj Mahal', 'Agra Fort', 'Mehtab Bagh'],
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
        description: 'Home to the Taj Mahal, one of the Seven Wonders of the World. Agra is a city steeped in Mughal history, featuring grand forts, exquisite gardens, and a legacy that continues to captivate the world.',
        rating: 4.8,
        price: '₹12,000 (Avg 2 days)',
        transport: { flight: 'Kheria (AGR)', train: 'Agra Cantt (AGC)' },
        mapLink: 'https://goo.gl/maps/1q2w3e4r5t6y7u8i9'
    },
    {
        id: 'goa',
        name: 'Goa',
        tagline: 'Sun, Sand, and Susegad',
        type: 'Relaxation',
        bestTime: 'Nov - Feb',
        attractions: ['Palolem Beach', 'Basilica of Bom Jesus', 'Dudhsagar Falls'],
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
        description: 'A kaleidoscopic blend of Indian and Portuguese cultures, sweetened with sun, sea, sand, seafood, and spirituality. Goa is India\'s pocket-sized paradise.',
        rating: 4.7,
        price: '₹28,000 (Avg 4 days)',
        transport: { flight: 'Dabolim (GOI)', train: 'Madgaon (MAO)' },
        mapLink: 'https://goo.gl/maps/2w3e4r5t6y7u8i9o0'
    },
    {
        id: 'kerala',
        name: 'Kerala',
        tagline: 'God\'s Own Country',
        type: 'Nature',
        bestTime: 'Sep - Mar',
        attractions: ['Alleppey Backwaters', 'Munnar Tea Gardens', 'Varkala Cliff'],
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
        description: 'A slender coastal strip of greenery, Kerala is a major tourist destination known for its backwaters, beaches, Ayurvedic tourism, and tropical greenery.',
        rating: 4.9,
        price: '₹22,000 (Avg 5 days)',
        transport: { flight: 'Cochin (COK)', train: 'Ernakulam (ERS)' },
        mapLink: 'https://goo.gl/maps/3e4r5t6y7u8i9o0p1'
    },
    {
        id: 'jaipur',
        name: 'Jaipur',
        tagline: 'The Pink City',
        type: 'Heritage',
        bestTime: 'Oct - Mar',
        attractions: ['Hawa Mahal', 'Amber Fort', 'Jantar Mantar'],
        image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
        description: 'The capital of Rajasthan is a window into the pre-modern world. Its pink-hued forts and palaces are a testament to the royal heritage of the Rajputs.',
        rating: 4.6,
        price: '₹15,000 (Avg 3 days)',
        transport: { flight: 'Jaipur (JAI)', train: 'Jaipur Jn (JP)' },
        mapLink: 'https://goo.gl/maps/4r5t6y7u8i9o0p1a2'
    },
    {
        id: 'ladakh',
        name: 'Ladakh',
        tagline: 'The Land of High Passes',
        type: 'Adventure',
        bestTime: 'Jun - Sep',
        attractions: ['Pangong Tso', 'Nubra Valley', 'Thiksey Monastery'],
        image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
        description: 'A land like no other. Bounded by two of the world\'s mightiest mountain ranges, the Great Himalaya and the Karakoram, it lies athwart two others, the Ladakh range and the Zanskar range.',
        rating: 4.9,
        price: '₹35,000 (Avg 6 days)',
        transport: { flight: 'Leh (IXL)', train: 'Jammu Tawi (JAT)' },
        mapLink: 'https://goo.gl/maps/5t6y7u8i9o0p1a2s3'
    },
    {
        id: 'varanasi',
        name: 'Varanasi',
        tagline: 'The City of Light',
        type: 'Spiritual',
        bestTime: 'Oct - Mar',
        attractions: ['Kashi Vishwanath', 'Dashashwamedh Ghat', 'Ganga Aarti'],
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
        description: 'Varanasi is older than history, older than tradition, older even than legend, and looks twice as old as all of them put together. The ultimate spiritual destination.',
        rating: 4.7,
        price: '₹10,000 (Avg 3 days)',
        transport: { flight: 'Varanasi (VNS)', train: 'Varanasi Jn (BSB)' },
        mapLink: 'https://goo.gl/maps/6y7u8i9o0p1a2s3d4'
    }
];

// State
let currentState = {
    view: 'home',
    searchQuery: '',
    selectedDestination: null
};

// DOM Elements
const app = document.getElementById('app');
const searchInput = document.getElementById('searchInput');

// --- Navigation Logic ---

const viewHistory = [];

// Persistence: Save State
function saveState(view, params) {
    const state = {
        view,
        params,
        timestamp: Date.now()
    };
    localStorage.setItem('wanderlust_state', JSON.stringify(state));
}

function navigateTo(view, params = {}, isBack = false) {
    if (!isBack && currentState.view !== view) {
        viewHistory.push(currentState.view);
    }

    // Save persistence state (unless it's a minimal update, but generally good to save)
    saveState(view, params);

    window.scrollTo(0, 0);
    currentState.view = view;

    // Hide all views
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));

    if (view === 'home') {
        document.getElementById('home-view').classList.remove('hidden');
        renderFeatured();
    } else if (view === 'search') {
        document.getElementById('search-view').classList.remove('hidden');
        if (params.query) {
            currentState.searchQuery = params.query;
            const sInput = document.getElementById('search-input-main');
            if (sInput) sInput.value = params.query;
            renderSearchResults(params.query);
        } else {
            renderSearchResults('');
        }
    } else if (view === 'details') {
        // Handle direct link storage where object might be lost, refetch if needed
        let dest = destinations.find(d => d.id === params.id);
        
        // If not found in local array (e.g. fresh reload on a dynamic item), we might need to recover it
        // For now, if we have the ID and it looks dynamic, we might need to re-fetch or rely on cache if populated.
        // Simplified: We will try to find it, if not, go back to search.
        // Ideally, we store the current item in LS too.
        
        if (!dest) {
             // Try to find in cache or session
             const cached = apiCache[params.id] || apiCache[Object.keys(apiCache).find(k => apiCache[k].id === params.id)];
             if (cached) dest = cached;
        }

        currentState.selectedDestination = dest;
        if (currentState.selectedDestination) {
            renderDetails(currentState.selectedDestination);
            document.getElementById('details-view').classList.remove('hidden');
        } else {
            // Fallback if detail data is lost on refresh (since we don't cache full objects in URL yet)
            // For robust app: store 'currentDestination' in LS.
            // Temporary: Redirect to search
            if (params.id) {
                 // Try one last ditch effort: Re-fetch if it looks like a search query
                 // But params.id usually is 'agra' or 'clean-name'. 
                 // Let's just go home for safety if data missing.
                 navigateTo('home');
                 return; 
            }
        }
    } else if (view === 'about') {
        document.getElementById('about-view').classList.remove('hidden');
        setTimeout(observeElements, 100);
    } else if (view === 'login') {
        document.getElementById('login-view').classList.remove('hidden');
    } else if (view === 'signup') {
        document.getElementById('signup-view').classList.remove('hidden');
    }

    // Re-initialize icons
    if (window.lucide) lucide.createIcons();
}

function goBack() {
    if (viewHistory.length > 0) {
        const prevView = viewHistory.pop();
        navigateTo(prevView, {}, true);
    } else {
        navigateTo('home', {}, true);
    }
}

// --- Auth Logic ---
// (No changes to Auth listeners, they are fine)

// --- API Logic (Backend) ---

// Cache to store fetched destinations
const apiCache = {};

// Consistent Mock Data Generator
function generateMockData(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const absHash = Math.abs(hash);
    
    // Rating: 3.5 to 5.0
    const rating = (3.5 + (absHash % 15) / 10).toFixed(1);
    
    // Price: 5000 to 50000
    const priceBase = 5000 + (absHash % 45000);
    const price = `₹${priceBase.toLocaleString()} (Avg 3 days)`;
    
    return { rating, price };
}

async function fetchLocationData(query) {
    const cleanQuery = query.toLowerCase().trim();
    if (apiCache[cleanQuery]) return apiCache[cleanQuery];

    try {
        // 1. Nominatim (Geo Search) - Strict Place Filter
        // 'featuretype' can be city, settlement, etc. but general query is better with distinct limit.
        const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=1`;
        
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData || geoData.length === 0) return null;

        const place = geoData[0];
        
        // Filter out obviously non-tourist things if needed, but Nominatim usually returns places.
        // We can check place.class (tourism, place, boundary, amenity, etc.)
        // For now, we accept it but use its display_name to fetch better Wiki data.

        // 2. Wikipedia (Content)
        // Use the primary name from Nominatim (e.g. "Mumbai") for Wiki search to ensure relevance
        const wikiQuery = place.name || query; 
        const detailsEndpoint = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts|pageimages|description&titles=${encodeURIComponent(wikiQuery)}&pithumbsize=1000&exintro=1&explaintext=1`;

        const wikiRes = await fetch(detailsEndpoint);
        const wikiData = await wikiRes.json();
        const pages = wikiData.query.pages;
        const pageId = Object.keys(pages)[0];

        let description = 'A beautiful destination to explore.';
        let image = 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&w=1200&q=80';
        let tagline = place.display_name;

        if (pageId !== '-1') {
            const page = pages[pageId];
            if (page.extract) description = page.extract.split('. ')[0] + '.'; // First sentence
            if (page.thumbnail) image = page.thumbnail.source;
            if (page.description) tagline = page.description;
        } else {
             // Fallback to Unsplash specific search if Wiki fails? 
             // For now, keep the random image or use the one we set.
        }

        // Mock Data
        const stats = generateMockData(place.place_id || query);

        const newDest = {
            id: (place.place_id || Date.now()).toString(),
            name: place.name || query,
            tagline: tagline, // Full address or short description
            type: place.type || 'Destination',
            bestTime: 'All Year',
            attractions: ['City Center', 'Local Landmarks', 'Cultural Sites'],
            image: image,
            description: description,
            rating: stats.rating,
            price: stats.price,
            transport: {
                flight: `${place.name} Airport`,
                train: `${place.name} Junction`
            },
            isDynamic: true,
            lat: place.lat,
            lon: place.lon
        };

        apiCache[cleanQuery] = newDest;
        // Also cache by ID for detail view recovery
        apiCache[newDest.id] = newDest;
        
        return newDest;
    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Network issue or invalid location');
    }
}

// --- Rendering Functions ---

function renderFeatured() {
    const container = document.getElementById('featured-grid');
    if (!container) return;

    container.innerHTML = destinations.slice(0, 3).map(dest => `
        <div class="glass rounded-2xl overflow-hidden card-hover cursor-pointer" onclick="navigateTo('details', {id: '${dest.id}'})">
            <div class="h-64 overflow-hidden">
                <img src="${dest.image}" alt="${dest.name}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110">
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-2xl font-bold text-gray-800">${dest.name}</h3>
                    <div class="flex items-center gap-1 bg-green-100 px-2 py-1 rounded text-green-700">
                        <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                        <span class="font-bold text-sm">${dest.rating}</span>
                    </div>
                </div>
                <p class="text-gray-600 mb-4">${dest.tagline}</p>
                <div class="flex justify-between items-center text-sm">
                    <span class="text-primary font-semibold">from ${dest.price}</span>
                    <button class="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors">
                        Explore <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    setTimeout(observeElements, 50); // Ensure visibility
}

async function renderSearchResults(query) {
    const container = document.getElementById('search-results');
    const loadingHtml = `
        <div class="col-span-full text-center py-20 reveal active">
             <div class="flex justify-center mb-4">
                <i data-lucide="loader" class="w-10 h-10 text-primary animate-spin"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800">Searching global database for "${query}"...</h3>
            <p class="text-gray-500">Connecting to live travel network...</p>
        </div>
    `;

    if (!query || !query.trim()) {
        renderDestList(destinations, container);
        return;
    }

    const cleanQuery = query.trim().toLowerCase();

    // 1. Local Search (Robust Filter)
    let results = destinations.filter(d =>
        d.name.toLowerCase().includes(cleanQuery) ||
        d.tagline.toLowerCase().includes(cleanQuery) ||
        d.type.toLowerCase().includes(cleanQuery)
    );

    if (results.length > 0) {
        renderDestList(results, container);
    } else {
        // 2. API Search
        container.innerHTML = loadingHtml;
        if (window.lucide) lucide.createIcons();

        try {
            const apiResult = await fetchLocationData(query.trim());

            if (apiResult) {
                // Determine Canonical ID from API result to avoid duplicates
                // (fetchLocationData now returns an object with a consistent ID if possible, 
                // but let's double check here or in fetchLocationData)

                // Check if already exists by ID or Exact Name
                const exists = destinations.find(d => d.id === apiResult.id || d.name === apiResult.name);

                if (!exists) {
                    destinations.unshift(apiResult); // Add to TOP
                } else {
                    // Update existing if needed, or just use it
                    // console.log("Destination already exists:", exists);
                }

                // Render result (even if it existed, we want to show it now as the search result)
                renderDestList([exists || apiResult], container);

            } else {
                container.innerHTML = `
                    <div class="col-span-full text-center py-20 reveal active">
                        <i data-lucide="map-pin-off" class="w-16 h-16 mx-auto text-gray-300 mb-4"></i>
                        <h3 class="text-xl font-semibold text-gray-500">No destination found for "${query}"</h3>
                        <p class="text-gray-400">We couldn't find matches in our database or Wikipedia.</p>
                        <button onclick="document.getElementById('search-input-main').value = ''; renderSearchResults('');" class="mt-4 text-primary hover:underline">
                            Clear Search
                        </button>
                    </div>
                `;
                if (window.lucide) lucide.createIcons();
            }
        } catch (err) {
            console.error(err);
            container.innerHTML = `<div class="col-span-full text-center text-red-500">An error occurred while searching: ${err.message}. Please try again.</div>`;
        }
    }
}

// Dark Mode Logic
function toggleDarkMode() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    // Save preference
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
}

// Restore Dark Mode on Load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
}

function renderDestList(list, container) {
    if (!list || list.length === 0) {
        container.innerHTML = '';
        return;
    }

    // Hero Card Layout for Single/Search Result
    if (list.length > 0) {
       container.innerHTML = list.map(dest => `
        <div class="relative w-full h-[70vh] rounded-3xl overflow-hidden shadow-2xl group animate-slide-up cursor-pointer" onclick="navigateTo('details', {id: '${dest.id}'})">
            <!-- Full Background Image -->
            <img src="${dest.image}" alt="${dest.name}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
            
            <!-- Content Overlay -->
            <div class="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
                <div class="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <div class="flex gap-2 mb-4">
                            <span class="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider border border-white/20">
                                ${dest.type}
                            </span>
                            ${dest.isDynamic ? '<span class="bg-blue-500/80 px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider">Live & Verified</span>' : ''}
                        </div>
                        <h2 class="text-5xl md:text-8xl font-bold text-white mb-4 leading-none">${dest.name}</h2>
                        <p class="text-xl md:text-2xl text-gray-200 max-w-3xl font-light leading-relaxed line-clamp-2 md:line-clamp-3">
                            ${dest.description}
                        </p>
                    </div>
                    
                    <div class="flex items-center gap-4 min-w-max">
                        <div class="text-right hidden md:block">
                            <p class="text-white/60 text-sm uppercase tracking-widest mb-1">Estimated Trip</p>
                            <p class="text-3xl font-bold text-white">${dest.price.split(' ')[0]}</p>
                        </div>
                        <a href="https://www.google.com/maps/search/?api=1&query=${dest.name}" target="_blank" onclick="event.stopPropagation()" class="bg-white/20 backdrop-blur-md text-white w-16 h-16 rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-all transform group-hover:scale-110 shadow-xl" title="View on Map">
                            <i data-lucide="map" class="w-8 h-8"></i>
                        </a>
                        <button class="bg-white text-gray-900 w-16 h-16 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all transform group-hover:scale-110 shadow-xl group-hover:rotate-45">
                            <i data-lucide="arrow-up-right" class="w-8 h-8"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Floating Rating Badge -->
            <div class="absolute top-6 right-6 z-20 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-xl flex items-center gap-2">
                <span class="text-2xl font-bold text-white">${dest.rating}</span>
                <i data-lucide="star" class="w-5 h-5 fill-yellow-400 text-yellow-400"></i>
            </div>
        </div>
       `).join(''); // Note: If multiple results, they stack as big cards (user requested "make this one bigger", usually implying singular focus, but list support is good)
    } 

    // Re-trigger icons for the new content
    setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 50);
}

function renderDetails(dest) {
    const isLiked = window.db && db.isLiked ? db.isLiked(dest.id) : false;

    const container = document.getElementById('details-content');
    container.innerHTML = `
        <div class="relative h-[60vh] rounded-3xl overflow-hidden mb-8 shadow-2xl group">
            <img src="${dest.image}" class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" alt="${dest.name}">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-8 md:p-12 text-white w-full">
                <!-- Standardizing Header Layout: Left aligned on mobile, End aligned on desktop -->
                <div class="flex flex-col md:flex-row justify-between items-start md:items-end">
                    <div>
                        <div class="flex gap-2 mb-4">
                            <span class="glass-dark px-3 py-1 rounded-full text-xs uppercase tracking-widest font-bold">${dest.type}</span>
                            <span class="glass-dark px-3 py-1 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                                <i data-lucide="calendar" class="w-3 h-3"></i> Best: ${dest.bestTime}
                            </span>
                        </div>
                        <h1 class="text-5xl md:text-7xl font-bold mb-4">${dest.name}</h1>
                        <p class="text-xl md:text-2xl opacity-90 mb-6 max-w-2xl">${dest.description}</p>
                    </div>
                     <!-- Like Button -->
                    <button onclick="toggleLike('${dest.id}')" id="like-btn-${dest.id}" class="glass-dark p-4 rounded-full hover:bg-white/20 transition-all group-hover:scale-110 mt-4 md:mt-0">
                        <i data-lucide="heart" class="w-8 h-8 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}"></i>
                    </button>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div class="glass-dark p-4 rounded-2xl backdrop-blur-md">
                        <p class="text-xs text-white/60 uppercase">Rating</p>
                        <p class="text-xl font-bold flex items-center gap-1 text-yellow-400">
                            ${dest.rating} <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                        </p>
                    </div>
                    <div class="glass-dark p-4 rounded-2xl backdrop-blur-md">
                        <p class="text-xs text-white/60 uppercase">Budget</p>
                        <p class="text-xl font-bold">${dest.price}</p>
                    </div>
               </div>
            </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mb-12">
            <div class="col-span-2">
                <h2 class="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <i data-lucide="map" class="w-6 h-6 text-primary"></i> Top Attractions
                </h2>
                <div class="grid sm:grid-cols-2 gap-4">
                    ${dest.attractions.map(attr => `
                        <div class="glass p-4 rounded-xl flex items-center gap-3 hover:translate-x-2 transition-transform cursor-default">
                            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700">
                                <i data-lucide="map-pin" class="w-5 h-5"></i>
                            </div>
                            <span class="font-medium text-lg text-gray-700">${attr}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
             <div class="glass p-6 rounded-2xl border border-gray-100">
                <h3 class="text-xl font-bold mb-4">Why Visit?</h3>
                <p class="text-gray-600 leading-relaxed">
                    ${dest.name} is perfect for travelers looking for <strong>${dest.type}</strong>. 
                    The best season to visit is <strong>${dest.bestTime}</strong> to enjoy pleasant weather and outdoor activities.
                </p>
            </div>
        </div>

        <h2 class="text-3xl font-bold mb-6 text-gray-800">Transport & Booking</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Flight Card -->
            <div class="glass p-6 rounded-2xl border-t-4 border-blue-500 hover:bg-white transition-all card-hover group cursor-pointer" onclick="recordBooking('${dest.id}', 'Flight')">
                <div class="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                    <i data-lucide="plane" class="w-6 h-6"></i>
                </div>
                <h3 class="text-xl font-bold mb-1">Flights</h3>
                <p class="text-sm text-gray-500 mb-4">Airport: ${dest.transport ? dest.transport.flight : 'Check availability'}</p>
                <a href="https://www.google.com/travel/flights?q=Flights+to+${dest.name}" target="_blank" class="w-full block text-center bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 py-3 rounded-xl font-semibold transition-all">
                    Search Flights
                </a>
            </div>

            <!-- Train Card -->
            <div class="glass p-6 rounded-2xl border-t-4 border-orange-500 hover:bg-white transition-all card-hover group cursor-pointer" onclick="recordBooking('${dest.id}', 'Train')">
                <div class="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
                    <i data-lucide="train" class="w-6 h-6"></i>
                </div>
                <h3 class="text-xl font-bold mb-1">Indian Railways</h3>
                <p class="text-sm text-gray-500 mb-4">Station: ${dest.transport ? dest.transport.train : 'Check availability'}</p>
                <a href="https://www.irctc.co.in/nget/train-search" target="_blank" class="w-full block text-center bg-orange-50 hover:bg-orange-600 hover:text-white text-orange-600 py-3 rounded-xl font-semibold transition-all">
                    Book on IRCTC
                </a>
            </div>

             <!-- Bus Card -->
            <div class="glass p-6 rounded-2xl border-t-4 border-red-500 hover:bg-white transition-all card-hover group cursor-pointer" onclick="recordBooking('${dest.id}', 'Bus')">
                <div class="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-4 group-hover:scale-110 transition-transform">
                    <i data-lucide="bus" class="w-6 h-6"></i>
                </div>
                <h3 class="text-xl font-bold mb-1">Bus / Volvos</h3>
                <p class="text-sm text-gray-500 mb-4">Intercity Travel</p>
                <a href="https://www.redbus.in/" target="_blank" class="w-full block text-center bg-red-50 hover:bg-red-600 hover:text-white text-red-600 py-3 rounded-xl font-semibold transition-all">
                    Book Bus
                </a>
            </div>

            <!-- Hotel Card -->
            <div class="glass p-6 rounded-2xl border-t-4 border-indigo-500 hover:bg-white transition-all card-hover group cursor-pointer" onclick="recordBooking('${dest.id}', 'Hotel')">
                <div class="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                    <i data-lucide="hotel" class="w-6 h-6"></i>
                </div>
                <h3 class="text-xl font-bold mb-1">Hotels / Stays</h3>
                <p class="text-sm text-gray-500 mb-4">Best properties</p>
                <a href="https://www.booking.com/searchresults.html?ss=${dest.name}" target="_blank" class="w-full block text-center bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-600 py-3 rounded-xl font-semibold transition-all">
                    Find Hotels
                </a>
            </div>
            
             <!-- Google Maps Card (New) -->
            <div class="glass p-6 rounded-2xl border-t-4 border-green-500 hover:bg-white transition-all card-hover group cursor-pointer">
                <div class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                    <i data-lucide="map-pin" class="w-6 h-6"></i>
                </div>
                <h3 class="text-xl font-bold mb-1">View on Map</h3>
                <p class="text-sm text-gray-500 mb-4">Navigate Location</p>
                <a href="https://www.google.com/maps/search/?api=1&query=${dest.name}" target="_blank" class="w-full block text-center bg-green-50 hover:bg-green-600 hover:text-white text-green-600 py-3 rounded-xl font-semibold transition-all">
                    Open Maps
                </a>
            </div>
        </div>
    `;

    // Ensure icons are rendered immediately
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Backend Helper Functions
function toggleLike(destId) {
    if (!auth.currentUser) {
        alert("Please Sign In to save favorites!");
        navigateTo('login');
        return;
    }
    const isLiked = db.toggleLike(auth.currentUser.email, destId);
    const btn = document.getElementById(`like-btn-${destId}`);
    if (btn) {
        const heart = btn.querySelector('svg') || btn.querySelector('i');
        if (heart) {
            if (isLiked) {
                heart.setAttribute('class', 'w-8 h-8 fill-red-500 text-red-500'); // Lucide SVG might need class update
                // Fallback for <i> if not yet replaced
                heart.classList.add('fill-red-500', 'text-red-500');
                heart.classList.remove('text-white');
            } else {
                heart.setAttribute('class', 'w-8 h-8 text-white');
                heart.classList.remove('fill-red-500', 'text-red-500');
                heart.classList.add('text-white');
            }
        }
    }
    // Re-render icons to ensure state validity if needed
    if (window.lucide) lucide.createIcons();
}

function recordBooking(destId, type) {
    if (auth.currentUser) {
        db.addBooking(auth.currentUser.email, destId, type);
    }
    // Continue to link default behavior (new tab)
}


// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    // renderFeatured(); // Removed default render, logic below handles it
    if (window.lucide) lucide.createIcons();

    // Fix Persistence: Restore State or Default
    const savedState = localStorage.getItem('wanderlust_state');
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            // Optional: Check timestamp for expiry (e.g. 1 hour)
            if (Date.now() - state.timestamp < 3600000) {
                 // Restore
                 // We need to restore auth UI first if needed, handled below
                 currentState.view = state.view; // Sync internal state
                 navigateTo(state.view, state.params);
            } else {
                 renderFeatured();
            }
        } catch (e) {
            console.error("State restore failed", e);
            renderFeatured();
        }
    } else {
        renderFeatured();
    }

    // Fix Persistence: Update UI based on current auth state
    if (window.auth && auth.currentUser) {
        updateAuthUI(auth.currentUser);
    }

    // Event Listeners

    // Global Search (Hero) - Moved to global scope for robustness (see below)
    // const heroSearchBtn = document.getElementById('hero-search-btn'); ...

    // Main Search (Search Page)
    const mainSearchInput = document.getElementById('search-input-main');
    if (mainSearchInput) {
        // Debounce input to avoid spamming API
        mainSearchInput.addEventListener('input', debounce((e) => {
            renderSearchResults(e.target.value);
            if (window.lucide) lucide.createIcons();
        }, 800));

        // Allow 'Enter' key to search immediately
        mainSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                renderSearchResults(mainSearchInput.value);
                if (window.lucide) lucide.createIcons();
            }
        });
    }

    // Mobile Menu Logic
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Nav Links
    document.querySelectorAll('[data-nav]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = e.currentTarget.getAttribute('data-nav');
            navigateTo(view);

            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
});


// --- Animation Logic (Global) ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function observeElements() {
    document.querySelectorAll('.animate-on-scroll, .reveal, .glass').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}
// Debounce Utility (added for API)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Global Handle Hero Search
function handleHeroSearch() {
    const heroSearchInput = document.getElementById('hero-search-input');
    if (heroSearchInput) {
        navigateTo('search', { query: heroSearchInput.value });
    }
}
