// scripts.js

// ----------------------
// Navigation Interactions
// ----------------------

// Smooth scroll for navigation links
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const targetId = this.getAttribute("href").slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Highlight active section in navigation
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === currentSection) {
      link.classList.add("active");
    }
  });
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navContainer = document.querySelector('.nav-container');
    const links = document.querySelectorAll('.nav-links a');

    // Hamburger menu toggle
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Sticky navigation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navContainer?.classList.add('scrolled');
        } else {
            navContainer?.classList.remove('scrolled');
        }
    });

    // Active state management
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // FAQ Accordion - Simplified and Fixed
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        button.addEventListener('click', () => {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                    otherItem.querySelector('.faq-icon').textContent = '+';
                }
            });

            // Toggle current FAQ
            const isOpen = answer.style.display === 'block';
            answer.style.display = isOpen ? 'none' : 'block';
            button.querySelector('.faq-icon').textContent = isOpen ? '+' : '-';
        });
    });

    // Mobile Navigation
    // Using previously declared hamburger and navLinks
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').slice(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Loading spinner functionality
    const showLoading = () => {
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) {
            spinner.style.display = 'block';
            document.body.classList.add('loading');
        }
    };

    const hideLoading = () => {
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) {
            spinner.style.display = 'none';
            document.body.classList.remove('loading');
        }
    };

    // Add loading state to navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.getAttribute('href').startsWith('#')) {
                showLoading();
            }
        });
    });
});

// ----------------------
// Stripe Donation Handling
// ----------------------

// Initialize Stripe with your publishable key
const stripeKey = "your-publishable-key-here"; // Replace with your Stripe publishable key
if (stripeKey) {
  const stripe = Stripe(stripeKey);

  // Handle donation buttons
  document.querySelectorAll(".donate-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const amount = event.target.getAttribute("data-amount"); // Donation amount in cents

      // Redirect to Stripe Checkout
      stripe
        .redirectToCheckout({
          lineItems: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Donation to Lewis County Elks Rugby Club",
                  description: "Support our club!",
                },
                unit_amount: amount,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          successUrl: "https://your-github-pages-site/success.html", // Replace with your success page URL
          cancelUrl: "https://your-github-pages-site/cancel.html", // Replace with your cancel page URL
        })
        .then((result) => {
          if (result.error) {
            alert(result.error.message);
          }
        });
    });
  });
}

// ----------------------
// Form Handling
// ----------------------

// Handle form submission and redirect to success page
const registrationForm = document.getElementById("registrationForm");
if (registrationForm) {
  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    // Collect form data (optional: you can log it for debugging)
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    console.log("Form Submitted:", formObject);

    // Display confirmation alert (optional)
    alert("Thank you for registering! Redirecting to confirmation page...");

    // Redirect to success page
    window.location.href = "success.html";
  });
}

// ----------------------
// Success Page Animation (Optional)
// ----------------------

document.addEventListener("DOMContentLoaded", () => {
  const thankYouMessage = document.getElementById("thankYouMessage");
  if (thankYouMessage) {
    thankYouMessage.classList.add("fade-in"); // Example animation class
  }
});

// ----------------------
// FAQ Toggle with Icons
// ----------------------

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    faqItem.classList.toggle('open');
    
    const icon = button.querySelector('.faq-icon');
    icon.textContent = faqItem.classList.contains('open') ? '-' : '+';
  });
});

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const answer = button.nextElementSibling;
        const icon = button.querySelector('.faq-icon');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem && item.querySelector('.faq-answer').hasAttribute('hidden') === false) {
                item.querySelector('.faq-answer').hidden = true;
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                item.querySelector('.faq-icon').textContent = '+';
            }
        });

        // Toggle current FAQ item
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        answer.hidden = isExpanded;
        icon.textContent = isExpanded ? '+' : '-';
    });
});

// ----------------------
// Loading State Management
// ----------------------

const showLoading = () => {
  document.querySelector('.loading-spinner').style.display = 'block';
  document.body.classList.add('loading');
};

const hideLoading = () => {
  document.querySelector('.loading-spinner').style.display = 'none';
  document.body.classList.remove('loading');
};

// Add loading state to navigation
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (!link.getAttribute('href').startsWith('#')) {
      showLoading();
    }
  });
});

// Add loading state to form submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  showLoading();
  // Simulate form submission
  setTimeout(() => {
    hideLoading();
    alert('Message sent successfully!');
  }, 1000);
});

// ----------------------
// Tooltip Initialization
// ----------------------

document.querySelectorAll('[data-tooltip]').forEach(element => {
  element.addEventListener('mouseenter', (e) => {
    const tooltip = e.target.getAttribute('data-tooltip');
    // Tooltip logic handled by CSS
  });
});
