/* ========================================
   THE DAILY LOAF - MAIN JAVASCRIPT
   Description: Form handling and mobile menu
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // MOBILE MENU TOGGLE
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // ORDER FORM HANDLING
    const orderForm = document.getElementById('orderForm');
    const orderMessage = document.getElementById('order-message');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const phone = document.getElementById('phone')?.value || '';
            const pickupLocation = document.getElementById('pickup-location')?.value || '';
            const pickupDate = document.getElementById('pickup-date')?.value || '';
            const pickupTime = document.getElementById('pickup-time')?.value || '';
            
            const checkboxes = document.querySelectorAll('input[name="item"]:checked');
            const selectedItems = Array.from(checkboxes).map(cb => cb.value);
            
            if (!name || !email || !phone || !pickupLocation || !pickupDate || !pickupTime) {
                showMessage(orderMessage, 'Please fill in all required fields.', 'error');
                return;
            }
            
            if (selectedItems.length === 0) {
                showMessage(orderMessage, 'Please select at least one item to order.', 'error');
                return;
            }
            
            showMessage(orderMessage, 
                `Thank you ${name}! Your order has been received. Pickup at ${pickupLocation} on ${pickupDate} at ${pickupTime}. Confirmation sent to ${email}.`, 
                'success'
            );
            
            orderForm.reset();
        });
    }
    
    // CONTACT FORM HANDLING
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
            
            contactForm.reset();
        });
    }
    
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
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
    
    console.log('The Daily Loaf - Part 2 loaded successfully!');
});