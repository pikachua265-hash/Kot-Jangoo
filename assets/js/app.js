/**
 * Kot Jangoo - House of Taste & Royal Heritage Hotel
 * Jacobabad Bypass (N-65), Sindh, Pakistan
 * Interactive App Controller with Authentic Iftar & Grand Buffet Module
 */

class KotJangooApp {
  constructor() {
    this.currentTab = 'home';
    this.isPhoneView = false;
    this.activeMenuCategory = 'all';
    this.searchQuery = '';
    
    // Booking State
    this.selectedZone = 'courtyard';
    this.selectedTable = null;
    this.bookingDate = new Date().toISOString().split('T')[0];
    this.selectedTimeSlot = 'ts-iftar';
    this.guestCount = 4;

    // Buffet Booking State
    this.buffetAdults = 2;
    this.buffetKids = 1;

    // Room Booking State
    this.checkInDate = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.checkOutDate = tomorrow.toISOString().split('T')[0];

    // Cart
    this.cart = [];
    
    // Pre-loaded Authentic Bookings
    this.myBookings = [
      {
        id: "KJ-IFTAR-7712",
        type: "buffet",
        title: "Iftar Plus Grand Buffet Dinner",
        tableName: "Courtyard Buffet Deck C-2",
        guests: 4,
        date: "Today, 17 Oct 2026",
        time: "06:15 PM (Iftar Time)",
        status: "Confirmed",
        amount: 4850,
        special: "Includes 50+ Dishes, Desserts & Welcome Drinks"
      },
      {
        id: "KJ-HT-5520",
        type: "room",
        title: "Fortress View Royal Suite",
        roomType: "Royal King Bed",
        checkIn: "24 Oct 2026",
        checkOut: "26 Oct 2026",
        nights: 2,
        guests: 2,
        status: "Guaranteed",
        amount: 49000,
        special: "Complimentary Royal Buffet Breakfast & Free Valet"
      }
    ];

    this.init();
  }

  init() {
    this.renderHeader();
    this.renderTab(this.currentTab);
    this.renderBottomNav();
    this.bindGlobalEvents();
    this.updateCartBadge();
    this.updateBookingsBadge();
  }

  setTab(tabId) {
    this.currentTab = tabId;
    this.renderTab(tabId);
    this.renderBottomNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleViewMode() {
    this.isPhoneView = !this.isPhoneView;
    const container = document.getElementById('app-viewport-container');
    const toggleBtn = document.getElementById('view-mode-toggle-btn');
    
    if (this.isPhoneView) {
      container.classList.add('phone-simulator-frame');
      toggleBtn.innerHTML = `
        <i data-lucide="monitor" class="w-4 h-4"></i>
        <span>Fullscreen View</span>
      `;
    } else {
      container.classList.remove('phone-simulator-frame');
      toggleBtn.innerHTML = `
        <i data-lucide="smartphone" class="w-4 h-4"></i>
        <span>Mobile App Mode</span>
      `;
    }
    lucide.createIcons();
    this.showToast(this.isPhoneView ? "Switched to Mobile Phone Simulator" : "Switched to Fullscreen View");
  }

  renderHeader() {
    const header = document.getElementById('app-top-header');
    if (!header) return;

    header.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <!-- Logo & Title -->
        <div class="flex items-center space-x-3 cursor-pointer" onclick="app.setTab('home')">
          <div class="relative w-11 h-11 rounded-xl overflow-hidden border border-amber-500/40 shadow-lg shadow-amber-500/10">
            <img src="${KOT_JANGOO_DATA.hotelInfo.images.towerLogo}" alt="Kot Jangoo" class="w-full h-full object-cover">
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <h1 class="font-royal text-xl md:text-2xl font-black tracking-wider text-amber-400">KOT JANGOO</h1>
              <span class="text-[9px] bg-red-900 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-red-700 uppercase tracking-widest hidden sm:inline-block">House of Taste</span>
            </div>
            <p class="text-[11px] text-slate-400 font-medium flex items-center space-x-1.5">
              <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>N-65 Jacobabad Bypass</span>
              <span class="text-slate-600">|</span>
              <span class="text-amber-400 font-semibold"><i data-lucide="phone" class="w-3 h-3 inline mr-0.5"></i> 0303-9136661</span>
            </p>
          </div>
        </div>

        <!-- Action Icons & Mode Switcher -->
        <div class="flex items-center space-x-2 sm:space-x-3">
          <button id="view-mode-toggle-btn" onclick="app.toggleViewMode()" class="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-xs text-amber-300 border border-amber-500/20 transition">
            <i data-lucide="smartphone" class="w-3.5 h-3.5"></i>
            <span>Mobile App Mode</span>
          </button>

          <!-- Cart Button -->
          <button onclick="app.openCartDrawer()" class="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition">
            <i data-lucide="shopping-bag" class="w-5 h-5 text-amber-400"></i>
            <span id="cart-counter-badge" class="hidden absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900">0</span>
          </button>

          <!-- Iftar & Buffet Shortcut -->
          <button onclick="app.openBuffetBookingModal()" class="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-700 via-amber-600 to-amber-500 hover:opacity-95 text-slate-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 transition transform active:scale-95">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
            <span class="hidden sm:inline">Book Iftar Buffet</span>
            <span class="sm:hidden">Buffet</span>
          </button>
        </div>
      </div>
    `;
    lucide.createIcons();
  }

  renderBottomNav() {
    const bottomNav = document.getElementById('app-bottom-nav');
    if (!bottomNav) return;

    const tabs = [
      { id: 'home', label: 'Home', icon: 'home' },
      { id: 'buffet', label: 'Iftar Buffet', icon: 'sparkles', badgeText: '50+' },
      { id: 'table-booking', label: 'Book Table', icon: 'armchair', highlight: true },
      { id: 'menu', label: 'Menu & Deals', icon: 'utensils' },
      { id: 'hotel-booking', label: 'Suites / Stay', icon: 'bed-double' },
      { id: 'bookings', label: 'Passes', icon: 'ticket', badge: this.myBookings.length }
    ];

    bottomNav.innerHTML = `
      <div class="max-w-lg mx-auto px-2 py-1.5 flex items-center justify-between">
        ${tabs.map(tab => {
          const isActive = this.currentTab === tab.id;
          if (tab.highlight) {
            return `
              <button onclick="app.setTab('${tab.id}')" class="nav-tab-btn flex flex-col items-center -mt-5 group focus:outline-none">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-red-600 p-0.5 shadow-lg shadow-amber-500/30 group-hover:scale-105 transition transform">
                  <div class="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center p-2.5">
                    <i data-lucide="${tab.icon}" class="w-5 h-5 text-amber-400"></i>
                  </div>
                </div>
                <span class="text-[10px] font-bold mt-0.5 text-amber-400 tracking-wide">${tab.label}</span>
              </button>
            `;
          }

          return `
            <button onclick="app.setTab('${tab.id}')" class="nav-tab-btn flex flex-col items-center py-1 px-2 rounded-lg text-slate-400 hover:text-amber-300 transition ${isActive ? 'active' : ''}">
              <div class="nav-icon-wrapper p-1 rounded-xl transition relative">
                <i data-lucide="${tab.icon}" class="w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}"></i>
                ${tab.badge ? `<span class="absolute -top-1 -right-1.5 bg-red-600 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">${tab.badge}</span>` : ''}
                ${tab.badgeText ? `<span class="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 text-[7px] font-black px-1 rounded-full">${tab.badgeText}</span>` : ''}
              </div>
              <span class="text-[9px] font-medium mt-0.5">${tab.label}</span>
            </button>
          `;
        }).join('')}
      </div>
    `;
    lucide.createIcons();
  }

  renderTab(tabId) {
    const container = document.getElementById('app-main-content');
    if (!container) return;

    switch (tabId) {
      case 'home':
        container.innerHTML = this.getHomeView();
        break;
      case 'buffet':
        container.innerHTML = this.getBuffetView();
        break;
      case 'menu':
        container.innerHTML = this.getMenuView();
        break;
      case 'table-booking':
        container.innerHTML = this.getTableBookingView();
        break;
      case 'hotel-booking':
        container.innerHTML = this.getHotelBookingView();
        break;
      case 'bookings':
        container.innerHTML = this.getMyBookingsView();
        break;
      default:
        container.innerHTML = this.getHomeView();
    }

    lucide.createIcons();
  }

  // ==========================================
  // 1. HOME SCREEN
  // ==========================================
  getHomeView() {
    return `
      <div class="space-y-7 pb-24 animate-fade-in">
        <!-- Hero Section with Researched Highway Info & Castle Photo -->
        <div class="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-900 group">
          <div class="relative h-80 sm:h-96 md:h-[430px] w-full overflow-hidden">
            <img src="${KOT_JANGOO_DATA.hotelInfo.images.fullNight}" alt="Kot Jangoo Night View" class="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer" onclick="app.openImageLightbox('${KOT_JANGOO_DATA.hotelInfo.images.fullNight}', 'Kot Jangoo Castle Courtyard & Night Illuminations')">
            
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent flex flex-col justify-end p-5 md:p-8">
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <span class="px-3 py-1 rounded-full bg-red-950/90 text-amber-300 text-xs font-semibold border border-red-700/60 flex items-center space-x-1 backdrop-blur-md">
                  <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-400"></i>
                  <span>N-65 Jacobabad Bypass, Near Byco Pump</span>
                </span>
                <span class="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center space-x-1">
                  <i data-lucide="phone-call" class="w-3 h-3 text-amber-400"></i>
                  <span>0303-9136661</span>
                </span>
              </div>

              <h2 class="font-royal text-2xl sm:text-4xl md:text-5xl font-black text-amber-400 tracking-wider mb-2 drop-shadow-lg">
                KOT JANGOO
              </h2>
              <p class="text-xs sm:text-sm text-slate-200 font-medium max-w-xl mb-4 line-clamp-2">
                Jacobabad's royal landmark restaurant & heritage hotel. Famed for its red-brick fortress, authentic Iftar & Grand Buffet Dinner, and Mutton Namkeen Rosh.
              </p>

              <!-- Action Buttons -->
              <div class="flex flex-wrap items-center gap-2.5">
                <button onclick="app.setTab('buffet')" class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-700 via-amber-600 to-amber-500 hover:opacity-95 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-amber-500/30 transition transform active:scale-95">
                  <i data-lucide="sparkles" class="w-4 h-4"></i>
                  <span>Iftar & Grand Buffet (50+ Dishes)</span>
                </button>

                <button onclick="app.setTab('table-booking')" class="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-semibold text-xs uppercase tracking-wider border border-amber-500/30 flex items-center space-x-2 backdrop-blur-md transition">
                  <i data-lucide="armchair" class="w-4 h-4"></i>
                  <span>Seat & Table Map</span>
                </button>

                <button onclick="app.setTab('menu')" class="px-4 py-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 flex items-center space-x-1.5 transition">
                  <i data-lucide="utensils" class="w-4 h-4 text-amber-400"></i>
                  <span>Menu & Deals</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- SPECIAL BUFFET POSTER SPOTLIGHT (Featuring the User's Uploaded Card) -->
        <div class="relative rounded-3xl p-6 bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 border border-amber-500/40 shadow-xl overflow-hidden">
          <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
            <!-- Left Info -->
            <div class="flex-1 space-y-3">
              <div class="flex items-center space-x-2">
                <span class="px-3 py-1 rounded-full bg-red-900/80 text-amber-300 text-[10px] font-bold border border-red-700 uppercase tracking-widest">
                  Featured Official Event
                </span>
                <span class="text-xs text-emerald-400 font-semibold flex items-center">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                  Daily Bookings Open
                </span>
              </div>

              <h3 class="font-royal text-2xl sm:text-3xl font-black text-amber-400">
                Iftar Plus Grand Buffet Dinner
              </h3>

              <p class="text-xs text-slate-300 leading-relaxed max-w-xl">
                Experience Jacobabad's largest culinary spread: <b>Dates, Mint Mojito, Mutton Malai Qorma, Sindhi Biryani, Balochi Massar Beans, Chinese Chowmein, Arabic Basbousa, and European Pastries</b>.
              </p>

              <div class="flex flex-wrap items-center gap-4 py-2 text-xs">
                <div class="px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-500/30">
                  <span class="text-[10px] text-slate-400 block uppercase">Adult Rate</span>
                  <span class="font-royal text-base font-bold text-amber-300">PKR 1,850</span>
                </div>
                <div class="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span class="text-[10px] text-slate-400 block uppercase">Child Rate</span>
                  <span class="font-royal text-base font-bold text-slate-200">PKR 1,150</span>
                </div>
                <div class="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span class="text-[10px] text-slate-400 block uppercase">Booking Helplines</span>
                  <span class="font-bold text-emerald-400">0303-9136661 / 0304-9136661</span>
                </div>
              </div>

              <div class="flex items-center space-x-3 pt-2">
                <button onclick="app.openBuffetBookingModal()" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition active:scale-95 shadow-md shadow-amber-500/20">
                  Reserve Buffet Seats
                </button>
                <button onclick="app.setTab('buffet')" class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-amber-500/20 transition">
                  View Complete 50+ Menu
                </button>
              </div>
            </div>

            <!-- Right: Thumbnail of the Authentic User Poster -->
            <div class="relative w-48 sm:w-56 h-72 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-2xl cursor-pointer group flex-shrink-0" onclick="app.openImageLightbox('${KOT_JANGOO_DATA.hotelInfo.images.buffetPoster}', 'Official Kot Jangoo Iftar Plus Buffet Dinner Card')">
              <img src="${KOT_JANGOO_DATA.hotelInfo.images.buffetPoster}" alt="Iftar Buffet Poster" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
              <div class="absolute inset-0 bg-slate-950/30 group-hover:bg-transparent transition flex items-center justify-center">
                <span class="px-3 py-1.5 rounded-xl bg-slate-950/90 text-amber-300 text-xs font-bold border border-amber-500/40 shadow-lg flex items-center space-x-1">
                  <i data-lucide="zoom-in" class="w-3.5 h-3.5"></i>
                  <span>Inspect Card</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Researched Popular Deals & Authentic Specials -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <span class="text-xs text-amber-400 font-bold uppercase tracking-widest">Highway Specialties</span>
              <h3 class="font-royal text-xl sm:text-2xl font-bold text-slate-100">Famous Kot Jangoo Dishes</h3>
            </div>
            <button onclick="app.setTab('menu')" class="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1">
              <span>View All Menu</span>
              <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${KOT_JANGOO_DATA.menuItems.slice(0, 3).map(item => `
              <div class="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition flex flex-col justify-between group">
                <div class="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                  <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 text-amber-400 text-[10px] font-bold border border-amber-500/30 backdrop-blur-md">
                    ${item.badge}
                  </span>
                  <div class="absolute bottom-2 right-2 bg-slate-950/90 text-amber-300 text-xs font-bold px-2 py-1 rounded-lg border border-amber-500/20">
                    PKR ${item.price.toLocaleString()}
                  </div>
                </div>

                <div class="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 class="font-bold text-slate-100 text-sm mb-1">${item.name}</h4>
                    <p class="text-xs text-slate-400 line-clamp-2 mb-3">${item.description}</p>
                  </div>

                  <div class="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <span class="text-xs text-slate-400 flex items-center">
                      <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-500 mr-1"></i> ${item.prepTime}
                    </span>
                    <button onclick="app.addToCart('${item.id}')" class="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-xs border border-amber-500/40 transition flex items-center space-x-1">
                      <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                      <span>Add to Order</span>
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Real Photographic Review Showcase (All 3 Uploaded Images) -->
        <div class="glass-panel p-6 rounded-3xl border border-amber-500/20">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-5">
            <div>
              <span class="text-xs text-amber-400 font-bold uppercase tracking-widest">Authentic Visual Gallery</span>
              <h3 class="font-royal text-xl sm:text-2xl font-bold text-slate-100">Reviewing Kot Jangoo Photos</h3>
            </div>
            <p class="text-xs text-slate-400 mt-1 sm:mt-0">Click any photograph to view in full resolution</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- Image 1: Full Night -->
            <div class="relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-700 h-56" onclick="app.openImageLightbox('${KOT_JANGOO_DATA.hotelInfo.images.fullNight}', 'Kot Jangoo Castle Courtyard & Parking at Night')">
              <img src="${KOT_JANGOO_DATA.hotelInfo.images.fullNight}" alt="Castle Courtyard" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-3">
                <span class="text-xs font-bold text-amber-300">1. Fortress Illuminated Facade</span>
              </div>
            </div>

            <!-- Image 2: Tower Neon -->
            <div class="relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-700 h-56" onclick="app.openImageLightbox('${KOT_JANGOO_DATA.hotelInfo.images.towerLogo}', 'Kot Jangoo - House of Taste Neon Tower')">
              <img src="${KOT_JANGOO_DATA.hotelInfo.images.towerLogo}" alt="Kot Jangoo Tower" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-3">
                <span class="text-xs font-bold text-amber-300">2. Illuminated Tower Beacon</span>
              </div>
            </div>

            <!-- Image 3: Buffet Poster -->
            <div class="relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-700 h-56" onclick="app.openImageLightbox('${KOT_JANGOO_DATA.hotelInfo.images.buffetPoster}', 'Official Kot Jangoo Iftar Plus Buffet Dinner Menu Card')">
              <img src="${KOT_JANGOO_DATA.hotelInfo.images.buffetPoster}" alt="Iftar Poster" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-3">
                <span class="text-xs font-bold text-amber-300">3. Iftar Plus Buffet Menu Card</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Highway Reviews -->
        <div>
          <div class="mb-4">
            <span class="text-xs text-amber-400 font-bold uppercase tracking-widest">Highway Guest Feedback</span>
            <h3 class="font-royal text-xl sm:text-2xl font-bold text-slate-100">Jacobabad & N-65 Commuters</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${KOT_JANGOO_DATA.testimonials.map(t => `
              <div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div class="flex items-center space-x-1 text-amber-400 mb-2">
                    ${Array(t.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>').join('')}
                  </div>
                  <p class="text-xs text-slate-300 italic mb-4 leading-relaxed">"${t.comment}"</p>
                </div>
                <div class="flex items-center space-x-3 pt-3 border-t border-slate-800">
                  <div class="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center border border-amber-500/30">
                    ${t.avatar}
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-200">${t.name}</h5>
                    <p class="text-[10px] text-slate-400">${t.city}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 2. DEDICATED BUFFET SCREEN (From Uploaded Card)
  // ==========================================
  getBuffetView() {
    const buffet = KOT_JANGOO_DATA.buffetDetails;

    return `
      <div class="space-y-6 pb-24 animate-fade-in">
        <!-- Buffet Hero Header -->
        <div class="relative rounded-3xl p-6 bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 border border-amber-500/40 shadow-2xl overflow-hidden">
          <div class="flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="space-y-2">
              <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 uppercase tracking-widest inline-flex items-center space-x-1.5">
                <i data-lucide="crown" class="w-3.5 h-3.5 text-amber-400"></i>
                <span>Kot Jangoo Jacobabad Exclusive</span>
              </span>
              <h2 class="font-royal text-2xl sm:text-4xl font-black text-amber-400">Iftar Plus Grand Buffet Dinner</h2>
              <p class="text-xs text-slate-300 max-w-xl leading-relaxed">
                A grand royal feast served daily during Ramadan and special weekends. Featuring 50+ dishes across 6 courses: hot starters, signature karahi & qorma, Chinese, salads, sauces, and pastries.
              </p>
              
              <div class="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <span class="text-slate-300"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-400 inline mr-1"></i> N-65 Jacobabad Bypass</span>
                <span class="text-slate-300"><i data-lucide="clock" class="w-3.5 h-3.5 text-amber-400 inline mr-1"></i> ${buffet.timing}</span>
                <span class="text-emerald-400 font-bold"><i data-lucide="phone" class="w-3.5 h-3.5 inline mr-1"></i> 0303-9136661</span>
              </div>
            </div>

            <!-- Booking Rate Card -->
            <div class="bg-slate-950/90 border border-amber-500/40 p-4 rounded-2xl text-center min-w-[220px] shadow-xl">
              <span class="text-[10px] text-amber-400 uppercase font-bold tracking-widest block">Per Person Rate</span>
              <div class="font-royal text-2xl font-black text-amber-300 my-1">PKR ${buffet.pricing.adult.toLocaleString()}</div>
              <span class="text-[10px] text-slate-400 block mb-3">Kids under 10: PKR ${buffet.pricing.child.toLocaleString()} • Under 4: Free</span>
              <button onclick="app.openBuffetBookingModal()" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition active:scale-95 shadow-md shadow-amber-500/20">
                Reserve Buffet Pass
              </button>
            </div>
          </div>
        </div>

        <!-- Complete 6 Course Breakdown (Directly from Card) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${buffet.categories.map((cat, idx) => `
            <div class="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition">
              <div class="flex items-center space-x-2.5 mb-3 pb-2 border-b border-slate-800">
                <div class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <i data-lucide="${cat.icon}" class="w-4 h-4"></i>
                </div>
                <h4 class="font-royal text-sm font-bold text-amber-300">${idx + 1}. ${cat.name}</h4>
              </div>

              <ul class="space-y-1.5 text-xs text-slate-300">
                ${cat.items.map(dish => `
                  <li class="flex items-start space-x-2">
                    <span class="text-amber-400 font-bold">•</span>
                    <span>${dish}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <!-- Poster Review Drawer -->
        <div class="glass-panel p-5 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 class="font-bold text-slate-100 text-sm">Review Authentic Printed Menu Poster</h4>
            <p class="text-xs text-slate-400">Click to view the full resolution printed Jacobabad menu card.</p>
          </div>
          <button onclick="app.openImageLightbox('${buffet.posterImage}', 'Kot Jangoo Jacobabad - Iftar Plus Buffet Dinner Printed Menu')" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs border border-amber-500/30 flex items-center space-x-1.5 transition">
            <i data-lucide="file-image" class="w-4 h-4"></i>
            <span>Inspect Full Poster</span>
          </button>
        </div>
      </div>
    `;
  }

  // ==========================================
  // BUFFET BOOKING MODAL
  // ==========================================
  openBuffetBookingModal() {
    const modal = document.getElementById('app-modal-container');
    modal.classList.remove('hidden');

    const adultRate = KOT_JANGOO_DATA.buffetDetails.pricing.adult;
    const childRate = KOT_JANGOO_DATA.buffetDetails.pricing.child;
    const total = (this.buffetAdults * adultRate) + (this.buffetKids * childRate);

    modal.innerHTML = `
      <div class="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in" onclick="if(event.target === this) app.closeModal()">
        <div class="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button onclick="app.closeModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>

          <span class="text-[10px] text-amber-400 font-bold uppercase tracking-widest">N-65 Jacobabad Bypass</span>
          <h3 class="font-royal text-xl font-bold text-slate-100 mb-1">Book Iftar Buffet Seats</h3>
          <p class="text-xs text-slate-400 mb-4">Kot Jangoo - House of Taste • 50+ Dish Royal Spread</p>

          <div class="space-y-4 mb-5">
            <!-- Date Picker -->
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Buffet Date</label>
              <input type="date" value="${this.bookingDate}" onchange="app.bookingDate = this.value" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400">
            </div>

            <!-- Adults Stepper -->
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span class="text-xs font-bold text-slate-200 block">Adult Guests</span>
                <span class="text-[11px] text-amber-400">PKR ${adultRate.toLocaleString()} / person</span>
              </div>
              <div class="flex items-center space-x-2">
                <button onclick="if(app.buffetAdults > 1) { app.buffetAdults--; app.openBuffetBookingModal(); }" class="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 font-bold text-xs">-</button>
                <span class="text-xs font-bold text-amber-400 w-6 text-center">${this.buffetAdults}</span>
                <button onclick="app.buffetAdults++; app.openBuffetBookingModal();" class="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 font-bold text-xs">+</button>
              </div>
            </div>

            <!-- Kids Stepper -->
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span class="text-xs font-bold text-slate-200 block">Children (Ages 4-10)</span>
                <span class="text-[11px] text-slate-400">PKR ${childRate.toLocaleString()} / child</span>
              </div>
              <div class="flex items-center space-x-2">
                <button onclick="if(app.buffetKids > 0) { app.buffetKids--; app.openBuffetBookingModal(); }" class="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 font-bold text-xs">-</button>
                <span class="text-xs font-bold text-slate-200 w-6 text-center">${this.buffetKids}</span>
                <button onclick="app.buffetKids++; app.openBuffetBookingModal();" class="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 font-bold text-xs">+</button>
              </div>
            </div>

            <!-- Contact Information -->
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Lead Guest Full Name</label>
              <input id="bf-guest-name" type="text" placeholder="e.g. Tariq Mehmood" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Mobile Number (For SMS Confirmation)</label>
              <input id="bf-guest-phone" type="text" placeholder="0300-1234567" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400">
            </div>

            <!-- Total -->
            <div class="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 flex justify-between items-center text-xs">
              <span class="text-slate-300 font-bold">Total Estimated:</span>
              <span class="font-royal text-base font-black text-amber-400">PKR ${total.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onclick="app.confirmBuffetBooking(${total})"
            class="w-full py-3 rounded-xl bg-gradient-to-r from-red-700 via-amber-600 to-amber-500 hover:opacity-95 text-slate-950 font-bold text-xs uppercase tracking-wider transition active:scale-95 shadow-lg shadow-amber-500/20"
          >
            Confirm Buffet Reservation
          </button>

          <p class="text-[10px] text-slate-500 text-center mt-3">
            Helplines: 0303-9136661 • 0304-9136661
          </p>
        </div>
      </div>
    `;
    lucide.createIcons();
  }

  confirmBuffetBooking(totalAmount) {
    const nameInput = document.getElementById('bf-guest-name');
    const phoneInput = document.getElementById('bf-guest-phone');
    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!name || !phone) {
      this.showToast("Please enter your name and phone number for SMS pass", "error");
      return;
    }

    const bookingId = "KJ-IFTAR-" + Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id: bookingId,
      type: "buffet",
      guestName: name,
      guestPhone: phone,
      title: "Iftar Plus Grand Buffet Dinner",
      tableName: "Courtyard Buffet Deck",
      guests: this.buffetAdults + this.buffetKids,
      date: this.bookingDate,
      time: "06:15 PM (Iftar Time)",
      status: "Confirmed",
      amount: totalAmount,
      special: `Adults: ${this.buffetAdults}, Kids: ${this.buffetKids} • 50+ Dishes Included`
    };

    this.myBookings.unshift(newBooking);
    this.closeModal();
    this.updateBookingsBadge();
    this.openBookingReceiptModal(newBooking);
  }

  // ==========================================
  // 3. MENU SCREEN (With Researched Deals & Namkeen)
  // ==========================================
  getMenuView() {
    let items = KOT_JANGOO_DATA.menuItems;
    if (this.activeMenuCategory !== 'all') {
      if (this.activeMenuCategory === 'buffet') {
        return this.getBuffetView();
      }
      items = items.filter(i => i.category === this.activeMenuCategory);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    }

    return `
      <div class="space-y-6 pb-24 animate-fade-in">
        <!-- Menu Header -->
        <div class="relative rounded-2xl bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-900 p-6 border border-amber-500/20">
          <div class="max-w-2xl">
            <span class="text-xs text-amber-400 font-bold uppercase tracking-widest">N-65 Jacobabad Heritage Tastes</span>
            <h2 class="font-royal text-2xl sm:text-3xl font-bold text-slate-100 mb-1">Authentic Culinary Menu</h2>
            <p class="text-xs text-slate-300">
              Famous for Mutton Namkeen Rosh, Deal 10 Family Combos, Boti Parathas, and Charcoal BBQ. Call 0303-9136661 for fast highway takeaway.
            </p>
          </div>

          <!-- Search Bar -->
          <div class="mt-4 relative max-w-md">
            <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
            <input 
              type="text" 
              placeholder="Search Namkeen Rosh, Deal 10, Biryani, Chowmein..." 
              value="${this.searchQuery}"
              oninput="app.onSearchInput(this.value)"
              class="w-full bg-slate-950/80 border border-slate-700 focus:border-amber-400 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition"
            >
            ${this.searchQuery ? `
              <button onclick="app.clearSearch()" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Category Pills Bar -->
        <div class="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          ${KOT_JANGOO_DATA.menuCategories.map(cat => {
            const isActive = this.activeMenuCategory === cat.id;
            return `
              <button 
                onclick="app.setMenuCategory('${cat.id}')"
                class="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isActive 
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold' 
                    : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60'
                }"
              >
                <i data-lucide="${cat.icon}" class="w-3.5 h-3.5"></i>
                <span>${cat.name}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Dishes Grid -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs text-slate-400 font-medium">Showing ${items.length} dishes</span>
            <span class="text-xs text-amber-400 font-medium">PKR (Inclusive of tax)</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${items.map(item => `
              <div class="glass-panel rounded-2xl overflow-hidden border border-slate-800/80 hover:border-amber-500/40 transition flex flex-col justify-between group">
                <div class="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                  
                  <div class="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                    <span class="px-2 py-0.5 rounded-md bg-slate-950/80 text-amber-300 text-[10px] font-bold border border-amber-500/30 backdrop-blur-md">
                      ${item.badge}
                    </span>
                    ${item.isSpicy ? `
                      <span class="px-1.5 py-0.5 rounded-md bg-red-950/80 text-red-400 text-[10px] font-bold border border-red-700/50 flex items-center space-x-0.5">
                        <i data-lucide="flame" class="w-3 h-3 text-red-500 inline"></i>
                        <span>Spicy</span>
                      </span>
                    ` : ''}
                  </div>

                  <div class="absolute bottom-2.5 right-2.5 bg-slate-950/90 text-amber-300 text-xs font-black px-2.5 py-1 rounded-lg border border-amber-500/30">
                    PKR ${item.price.toLocaleString()}
                    <span class="text-[9px] text-slate-400 font-normal"> / ${item.unit}</span>
                  </div>
                </div>

                <div class="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 class="font-bold text-slate-100 text-sm mb-1 group-hover:text-amber-300 transition">${item.name}</h4>
                    <p class="text-xs text-slate-400 line-clamp-2 mb-3">${item.description}</p>
                  </div>

                  <div class="flex items-center justify-between pt-3 border-t border-slate-800/70">
                    <div class="flex items-center space-x-2 text-[11px] text-slate-400">
                      <span class="flex items-center text-amber-400 font-semibold">
                        <i data-lucide="star" class="w-3 h-3 fill-amber-400 mr-1"></i> ${item.rating}
                      </span>
                      <span>•</span>
                      <span>${item.prepTime}</span>
                    </div>

                    <button 
                      onclick="app.addToCart('${item.id}')"
                      class="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition flex items-center space-x-1 active:scale-95"
                    >
                      <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  setMenuCategory(catId) {
    this.activeMenuCategory = catId;
    this.renderTab('menu');
  }

  onSearchInput(val) {
    this.searchQuery = val;
    this.renderTab('menu');
  }

  clearSearch() {
    this.searchQuery = '';
    this.renderTab('menu');
  }

  // ==========================================
  // 4. TABLE & SEAT BOOKING SYSTEM
  // ==========================================
  getTableBookingView() {
    const currentZoneObj = KOT_JANGOO_DATA.seatingZones.find(z => z.id === this.selectedZone) || KOT_JANGOO_DATA.seatingZones[0];

    return `
      <div class="space-y-6 pb-24 animate-fade-in">
        <!-- Table Booking Hero Banner -->
        <div class="relative rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 p-6 border border-amber-500/30 overflow-hidden">
          <div class="relative z-10 max-w-xl">
            <span class="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40 uppercase tracking-widest inline-flex items-center space-x-1 mb-2">
              <i data-lucide="shield-check" class="w-3 h-3 text-amber-400"></i>
              <span>Instant Seat Map Confirmation</span>
            </span>
            <h2 class="font-royal text-2xl sm:text-3xl font-bold text-amber-400 mb-1">Visual Floor & Table Booking</h2>
            <p class="text-xs text-slate-300 leading-relaxed">
              Choose your zone (Starry Courtyard, Iftar Buffet Arena, Tower Rooftop, or VIP Gazebos), select your exact table, and download your digital pass.
            </p>
          </div>
        </div>

        <!-- Booking Filters -->
        <div class="glass-panel p-5 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>Reservation Date</span>
            </label>
            <input 
              type="date" 
              value="${this.bookingDate}" 
              onchange="app.bookingDate = this.value"
              class="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
            >
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1">
              <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>Dining Time Slot</span>
            </label>
            <select 
              onchange="app.selectedTimeSlot = this.value"
              class="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
            >
              ${KOT_JANGOO_DATA.timeSlots.map(ts => `
                <option value="${ts.id}" ${this.selectedTimeSlot === ts.id ? 'selected' : ''}>
                  ${ts.time} (${ts.period})
                </option>
              `).join('')}
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1">
              <i data-lucide="users" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>Number of Guests</span>
            </label>
            <div class="flex items-center space-x-2">
              <button onclick="app.adjustGuestCount(-1)" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center border border-slate-700">-</button>
              <div class="flex-1 text-center font-bold text-amber-400 text-sm bg-slate-950 py-1.5 rounded-xl border border-slate-800">
                ${this.guestCount} Persons
              </div>
              <button onclick="app.adjustGuestCount(1)" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center border border-slate-700">+</button>
            </div>
          </div>
        </div>

        <!-- Zone Selector -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-royal text-sm sm:text-base font-bold text-slate-200">Select Seating Zone</h3>
            <span class="text-xs text-amber-400 font-medium">Click zone to view tables</span>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            ${KOT_JANGOO_DATA.seatingZones.map(zone => {
              const isSelected = this.selectedZone === zone.id;
              return `
                <div 
                  onclick="app.selectZone('${zone.id}')"
                  class="cursor-pointer p-3.5 rounded-2xl border transition ${
                    isSelected 
                      ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/10' 
                      : 'bg-slate-900/60 hover:bg-slate-800/60 border-slate-800'
                  }"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-slate-200'}">${zone.name}</span>
                    <span class="w-2 h-2 rounded-full ${isSelected ? 'bg-amber-400' : 'bg-slate-600'}"></span>
                  </div>
                  <span class="text-[10px] text-slate-400">${zone.badge}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Interactive Visual Floor Map -->
        <div class="glass-panel p-6 rounded-3xl border border-amber-500/30">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <h4 class="font-royal text-base sm:text-lg font-bold text-amber-400">${currentZoneObj.name}</h4>
              <p class="text-xs text-slate-400 mt-0.5">${currentZoneObj.description}</p>
            </div>

            <div class="flex items-center space-x-3 text-xs">
              <span class="flex items-center space-x-1 text-slate-300">
                <span class="w-3 h-3 rounded-md bg-emerald-500/30 border border-emerald-500"></span>
                <span>Available</span>
              </span>
              <span class="flex items-center space-x-1 text-slate-300">
                <span class="w-3 h-3 rounded-md bg-amber-500 border border-amber-400"></span>
                <span>Selected</span>
              </span>
              <span class="flex items-center space-x-1 text-slate-400">
                <span class="w-3 h-3 rounded-md bg-slate-800 opacity-50"></span>
                <span>Booked</span>
              </span>
            </div>
          </div>

          <!-- Floor Plan Layout -->
          <div class="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 my-6 min-h-[350px]">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              ${currentZoneObj.tables.map(table => {
                const isSelected = this.selectedTable && this.selectedTable.id === table.id;
                const isBooked = table.status === 'booked';
                
                return `
                  <div 
                    onclick="${isBooked ? '' : `app.selectTable('${table.id}')`}"
                    class="flex flex-col items-center justify-center p-4 rounded-2xl transition group ${
                      isBooked 
                        ? 'opacity-40 cursor-not-allowed bg-slate-900/40 border border-slate-800' 
                        : isSelected 
                          ? 'bg-gradient-to-b from-amber-500/25 to-red-950/40 border-2 border-amber-400 shadow-xl shadow-amber-500/20 scale-105 cursor-pointer' 
                          : 'bg-slate-900/80 hover:bg-slate-800 border border-emerald-500/40 hover:border-amber-400/80 cursor-pointer'
                    }"
                  >
                    <!-- Visual Chair icons top -->
                    <div class="flex items-center space-x-1.5 mb-1.5">
                      ${Array(Math.min(4, Math.ceil(table.capacity / 2))).fill(0).map(() => `
                        <div class="w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-amber-400' : isBooked ? 'bg-slate-700' : 'bg-emerald-500/70'}"></div>
                      `).join('')}
                    </div>

                    <!-- Table Body -->
                    <div class="w-16 h-12 rounded-xl flex flex-col items-center justify-center ${
                      isSelected 
                        ? 'bg-amber-500 text-slate-950 font-black' 
                        : isBooked 
                          ? 'bg-slate-800 text-slate-500' 
                          : 'bg-slate-800/90 text-amber-300 border border-amber-500/20'
                    }">
                      <i data-lucide="armchair" class="w-4 h-4 mb-0.5"></i>
                      <span class="text-[10px] font-bold">${table.name}</span>
                    </div>

                    <!-- Visual Chair icons bottom -->
                    <div class="flex items-center space-x-1.5 mt-1.5">
                      ${Array(Math.min(4, Math.floor(table.capacity / 2))).fill(0).map(() => `
                        <div class="w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-amber-400' : isBooked ? 'bg-slate-700' : 'bg-emerald-500/70'}"></div>
                      `).join('')}
                    </div>

                    <div class="mt-2 text-center">
                      <span class="text-[10px] font-semibold text-slate-400">${table.capacity} Seats</span>
                      <div class="text-[9px] ${isBooked ? 'text-red-400' : isSelected ? 'text-amber-400 font-bold' : 'text-emerald-400'}">
                        ${isBooked ? 'Reserved' : isSelected ? 'Selected' : 'Available'}
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Selection Confirmation -->
          ${this.selectedTable ? `
            <div class="p-5 rounded-2xl bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-900 border border-amber-400/50 animate-fade-in">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <h5 class="font-royal text-base font-bold text-amber-300">${this.selectedTable.name} Selected</h5>
                  <p class="text-xs text-slate-300">
                    ${currentZoneObj.name} • Capacity: ${this.selectedTable.capacity} Persons • Fee: <b class="text-amber-400">PKR ${this.selectedTable.price}</b>
                  </p>
                </div>
                <span class="text-xs text-emerald-400 font-bold">Helpline: 0303-9136661</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <input id="tb-guest-name" type="text" placeholder="Your Name" class="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400">
                <input id="tb-guest-phone" type="text" placeholder="Mobile Number" class="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400">
              </div>

              <div class="mt-4 flex justify-end">
                <button 
                  onclick="app.confirmTableBooking()"
                  class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition active:scale-95 shadow-lg shadow-amber-500/20"
                >
                  Confirm Table Reservation
                </button>
              </div>
            </div>
          ` : `
            <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs text-amber-300/80">
              👆 Click any available table above to select your seating.
            </div>
          `}
        </div>
      </div>
    `;
  }

  selectZone(zoneId) {
    this.selectedZone = zoneId;
    this.selectedTable = null;
    this.renderTab('table-booking');
  }

  selectTable(tableId) {
    const currentZoneObj = KOT_JANGOO_DATA.seatingZones.find(z => z.id === this.selectedZone);
    const table = currentZoneObj.tables.find(t => t.id === tableId);
    if (!table || table.status === 'booked') return;
    
    this.selectedTable = table;
    this.renderTab('table-booking');
    this.showToast(`Selected ${table.name}`);
  }

  adjustGuestCount(delta) {
    const newVal = this.guestCount + delta;
    if (newVal >= 1 && newVal <= 25) {
      this.guestCount = newVal;
      this.renderTab('table-booking');
    }
  }

  confirmTableBooking() {
    const nameInput = document.getElementById('tb-guest-name');
    const phoneInput = document.getElementById('tb-guest-phone');
    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!name || !phone) {
      this.showToast("Please enter your name and phone number", "error");
      return;
    }

    const currentZoneObj = KOT_JANGOO_DATA.seatingZones.find(z => z.id === this.selectedZone);
    const bookingId = "KJ-TB-" + Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id: bookingId,
      type: "table",
      guestName: name,
      guestPhone: phone,
      title: currentZoneObj.name,
      tableName: this.selectedTable.name,
      guests: this.guestCount,
      date: this.bookingDate,
      time: "08:30 PM",
      status: "Confirmed",
      amount: this.selectedTable.price,
      special: "Priority Table Reservation"
    };

    this.myBookings.unshift(newBooking);
    this.updateBookingsBadge();
    this.openBookingReceiptModal(newBooking);
  }

  // ==========================================
  // 5. HOTEL ROOM BOOKING SCREEN
  // ==========================================
  getHotelBookingView() {
    return `
      <div class="space-y-6 pb-24 animate-fade-in">
        <div class="relative rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 p-6 border border-amber-500/20">
          <span class="text-xs text-amber-400 font-bold uppercase tracking-widest">N-65 Jacobabad Highway Rest</span>
          <h2 class="font-royal text-2xl sm:text-3xl font-bold text-slate-100 mb-1">Kot Jangoo Royal Suites</h2>
          <p class="text-xs text-slate-300">
            Heritage rooms featuring fortress brickwork, 24/7 room service, air conditioning, and complimentary royal breakfast.
          </p>
        </div>

        <div class="space-y-4">
          ${KOT_JANGOO_DATA.hotelRooms.map(room => `
            <div class="glass-panel rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition flex flex-col md:flex-row group">
              <div class="md:w-2/5 relative h-52 md:h-auto overflow-hidden bg-slate-900 cursor-pointer" onclick="app.openImageLightbox('${room.image}', '${room.name}')">
                <img src="${room.image}" alt="${room.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                  ${room.badge}
                </span>
              </div>

              <div class="p-5 md:w-3/5 flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="font-royal text-lg font-bold text-slate-100">${room.name}</h3>
                    <div class="text-right">
                      <span class="font-royal text-base font-bold text-amber-400">PKR ${room.pricePerNight.toLocaleString()}</span>
                      <span class="text-[9px] text-slate-400 block -mt-1">/ night</span>
                    </div>
                  </div>

                  <p class="text-xs text-slate-300 mb-3">${room.description}</p>

                  <div class="flex flex-wrap gap-2 mb-4">
                    ${room.amenities.map(a => `
                      <span class="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-[10px] border border-slate-700 flex items-center space-x-1">
                        <i data-lucide="check" class="w-3 h-3 text-emerald-400"></i>
                        <span>${a}</span>
                      </span>
                    `).join('')}
                  </div>
                </div>

                <div class="flex items-center justify-between pt-3 border-t border-slate-800">
                  <span class="text-xs text-emerald-400 font-semibold">${room.availableRooms} Suites Available</span>
                  <button onclick="app.showToast('Room booking confirmed! Contacting desk at 0303-9136661')" class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition active:scale-95">
                    Reserve Suite
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ==========================================
  // 6. MY BOOKINGS SCREEN
  // ==========================================
  getMyBookingsView() {
    return `
      <div class="space-y-6 pb-24 animate-fade-in">
        <div class="relative rounded-2xl bg-gradient-to-r from-red-950/70 via-slate-900 to-slate-900 p-6 border border-amber-500/20">
          <span class="text-xs text-amber-400 font-bold uppercase tracking-widest">Guest Boarding Passes</span>
          <h2 class="font-royal text-2xl sm:text-3xl font-bold text-slate-100 mb-1">My Reservations & Passes</h2>
          <p class="text-xs text-slate-300">
            Show these digital passes upon arrival at Kot Jangoo Jacobabad Bypass.
          </p>
        </div>

        <div class="space-y-4">
          ${this.myBookings.map(b => `
            <div class="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-amber-500/40 transition">
              <div class="flex justify-between items-center pb-3 border-b border-slate-800">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 rounded-xl ${b.type === 'buffet' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'} flex items-center justify-center">
                    <i data-lucide="${b.type === 'buffet' ? 'sparkles' : b.type === 'table' ? 'armchair' : 'hotel'}" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-100 text-sm">${b.title}</h4>
                    <p class="text-[11px] text-amber-400 font-mono font-bold">${b.id}</p>
                  </div>
                </div>

                <span class="text-xs text-amber-400 font-bold">PKR ${b.amount.toLocaleString()}</span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 text-xs">
                <div>
                  <span class="text-[10px] text-slate-500 block uppercase">Table / Venue</span>
                  <span class="text-slate-200 font-semibold">${b.tableName || b.roomType}</span>
                </div>
                <div>
                  <span class="text-[10px] text-slate-500 block uppercase">Date & Time</span>
                  <span class="text-slate-200 font-semibold">${b.date || b.checkIn} (${b.time || `${b.nights} Nights`})</span>
                </div>
                <div>
                  <span class="text-[10px] text-slate-500 block uppercase">Guests</span>
                  <span class="text-slate-200 font-semibold">${b.guests} Persons</span>
                </div>
                <div>
                  <span class="text-[10px] text-slate-500 block uppercase">Location</span>
                  <span class="text-slate-200 font-semibold">Jacobabad Bypass</span>
                </div>
              </div>

              <div class="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                <span class="text-[11px] text-slate-400">${b.special}</span>
                <button onclick="app.openBookingReceiptModal(app.myBookings.find(x => x.id === '${b.id}'))" class="px-3 py-1.5 rounded-lg bg-slate-800 text-amber-300 font-semibold text-xs border border-amber-500/20 flex items-center space-x-1">
                  <i data-lucide="qr-code" class="w-3.5 h-3.5"></i>
                  <span>View Pass</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ==========================================
  // CART DRAWER & HELPERS
  // ==========================================
  addToCart(itemId) {
    const item = KOT_JANGOO_DATA.menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existing = this.cart.find(c => c.id === itemId);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }

    this.updateCartBadge();
    this.showToast(`Added ${item.name} to Order`);
  }

  updateCartBadge() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-counter-badge');
    if (!badge) return;

    if (totalCount > 0) {
      badge.textContent = totalCount;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  updateBookingsBadge() {
    this.renderBottomNav();
  }

  openCartDrawer() {
    const modal = document.getElementById('app-modal-container');
    modal.classList.remove('hidden');

    const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    modal.innerHTML = `
      <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 animate-fade-in" onclick="if(event.target === this) app.closeModal()">
        <div class="bg-slate-900 border border-amber-500/30 rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="flex items-center space-x-2">
                <i data-lucide="shopping-bag" class="w-5 h-5 text-amber-400"></i>
                <h3 class="font-royal text-lg font-bold text-slate-100">Kot Jangoo Order</h3>
              </div>
              <button onclick="app.closeModal()" class="text-slate-400 hover:text-white p-1">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <div class="my-4 space-y-3 overflow-y-auto max-h-60 pr-1">
              ${this.cart.length === 0 ? `
                <div class="text-center py-8">
                  <p class="text-xs text-slate-400">Your cart is empty.</p>
                </div>
              ` : `
                ${this.cart.map(item => `
                  <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div class="flex-1 pr-2">
                      <h5 class="text-xs font-bold text-slate-200 line-clamp-1">${item.name}</h5>
                      <span class="text-[10px] text-amber-400 font-semibold">PKR ${(item.price * item.quantity).toLocaleString()}</span>
                    </div>

                    <div class="flex items-center space-x-2">
                      <button onclick="app.updateCartQty('${item.id}', -1)" class="w-6 h-6 rounded-md bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center">-</button>
                      <span class="text-xs font-bold text-slate-200 w-4 text-center">${item.quantity}</span>
                      <button onclick="app.updateCartQty('${item.id}', 1)" class="w-6 h-6 rounded-md bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center">+</button>
                    </div>
                  </div>
                `).join('')}
              `}
            </div>
          </div>

          ${this.cart.length > 0 ? `
            <div class="pt-4 border-t border-slate-800 space-y-3">
              <div class="flex justify-between text-sm font-bold text-slate-100">
                <span>Total:</span>
                <span class="text-amber-400 font-black">PKR ${total.toLocaleString()}</span>
              </div>
              <button onclick="app.showToast('Order dispatched to kitchen!'); app.cart = []; app.updateCartBadge(); app.closeModal();" class="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider">
                Confirm & Dispatch to Kitchen
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
    lucide.createIcons();
  }

  updateCartQty(itemId, delta) {
    const item = this.cart.find(c => c.id === itemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.cart = this.cart.filter(c => c.id !== itemId);
    }
    this.updateCartBadge();
    this.openCartDrawer();
  }

  // ==========================================
  // RECEIPT MODAL
  // ==========================================
  openBookingReceiptModal(booking) {
    const modal = document.getElementById('app-modal-container');
    modal.classList.remove('hidden');

    modal.innerHTML = `
      <div class="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in" onclick="if(event.target === this) app.closeModal()">
        <div class="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
          <button onclick="app.closeModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white p-1">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>

          <div class="text-center pb-4 border-b border-dashed border-slate-700">
            <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-widest bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
              Verified Booking
            </span>
            <h3 class="font-royal text-xl font-bold text-amber-400 mt-2">KOT JANGOO</h3>
            <p class="text-[11px] text-slate-400">N-65 1 KM Jacobabad Bypass Near Byco Pump</p>
            <p class="text-[11px] text-amber-300 font-mono font-bold mt-1">Ref ID: ${booking.id}</p>
          </div>

          <div class="py-4 space-y-2 text-xs">
            <div class="flex justify-between">
              <span class="text-slate-400">Service:</span>
              <span class="text-slate-200 font-bold">${booking.title}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Table / Hall:</span>
              <span class="text-amber-300 font-semibold">${booking.tableName || booking.roomType}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Date & Slot:</span>
              <span class="text-slate-200 font-semibold">${booking.date || booking.checkIn} (${booking.time || `${booking.nights} Nights`})</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Guests:</span>
              <span class="text-slate-200 font-semibold">${booking.guests} Persons</span>
            </div>
            <div class="flex justify-between pt-2 border-t border-slate-800">
              <span class="text-slate-400">Total Amount:</span>
              <span class="text-emerald-400 font-bold">PKR ${booking.amount.toLocaleString()}</span>
            </div>
          </div>

          <div class="bg-white p-3 rounded-2xl text-center flex flex-col items-center justify-center my-2">
            <i data-lucide="qr-code" class="w-16 h-16 text-slate-950"></i>
            <span class="text-[9px] text-slate-800 font-mono font-bold mt-1">${booking.id} • SCAN AT ENTRANCE</span>
          </div>

          <div class="mt-4 flex space-x-2">
            <button onclick="window.print()" class="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700">
              Print Pass
            </button>
            <button onclick="app.closeModal(); app.setTab('bookings')" class="flex-1 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase">
              Done
            </button>
          </div>
        </div>
      </div>
    `;
    lucide.createIcons();
  }

  // ==========================================
  // LIGHTBOX
  // ==========================================
  openImageLightbox(src, caption) {
    const modal = document.getElementById('app-modal-container');
    modal.classList.remove('hidden');

    modal.innerHTML = `
      <div class="fixed inset-0 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in" onclick="if(event.target === this) app.closeModal()">
        <div class="relative max-w-4xl w-full">
          <button onclick="app.closeModal()" class="absolute -top-12 right-0 text-slate-300 hover:text-white p-2 rounded-full bg-slate-800/80 border border-slate-700">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
          <div class="rounded-3xl overflow-hidden border border-amber-500/40 shadow-2xl bg-black">
            <img src="${src}" alt="${caption}" class="w-full max-h-[82vh] object-contain mx-auto">
            <div class="p-4 bg-slate-900/90 text-center border-t border-slate-800">
              <h4 class="font-royal text-sm font-bold text-amber-400">${caption}</h4>
              <p class="text-xs text-slate-400">Kot Jangoo - House of Taste • N-65 Jacobabad Bypass</p>
            </div>
          </div>
        </div>
      </div>
    `;
    lucide.createIcons();
  }

  closeModal() {
    const modal = document.getElementById('app-modal-container');
    if (modal) {
      modal.classList.add('hidden');
      modal.innerHTML = '';
    }
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-xl shadow-2xl flex items-center space-x-2 text-xs font-bold transition duration-300 pointer-events-none animate-fade-in border ${
      type === 'error' 
        ? 'bg-red-950/95 text-red-200 border-red-700' 
        : 'bg-slate-900/95 text-amber-300 border-amber-500/40'
    }`;
    toast.innerHTML = `
      <i data-lucide="${type === 'error' ? 'alert-circle' : 'check-circle-2'}" class="w-4 h-4 ${type === 'error' ? 'text-red-400' : 'text-amber-400'}"></i>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  bindGlobalEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }
}

// Global instance
let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new KotJangooApp();
});
