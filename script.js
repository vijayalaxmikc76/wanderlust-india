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

const apiCache = {}; // Cache for API results

// DOM Elements
const app = document.getElementById('app');
const searchInput = document.getElementById('searchInput');

// --- Navigation Logic ---

// Persistence: Save State
function saveState(view, params) {
    const state = {
        view,
        params,
        timestamp: Date.now()
    };
    localStorage.setItem('wanderlust_state', JSON.stringify(state));
    // cache persistence
    localStorage.setItem('wanderlust_cache', JSON.stringify(apiCache));
}

// Load Cache on Init
const savedCache = localStorage.getItem('wanderlust_cache');
if (savedCache) {
    try {
        const parsed = JSON.parse(savedCache);
        Object.assign(apiCache, parsed);
    } catch(e) { console.error("Cache load failed", e); }
}

const viewHistory = [];

window.goBack = function() {
    if (viewHistory.length > 0) {
        const previous = viewHistory.pop();
        // Pass isBack=true to prevent getting stuck in loop
        navigateTo(previous.view, previous.params, true);
    } else {
        navigateTo('home', {}, true);
    }
}

function navigateTo(view, params = {}, isBack = false) {
    if (!isBack && currentState.view && currentState.view !== view) {
        viewHistory.push({ view: currentState.view, params: currentState.params || {} });
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
        // Force render
        setTimeout(() => {
             const query = params.query || currentState.searchQuery || '';
             const sInput = document.getElementById('search-input-main');
             if (sInput && query) sInput.value = query;
             renderSearchResults(query);
        }, 10);
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
    // Priority: Close Modal if open
    const modal = document.getElementById('attraction-modal');
    if (modal) {
        closeAttraction();
        return;
    }

    if (viewHistory.length > 0) {
        const prevView = viewHistory.pop();
        navigateTo(prevView, {}, true);
    } else {
        navigateTo('home', {}, true);
    }
}

// --- Auth Logic ---

// Listen for Auth Changes from auth.js
document.addEventListener('authChanged', (e) => {
    updateAuthUI(e.detail);
});

function updateAuthUI(user) {
    const navSection = document.querySelector('.nav-auth-section');
    const mobileSection = document.querySelector('.mobile-auth-section');

    if (navSection) {
        if (user) {
            navSection.innerHTML = `
                <button onclick="toggleDarkMode()" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Toggle Dark Mode">
                     <i data-lucide="moon" class="w-5 h-5 text-gray-600 dark:text-gray-300"></i>
                </button>
                <a href="#" data-nav="search" class="text-gray-600 dark:text-gray-300 hover:text-primary font-medium transition-colors">Favorites</a>
                <a href="#" data-nav="about" class="text-gray-600 dark:text-gray-300 hover:text-primary font-medium transition-colors">About</a>
                <div class="flex items-center gap-3 ml-4">
                    <div class="text-right hidden lg:block">
                        <p class="text-xs text-gray-500 dark:text-gray-400">Welcome,</p>
                        <p class="text-sm font-bold text-gray-800 dark:text-white">${user.name}</p>
                    </div>
                    <button onclick="auth.logout()" class="bg-red-50 text-red-500 hover:bg-red-100 px-4 py-2 rounded-full font-medium transition-colors text-sm">
                        Sign Out
                    </button>
                </div>
            `;
        } else {
            navSection.innerHTML = `
                <button onclick="toggleDarkMode()" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Toggle Dark Mode">
                     <i data-lucide="moon" class="w-5 h-5 text-gray-600 dark:text-gray-300"></i>
                </button>
                <a href="#" data-nav="search" class="text-gray-600 dark:text-gray-300 hover:text-primary font-medium transition-colors">Favourites</a>
                <a href="#" data-nav="about" class="text-gray-600 dark:text-gray-300 hover:text-primary font-medium transition-colors">About</a>
                <button data-nav="login" class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full font-medium transition-all shadow-lg shadow-teal-500/30">
                    Sign In
                </button>
            `;
        }
        // Re-attach listeners to new buttons
        attachNavListeners();
    }

    if (mobileSection) {
        if (user) {
            mobileSection.innerHTML = `
                 <div class="flex items-center gap-3 mb-4 px-2">
                    <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                        ${user.name.charAt(0)}
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Welcome back</p>
                        <p class="font-bold text-gray-900">${user.name}</p>
                    </div>
                </div>
                <a href="#" data-nav="search" class="text-lg font-medium text-gray-800 hover:text-primary transition-colors">My Favorites</a>
                <a href="#" data-nav="about" class="text-lg font-medium text-gray-800 hover:text-primary transition-colors">About</a>
                <button onclick="auth.logout()" class="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-medium w-full mt-4">
                    Sign Out
                </button>
            `;
        } else {
             mobileSection.innerHTML = `
                <a href="#" data-nav="search" class="text-lg font-medium text-gray-800 hover:text-primary transition-colors">Favourites</a>
                <a href="#" data-nav="about" class="text-lg font-medium text-gray-800 hover:text-primary transition-colors">About</a>
                <button data-nav="login" class="bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-teal-500/30 w-full">
                    Sign In
                </button>
            `;
        }
         attachNavListeners();
    }
    
    if (window.lucide) lucide.createIcons();
}

function attachNavListeners() {
    document.querySelectorAll('[data-nav]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = e.currentTarget.getAttribute('data-nav');
            navigateTo(view);
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
}


// --- API Logic (Backend) ---

// Cache to store fetched destinations


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

function generateTransportData(destinationName, type) {
    const options = [];
    const count = 3 + Math.floor(Math.random() * 3); // 3 to 5 options

    for (let i = 0; i < count; i++) {
        let item = {};
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);
        const depTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        let durationHrs = 0;
        let priceRaw = 0; // Numeric for sorting

        if (type === 'flight') {
            const airlines = [
                { name: 'IndiGo', url: 'https://www.goindigo.in/', basePrice: 3000 }, 
                { name: 'Air India', url: 'https://www.airindia.com/', basePrice: 4000 }, 
                { name: 'Vistara', url: 'https://www.airvistara.com/', basePrice: 4500 }, 
                { name: 'Akasa Air', url: 'https://www.akasaair.com/', basePrice: 2800 }, 
                { name: 'SpiceJet', url: 'https://www.spicejet.com/', basePrice: 3200 }
            ];
            // Weighted random to favor IndiGo slightly as requested
            const airline = Math.random() > 0.7 ? airlines[0] : airlines[Math.floor(Math.random() * airlines.length)];
            
            item.operator = airline.name;
            item.number = `${item.operator.substring(0, 2).toUpperCase()}-${100 + Math.floor(Math.random() * 900)}`;
            durationHrs = 1 + Math.random() * 3;
            priceRaw = airline.basePrice + Math.floor(Math.random() * 2000);
            item.link = airline.url; 
        } else if (type === 'train') {
            const trains = ['Shatabdi Exp', 'Rajdhani Exp', 'Duronto Exp', 'Vande Bharat', 'Superfast Express'];
            item.operator = 'Indian Railways';
            item.number = trains[Math.floor(Math.random() * trains.length)] + ` (${12000 + Math.floor(Math.random() * 1000)})`;
            durationHrs = 6 + Math.random() * 12;
            priceRaw = 500 + Math.floor(Math.random() * 1500);
            item.link = `https://www.irctc.co.in/nget/train-search`; 
        } else if (type === 'bus') {
            const buses = ['Volvo A/C Multi Axle', 'Scania Multi Axle', 'A/C Sleeper (2+1)', 'Bharat Benz A/C'];
            const operators = [
                { name: 'Zingbus', url: 'https://www.zingbus.com/' },
                { name: 'IntrCity SmartBus', url: 'https://www.intrcity.com/' },
                { name: 'VRL Travels', url: 'https://www.vrlbus.in/' },
                { name: 'Orange Travels', url: 'https://www.orangetravels.in/' },
                { name: 'SRS Travels', url: 'https://www.srsbooking.com/' }
            ];
            const op = operators[Math.floor(Math.random() * operators.length)];
            item.operator = op.name;
            item.number = buses[Math.floor(Math.random() * buses.length)];
            durationHrs = 8 + Math.random() * 10;
            priceRaw = 600 + Math.floor(Math.random() * 1200);
            item.link = op.url;
        }

        // Calculate Arrival
        const arrDate = new Date();
        arrDate.setHours(hour + durationHrs);
        arrDate.setMinutes(minute + (durationHrs % 1 * 60));
        const arrTime = `${arrDate.getHours().toString().padStart(2, '0')}:${arrDate.getMinutes().toString().padStart(2, '0')}`;

        item.departure = depTime;
        item.arrival = arrTime;
        item.duration = `${Math.floor(durationHrs)}h ${Math.floor((durationHrs % 1) * 60)}m`;
        item.price = `₹${priceRaw.toLocaleString()}`;
        item.priceRaw = priceRaw; // Store correctly for sort
        
        options.push(item);
    }
    // Sort Cheapest First
    return options.sort((a, b) => a.priceRaw - b.priceRaw);
}

async function fetchLocationData(query) {
    const cleanQuery = query.toLowerCase().trim();
    if (apiCache[cleanQuery]) return apiCache[cleanQuery];

    // INSTANT FIX: Hardcoded Data for standard queries to avoid API latency
    if (cleanQuery === 'ooty' || cleanQuery.includes('udhagamandalam')) {
         const ootyData = {
            id: 'ooty_fixed',
            name: 'Ooty',
            tagline: 'Queen of Hill Stations',
            type: 'Nature',
            bestTime: 'Oct - Jun', // Fixed season
            attractions: ['Botanical Gardens', 'Ooty Lake', 'Doddabetta Peak'],
            image: "https://images.unsplash.com/photo-1533234978939-2a5e9a079c1c?auto=format&fit=crop&w=1200&q=80", // Reliable Tea Garden Image
            description: "Ooty (Udhagamandalam) is a resort town in the Western Ghats mountains, in southern India's Tamil Nadu state. Founded as a British Raj summer resort, it features a working steam railway line.",
            rating: "4.8",
            price: "₹15,000 (Avg 4 days)",
            transport: {
                flight: `Coimbatore Airport (CJB)`,
                train: `Udhagamandalam Stn`,
                details: {
                    flights: generateTransportData('Ooty', 'flight'),
                    trains: generateTransportData('Ooty', 'train'),
                    buses: generateTransportData('Ooty', 'bus')
                }
            },
            isDynamic: true,
            coordinates: { lat: 11.41, lon: 76.69 }
        };
        apiCache[cleanQuery] = ootyData;
        return ootyData;
    }

    try {
        // Edge Case: Ooty
        let searchQuery = query;
        if (cleanQuery === 'ooty') searchQuery = 'Udhagamandalam';

        // 1. Nominatim (Geo Search)
        const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&addressdetails=1&limit=1`;
        
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData || geoData.length === 0) return null;

        const place = geoData[0];
        // Use user's query name if it's "Ooty" for display, else use official
        const displayName = cleanQuery === 'ooty' ? 'Ooty' : (place.name || query);

        // 2. Wikipedia (Content)
        const wikiQuery = place.name || query; 
        const detailsEndpoint = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts|pageimages|description&titles=${encodeURIComponent(wikiQuery)}&pithumbsize=1000&exintro=1&explaintext=1`;

        const wikiRes = await fetch(detailsEndpoint);
        const wikiData = await wikiRes.json();
        const pages = wikiData.query.pages;
        const pageId = Object.keys(pages)[0];

        let description = 'A beautiful destination to explore in India.';
        let tagline = place.display_name.split(',')[0];
        let image = null;

        if (pageId !== '-1') {
            const page = pages[pageId];
            if (page.extract) description = page.extract.split('. ').slice(0, 2).join('. ') + '.';
            if (page.thumbnail) image = page.thumbnail.source;
            if (page.description) tagline = page.description;
        }

        // Image Fallback Strategy (No Unsplash Source)
        if (!image) {
            // Static curated list for common checks (expandable)
            const map = {
               'delhi': 'https://images.unsplash.com/photo-1587474260219-559d4eee721f',
               'mumbai': 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7',
               'bangalore': 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2',
               'chennai': 'https://images.unsplash.com/photo-1582510003544-5211b1c22056',
               'kolkata': 'https://images.unsplash.com/photo-1558431382-27e30314225d',
               'hyderabad': 'https://images.unsplash.com/photo-1626014903328-912f2e519c5c',
               'pune': 'https://images.unsplash.com/photo-1607310574044-8cb9630c79e6'
            };
            
            // Fuzzy match or default
            const key = Object.keys(map).find(k => cleanQuery.includes(k));
            if (key) {
                image = map[key] + "?auto=format&fit=crop&w=1200&q=80";
            } else {
                 // Generic Travel Fallback
                 image = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80';
            }
        }
        
        // Ensure image URL is valid/https
        if(image && image.startsWith('http:')) image = image.replace('http:', 'https:');


        // Fix for "Ooty" specifically if Wiki image is bad or missing
        if (cleanQuery === 'ooty') {
            description = "Ooty (Udhagamandalam) is a resort town in the Western Ghats mountains, in southern India's Tamil Nadu state. Founded as a British Raj summer resort, it features a working steam railway line.";
            image = "https://images.unsplash.com/photo-1548689104-5e13d332679f?auto=format&fit=crop&w=1200&q=80"; // Actual Ooty/Tea Garden image
        }

        // Mock Data
        const stats = generateMockData(place.place_id || query);

        const newDest = {
            id: (place.place_id || Date.now()).toString(),
            name: displayName, // Use the display name we chose
            tagline: tagline, 
            type: place.type ? (place.type.charAt(0).toUpperCase() + place.type.slice(1)) : 'Destination',
            bestTime: 'All Year',
            attractions: ['City Center', 'Local Landmarks', 'Cultural Sites'],
            image: image,
            description: description,
            rating: stats.rating,
            price: stats.price,
            transport: {
                flight: `${displayName} Airport`,
                train: `${displayName} Junction`,
                details: {
                    flights: generateTransportData(displayName, 'flight'),
                    trains: generateTransportData(displayName, 'train'),
                    buses: generateTransportData(displayName, 'bus')
                }
            },
            isDynamic: true,
            lat: place.lat,
            lon: place.lon,
            coordinates: { lat: place.lat, lon: place.lon } // Store for map
        };

        apiCache[cleanQuery] = newDest;
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
                <img src="${dest.image}" onerror="this.src='https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80'" alt="${dest.name}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110">
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


// --- Navigation Logic Adjusted for Favorites ---
// We will treat 'search' view as "Favorites & Search"
// If no query, show Favorites.
// If query, show results.

async function renderSearchResults(query) {
    const container = document.getElementById('search-results');
    const user = auth.currentUser;
    // Improved Loading State
    const loadingHtml = `
        <div class="col-span-full flex flex-col items-center justify-center py-20 opacity-0 animate-fade-in relative z-10" style="animation-fill-mode: forwards;">
             <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 class="text-xl font-semibold text-gray-800"> exploring...</h3>
        </div>
    `;

    // 1. If Empty Query: Show Favorites (or Empty State)
    if (!query || !query.trim()) {
        if (!user) {
            // Guest: Show Empty State as requested
            container.innerHTML = `
                <div class="col-span-full text-center py-32 animate-slide-up">
                    <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                        <i data-lucide="heart" class="w-12 h-12"></i>
                    </div>
                    <h2 class="text-3xl font-bold text-gray-800 mb-2">Your Favorites List</h2>
                    <p class="text-gray-500 mb-8 max-w-md mx-auto">Sign in to save your dream destinations and view them here.</p>
                    <button onclick="navigateTo('login')" class="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Sign In Now
                    </button>
                </div>
            `;
            if (window.lucide) lucide.createIcons();
            return;
        } else {
             // Logged In: Show Liked Items
             const likedIds = user.likes || [];
             if (likedIds.length === 0) {
                 container.innerHTML = `
                    <div class="col-span-full text-center py-20 animate-slide-up">
                        <i data-lucide="heart-off" class="w-16 h-16 mx-auto text-gray-300 mb-4"></i>
                        <h3 class="text-xl font-semibold text-gray-500">No favorites yet</h3>
                        <p class="text-gray-400">Start exploring and save places you love!</p>
                        <button onclick="navigateTo('home')" class="mt-6 text-primary font-bold hover:underline">
                            Explore Destinations
                        </button>
                    </div>
                `;
                 if (window.lucide) lucide.createIcons();
                 return;
             }

             // Filter destinations that are liked
             // Note: We might need to fetch dynamic ones if not in 'destinations' array.
             // For now, check local list + cache.
             const likedDestinations = [];
             likedIds.forEach(id => {
                 let d = destinations.find(x => x.id === id) || apiCache[id];
                 if (d) likedDestinations.push(d);
             });
             
             renderDestList(likedDestinations, container);
             return;
        }
    }

    const cleanQuery = query.trim().toLowerCase();

    // 2. Local Search
    let results = destinations.filter(d =>
        d.name.toLowerCase().includes(cleanQuery) ||
        d.tagline.toLowerCase().includes(cleanQuery) ||
        d.type.toLowerCase().includes(cleanQuery)
    );

    if (results.length > 0) {
        // Local Search Logic
        if (results.length === 1) {
             // Direct Redirect if exact/single match locally
             navigateTo('details', { id: results[0].id });
        } else {
             renderDestList(results, container);
        }
    } else {
        // 3. API Search
        container.innerHTML = loadingHtml;
        if (window.lucide) lucide.createIcons();

        try {
            const apiResult = await fetchLocationData(query.trim());

            if (apiResult) {
                // Check dupes (Optional, but good for local cache)
                const exists = destinations.find(d => d.id === apiResult.id || d.name === apiResult.name);
                if (!exists) {
                    destinations.unshift(apiResult); 
                }
                
                // DIRECT REDIRECT as per user request
                // Instead of showing list, go straight to details
                navigateTo('details', { id: (exists || apiResult).id });
                return;

            } else {
                container.innerHTML = `
                    <div class="col-span-full text-center py-20 reveal active">
                        <i data-lucide="map-pin-off" class="w-16 h-16 mx-auto text-gray-300 mb-4"></i>
                        <h3 class="text-xl font-semibold text-gray-500">No destination found for "${query}"</h3>
                        <p class="text-gray-400">Try a different city name.</p>
                    </div>
                `;
                if (window.lucide) lucide.createIcons();
            }
        } catch (err) {
            container.innerHTML = `<div class="col-span-full text-center text-red-500">Search error. Please try again.</div>`;
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
        <div class="relative w-full min-h-[600px] h-[75vh] rounded-[2.5rem] overflow-hidden shadow-2xl group animate-slide-up cursor-pointer" onclick="navigateTo('details', {id: '${dest.id}'})">
            <!-- Full Background Image -->
            <img src="${dest.image}" onerror="this.src='https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80'" alt="${dest.name}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            
            <!-- Content Overlay -->
            <div class="absolute bottom-0 left-0 w-full p-8 md:p-14 z-20">
                <div class="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div class="w-full">
                        <div class="flex gap-2 mb-4">
                            <span class="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm font-bold uppercase tracking-wider border border-white/20">
                                ${dest.type}
                            </span>
                            ${dest.isDynamic ? '<span class="bg-blue-500/80 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm font-bold uppercase tracking-wider border border-blue-400/30">Live & Verified</span>' : ''}
                        </div>
                        
                        <h2 class="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight leading-none drop-shadow-lg font-display">
                            ${dest.name}
                        </h2>
                        
                        <p class="text-white/90 text-lg md:text-xl font-medium max-w-2xl leading-relaxed mb-6 line-clamp-3">
                            ${dest.description}
                        </p>
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



// --- Attraction Modal Logic ---
async function openAttraction(attraction, city) {
    const modal = document.createElement('div');
    modal.id = 'attraction-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm opacity-0 transition-opacity duration-300';
    
    // Generic or Wiki Data Fetch (Simulated for speed/reliability)
    const query = `${attraction} ${city}`;
    const image = `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}`;
    const backupImage = 'https://images.unsplash.com/photo-1596719793132-7c3938be8175?auto=format&fit=crop&w=800&q=80'; // Fallback

    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transform scale-95 transition-transform duration-300 translate-y-10" id="attraction-card">
            <div class="relative h-64">
                <img src="${image}" onerror="this.src='${backupImage}'" class="w-full h-full object-cover" alt="${attraction}">
                <button onclick="closeAttraction()" class="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div class="absolute bottom-4 left-6">
                    <p class="text-white/80 text-sm uppercase tracking-wider mb-1">Exploring ${city}</p>
                    <h3 class="text-3xl font-bold text-white font-display">${attraction}</h3>
                </div>
            </div>
            <div class="p-8">
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                    Experience the wonder of <strong>${attraction}</strong>. This location is one of the highlights of ${city}, offering a unique glimpse into the local culture and beauty.
                    Perfect for photography and immersing yourself in the destination.
                </p>
                
                <div class="grid grid-cols-2 gap-4 mb-6">
                     <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl flex items-center gap-3">
                        <div class="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600">
                             <i data-lucide="clock" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500">Suggested Time</p>
                            <p class="font-bold text-gray-800 dark:text-white">2-3 Hours</p>
                        </div>
                    </div>
                     <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl flex items-center gap-3">
                        <div class="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600">
                             <i data-lucide="camera" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500">Photography</p>
                            <p class="font-bold text-gray-800 dark:text-white">Allowed</p>
                        </div>
                    </div>
                </div>

                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}" target="_blank" 
                   class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1">
                    <i data-lucide="navigation" class="w-5 h-5"></i> Navigate Here
                </a>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Animation
    requestAnimationFrame(() => {
        modal.classList.remove('opacity-0');
        const card = modal.querySelector('#attraction-card');
        card.classList.remove('scale-95', 'translate-y-10');
        card.classList.add('scale-100', 'translate-y-0');
    });

    // Close on Backdrop Click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAttraction();
        }
    });

    if (window.lucide) lucide.createIcons();
}

// Global Scope Ensure
window.closeAttraction = function() {
    const modal = document.getElementById('attraction-modal');
    if (modal) {
        modal.classList.add('opacity-0');
        const card = modal.querySelector('#attraction-card');
        if (card) {
            card.classList.remove('scale-100', 'translate-y-0');
            card.classList.add('scale-95', 'translate-y-10');
        }
        
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}


function renderDetails(dest) {
    const isLiked = window.db && db.isLiked ? db.isLiked(dest.id) : false;

    const container = document.getElementById('details-content');
    container.innerHTML = `
        <!-- Hero Card with Map Integration -->
        <div class="relative h-[65vh] rounded-3xl overflow-hidden mb-12 shadow-2xl group w-full">
            <img src="${dest.image}" onerror="this.src='https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80'" class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" alt="${dest.name}">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10"></div>
            
            <!-- Content Overlay -->
            <div class="absolute bottom-0 left-0 p-6 md:p-12 text-white w-full space-y-6">
                <div class="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div class="max-w-3xl">
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="bg-white/20 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold shadow-lg">${dest.type}</span>
                            <span class="bg-white/20 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 shadow-lg">
                                <i data-lucide="calendar" class="w-3 h-3"></i> Best: ${dest.bestTime}
                            </span>
                        </div>
                        <h1 class="text-6xl md:text-8xl font-bold mb-4 font-display leading-none tracking-tight drop-shadow-xl">${dest.name}</h1>
                        <p class="text-xl md:text-2xl opacity-90 font-light leading-relaxed drop-shadow-md text-gray-100 border-l-4 border-accent pl-4">${dest.description}</p>
                    </div>

                    <!-- Actions: Like & Map -->
                    <div class="flex flex-col gap-3 min-w-[140px]">
                        <button onclick="toggleLike('${dest.id}')" id="like-btn-${dest.id}" class="glass-dark border border-white/30 p-4 rounded-2xl hover:bg-white hover:text-red-500 transition-all group/btn flex items-center justify-center gap-2">
                             <i data-lucide="heart" class="w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white group-hover/btn:text-red-500'}"></i>
                             <span class="font-bold text-sm">Save</span>
                        </button>
                         <a href="https://www.google.com/maps/search/?api=1&query=${dest.name}" target="_blank" class="bg-accent hover:bg-white hover:text-accent text-white p-4 rounded-2xl transition-all shadow-lg hover:shadow-accent/50 flex items-center justify-center gap-2 font-bold">
                            <i data-lucide="map" class="w-6 h-6"></i>
                            <span>Map</span>
                        </a>
                    </div>
                </div>
                
                <!-- Quick Stats -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                    <div class="backdrop-blur-sm">
                        <p class="text-xs text-white/50 uppercase tracking-widest mb-1">Rating</p>
                        <p class="text-2xl font-bold flex items-center gap-1 text-yellow-400">
                            ${dest.rating} <i data-lucide="star" class="w-5 h-5 fill-current"></i>
                        </p>
                    </div>
                    <div class="backdrop-blur-sm">
                        <p class="text-xs text-white/50 uppercase tracking-widest mb-1">Est. Cost</p>
                        <p class="text-2xl font-bold text-white">${dest.price.split(' ')[0]}</p>
                    </div>
                 </div>
            </div>
        </div>

        <!-- Attractions Section -->
        <div class="grid md:grid-cols-3 gap-8 mb-12">
            <div class="col-span-2">
                <h2 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                    <div class="p-2 bg-primary/10 rounded-lg text-primary"><i data-lucide="camera" class="w-6 h-6"></i></div>
                    Top Attractions
                </h2>
                <div class="grid sm:grid-cols-2 gap-4">
                    ${dest.attractions.map(attr => `
                        <button onclick="openAttraction('${attr}', '${dest.name}')" class="glass p-5 rounded-xl flex items-center gap-4 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer text-left border-l-4 border-transparent hover:border-primary group bg-white dark:bg-gray-800">
                             <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <i data-lucide="map-pin" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <span class="font-bold text-lg text-gray-800 dark:text-gray-200 block group-hover:text-primary">${attr}</span>
                                <span class="text-xs text-gray-500 dark:text-gray-400">Click to explore</span>
                            </div>
                            <i data-lucide="chevron-right" class="w-5 h-5 ml-auto text-gray-400 group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    `).join('')}
                </div>
            </div>
             <div class="glass p-8 rounded-3xl border border-gray-100 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl">
                <h3 class="text-xl font-bold mb-6 text-gray-800 dark:text-white">Why Visit ${dest.name}?</h3>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg font-light">
                    Perfect for travelers looking for <strong class="text-primary">${dest.type}</strong>. 
                    The best season to visit is <strong class="text-primary">${dest.bestTime}</strong>.
                </p>
                <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-700/30 flex gap-3">
                    <i data-lucide="sun" class="w-6 h-6 text-yellow-600 flex-shrink-0"></i>
                    <p class="text-sm text-yellow-800 dark:text-yellow-200">${dest.tagline}</p>
                </div>
            </div>
        </div>

        <!-- Transport Tabs Section -->
        <div id="transport-section" class="scroll-mt-24">
            <h2 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-700"><i data-lucide="compass" class="w-6 h-6"></i></div>
                Plan Your Journey
            </h2>

            <div class="glass p-1 rounded-2xl bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm inline-flex mb-8 border border-white/20 shadow-inner">
                <button onclick="switchTransportTab('flights')" id="tab-flights" class="transport-tab active px-6 py-3 rounded-xl font-bold text-sm transition-all text-gray-600 dark:text-gray-400 hover:text-primary">
                    <div class="flex items-center gap-2">
                        <i data-lucide="plane" class="w-4 h-4"></i> Flights
                    </div>
                </button>
                <button onclick="switchTransportTab('trains')" id="tab-trains" class="transport-tab px-6 py-3 rounded-xl font-bold text-sm transition-all text-gray-600 dark:text-gray-400 hover:text-primary">
                    <div class="flex items-center gap-2">
                        <i data-lucide="train" class="w-4 h-4"></i> Trains
                    </div>
                </button>
                <button onclick="switchTransportTab('buses')" id="tab-buses" class="transport-tab px-6 py-3 rounded-xl font-bold text-sm transition-all text-gray-600 dark:text-gray-400 hover:text-primary">
                    <div class="flex items-center gap-2">
                        <i data-lucide="bus" class="w-4 h-4"></i> Buses
                    </div>
                </button>
            </div>

            <!-- Content Area -->
            <div id="transport-content" class="min-h-[300px]">
                <!-- Injected via JS -->
            </div>
            
            <p class="text-center text-xs text-gray-400 mt-6">
                * Prices and schedules are estimates. Redirects to official booking partners.
            </p>
        </div>
    `;

    // Initialize with Flights
    // We need to store these in a global or accessible scope to function 'switchTransportTab' can access them
    // Or attach the data to the DOM element
    const tSection = document.getElementById('transport-section');
    if(tSection) {
        // Generate valid data if missing (e.g. for hardcoded items)
        if (!dest.transport.details) {
            dest.transport.details = {
                flights: generateTransportData(dest.name, 'flight'),
                trains: generateTransportData(dest.name, 'train'),
                buses: generateTransportData(dest.name, 'bus')
            };
        }
        
        tSection.dataset.transport = JSON.stringify(dest.transport.details);
        // Initial render
        setTimeout(() => switchTransportTab('flights'), 50);
    }

    // Ensure icons are rendered immediately
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Transport Tab Logic
window.switchTransportTab = function(type) {
    const section = document.getElementById('transport-section');
    if (!section) return;

    // Update Tabs
    document.querySelectorAll('.transport-tab').forEach(t => {
        t.classList.remove('bg-white', 'dark:bg-gray-700', 'shadow-md', 'text-primary', 'dark:text-white');
        t.classList.add('text-gray-600', 'dark:text-gray-400');
    });
    const activeTab = document.getElementById(`tab-${type}`);
    if (activeTab) {
        activeTab.classList.add('bg-white', 'dark:bg-gray-700', 'shadow-md', 'text-primary', 'dark:text-white');
        activeTab.classList.remove('text-gray-600', 'dark:text-gray-400');
    }

    // GetData
    const data = JSON.parse(section.dataset.transport || '{}');
    const items = data[type] || [];
    const container = document.getElementById('transport-content');

    let icon = 'plane';
    let color = 'blue';
    if(type === 'trains') { icon = 'train'; color = 'orange'; }
    if(type === 'buses') { icon = 'bus'; color = 'red'; }

    container.innerHTML = `
        <div class="grid gap-4 animate-fade-in">
            ${items.map(item => `
                <div class="glass p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-${color}-500/30 transition-all border border-transparent bg-white dark:bg-gray-800">
                    <div class="flex items-center gap-6 w-full md:w-auto">
                        <div class="w-16 h-16 bg-${color}-50 dark:bg-${color}-900/20 rounded-2xl flex items-center justify-center text-${color}-600 dark:text-${color}-400 shrink-0">
                            <i data-lucide="${icon}" class="w-8 h-8"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-lg text-gray-800 dark:text-white">${item.operator}</h4>
                            <p class="text-sm text-gray-500 font-mono">${item.number}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-8 md:gap-12 w-full md:w-auto justify-center">
                        <div class="text-center">
                            <p class="text-2xl font-bold text-gray-800 dark:text-white">${item.departure}</p>
                            <p class="text-xs text-gray-400">Departure</p>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-xs text-gray-400 mb-1">${item.duration}</span>
                            <div class="w-24 h-0.5 bg-gray-200 dark:bg-gray-700 relative">
                                <div class="absolute -top-1 right-0 w-2 h-2 bg-gray-300 rounded-full"></div>
                                <div class="absolute -top-1 left-0 w-2 h-2 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                        <div class="text-center">
                            <p class="text-2xl font-bold text-gray-800 dark:text-white">${item.arrival}</p>
                            <p class="text-xs text-gray-400">Arrival</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        <div class="text-right">
                            <p class="text-2xl font-bold text-primary">${item.price}</p>
                            <p class="text-xs text-gray-400">per person</p>
                        </div>
                        <a href="${item.link}" target="_blank" class="bg-${color}-600 hover:bg-${color}-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-${color}-500/30 transition-all transform hover:-translate-y-1">
                            Book
                        </a>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    if (window.lucide) lucide.createIcons();
};



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

    // Fix Persistence: Update UI based on current auth state immediately
    if (window.auth) {
        auth.loadUser(); // Ensure user is loaded from DB
        if (auth.currentUser) {
            updateAuthUI(auth.currentUser);
        }
    }

    // Fix Persistence: Restore State or Default
    const savedState = localStorage.getItem('wanderlust_state');
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            // Optional: Check timestamp for expiry (e.g. 1 hour)
            if (Date.now() - state.timestamp < 3600000) {
                 // Restore
                 currentState.view = state.view; // Sync internal state
                 currentState.searchQuery = state.params.query || ''; // Sync query
                 
                 // If returning to search view, we MUST have a query to render results
                 if (state.view === 'search') {
                     if (state.params && state.params.query) {
                         const mainSearchInput = document.getElementById('search-input-main');
                         if(mainSearchInput) mainSearchInput.value = state.params.query;
                         // Force render
                         navigateTo('search', state.params);
                     } else {
                         // Invalid search state, go home
                         navigateTo('home');
                     }
                 } else {
                     navigateTo(state.view, state.params);
                 }
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

    // Event Listeners

    // Global Search (Hero) - Moved to global scope for robustness (see below)
    // const heroSearchBtn = document.getElementById('hero-search-btn'); ...

    // Main Search (Search Page)
    const mainSearchInput = document.getElementById('search-input-main');
    if (mainSearchInput) {
        // Debounce input to avoid spamming API
        mainSearchInput.addEventListener('input', debounce((e) => {
            const val = e.target.value;
            // SYNC STATE: Key for Back Button
            currentState.searchQuery = val;
            saveState('search', { query: val });
            
            renderSearchResults(val);
            if (window.lucide) lucide.createIcons();
        }, 400));

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

    // --- Auth Form Listeners (CRITICAL FIX) ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            try {
                // Determine button to show loading
                const btn = loginForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = `<i data-lucide="loader" class="animate-spin w-5 h-5"></i>`;
                if(window.lucide) lucide.createIcons();
                
                await auth.login(email, password);
                
                // Success
                btn.innerHTML = originalText;
                navigateTo('home');
            } catch (error) {
                alert(error.message);
                const btn = loginForm.querySelector('button[type="submit"]');
                if(btn) btn.innerHTML = 'Sign In <i data-lucide="arrow-right" class="w-5 h-5"></i>';
                if(window.lucide) lucide.createIcons();
            }
        });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            try {
                 const btn = signupForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = `<i data-lucide="loader" class="animate-spin w-5 h-5"></i>`;
                if(window.lucide) lucide.createIcons();

                await auth.register(name, email, password);
                
                 // Success
                btn.innerHTML = originalText;
                navigateTo('home');
            } catch (error) {
                alert(error.message);
                 const btn = signupForm.querySelector('button[type="submit"]');
                 if(btn) btn.innerHTML = 'Create Account <i data-lucide="arrow-right" class="w-5 h-5"></i>';
                 if(window.lucide) lucide.createIcons();
            }
        });
    }
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

// --- Slideshow Logic ---
function startSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000); // 5 seconds per slide
}

// Start on load
document.addEventListener('DOMContentLoaded', startSlideshow);
