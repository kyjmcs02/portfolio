$(document).ready(function () {

    const carousel = $(".contents_wrap");
    const barWidth = 39;

    function updateStatusBar(event) {

        if (!event.item) return;

        const totalItems = event.item.count;

        // loop로 생성된 복제 슬라이드를 제외한 실제 순서
        const currentItem = event.relatedTarget.relative(event.item.index);

        const barLeft =
            totalItems <= 1
                ? 0
                : (currentItem / (totalItems - 1)) * (100 - barWidth);

        carousel.css("--bar-left", barLeft + "%");
    }

    carousel.on(
        "initialized.owl.carousel translated.owl.carousel",
        updateStatusBar
    );

    carousel.owlCarousel({
        items: 5,
        margin: 24,
        loop: true,
        nav: false,
        dots: false,
        slideBy: 1,
        smartSpeed: 500,
        mouseDrag: true,
        touchDrag: true,
        autoplay: false
    });

});