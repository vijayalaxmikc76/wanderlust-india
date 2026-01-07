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

// Simple History Stack
const viewHistory = [];

function navigateTo(view, params = {}, isBack = false) {
    if (!isBack && currentState.view !== view) {
        viewHistory.push(currentState.view);
    }

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
        currentState.selectedDestination = destinations.find(d => d.id === params.id);
        if (currentState.selectedDestination) {
            renderDetails(currentState.selectedDestination);
            document.getElementById('details-view').classList.remove('hidden');
        }
    } else if (view === 'about') {
        document.getElementById('about-view').classList.remove('hidden');
        // Trigger animations
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
        // If previous view was details, we might need params, but for now simple view switch is okay 
        // as details usually comes FROM somewhere specific. 
        // If popping back TO details, we might miss the ID. 
        // For simple structure: Home/Search <-> Details. 
        // If back to search, it remembers state? Yes HTML is just hidden.
        navigateTo(prevView, {}, true);
    } else {
        navigateTo('home', {}, true);
    }
}

// --- Auth Logic ---

// Login Handler
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Loading State
    btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Signing In...`;
    if (window.lucide) lucide.createIcons();

    // Simulate Network Delay for realism
    setTimeout(() => {
        const result = auth.login(email, password);

        if (result.success) {
            alert(result.message);
            navigateTo('home');
        } else {
            alert(result.message);
        }
        btn.innerHTML = originalText;
    }, 1000);
});

// Signup Handler
document.getElementById('signup-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Loading State
    btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Creating Account...`;
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
        const result = auth.register(name, email, password);

        if (result.success) {
            alert(result.message);
            navigateTo('home');
        } else {
            alert(result.message);
        }
        btn.innerHTML = originalText;
    }, 1000);
});

// Auth State Observer
document.addEventListener('authChanged', (e) => {
    const user = e.detail;
    updateAuthUI(user);
});

function updateAuthUI(user) {
    const navAuth = document.querySelector('.nav-auth-section');
    const mobileAuth = document.querySelector('.mobile-auth-section');

    if (!navAuth) return;

    if (user) {
        // Logged In State
        const userHtml = `
             <a href="#" data-nav="search" class="text-gray-600 hover:text-primary font-medium transition-colors">Destinations</a>
            <div class="relative group">
                 <button class="flex items-center gap-2 text-gray-800 font-bold hover:text-primary transition-colors">
                    <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <i data-lucide="user" class="w-4 h-4"></i>
                    </div>
                    Hi, ${user.name.split(' ')[0]}
                </button>
                 <div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 hidden group-hover:block p-2">
                    <button onclick="auth.logout()" class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
                        Sign Out
                    </button>
                </div>
            </div>
        `;
        navAuth.innerHTML = userHtml;

        // Mobile update (Simplified)
        if (mobileAuth) {
            mobileAuth.innerHTML = `
                <div class="px-4 py-2 mb-4 bg-primary/10 rounded-xl">
                    <p class="text-sm text-gray-500">Signed in as</p>
                    <p class="font-bold text-primary text-lg">${user.name}</p>
                </div>
                <a href="#" data-nav="search" class="text-lg font-medium text-gray-800 hover:text-primary transition-colors">Destinations</a>
                <button onclick="auth.logout()" class="text-lg font-medium text-red-600 hover:text-red-700 transition-colors text-left">Sign Out</button>
            `;
        }

    } else {
        // Logged Out State (Restore default)
        navAuth.innerHTML = `
            <a href="#" data-nav="search" class="text-gray-600 hover:text-primary font-medium transition-colors">Destinations</a>
            <a href="#" data-nav="about" class="text-gray-600 hover:text-primary font-medium transition-colors">About</a>
            <button data-nav="login" class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full font-medium transition-all shadow-lg shadow-teal-500/30">
                Sign In
            </button>
        `;
        bindNavLinks(); // Re-bind listeners for new elements
    }

    // Explicitly bind for logged-in state as well, since HTML was replaced
    if (user) {
        bindNavLinks();
    }

    if (window.lucide) lucide.createIcons();
}

// --- Navigation Logic (Global Event Delegation) ---
// This replaces bindNavLinks and ensures ALL buttons work forever, even after HTML updates.
document.addEventListener('click', (e) => {
    // 1. Handle Navigation Links
    const navLink = e.target.closest('[data-nav]');
    if (navLink) {
        e.preventDefault();
        const view = navLink.getAttribute('data-nav');
        navigateTo(view);

        // Auto-close mobile menu
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});
// (Removed stale bindNavLinks function)

// --- API Logic (Backend) ---

// Cache to store fetched destinations
const apiCache = {};

async function fetchLocationData(query) {
    if (apiCache[query.toLowerCase()]) return apiCache[query.toLowerCase()];

    // Search wikipedia to get exact title
    const searchEndpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

    try {
        const searchRes = await fetch(searchEndpoint);
        const searchData = await searchRes.json();

        if (!searchData.query.search.length) return null;

        const title = searchData.query.search[0].title;

        // Fetch details
        const detailsEndpoint = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts|pageimages|description&titles=${encodeURIComponent(title)}&pithumbsize=1000&exintro=1&explaintext=1`;

        const response = await fetch(detailsEndpoint);
        const data = await response.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];

        if (pageId === '-1') return null;

        const page = pages[pageId];

        // Fallback Images
        const fallbackImages = [
            'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=80'
        ];
        const randomImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

        const newDest = {
            // Use page.title for ID to be consistent regardless of user query casing/spacing
            id: page.title.toLowerCase().replace(/\s+/g, '-'),
            name: page.title,
            tagline: page.description || 'Explore the unseen beauty',
            type: 'Explore', // Generic type
            bestTime: 'All Year',
            attractions: ['City Center', 'Local Market', 'Historical Sites'],
            image: page.thumbnail ? page.thumbnail.source : randomImage,
            description: page.extract ? page.extract.split('. ')[0] + '.' : 'A wonderful destination to visit in India.',
            rating: (4.0 + Math.random()).toFixed(1), // Random rating 4.0-5.0
            price: '₹10,000 - ₹30,000',
            transport: {
                flight: `${page.title} Airport`,
                train: `${page.title} Jn`
            },
            isDynamic: true // Flag to identify API data
        };

        apiCache[query.toLowerCase()] = newDest;
        return newDest;
    } catch (error) {
        console.error('API Error:', error);
        return null;
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
            container.innerHTML = `<div class="col-span-full text-center text-red-500">An error occurred while searching. Please try again.</div>`;
        }
    }
}

function renderDestList(list, container) {
    if (!list || list.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = list.map(dest => `
        <div class="glass rounded-xl overflow-hidden flex flex-col md:flex-row card-hover cursor-pointer animate-slide-up reveal active" onclick="navigateTo('details', {id: '${dest.id}'})">
            <div class="md:w-1/3 h-48 md:h-auto">
                <img src="${dest.image}" alt="${dest.name}" class="w-full h-full object-cover">
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                ${dest.name}
                                ${dest.isDynamic ? '<span class="bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Live Web Data</span>' : ''}
                            </h3>
                            <span class="text-accent text-sm font-medium tracking-wide uppercase">${dest.type}</span>
                        </div>
                        <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">Best: ${dest.bestTime}</span>
                    </div>
                    <p class="text-gray-600 mt-2 line-clamp-2">${dest.description}</p>
                </div>
                <div class="mt-4 flex items-center gap-4">
                    <span class="flex items-center gap-1 text-sm text-gray-500">
                        <i data-lucide="plane" class="w-4 h-4"></i> ${dest.transport ? dest.transport.flight : 'Flight Info'}
                    </span>
                    <span class="flex items-center gap-1 text-sm text-gray-500">
                        <i data-lucide="train" class="w-4 h-4"></i> ${dest.transport ? dest.transport.train : 'Train Info'}
                    </span>
                     <span class="flex items-center gap-1 text-sm text-green-600 font-medium ml-auto">
                        View Guide <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </span>
                </div>
            </div>
        </div>
    `).join('');

    // Re-trigger icons for the new content
    if (window.lucide) lucide.createIcons();

    // We still call observeElements just in case there are other elements, 
    // but the 'active' class ensures immediate visibility for these search results.
    setTimeout(observeElements, 50);
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
    renderFeatured();
    if (window.lucide) lucide.createIcons();

    // Event Listeners

    // Global Search (Hero)
    const heroSearchBtn = document.getElementById('hero-search-btn');
    const heroSearchInput = document.getElementById('hero-search-input');

    if (heroSearchBtn && heroSearchInput) {
        heroSearchBtn.addEventListener('click', () => {
            navigateTo('search', { query: heroSearchInput.value });
        });
        heroSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') navigateTo('search', { query: heroSearchInput.value });
        });
    }

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

    // --- Animation Logic ---
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

    observeElements();

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
