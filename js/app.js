function animateLogo() {
    TweenMax.fromTo(".react-logo", 2, {
        css: {
            y: '20px',
        }
    },{
        css: {
            y: '-20px',
        },
        repeat: -1,
        yoyo: true,
        ease: Power2.easeInOut,
    });
}

function animateRobot() {
    var t = new TimelineMax({yoyo: true, repeat: -1});
    t.to("#android-robot", 0.5, {rotation: "-30deg"})
        .to("#android-robot", 0.5, {rotation: "-60deg"});
}

function updateSliderControl() {
    var links = document.querySelectorAll("#slider-control a");
    for(var i = 0; i < links.length; i++) {
        var link = links[i];
        var section = document.querySelector(link.getAttribute('href'));
        var sectionTop = section.offsetTop;
        var sectionBottom = section.offsetHeight+sectionTop;

        // Check if window.scrollY is between the section.
        if(window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            link.className = "active";
        } else {
            link.className = "";
        }
    }
}
function scrollToElement(element) {
    var topOfElement = element.offsetTop;
    console.log(topOfElement);
    TweenMax.to(window,1,{
        scrollTo: {
            y: topOfElement,
        },
        ease: Power2.easeInOut,
    });
}

function addSmoothScrolling() {
    var links = document.querySelectorAll("#slider-control a");
    for(var i = 0; i < links.length; i++) {
        (function(link) {
            link.addEventListener("click",function(event) {
                event.preventDefault();
                var href = link.getAttribute('href');
                var section = document.querySelector(href);
                scrollToElement(section);
            });
        })(links[i]);
    }
}

function addScrollMagic() {
    var controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({
        triggerElement: "#native",
        triggerHook: "onEnter",
        duration: "100%"
    }).addTo(controller)
        .setTween("#scroll-overlay", 0.5, { opacity: 1 });

    new ScrollMagic.Scene({
        triggerElement: "#native",
        triggerHook: "onEnter",
        duration: "100%"
    }).addTo(controller)
        .setTween("#iphone-overlay", 1, { width: "50%", y: 0 });

    new ScrollMagic.Scene({
        triggerElement: "#native",
        triggerHook: "onLeave",
        duration: "100%"
    }).addTo(controller)
        .setPin("#iphone-overlay");

}

window.onscroll = function() {
    updateSliderControl();
};

window.onload = function() {
    animateLogo();
    animateRobot();
    updateSliderControl();
    addSmoothScrolling();
    addScrollMagic();
};