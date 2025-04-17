document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const gallery = document.getElementById('gallery');
    const gridViewBtn = document.getElementById('grid-view');
    const masonryViewBtn = document.getElementById('masonry-view');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const loadMoreBtn = document.getElementById('load-more');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-nav.prev');
    const lightboxNext = document.querySelector('.lightbox-nav.next');
    
    // Variables
    let currentCategory = 'all';
    let currentIndex = 0;
    let filteredItems = [];
    let isLoading = false;
    
    // Initialize gallery items with animation delay
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.setProperty('--animation-order', index);
        
        // Add event listener to view button
        const viewBtn = item.querySelector('.view-btn');
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(item);
        });
        
        // Add event listener to like button
        const likeBtn = item.querySelector('.like-btn');
        likeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleLike(likeBtn);
        });
        
        // Add event listener to share button
        const shareBtn = item.querySelector('.share-btn');
        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            shareItem(item);
        });
        
        // Add event listener to the whole item
        item.addEventListener('click', () => {
            openLightbox(item);
        });
    });
    
    // Toggle view buttons
    gridViewBtn.addEventListener('click', function() {
        gallery.className = 'gallery grid-view';
        gridViewBtn.classList.add('active');
        masonryViewBtn.classList.remove('active');
    });
    
    masonryViewBtn.addEventListener('click', function() {
        gallery.className = 'gallery masonry-view';
        masonryViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filterValue = btn.getAttribute('data-filter');
            currentCategory = filterValue;
            
            // Filter items
            filterGallery();
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', debounce(() => {
        filterGallery();
    }, 300));
    
    // Load more functionality
    loadMoreBtn.addEventListener('click', () => {
        if (isLoading) return;
        
        isLoading = true;
        loadMoreBtn.querySelector('span').style.display = 'none';
        loadMoreBtn.querySelector('i').style.display = 'inline-block';
        
        // Simulate loading delay
        setTimeout(() => {
            loadMoreImages();
            isLoading = false;
            loadMoreBtn.querySelector('span').style.display = 'inline-block';
            loadMoreBtn.querySelector('i').style.display = 'none';
        }, 1000);
    });
    
    // Lightbox functionality
    function openLightbox(item) {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const category = item.querySelector('.item-category').textContent;
        
        lightboxImage.src = img.src;
        lightboxTitle.textContent = title;
        lightboxCategory.textContent = category;
        
        // Get current index and filtered items for navigation
        filteredItems = getFilteredItems();
        currentIndex = filteredItems.indexOf(item);
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Lightbox navigation
    lightboxPrev.addEventListener('click', () => {
        navigateLightbox('prev');
    });
    
    lightboxNext.addEventListener('click', () => {
        navigateLightbox('next');
    });
    
    function navigateLightbox(direction) {
        if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        } else {
            currentIndex = (currentIndex + 1) % filteredItems.length;
        }
        
        const item = filteredItems[currentIndex];
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const category = item.querySelector('.item-category').textContent;
        
        // Fade out effect
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = img.src;
            lightboxTitle.textContent = title;
            lightboxCategory.textContent = category;
            lightboxImage.style.opacity = '1';
        }, 300);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox('prev');
        } else if (e.key === 'ArrowRight') {
            navigateLightbox('next');
        }
    });
    
    // Helper functions
    function filterGallery() {
        const searchTerm = searchInput.value.toLowerCase();
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
            const category = item.getAttribute('data-category');
            const title = item.querySelector('h3').textContent.toLowerCase();
            const matchesCategory = currentCategory === 'all' || category === currentCategory;
            const matchesSearch = title.includes(searchTerm);
            
            if (matchesCategory && matchesSearch) {
                item.style.display = '';
                // Reset animation
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                item.style.animation = null;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Update filtered items for lightbox navigation
        filteredItems = getFilteredItems();
    }
    
    function getFilteredItems() {
        return Array.from(document.querySelectorAll('.gallery-item')).filter(item => {
            return item.style.display !== 'none';
        });
    }
    
    function toggleLike(btn) {
        btn.classList.toggle('liked');
        const icon = btn.querySelector('i');
        
        if (btn.classList.contains('liked')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#e74c3c';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '';
        }
    }
    
    function shareItem(item) {
        const title = item.querySelector('h3').textContent;
        alert(`Sharing "${title}" functionality would be implemented here.`);
    }
    
    function loadMoreImages() {
        // Clone existing items to simulate loading more
        const existingItems = document.querySelectorAll('.gallery-item');
        const itemsToClone = Array.from(existingItems).slice(0, 4);
        
        itemsToClone.forEach((item, index) => {
            const clone = item.cloneNode(true);
            const newIndex = existingItems.length + index;
            
            // Update animation order
            clone.style.setProperty('--animation-order', newIndex);
            
            // Update image to make it look different
            const img = clone.querySelector('img');
            const randomParam = Math.floor(Math.random() * 1000);
            const currentSrc = img.src.split('?')[0];
            img.src = `${currentSrc}?sig=${randomParam}`;
            
            // Add event listeners to the clone
            const viewBtn = clone.querySelector('.view-btn');
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(clone);
            });
            
            const likeBtn = clone.querySelector('.like-btn');
            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleLike(likeBtn);
            });
            
            const shareBtn = clone.querySelector('.share-btn');
            shareBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                shareItem(clone);
            });
            
            clone.addEventListener('click', () => {
                openLightbox(clone);
            });
            
            gallery.appendChild(clone);
        });
        
        // Apply filter to new items
        filterGallery();
    }
    
    // Debounce function for search input
    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }
});