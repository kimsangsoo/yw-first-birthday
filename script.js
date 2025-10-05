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

// Simple photo rotation for main page
document.addEventListener('DOMContentLoaded', function () {
    const mainGallery = document.querySelector('.main-gallery');
    const extendedGallery = document.getElementById('extendedGallery');
    const nextBatchBtn = document.getElementById('nextBatchBtn');
    const toggleText = nextBatchBtn ? nextBatchBtn.querySelector('.toggle-text') : null;
    const toggleIcon = nextBatchBtn ? nextBatchBtn.querySelector('.toggle-icon') : null;

    if (!mainGallery || !extendedGallery || !nextBatchBtn) return;

    // All photos in order
    const allPhotos = [
        { src: 'photo/1.jpg', caption: '뫄! 들어와' },
        { src: 'photo/2.jpg', caption: '엄마!! 어디갔어' },
        { src: 'photo/3.jpg', caption: '한푼줍쇼' },
        { src: 'photo/4.jpg', caption: '이쁜 공주님' },
        { src: 'photo/5.jpg', caption: '나는야!! 페피' },
        { src: 'photo/6.jpg', caption: '사우나 가자' },
        { src: 'photo/7.jpg', caption: '애미야 불꺼라' },
        { src: 'photo/8.jpg', caption: '용용이 탄생' },
        { src: 'photo/9.JPG', caption: '용용이' },
        { src: 'photo/10.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/11.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/12.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/13.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/14.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/15.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/16.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/17.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/18.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/19.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/20.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/21.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/22.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/23.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/24.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/25.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/26.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/27.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/28.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/29.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/30.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/31.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/32.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/33.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/34.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/35.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/36.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/37.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/38.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/39.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/41.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/42.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/44.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/45.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/46.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/47.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/48.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/50.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/51.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/52.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/53.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/54.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/55.jpeg', caption: '예원이의 소중한 순간' },
        { src: 'photo/56.jpeg', caption: '예원이의 소중한 순간' }
    ];

    let currentBatch = 0;
    const BATCH_SIZE = 9;

    function createGalleryItem(photo) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.className = 'gallery-photo';
        
        // 이미지 최적화 설정
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
        img.setAttribute('fetchpriority', 'low');
        
        // 썸네일용 작은 해상도 설정 (CSS로 크기 제한)
        img.style.maxWidth = '300px';
        img.style.maxHeight = '300px';
        img.style.objectFit = 'cover';
        
        // 원본 이미지 경로 (모달에서 사용)
        img.dataset.originalSrc = photo.src;
        img.src = photo.src;
        
        const caption = document.createElement('div');
        caption.className = 'gallery-caption';
        caption.textContent = photo.caption;
        
        item.appendChild(img);
        item.appendChild(caption);
        return item;
    }

    function showNextBatch() {
        const startIndex = currentBatch * BATCH_SIZE;
        const endIndex = Math.min(startIndex + BATCH_SIZE, allPhotos.length);

        if (startIndex >= allPhotos.length) {
            // Reset to first batch
            currentBatch = 0;
            showNextBatch();
            return;
        }

        // Clear current gallery
        mainGallery.innerHTML = '';
        extendedGallery.innerHTML = '';

        // Show current batch
        const currentPhotos = allPhotos.slice(startIndex, endIndex);
        currentPhotos.forEach(photo => {
            mainGallery.appendChild(createGalleryItem(photo));
        });

        // Update button text
        const remaining = allPhotos.length - endIndex;
        if (remaining > 0) {
            toggleText.textContent = `다른 사진 보기 (${remaining}장 남음)`;
            toggleIcon.className = 'fas fa-chevron-right toggle-icon';
        } else {
            toggleText.textContent = '첫 번째 사진으로';
            toggleIcon.className = 'fas fa-chevron-left toggle-icon';
        }

        currentBatch++;
    }

    // Initial load
    showNextBatch();

    // Button click handler
    nextBatchBtn.addEventListener('click', function () {
        showNextBatch();
    });
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

            // 원본 이미지 사용 (모달에서는 고해상도)
            const originalSrc = img.dataset.originalSrc || img.src;
            if (!originalSrc) return;

            openPhotoModal(originalSrc, caption.textContent);
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
