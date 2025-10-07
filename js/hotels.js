// Hotel data with multiple images
const hotels = [
    {
        id: 1,
        name: "Mövenpick Ambassador Hotel",
        rating: 5,
        location: "Airport Residential Area",
        distance: "2km from venue",
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=500&fit=crop"
        ],
        amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Gym", "Airport Shuttle"],
        rooms: [
            { type: "Standard Room", price: 120, capacity: 2, beds: "1 Queen Bed", amenities: ["Free WiFi", "TV", "AC", "Minibar"] },
            { type: "Classic Room", price: 150, capacity: 2, beds: "2 Single Beds", amenities: ["Free WiFi", "TV", "AC", "Minibar", "Balcony"] },
            { type: "Deluxe Room", price: 200, capacity: 3, beds: "1 King Bed", amenities: ["Free WiFi", "TV", "AC", "Minibar", "Balcony", "City View"] },
            { type: "Executive Room", price: 280, capacity: 4, beds: "1 King + Sofa Bed", amenities: ["Free WiFi", "TV", "AC", "Minibar", "Balcony", "Lounge Access", "Premium View"] }
        ]
    },
    {
        id: 2,
        name: "Labadi Beach Hotel",
        rating: 4,
        location: "La Beach Road",
        distance: "5km from venue",
        images: [
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop"
        ],
        amenities: ["Free WiFi", "Beach Access", "Restaurant", "Pool", "Bar"],
        rooms: [
            { type: "Ocean View Room", price: 95, capacity: 2, beds: "1 Queen Bed", amenities: ["Free WiFi", "TV", "AC", "Ocean View"] },
            { type: "Deluxe Suite", price: 140, capacity: 3, beds: "1 King Bed", amenities: ["Free WiFi", "TV", "AC", "Balcony", "Ocean View", "Minibar"] },
            { type: "Beach Villa", price: 220, capacity: 4, beds: "2 Queen Beds", amenities: ["Free WiFi", "TV", "AC", "Private Beach", "Kitchenette", "Terrace"] }
        ]
    },
    {
        id: 3,
        name: "Kempinski Hotel Gold Coast",
        rating: 5,
        location: "Atlantic Beach",
        distance: "8km from venue",
        images: [
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800&h=500&fit=crop"
        ],
        amenities: ["Free WiFi", "Private Beach", "Spa", "Multiple Restaurants", "Pool", "Fitness Center"],
        rooms: [
            { type: "Superior Room", price: 140, capacity: 2, beds: "1 King Bed", amenities: ["Free WiFi", "TV", "AC", "Minibar", "Safe"] },
            { type: "Deluxe Ocean Room", price: 190, capacity: 2, beds: "1 King Bed", amenities: ["Free WiFi", "TV", "AC", "Minibar", "Ocean View", "Balcony"] },
            { type: "Junior Suite", price: 260, capacity: 3, beds: "1 King + Sofa Bed", amenities: ["Free WiFi", "TV", "AC", "Living Area", "Ocean View", "Balcony"] },
            { type: "Presidential Suite", price: 450, capacity: 4, beds: "2 King Beds", amenities: ["Free WiFi", "TV", "AC", "Full Kitchen", "Butler Service", "Private Pool"] }
        ]
    }
];

let selectedHotel = null;
let selectedRoom = null;
let bookingData = { nights: 3 };
let currentImageIndex = 0;
let galleryInterval;

document.querySelectorAll('.select-hotel-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const card = this.closest('.hotel-card');
        const hotelId = parseInt(card.dataset.hotelId);
        selectHotel(hotelId);
    });
});
// Select hotel and open modal
function selectHotel(hotelId) {
    selectedHotel = hotels.find(h => h.id === hotelId);
    selectedRoom = null;
    currentImageIndex = 0;

    // Update UI
    document.querySelectorAll('.hotel-card').forEach(card => {
        card.classList.remove('selected-hotel');
    });
    document.querySelector(`[data-hotel-id="${hotelId}"]`).classList.add('selected-hotel');

    // Populate modal
    populateModal();

    // Show modal
    document.getElementById('room-modal').classList.add('active');
    document.body.style.overflow = 'hidden';

    updateContinueButton();
}

// Populate modal with hotel data
function populateModal() {
    // Gallery
    const galleryContainer = document.getElementById('gallery-images');
    galleryContainer.innerHTML = selectedHotel.images.map((img, index) => `
        <img src="${img}" alt="${selectedHotel.name}" class="gallery-image ${index === 0 ? 'active' : ''}" />
    `).join('');

    // Dots
    const dotsContainer = document.getElementById('gallery-dots');
    dotsContainer.innerHTML = selectedHotel.images.map((_, index) => `
        <div class="gallery-dot ${index === 0 ? 'active' : ''}" onclick="goToImage(${index})"></div>
    `).join('');

    // Hotel info
    document.getElementById('modal-hotel-name').textContent = selectedHotel.name;
    document.getElementById('modal-hotel-rating').innerHTML = '⭐'.repeat(selectedHotel.rating);
    document.getElementById('modal-hotel-location').textContent = `📍 ${selectedHotel.location}`;
    document.getElementById('modal-hotel-distance').textContent = selectedHotel.distance;

    const amenitiesContainer = document.getElementById('modal-hotel-amenities');
    amenitiesContainer.innerHTML = selectedHotel.amenities.map(amenity => `
        <span class="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full">${amenity}</span>
    `).join('');

    // Rooms
    renderRooms();
}

// Gallery navigation
function changeImage(direction) {
    const images = document.querySelectorAll('.gallery-image');
    const dots = document.querySelectorAll('.gallery-dot');

    images[currentImageIndex].classList.remove('active');
    dots[currentImageIndex].classList.remove('active');

    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;

    images[currentImageIndex].classList.add('active');
    dots[currentImageIndex].classList.add('active');
}

function goToImage(index) {
    const images = document.querySelectorAll('.gallery-image');
    const dots = document.querySelectorAll('.gallery-dot');

    images[currentImageIndex].classList.remove('active');
    dots[currentImageIndex].classList.remove('active');

    currentImageIndex = index;

    images[currentImageIndex].classList.add('active');
    dots[currentImageIndex].classList.add('active');
}

// Auto-rotate gallery
function startGalleryRotation() {
    galleryInterval = setInterval(() => {
        changeImage(1);
    }, 4000);
}

function stopGalleryRotation() {
    clearInterval(galleryInterval);
}

// Close modal
function closeRoomModal() {
    document.getElementById('room-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
    stopGalleryRotation();
}

// Close modal on overlay click
document.getElementById('room-modal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeRoomModal();
    }
});

// Render rooms
function renderRooms() {
    const container = document.getElementById('rooms-container');
    container.innerHTML = selectedHotel.rooms.map((room, index) => `
        <div class="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 card-hover cursor-pointer room-card" data-room-index="${index}"> 
            <div class="flex justify-between items-start mb-3">
                <h4 class="text-lg font-bold text-gray-800">${room.type}</h4>
                <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                    ${room.capacity} ${room.capacity > 1 ? 'guests' : 'guest'}
                </span>
            </div>
            <p class="text-gray-600 mb-2 text-sm">${room.beds}</p>
            <div class="flex flex-wrap gap-1 mb-3">
                ${room.amenities.slice(0, 3).map(amenity => `
                    <span class="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full">${amenity}</span>
                `).join('')}
                ${room.amenities.length > 3 ? `<span class="text-xs text-gray-500">+${room.amenities.length - 3}</span>` : ''}
            </div>
            <div class="border-t pt-3 flex justify-between items-center">
                <div>
                    <p class="text-xl font-bold text-orange-600">${room.price}<span class="text-xs text-gray-500">/night</span></p>
                    <p class="text-xs text-gray-500">${bookingData.nights} nights = ${room.price * bookingData.nights}</p>
                </div>
                <button class="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition select-room-btn">
                    Select
                </button>
            </div>
        </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.select-room-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const card = this.closest('.room-card');
            const roomIndex = parseInt(card.dataset.roomIndex);
            selectRoom(roomIndex);
        });
    });

    // Start gallery rotation when modal is open
    startGalleryRotation();
}

// Select room
function selectRoom(roomIndex) {
    selectedRoom = selectedHotel.rooms[roomIndex];

    // Update UI
    document.querySelectorAll('.room-card').forEach(card => {
        card.classList.remove('selected-room');
    });
    document.querySelector(`[data-room-index="${roomIndex}"]`).classList.add('selected-room');

    updateContinueButton();

    // Scroll to continue button inside modal
    const modalContinueBtn = document.getElementById('modal-continue-btn');
    modalContinueBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Update continue button
function updateContinueButton() {
    const btn = document.getElementById('continue-btn');
    const modalBtn = document.getElementById('modal-continue-btn');

    if (selectedHotel && selectedRoom) {
        // Update main continue button
        btn.disabled = false;
        btn.classList.remove('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
        btn.classList.add('bg-gradient-to-r', 'from-orange-600', 'to-orange-500', 'text-white', 'hover:from-orange-700', 'hover:to-orange-600', 'cursor-pointer');

        // Update modal continue button
        if (modalBtn) {
            modalBtn.disabled = false;
            modalBtn.classList.remove('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
            modalBtn.classList.add('bg-gradient-to-r', 'from-orange-600', 'to-orange-500', 'text-white', 'hover:from-orange-700', 'hover:to-orange-600', 'cursor-pointer');
        }
    } else {
        // Update main continue button
        btn.disabled = true;
        btn.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
        btn.classList.remove('bg-gradient-to-r', 'from-orange-600', 'to-orange-500', 'text-white', 'hover:from-orange-700', 'hover:to-orange-600', 'cursor-pointer');

        // Update modal continue button
        if (modalBtn) {
            modalBtn.disabled = true;
            modalBtn.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
            modalBtn.classList.remove('bg-gradient-to-r', 'from-orange-600', 'to-orange-500', 'text-white', 'hover:from-orange-700', 'hover:to-orange-600', 'cursor-pointer');
        }
    }
}

// Continue to next step
document.getElementById('continue-btn').addEventListener('click', function () {
    console.log('Continue button clicked');
    if (!selectedHotel || !selectedRoom) return;

    // Save data
    bookingData.hotel = {
        id: selectedHotel.id,
        name: selectedHotel.name,
        location: selectedHotel.location
    };
    bookingData.room = {
        type: selectedRoom.type,
        price: selectedRoom.price,
        capacity: selectedRoom.capacity,
        beds: selectedRoom.beds,
        total: selectedRoom.price * bookingData.nights
    };

    console.log('Booking Data:', bookingData);
    // In a real app, save to sessionStorage
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    window.location.href = 'addons.html';

});

document.getElementById('modal-continue-btn').addEventListener('click', function () {
    console.log('Continue button clicked');
    if (!selectedHotel || !selectedRoom) return;

    // Save data
    bookingData.hotel = {
        id: selectedHotel.id,
        name: selectedHotel.name,
        location: selectedHotel.location
    };
    bookingData.room = {
        type: selectedRoom.type,
        price: selectedRoom.price,
        capacity: selectedRoom.capacity,
        beds: selectedRoom.beds,
        total: selectedRoom.price * bookingData.nights
    };

    console.log('Booking Data:', bookingData);
    // In a real app, append to sessionStorage
    const existingData = JSON.parse(sessionStorage.getItem('bookingData')) || {};
    const updatedData = { ...existingData, ...bookingData };
    sessionStorage.setItem('bookingData', JSON.stringify(updatedData));
    window.location.href = 'addons.html';

});

// Initialize
renderHotels();

// Keyboard navigation for modal
document.addEventListener('keydown', function (e) {
    const modal = document.getElementById('room-modal');
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeRoomModal();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});