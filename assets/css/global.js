class NavigationHideReveal {
    constructor() {
        this.nav = document.querySelector('nav, .navbar, .navigation, header'); // Adjust selector as needed
        this.lastScrollY = window.scrollY;
        this.scrollThreshold = 100; // pixels from top of page
        this.hidden = false;
        this.navHeight = 0;
        
        this.init();
    }
    
    init() {
        if (!this.nav) {
            console.warn('Navigation element not found');
            return;
        }
        
        // Get navigation height
        this.navHeight = this.nav.offsetHeight;
        
        // Check initial state on load
        this.checkTopPosition();
        
        // Add scroll event listener
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Re-check on resize
        window.addEventListener('resize', () => {
            this.navHeight = this.nav.offsetHeight;
            this.checkTopPosition();
        });
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Check if we're in top 100px of the PAGE (not viewport)
        this.checkTopPosition();
        
        // Apply hide/reveal logic based on scroll direction and position
        if (currentScrollY > this.scrollThreshold) {
            if (currentScrollY > this.lastScrollY && !this.hidden) {
                // Scrolling down - hide navigation
                this.hideNavigation();
            } else if (currentScrollY < this.lastScrollY && this.hidden) {
                // Scrolling up - reveal navigation
                this.revealNavigation();
            }
        } else {
            // In top 100px of page - always show navigation
            if (this.hidden) {
                this.revealNavigation();
            }
        }
        
        this.lastScrollY = currentScrollY;
    }
    
    checkTopPosition() {
        if (!this.nav) return;
        
        const currentScrollY = window.scrollY;
        const isInTop100px = currentScrollY <= this.scrollThreshold;
        
        // Add/remove classes based on position in page
        if (isInTop100px) {
            this.nav.classList.add('in-top-section');
            this.nav.classList.remove('not-in-top-section');
        } else {
            this.nav.classList.add('not-in-top-section');
            this.nav.classList.remove('in-top-section');
        }
        
        return isInTop100px;
    }
    
    hideNavigation() {
        this.nav.style.transform = 'translateY(-100%)';
        this.nav.classList.add('nav-hidden');
        this.nav.classList.remove('nav-visible');
        this.hidden = true;
    }
    
    revealNavigation() {
        this.nav.style.transform = 'translateY(0)';
        this.nav.classList.add('nav-visible');
        this.nav.classList.remove('nav-hidden');
        this.hidden = false;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new NavigationHideReveal();
});

// Togle Menu
document.querySelectorAll('.toggle-menu').forEach(element => {
    console.log('test')
    element.addEventListener('click', () => {
        console.log('clicked')
        document.querySelector('body').classList.toggle('menu-open');
    });
});