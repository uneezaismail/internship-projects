document.addEventListener('DOMContentLoaded', function() {

    var swiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        spaceBetween: 20,
        initialSlide: 0, 
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
           
            1024: {
                slidesPerView: 4, 
            },
         
            600: {
                slidesPerView: 2, 
            },
       
            0: {
                slidesPerView: 1, 
            }
        }
    });
    
 
    window.addEventListener('resize', function() {
        setTimeout(() => {
            if (swiper) {
                swiper.update();
                
              
                const slides = document.querySelectorAll('.swiper-slide');
                slides.forEach(slide => {
                    slide.style.opacity = '1';
                    slide.style.visibility = 'visible';
                });
            }
        }, 100);
    });
});



document.addEventListener('DOMContentLoaded', function () {
  const services = document.querySelectorAll('.service');

  services.forEach(service => {
    const header = service.querySelector('.service-header');
    header.addEventListener('click', () => {
      service.classList.toggle('active');
    });
  });
});

