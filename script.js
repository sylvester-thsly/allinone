// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 AllInOne JavaScript initialized');
    
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initButtonInteractions();
    initPricingToggle();
    
    console.log('✅ All initialization complete');
});

// Enhanced Professional Navigation functionality
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links .nav-link');
    let lastScrollTop = 0;
    
    // Enhanced navbar scroll effects
    window.addEventListener('scroll', function() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (currentScrollTop > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show navigation on scroll
        if (currentScrollTop > lastScrollTop && currentScrollTop > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });
    
    // Mobile menu functionality
    if (navToggle && mobileMenu && navOverlay) {
        // Toggle mobile menu
        function toggleMobileMenu() {
            const isActive = mobileMenu.classList.contains('active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
        
        function openMobileMenu() {
            navToggle.classList.add('active');
            mobileMenu.classList.add('active');
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Add staggered animation to menu items
            mobileNavLinks.forEach((link, index) => {
                link.style.transform = 'translateX(50px)';
                link.style.opacity = '0';
                setTimeout(() => {
                    link.style.transform = 'translateX(0)';
                    link.style.opacity = '1';
                }, index * 100 + 200);
            });
        }
        
        function closeMobileMenu() {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset menu item animations
            mobileNavLinks.forEach(link => {
                link.style.transform = '';
                link.style.opacity = '';
            });
        }
        
        // Event listeners
        navToggle.addEventListener('click', toggleMobileMenu);
        navOverlay.addEventListener('click', closeMobileMenu);
        
        // Close menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
                
                // Smooth scroll to target if it's an anchor link
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    setTimeout(() => {
                        const target = document.querySelector(href);
                        if (target) {
                            const navHeight = nav.offsetHeight;
                            const targetPosition = target.offsetTop - navHeight - 20;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 300);
                }
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1023 && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Prevent scrolling when menu is open
        window.addEventListener('touchmove', function(e) {
            if (mobileMenu.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
    }
}

// Scroll effects and animations
function initScrollEffects() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .tool-category, .stat-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize animations
function initAnimations() {
    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-item h3');
    
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Extract number from target (remove +, %, etc.)
            const numMatch = target.match(/[\d.]+/);
            const targetNum = numMatch ? parseFloat(numMatch[0]) : 0;
            
            const current = Math.floor(progress * targetNum);
            
            // Preserve the original format (1M+, 99.9%, etc.)
            element.textContent = target.replace(/[\d.]+/, current.toString());
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target.textContent;
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Floating cards animation enhancement
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
        
        // Add mouse hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Button interactions
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Tool item interactions
    const toolItems = document.querySelectorAll('.tool-item');
    console.log('🔍 Found tool items:', toolItems.length);
    
    toolItems.forEach((item, index) => {
        const toolName = item.querySelector('span')?.textContent?.trim();
        console.log(`🔍 Initializing tool ${index + 1}:`, `"${toolName}"`);
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
        
        // Add proper click navigation
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const toolName = this.querySelector('span').textContent.trim();
            
            // Debug logging
            console.log('🔍 Tool clicked:', `"${toolName}"`);
            console.log('🔍 Tool name length:', toolName.length);
            
            // Map tool names to their file paths
            const toolMap = {
                'Document Converter': 'tools/file/document-converter.html',
                'Image Converter': 'tools/file/image-converter.html',
                'PDF Tools': 'tools/file/pdf-tools.html',
                'Archive Extractor': 'tools/file/archive-extractor.html',
                'Video Converter': 'tools/media/video-converter.html',
                'Audio Converter': 'tools/media/audio-converter.html',
                'Video Compressor': 'tools/media/video-compressor.html',
                'YouTube Downloader': 'tools/media/youtube-downloader.html',
                'QR Code Generator': 'tools/generator/qr-generator.html',
                'Barcode Generator': 'tools/generator/barcode-generator.html',
                'Password Generator': 'tools/generator/password-generator.html',
                'Lorem Ipsum Generator': 'tools/generator/lorem-generator.html'
            };
            
            const toolPath = toolMap[toolName];
            
            console.log('🔍 Available tools:', Object.keys(toolMap));
            console.log('🔍 Looking for path:', toolPath);
            
            if (toolPath) {
                console.log('✅ Navigating to:', toolName, 'at', toolPath);
                try {
                    window.open(toolPath, '_blank');
                    console.log('✅ Window.open called successfully');
                } catch (error) {
                    console.error('❌ Error opening window:', error);
                    // Fallback: try to navigate in the same window
                    window.location.href = toolPath;
                }
            } else {
                console.error('❌ Tool path not found for:', `"${toolName}"`);
                console.error('❌ This tool name is not in the mapping');
                
                // Show an alert for debugging
                alert(`Tool "${toolName}" not found in mapping. Check console for details.`);
            }
        });
    });
}

// Enhanced Professional Pricing Toggle functionality
function initPricingToggle() {
    const pricingToggle = document.getElementById('pricing-toggle') || document.querySelector('.toggle-input');
    if (!pricingToggle) return;
    
    console.log('🔧 Initializing enhanced pricing toggle');
    
    // Get all pricing elements
    const monthlyAmounts = document.querySelectorAll('.amount.monthly, .monthly-price');
    const annualAmounts = document.querySelectorAll('.amount.annual, .annual-price');
    const monthlyNotes = document.querySelectorAll('.pricing-note.monthly');
    const annualNotes = document.querySelectorAll('.pricing-note.annual');
    const toggleLabels = document.querySelectorAll('.toggle-label');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    // Add smooth transition styles
    const style = document.createElement('style');
    style.textContent = `
        .pricing-card {
            transition: opacity 0.3s ease, transform 0.2s ease !important;
        }
        .amount, .monthly-price, .annual-price {
            transition: opacity 0.3s ease, transform 0.2s ease !important;
        }
        .toggle-label {
            transition: all 0.3s ease !important;
            opacity: 0.7;
        }
        .toggle-label.active {
            opacity: 1;
            font-weight: 700;
            color: var(--text-primary, #0f172a);
        }
        .pricing-toggle-animation {
            opacity: 0.8;
            transform: scale(0.98);
        }
    `;
    document.head.appendChild(style);
    
    pricingToggle.addEventListener('change', function() {
        const isAnnual = this.checked;
        
        console.log('💰 Pricing toggle changed:', isAnnual ? 'Annual' : 'Monthly');
        
        // Add loading animation to pricing cards
        pricingCards.forEach(card => {
            card.classList.add('pricing-toggle-animation');
        });
        
        // Update prices with smooth transition
        setTimeout(() => {
            if (isAnnual) {
                // Show annual pricing
                monthlyAmounts.forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        el.style.display = 'none';
                    }, 150);
                });
                
                setTimeout(() => {
                    annualAmounts.forEach(el => {
                        el.style.display = 'inline';
                        el.style.opacity = '0';
                        el.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'scale(1)';
                        }, 50);
                    });
                }, 150);
                
                monthlyNotes.forEach(el => el.style.display = 'none');
                annualNotes.forEach(el => el.style.display = 'block');
            } else {
                // Show monthly pricing
                annualAmounts.forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        el.style.display = 'none';
                    }, 150);
                });
                
                setTimeout(() => {
                    monthlyAmounts.forEach(el => {
                        el.style.display = 'inline';
                        el.style.opacity = '0';
                        el.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'scale(1)';
                        }, 50);
                    });
                }, 150);
                
                annualNotes.forEach(el => el.style.display = 'none');
                monthlyNotes.forEach(el => el.style.display = 'block');
            }
            
            // Update toggle label styles
            toggleLabels.forEach((label, index) => {
                const text = label.textContent.toLowerCase();
                const isMonthlyLabel = text.includes('monthly') || text.includes('month');
                const isAnnualLabel = text.includes('annual') || text.includes('year');
                
                if ((isMonthlyLabel && !isAnnual) || (isAnnualLabel && isAnnual)) {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            });
            
            // Reset card animations
            setTimeout(() => {
                pricingCards.forEach(card => {
                    card.classList.remove('pricing-toggle-animation');
                });
            }, 300);
        }, 50);
        
        // Add haptic feedback on mobile devices
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
        
        // Track pricing toggle interaction
        console.log('📊 User toggled pricing:', isAnnual ? 'Annual (20% savings)' : 'Monthly');
    });
    
    // Initialize toggle state
    const initialState = pricingToggle.checked;
    toggleLabels.forEach((label, index) => {
        const text = label.textContent.toLowerCase();
        const isMonthlyLabel = text.includes('monthly') || text.includes('month');
        const isAnnualLabel = text.includes('annual') || text.includes('year');
        
        if ((isMonthlyLabel && !initialState) || (isAnnualLabel && initialState)) {
            label.classList.add('active');
        }
    });
}

// Utility functions
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

// Smooth reveal animation for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        if (scrollY > sectionTop - windowHeight + sectionHeight * 0.25) {
            section.classList.add('revealed');
        }
    });
}

// Throttled scroll listener
window.addEventListener('scroll', debounce(revealOnScroll, 10));

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroGraphic = document.querySelector('.hero-graphic');
    
    if (heroGraphic) {
        const speed = scrolled * 0.5;
        heroGraphic.style.transform = `translateY(${speed}px)`;
    }
});

// Add CSS for additional animations
const additionalStyles = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.nav-menu.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.nav-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
}

.nav-toggle.active span:nth-child(2) {
    opacity: 0;
}

.nav-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
}

.navbar.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.animate {
    animation: fadeInUp 0.8s ease-out;
}

section.revealed {
    opacity: 1;
    transform: translateY(0);
}

.floating-card {
    transition: transform 0.3s ease;
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .nav-menu.active {
        display: flex;
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Lazy loading for images (if any are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading function
lazyLoadImages();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && callback) {
        callback(element);
    }
    return element;
}

// Console welcome message
console.log(`
🚀 Welcome to AllInOne!
Built with ❤️ for productivity and convenience.
`);

// Export functions for potential future modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initScrollEffects,
        initAnimations,
        initButtonInteractions
    };
}

// Professional AllInOne Platform JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all professional features
    initMobileMenu();
    initAnimatedCounters();
    initSmoothScrolling();
    initIntersectionObserver();
    initProfessionalAnimations();
    initNavigationEffects();
});

// Mobile Navigation
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav-menu-open');
            this.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
}

// Animated Statistics Counter
function initAnimatedCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const start = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutExpo = 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(target * easeOutExpo);
            
            // Format large numbers with commas
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                entry.target.setAttribute('data-animated', 'true');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Smooth Scrolling for Internal Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Professional Intersection Observer Animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.feature-highlight, .stat-item, .tool-category');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('.overview, .live-stats, .testimonials, .features-grid, .tools-grid');
    sections.forEach(section => observer.observe(section));
}

// Professional Animation Effects
function initProfessionalAnimations() {
    // Progress bar animations
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => progressObserver.observe(bar));
    
    // Dashboard floating animation
    const dashboard = document.querySelector('.dashboard-preview');
    if (dashboard) {
        let mouseX = 0;
        let mouseY = 0;
        let dashboardX = 0;
        let dashboardY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 100;
            mouseY = (e.clientY / window.innerHeight) * 100;
        });
        
        function animateDashboard() {
            dashboardX += (mouseX * 0.01 - dashboardX) * 0.1;
            dashboardY += (mouseY * 0.01 - dashboardY) * 0.1;
            
            dashboard.style.transform = `translate(${dashboardX}px, ${dashboardY}px) perspective(1000px) rotateX(${dashboardY * 0.1}deg) rotateY(${dashboardX * 0.1}deg)`;
            
            requestAnimationFrame(animateDashboard);
        }
        
        animateDashboard();
    }
}

// Navigation Effects
function initNavigationEffects() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    function updateNavigation() {
        const currentScrollY = window.scrollY;
        
        if (nav) {
            // Add/remove scrolled class
            if (currentScrollY > 50) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
            
            // Hide/show navigation on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                nav.classList.add('nav-hidden');
            } else {
                nav.classList.remove('nav-hidden');
            }
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', updateNavigation, { passive: true });
    
    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('nav-link-active');
        }
    });
}

// Professional Button Interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        createRippleEffect(e.target, e);
    }
});

function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add CSS for animations
const professionalStyles = `
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

.animate-in {
    animation: slideInUp 0.8s ease forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.nav-scrolled {
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(20px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.nav-hidden {
    transform: translateY(-100%);
}

.nav {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link-active {
    color: var(--primary-600) !important;
    font-weight: 600;
}

.nav-link-active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--primary-600);
    border-radius: 1px;
}

.nav-menu-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.mobile-menu-toggle.active {
    transform: rotate(90deg);
}

/* Professional Loading States */
.loading {
    position: relative;
    overflow: hidden;
}

.loading::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: loading-shimmer 2s infinite;
}

@keyframes loading-shimmer {
    100% {
        left: 100%;
    }
}

/* Enhanced Hover Effects */
.feature-highlight, .stat-item, .testimonial-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-visual {
    perspective: 1000px;
}

.dashboard-preview {
    transform-style: preserve-3d;
    transition: transform 0.1s ease-out;
}

/* Professional Focus States */
.btn:focus,
.nav-link:focus {
    outline: 2px solid var(--primary-500);
    outline-offset: 2px;
}

/* Accessibility Improvements */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`;

// Inject professional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = professionalStyles;
document.head.appendChild(styleSheet);

// Professional Performance Monitoring
const performanceMetrics = {
    startTime: performance.now(),
    
    logPageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            console.log(`Professional platform loaded in ${loadTime.toFixed(2)}ms`);
        });
    },
    
    trackUserEngagement() {
        let engagementTime = 0;
        let isVisible = true;
        
        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
        });
        
        setInterval(() => {
            if (isVisible) engagementTime++;
        }, 1000);
        
        window.addEventListener('beforeunload', () => {
            console.log(`User engagement time: ${engagementTime} seconds`);
        });
    }
};

performanceMetrics.logPageLoad();
performanceMetrics.trackUserEngagement(); 