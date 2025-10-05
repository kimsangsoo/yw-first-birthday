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

// Virtualized/infinite gallery for gallery.html
document.addEventListener('DOMContentLoaded', function () {
    const virtualGallery = document.getElementById('virtualGallery');
    const loader = document.getElementById('loader');

    if (!virtualGallery) return; // only runs on gallery.html

    const photos = [
        1,2,3,4,5,6,7,8,9,
        10,11,12,13,14,15,16,17,18,19,
        20,21,22,23,24,25,26,27,28,29,
        30,31,32,33,34,35,36,37,38,39,
        41,42,44,45,46,47,48,50,51,52,
        53,54,55,56
    ].map(n => `photo/${n}${n <= 9 ? (n === 9 ? '.JPG' : '.jpg') : '.jpeg'}`);

    const WINDOW_CAP = 48; // keep DOM nodes bounded
    const BATCH = 12; // items per chunk
    let cursor = 0;
    let loading = false;

    function createItem(src) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        const img = document.createElement('img');
        img.className = 'gallery-photo';
        img.src = src;
        const cap = document.createElement('div');
        cap.className = 'gallery-caption';
        cap.textContent = '예원이의 소중한 순간';
        item.appendChild(img);
        item.appendChild(cap);
        return item;
    }

    function pruneIfNeeded() {
        while (virtualGallery.children.length > WINDOW_CAP) {
            virtualGallery.removeChild(virtualGallery.firstChild);
        }
    }

    function appendNextBatch() {
        if (loading) return;
        loading = true;
        if (loader) loader.style.display = 'block';

        const end = Math.min(cursor + BATCH, photos.length);
        const frag = document.createDocumentFragment();
        for (let i = cursor; i < end; i++) {
            frag.appendChild(createItem(photos[i]));
        }
        cursor = end;
        virtualGallery.appendChild(frag);
        pruneIfNeeded();

        if (loader) loader.style.display = cursor >= photos.length ? 'none' : 'block';
        loading = false;
    }

    // initial
    appendNextBatch();

    // infinite scroll using IntersectionObserver on loader
    if (loader) {
        const io = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (e.isIntersecting) appendNextBatch();
            }
        }, { rootMargin: '200px 0px' });
        io.observe(loader);
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
let isModalOpen = false;
let isOpeningModal = false;
function openPhotoModal(imageSrc, caption) {
    if (isModalOpen || isOpeningModal) return; // prevent re-entrant opens
    if (!imageSrc) return; // ignore if no image source available

    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');

    if (modal && modalImage && modalCaption) {
        isOpeningModal = true;
        // Hint the browser for smoother decode
        modalImage.setAttribute('decoding', 'async');
        modalImage.setAttribute('loading', 'eager');

        // Defer to next frame to avoid jank on click
        requestAnimationFrame(() => {
            modalImage.src = imageSrc;
            modalCaption.textContent = caption;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.body.classList.add('modal-open');
            isModalOpen = true;
            isOpeningModal = false;
        });
    }
}

function closePhotoModal() {
    if (!isModalOpen) return;
    const modal = document.getElementById('photoModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');
        isModalOpen = false;
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
// (moved to DOMContentLoaded direct bindings below)

// Re-bind minimal, safe handlers after stripping inline ones
document.addEventListener('DOMContentLoaded', function () {
    // Remove all inline onclick handlers inside gallery
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        galleryContainer.querySelectorAll('[onclick]').forEach(function (el) {
            el.removeAttribute('onclick');
        });

        // Single delegated click handler on container
        galleryContainer.addEventListener('click', function (e) {
            if (isModalOpen) return;
            const galleryItem = e.target.closest('.gallery-item');
            if (!galleryItem || !galleryContainer.contains(galleryItem)) return;

            const img = galleryItem.querySelector('img');
            const caption = galleryItem.querySelector('.gallery-caption');

            if (!img || !caption) return;

            // Prefer loaded src; fallback to data-src for lazy images
            const loadedSrc = img.getAttribute('src');
            const lazySrc = img.getAttribute('data-src');

            // If only data-src exists, start loading it for next time
            if (!loadedSrc && lazySrc) {
                img.src = lazySrc;
            }

            const chosenSrc = loadedSrc || lazySrc || '';
            if (!chosenSrc) return; // nothing to open

            openPhotoModal(chosenSrc, caption.textContent);
        });
    }

    // Bind modal overlay and close button directly
    const modal = document.getElementById('photoModal');
    if (modal) {
        const overlay = modal.querySelector('.modal-overlay');
        const closeBtn = modal.querySelector('.modal-close');
        if (overlay) {
            overlay.addEventListener('click', function (e) {
                e.stopPropagation();
                closePhotoModal();
            });
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                closePhotoModal();
            });
        }
    }
});
