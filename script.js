// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.greeting-text, .timeline-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});





// Add parallax effect to main section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.main-section');
    const speed = scrolled * 0.5;

    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Map functionality
let map;

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function () {
    // 광교 우루루 좌표 (용인시 수지구 광교 U-TOWER)
    const venueLat = 37.291;
    const venueLng = 127.069;
    const venueAddress = '경기도 용인시 수지구 광교중앙로295번길 3 1층 117~130호';

    // Check if Kakao Maps API is loaded
    if (typeof kakao !== 'undefined' && kakao.maps) {
        // Create map container
        const mapContainer = document.getElementById('map');
        const mapOption = {
            center: new kakao.maps.LatLng(venueLat, venueLng),
            level: 3
        };

        // Create map
        map = new kakao.maps.Map(mapContainer, mapOption);

        // Create marker
        const markerPosition = new kakao.maps.LatLng(venueLat, venueLng);
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);

        // Create info window
        const infoWindow = new kakao.maps.InfoWindow({
            content: `<div style="padding: 10px; text-align: center; font-family: 'Hi Melody', cursive;">
                        <div style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">광교 우루루</div>
                        <div style="font-size: 12px; color: #666;">${venueAddress}</div>
                      </div>`
        });

        // Show info window when marker is clicked
        kakao.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
        });

        // Show info window by default
        infoWindow.open(map, marker);
    } else {
        // Fallback if Kakao Maps API is not loaded
        const mapElement = document.getElementById('map');
        if (mapElement) {
            mapElement.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🗺️</div>
                    <div style="font-size: 1.2rem; margin-bottom: 0.5rem; font-weight: bold;">광교 우루루</div>
                    <div style="font-size: 1rem; color: #666;">${venueAddress}</div>
                    <div style="font-size: 0.9rem; color: #888; margin-top: 1rem;">지도 버튼을 클릭하여 상세 지도를 확인하세요</div>
                </div>
            `;
        }
    }
});

// Map button functions
function openNaverMap() {
    const address = encodeURIComponent('경기도 용인시 수지구 광교중앙로295번길 3 1층 117~130호');
    const url = `https://map.naver.com/v5/search/${address}`;
    window.open(url, '_blank');
}

function openKakaoMap() {
    const address = encodeURIComponent('경기도 용인시 수지구 광교중앙로295번길 3 1층 117~130호');
    const url = `https://map.kakao.com/link/search/${address}`;
    window.open(url, '_blank');
}

function openGoogleMap() {
    const address = encodeURIComponent('경기도 용인시 수지구 광교중앙로295번길 3 1층 117~130호');
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(url, '_blank');
}

// Add typing effect to main title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        typeWriter(mainTitle, originalText, 150);
    }
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';

    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            z-index: 9999;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(135deg, #ff6b6b, #ffd93d);
            width: 0%;
            transition: width 0.1s ease;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        progressBar.querySelector('.progress-fill').style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();
