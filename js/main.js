/* ========================================
   THE DAILY LOAF - MAIN JAVASCRIPT
   Description: Form handling and mobile menu
   ======================================== */

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- MOBILE MENU TOGGLE ----------
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // ---------- ORDER FORM HANDLING ----------
    const orderForm = document.getElementById('orderForm');
    const orderMessage = document.getElementById('order-message');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const phone = document.getElementById('phone')?.value || '';
            const pickupDate = document.getElementById('pickup-date')?.value || '';
            const pickupTime = document.getElementById('pickup-time')?.value || '';
            
            // Get selected items
            const checkboxes = document.querySelectorAll('input[name="item"]:checked');
            const selectedItems = Array.from(checkboxes).map(cb => cb.value);
            
            // Validation
            if (!name || !email || !phone || !pickupDate || !pickupTime) {
                showMessage(orderMessage, 'Please fill in all required fields.', 'error');
                return;
            }
            
            if (selectedItems.length === 0) {
                showMessage(orderMessage, 'Please select at least one item to order.', 'error');
                return;
            }
            
            // Success message
            showMessage(orderMessage, 
                `Thank you ${name}! Your order has been received. We'll send confirmation to ${email}. Pickup: ${pickupDate} at ${pickupTime}.`, 
                'success'
            );
            
            // Reset form (optional)
            // orderForm.reset();
        });
    }
    
    // ---------- CONTACT FORM HANDLING ----------
    const contactForm = document.getElementById('contactForm');
    const contactMessage = document.getElementById('contact-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contact-name')?.value || '';
            const email = document.getElementById('contact-email')?.value || '';
            const subject = document.getElementById('subject')?.value || '';
            const message = document.getElementById('message')?.value || '';
            
            if (!name || !email || !subject || !message) {
                showMessage(contactMessage, 'Please fill in all fields.', 'error');
                return;
            }
            
            showMessage(contactMessage, 
                `Thanks ${name}! We've received your message and will respond within 24 hours.`, 
                'success'
            );
            
            // contactForm.reset();
        });
    }
    
    // Helper function to show messages
    function showMessage(element, message, type) {
        if (!element) return;
        
        element.style.display = 'block';
        element.innerHTML = message;
        element.style.padding = '12px';
        element.style.borderRadius = '6px';
        element.style.marginTop = '1rem';
        
        if (type === 'success') {
            element.style.backgroundColor = '#d4edda';
            element.style.color = '#155724';
            element.style.border = '1px solid #c3e6cb';
        } else {
            element.style.backgroundColor = '#f8d7da';
            element.style.color = '#721c24';
            element.style.border = '1px solid #f5c6cb';
        }
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
    
    // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // ---------- CURRENT YEAR IN FOOTER (AUTOMATIC UPDATE) ----------
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
    }
    
    console.log('The Daily Loaf website loaded successfully!');
});