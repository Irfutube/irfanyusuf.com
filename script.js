document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const links = document.querySelectorAll('a');
    
    // Check if device supports hover (ignores mobile touch devices for cursor logic)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice && cursor) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        // Smooth cursor follow
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const render = () => {
            // Lerp the cursor position for smoothness
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        
        // Hover effects for links
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    }

    // Magnetic Link Logic
    const magneticLinks = document.querySelectorAll('.magnetic-link');
    
    magneticLinks.forEach(link => {
        if (!isTouchDevice) {
            link.addEventListener('mousemove', (e) => {
                const position = link.getBoundingClientRect();
                const x = e.pageX - position.left - position.width / 2;
                const y = e.pageY - position.top - position.height / 2;
                
                // Subtle magnetic pull (reduced strength for a calmer effect)
                link.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            link.addEventListener('mouseleave', () => {
                // Reset transform
                link.style.transform = `translate(0px, 0px)`;
            });
        }
    });

    // Optional: Reveal animations via Intersection Observer if content extends beyond viewport
    const fadeElements = document.querySelectorAll('.fade-up');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The CSS animation handles the initial load, 
                // but if we were scrolling, we could add a class here
                // entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Theme Switcher Logic
    const themeBtn = document.getElementById('theme-toggle');
    const themeCSS = document.getElementById('theme-stylesheet');
    let isExperimental = false;

    themeBtn.addEventListener('click', () => {
        isExperimental = !isExperimental;
        if (isExperimental) {
            themeCSS.href = 'style.css';
            themeBtn.textContent = 'Switch to Calm';
        } else {
            themeCSS.href = 'style-calm.css';
            themeBtn.textContent = 'Switch to Experimental';
        }
    });

});
