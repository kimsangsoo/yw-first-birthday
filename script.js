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

// Gallery modal functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryMoreBtn = document.querySelector('.gallery-more-btn');

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-image">
                    <div class="image-placeholder">
                        <i class="fas fa-camera"></i>
                        <p>사진 ${index + 1}</p>
                        <small>실제 사진으로 교체해주세요</small>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .gallery-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            }
            .modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                background: white;
                border-radius: 20px;
                overflow: hidden;
                animation: scaleIn 0.3s ease;
            }
            .close-modal {
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 2rem;
                color: white;
                cursor: pointer;
                z-index: 2001;
                background: rgba(0, 0, 0, 0.5);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-image {
                width: 100%;
                height: 400px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .image-placeholder {
                text-align: center;
                color: #666;
            }
            .image-placeholder i {
                font-size: 4rem;
                margin-bottom: 1rem;
                color: #ff6b6b;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes scaleIn {
                from { transform: scale(0.8); }
                to { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', () => {
            modal.remove();
            style.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                style.remove();
            }
        });
    });
});

// Gallery "더 보기" button
galleryMoreBtn.addEventListener('click', () => {
    // Add more gallery items
    const galleryGrid = document.querySelector('.gallery-grid');
    const currentItems = galleryGrid.children.length;
    
    for (let i = 0; i < 6; i++) {
        const newItem = document.createElement('div');
        newItem.className = 'gallery-item';
        newItem.innerHTML = `
            <div class="gallery-placeholder">
                <i class="fas fa-camera"></i>
                <p>사진 ${currentItems + i + 1}</p>
            </div>
        `;
        
        // Add click event to new items
        newItem.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'gallery-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="modal-image">
                        <div class="image-placeholder">
                            <i class="fas fa-camera"></i>
                            <p>사진 ${currentItems + i + 1}</p>
                            <small>실제 사진으로 교체해주세요</small>
                        </div>
                    </div>
                </div>
            `;
            
            // Add the same modal styles and functionality
            const style = document.createElement('style');
            style.textContent = `
                .gallery-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    animation: fadeIn 0.3s ease;
                }
                .modal-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    animation: scaleIn 0.3s ease;
                }
                .close-modal {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    font-size: 2rem;
                    color: white;
                    cursor: pointer;
                    z-index: 2001;
                    background: rgba(0, 0, 0, 0.5);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modal-image {
                    width: 100%;
                    height: 400px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .image-placeholder {
                    text-align: center;
                    color: #666;
                }
                .image-placeholder i {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                    color: #ff6b6b;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.8); }
                    to { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(modal);
            
            const closeModal = modal.querySelector('.close-modal');
            closeModal.addEventListener('click', () => {
                modal.remove();
                style.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                    style.remove();
                }
            });
        });
        
        galleryGrid.appendChild(newItem);
    }
    
    // Hide the "더 보기" button after adding items
    galleryMoreBtn.style.display = 'none';
});

// RSVP Button functionality
const rsvpBtn = document.querySelector('.rsvp-btn');
rsvpBtn.addEventListener('click', () => {
    // Create RSVP modal
    const modal = document.createElement('div');
    modal.className = 'rsvp-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>참석 여부 전달</h3>
            <form class="rsvp-form">
                <div class="form-group">
                    <label for="name">이름</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="phone">연락처</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="attendance">참석 여부</label>
                    <select id="attendance" name="attendance" required>
                        <option value="">선택해주세요</option>
                        <option value="yes">참석합니다</option>
                        <option value="no">참석하지 않습니다</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="message">메시지 (선택사항)</label>
                    <textarea id="message" name="message" rows="4" placeholder="해섬이에게 전하고 싶은 말씀을 남겨주세요"></textarea>
                </div>
                <button type="submit" class="submit-btn">전달하기</button>
            </form>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .rsvp-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        .rsvp-modal .modal-content {
            position: relative;
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            animation: scaleIn 0.3s ease;
        }
        .rsvp-modal .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 2rem;
            color: #666;
            cursor: pointer;
            z-index: 2001;
        }
        .rsvp-form {
            margin-top: 1rem;
        }
        .form-group {
            margin-bottom: 1.5rem;
        }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.8rem;
            border: 2px solid #e1e5e9;
            border-radius: 10px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #ff6b6b;
        }
        .submit-btn {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, #ff6b6b, #ffd93d);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .submit-btn:hover {
            transform: translateY(-2px);
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.8); }
            to { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
    
    // Form submission
    const form = modal.querySelector('.rsvp-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        alert(`감사합니다! ${data.name}님의 참석 여부가 전달되었습니다.\n\n참석: ${data.attendance === 'yes' ? '참석합니다' : '참석하지 않습니다'}\n메시지: ${data.message || '없음'}`);
        
        // Close modal
        modal.remove();
        style.remove();
    });
});

// Map button functionality
document.querySelectorAll('.map-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const btnText = btn.textContent;
        let mapUrl = '';
        
        switch(btnText) {
            case '티맵':
                mapUrl = 'https://tmapapi.sktelecom.com/main/app/web/routes?goalx=127.1234&goaly=35.1234&goalname=파티원코넬홀';
                break;
            case '카카오내비':
                mapUrl = 'https://map.kakao.com/link/search/파티원코넬홀';
                break;
            case '네이버지도':
                mapUrl = 'https://map.naver.com/v5/search/파티원코넬홀';
                break;
        }
        
        if (mapUrl) {
            window.open(mapUrl, '_blank');
        }
    });
});

// Add floating animation to floating elements
const floatingElements = document.querySelectorAll('.floating-heart, .floating-star, .floating-balloon');
floatingElements.forEach((element, index) => {
    // Randomize initial position and animation
    const randomX = Math.random() * 80 + 10; // 10% to 90%
    const randomY = Math.random() * 60 + 20; // 20% to 80%
    const randomDelay = Math.random() * 6;
    const randomDuration = 4 + Math.random() * 4; // 4 to 8 seconds
    
    element.style.left = randomX + '%';
    element.style.top = randomY + '%';
    element.style.animationDelay = randomDelay + 's';
    element.style.animationDuration = randomDuration + 's';
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
