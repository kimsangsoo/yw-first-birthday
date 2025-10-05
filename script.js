// Mobile Navigation Toggle (if elements exist)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

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

// Navbar background change on scroll (if navbar exists)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation (if they exist)
document.querySelectorAll('.greeting-text, .timeline-item').forEach(el => {
    if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    }
});

// Gallery items with different observer settings
const galleryObserverOptions = {
    threshold: 0.9,
    rootMargin: '0px 0px -400px 0px'
};

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, galleryObserverOptions);

// Observe gallery items separately
document.querySelectorAll('.gallery-item').forEach(el => {
    if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 1s ease, transform 1s ease';
        galleryObserver.observe(el);
    }
});





// Add parallax effect to main section (disabled to prevent screen shaking)
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const parallax = document.querySelector('.main-section');
//     const speed = scrolled * 0.5;

//     if (parallax) {
//         parallax.style.transform = `translateY(${speed}px)`;
//     }
// });

// Map functionality with iframe
document.addEventListener('DOMContentLoaded', function () {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const venueAddress = '경기도 용인시 수지구 광교중앙로295번길 3 1층 117~130호';
        const venueName = '우루루 광교 상현점';

        // Create Google Maps iframe (clean, no overlay)
        const searchQuery = encodeURIComponent(venueAddress);
        mapElement.innerHTML = `
            <iframe 
                src="https://www.google.com/maps?q=${searchQuery}&output=embed"
                width="100%" 
                height="100%" 
                style="border:0; border-radius: 15px;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        `;
    }
});


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

    // Baby photo bowing animation
    const babyPhoto = document.querySelector('.baby-photo');
    if (babyPhoto) {
        // Add hover effect for more interactive bowing
        babyPhoto.addEventListener('mouseenter', () => {
            babyPhoto.style.animationDuration = '1s';
        });

        babyPhoto.addEventListener('mouseleave', () => {
            babyPhoto.style.animationDuration = '3s';
        });

        // Add click effect for extra bow
        babyPhoto.addEventListener('click', () => {
            babyPhoto.style.animation = 'none';
            setTimeout(() => {
                babyPhoto.style.animation = 'bow 1s ease-in-out';
            }, 10);
        });
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

// Gallery Toggle Functionality with Lazy Loading
document.addEventListener('DOMContentLoaded', function () {
    const galleryToggle = document.getElementById('galleryToggle');
    const extendedGallery = document.getElementById('extendedGallery');
    const toggleText = document.querySelector('.toggle-text');
    const toggleIcon = document.querySelector('.toggle-icon');

    if (galleryToggle && extendedGallery) {
        let isExpanded = false;
        let isLoaded = false;

        // Lazy load images function with batch processing
        function lazyLoadImages() {
            if (isLoaded) return;

            const images = extendedGallery.querySelectorAll('img[data-src]');
            const totalImages = images.length;

            if (totalImages === 0) {
                isLoaded = true;
                toggleText.textContent = '사진 접기';
                toggleIcon.className = 'fas fa-chevron-up toggle-icon';
                return;
            }

            // Show loading indicator
            toggleText.textContent = '사진 로딩 중...';
            toggleIcon.className = 'fas fa-spinner fa-spin toggle-icon';

            let loadedCount = 0;
            let currentBatch = 0;
            const batchSize = 5; // Load 5 images at a time
            const batchDelay = 200; // 200ms delay between batches

            function loadBatch() {
                const startIndex = currentBatch * batchSize;
                const endIndex = Math.min(startIndex + batchSize, totalImages);

                for (let i = startIndex; i < endIndex; i++) {
                    const img = images[i];
                    if (img && img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');

                        img.onload = function () {
                            loadedCount++;
                            updateProgress();
                        };

                        img.onerror = function () {
                            console.warn('Failed to load image:', img.src);
                            loadedCount++;
                            updateProgress();
                        };
                    } else {
                        loadedCount++;
                        updateProgress();
                    }
                }

                currentBatch++;

                if (endIndex < totalImages) {
                    // Load next batch after delay
                    setTimeout(loadBatch, batchDelay);
                }
            }

            function updateProgress() {
                if (loadedCount === totalImages) {
                    isLoaded = true;
                    toggleText.textContent = '사진 접기';
                    toggleIcon.className = 'fas fa-chevron-up toggle-icon';
                } else {
                    // Update progress
                    const progress = Math.round((loadedCount / totalImages) * 100);
                    toggleText.textContent = `사진 로딩 중... ${progress}%`;
                }
            }

            // Start loading first batch
            loadBatch();
        }

        galleryToggle.addEventListener('click', function () {
            if (isExpanded) {
                // Collapse
                extendedGallery.style.display = 'none';
                toggleText.textContent = '더 많은 사진 보기';
                toggleIcon.className = 'fas fa-chevron-down toggle-icon';
                galleryToggle.classList.remove('expanded');
                isExpanded = false;
            } else {
                // Expand
                extendedGallery.style.display = 'grid';
                galleryToggle.classList.add('expanded');
                isExpanded = true;

                // Lazy load images if not already loaded
                if (!isLoaded) {
                    lazyLoadImages();
                } else {
                    toggleText.textContent = '사진 접기';
                    toggleIcon.className = 'fas fa-chevron-up toggle-icon';
                }
            }
        });
    }
});

// Simple Music Control (no auto-play)
document.addEventListener('DOMContentLoaded', function () {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = false;

    if (musicToggle && backgroundMusic) {
        backgroundMusic.volume = 0.3;

        musicToggle.addEventListener('click', function () {
            if (isPlaying) {
                backgroundMusic.pause();
                musicToggle.classList.remove('playing');
                musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                isPlaying = false;
            } else {
                backgroundMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                    isPlaying = true;
                }).catch(error => {
                    console.log('Audio play failed:', error);
                });
            }
        });
    }
});

// Simple Photo Modal
function openPhotoModal(imageSrc, caption) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');

    if (modal && modalImage && modalCaption) {
        modalImage.src = imageSrc;
        modalCaption.textContent = caption;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closePhotoModal() {
    const modal = document.getElementById('photoModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        closePhotoModal();
    }
});

// Close modal when clicking outside the image
document.addEventListener('click', function (event) {
    const modal = document.getElementById('photoModal');
    if (event.target === modal) {
        event.preventDefault();
        event.stopPropagation();
        closePhotoModal();
    }
});

// Simple Gallery Click Handler
document.addEventListener('DOMContentLoaded', function () {
    // Use event delegation for better performance
    document.addEventListener('click', function (e) {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            e.preventDefault();
            e.stopPropagation();

            // Check if this is an onclick event from HTML (prevent double execution)
            if (e.target.hasAttribute('onclick') || e.target.closest('[onclick]')) {
                return; // Let the onclick handle it
            }

            const img = galleryItem.querySelector('img');
            const caption = galleryItem.querySelector('.gallery-caption');
            if (img && caption) {
                openPhotoModal(img.src, caption.textContent);
            }
        }
    });
});
