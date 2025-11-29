// Burger Menu Toggle
const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.getElementById('navMenu');

if (burgerMenu && navMenu) {
    burgerMenu.addEventListener('click', function() {
        const isActive = burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        document.body.style.overflow = isActive ? 'hidden' : '';
        
        // Update aria-expanded for accessibility
        burgerMenu.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        burgerMenu.setAttribute('aria-label', isActive ? 'Закрыть меню навигации' : 'Открыть меню навигации');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            burgerMenu.setAttribute('aria-expanded', 'false');
            burgerMenu.setAttribute('aria-label', 'Открыть меню навигации');
        });
    });

    // Close menu when clicking on overlay
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !burgerMenu.contains(e.target)) {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            burgerMenu.setAttribute('aria-expanded', 'false');
            burgerMenu.setAttribute('aria-label', 'Открыть меню навигации');
        }
    });
}

// Smooth scroll for navigation links
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

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const telegram = formData.get('telegram');
    const name = formData.get('name');
    const message = formData.get('message');
    
    // Validate Telegram format (basic validation)
    const telegramRegex = /^@?[a-zA-Z0-9_]{5,32}$/;
    if (!telegramRegex.test(telegram.replace('@', ''))) {
        showMessage('Пожалуйста, введите корректный Telegram username (например: @username)', 'error');
        return;
    }
    
    // Simulate form submission
    showMessage('Отправка заявки...', 'success');
    
    // Simulate API call delay
    setTimeout(() => {
        // In a real application, you would send this data to a server
        console.log('Form submitted:', {
            telegram: telegram,
            name: name,
            message: message,
            timestamp: new Date().toISOString()
        });
        
        showMessage(
            `Спасибо, ${name}! Ваша заявка успешно отправлена. Мы свяжемся с вами в Telegram: ${telegram} в ближайшее время.`,
            'success'
        );
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }, 1500);
});

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .review-card, .step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effect to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Telegram input formatting
const telegramInput = document.getElementById('telegram');
if (telegramInput) {
    telegramInput.addEventListener('input', function(e) {
        let value = e.target.value;
        // Auto-add @ if user types without it
        if (value && !value.startsWith('@')) {
            // Don't auto-add if user is deleting
            if (value.length > 0) {
                // Only add @ if it's not already there and user is typing
                const cursorPos = e.target.selectionStart;
                if (cursorPos === value.length) {
                    // User is typing at the end
                    // We'll let them type naturally, but format on blur
                }
            }
        }
    });
    
    telegramInput.addEventListener('blur', function(e) {
        let value = e.target.value.trim();
        if (value && !value.startsWith('@')) {
            e.target.value = '@' + value;
        }
    });
}

