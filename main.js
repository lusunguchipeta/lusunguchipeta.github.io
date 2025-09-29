// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out',
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    const isHidden = mobileMenu.style.display === 'none';
    mobileMenu.style.display = isHidden ? 'block' : 'none';
    mobileMenuButton.innerHTML = isHidden 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('shadow-2xl', 'bg-gray-900');
    } else {
        header.classList.remove('shadow-2xl', 'bg-gray-900');
    }
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                // Re-trigger AOS animation
                card.classList.remove('aos-animate');
                setTimeout(() => {
                    card.classList.add('aos-animate');
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    const rate = scrolled * 0.5;
    
    hero.style.transform = `translateY(${rate}px)`;
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loading bar if exists
    const loadingBar = document.querySelector('.loading-bar');
    if (loadingBar) {
        loadingBar.style.width = '100%';
        setTimeout(() => {
            loadingBar.style.opacity = '0';
        }, 500);
    }
});

// Add loading bar to page
const loadingBar = document.createElement('div');
loadingBar.className = 'loading-bar';
document.body.appendChild(loadingBar);

// Update loading bar on route changes
window.addEventListener('beforeunload', () => {
    loadingBar.style.width = '0%';
});

// Cursor follower effect
const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.background = 'rgba(59, 130, 246, 0.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.background = 'rgba(59, 130, 246, 0.3)';
    });
});

// Typing effect for hero section
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

// Initialize typing effect after page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('#home h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'fixed top-0 left-0 h-1 bg-blue-600 z-50';
progressBar.style.width = '0%';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Add page transition animations
function createPageTransition() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    return transition;
}

// Enhanced touch gestures for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchEndY - touchStartY;
    
    if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
            // Swipe down - scroll to previous section
            scrollToPreviousSection();
        } else {
            // Swipe up - scroll to next section
            scrollToNextSection();
        }
    }
}

function scrollToNextSection() {
    const sections = document.querySelectorAll('section');
    const currentSection = getCurrentSection();
    const nextSection = sections[Array.from(sections).indexOf(currentSection) + 1];
    
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToPreviousSection() {
    const sections = document.querySelectorAll('section');
    const currentSection = getCurrentSection();
    const prevSection = sections[Array.from(sections).indexOf(currentSection) - 1];
    
    if (prevSection) {
        prevSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    let currentSection = sections[0];
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
            currentSection = section;
        }
    });
    
    return currentSection;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToNextSection();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToPreviousSection();
    }
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('Portfolio website loaded successfully! 🚀');