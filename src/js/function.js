//Fixed Header Animation

$(window).scroll(function() {
    $(this).scrollTop() > 10 ? $(".header").addClass("header--scroll") : $(".header").removeClass("header--scroll")
});

//Scroll To Top Animation

$(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
        $('.back-to-top').addClass('is-active');
    } else {
        $('.back-to-top').removeClass('is-active');
    }
});

$('.back-to-top').click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
    return false;
});

//On Scroll animation

wow = new WOW(
    {
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       150,          // default
    mobile:       true,       // default
    live:         true        // default
  }
)
  wow.init();

// Preloader

$(window).on('load', function() {
    if ($('.loader').length) {
        $('.loader').delay(100).fadeOut('slow', function() {
            $(this).remove();
        });
    }
});

//Carousel

$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    dots:false,
    autoplay:true,
    animateOut: 'softScaleOut',
    animateIn: 'softScaleIn',
    autoplayTimeout:4500,
    smartSpeed:2500,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:2.5
        }
    }
});

// $('.owl-carousel.header').owlCarousel({
//     loop:false,
//     items: 1.2,
//     lazyLoad: true,
//     nav: false,
//     dots: false,
//     mouseDrag: false,
//     touchDrag: false,
//     center: true,
//     autoplay: true,
//     autoplayTimeout: 8000,
//     lightbox: false,
//     margin : 50,
//     // animateOut: 'fadeOutKenBurns',
//     // animateIn: 'fadeInKenBurns'
//     animateOut: 'softScaleOut',
//     animateIn: 'softScaleIn',
//     responsiveClass:true,
//     responsive:{
//         0:{
//             items: 1
//         },
//         641:{
//             items: 1
//         },
//         768: {
//             items: 1
//         },
//         1025: {
//             items: 1.2
//         },
//         1280:{
//             items: 1.2
//         },
//         1360: {
//             items: 1.2
//         }
//     }
// });

// Mobile nav

$('.header__btn').click(function() {
    $('html').toggleClass('mn-open');
});

$('.mobile-nav__btn').click(function() {
    $('html').removeClass('mn-open');
});