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


/* ========================================
   PART 3 - NEW FUNCTIONALITY
   ======================================== */

// ---------- FAQ ACCORDION (Part 3) ----------
document.querySelectorAll('.faq-item').forEach(function(item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
        // Hide answers initially
        answer.style.display = 'none';
        answer.style.padding = '0 0 10px 0';
        answer.style.transition = 'all 0.3s ease';
        
        question.style.cursor = 'pointer';
        question.style.padding = '10px 0';
        question.style.margin = '0';
        question.style.fontSize = '1rem';
        question.style.color = '#8B5A2B';
        
        question.addEventListener('click', function() {
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(function(p) {
                if (p !== answer) {
                    p.style.display = 'none';
                }
            });
            
            // Toggle current answer
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    }
});

// ---------- MENU SEARCH (Part 3) ----------
const menuSearch = document.getElementById('menuSearch');
if (menuSearch) {
    menuSearch.addEventListener('keyup', function() {
        const filter = this.value.toLowerCase().trim();
        const menuItems = document.querySelectorAll('.menu-item');
        let foundCount = 0;
        
        menuItems.forEach(function(item) {
            const text = item.textContent.toLowerCase();
            if (filter === '' || text.includes(filter)) {
                item.style.display = 'flex';
                item.style.opacity = '1';
                foundCount++;
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
        
        // Show message if no results
        const existingMsg = document.querySelector('.search-result-msg');
        if (foundCount === 0 && filter !== '') {
            if (!existingMsg) {
                const msg = document.createElement('p');
                msg.className = 'search-result-msg';
                msg.style.textAlign = 'center';
                msg.style.padding = '20px';
                msg.style.color = '#999';
                msg.innerHTML = '😕 No menu items found for "' + filter + '"';
                menuSearch.parentNode.appendChild(msg);
            }
        } else {
            if (existingMsg) {
                existingMsg.remove();
            }
        }
    });
}

console.log('Part 3 features loaded successfully!');