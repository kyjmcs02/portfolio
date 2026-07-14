$(document).ready(function () {

    const carousel = $(".contents_wrap");

    const statusBar = document.querySelector(".status_bar");
    const statusThumb = document.querySelector(".status_thumb");

    const visibleItems = 5;
    const loopMode = true;

    let totalItems = 0;
    let maxIndex = 0;
    let currentIndex = 0;
    let dragging = false;

    /* 카드 위치에 맞춰 파란 바 이동 */
    function updateStatusThumb(index, animate = true) {

        const maxLeft =
            statusBar.clientWidth - statusThumb.offsetWidth;

        const left =
            maxIndex === 0
                ? 0
                : (index / maxIndex) * maxLeft;

        statusThumb.style.transition =
            animate ? "left 0.35s ease" : "none";

        statusThumb.style.left = left + "px";
    }

    /* 캐러셀 이동 시 상태바도 같이 이동 */
    carousel.on(
        "initialized.owl.carousel changed.owl.carousel",
        function (event) {

            if (!event.item || !event.relatedTarget) {
                return;
            }

            totalItems = event.item.count;

            maxIndex = loopMode
                ? totalItems - 1
                : Math.max(totalItems - visibleItems, 0);

            currentIndex =
                event.relatedTarget.relative(event.item.index);

            if (!dragging) {
                updateStatusThumb(currentIndex);
            }
        }
    );

    /* Owl Carousel 실행 */
    carousel.owlCarousel({
        items: visibleItems,
        margin: 20,
        loop: loopMode,
        nav: false,
        dots: false,
        slideBy: 1,
        smartSpeed: 400,
        mouseDrag: true,
        touchDrag: true,
        autoplay: false
    });

    /* 마우스 위치에 따라 상태바와 카드 이동 */
    function moveCarousel(clientX) {

        const barRect = statusBar.getBoundingClientRect();
        const thumbWidth = statusThumb.offsetWidth;
        const maxLeft = barRect.width - thumbWidth;

        let left =
            clientX - barRect.left - thumbWidth / 2;

        left = Math.max(0, Math.min(left, maxLeft));

        statusThumb.style.transition = "none";
        statusThumb.style.left = left + "px";

        const ratio =
            maxLeft === 0 ? 0 : left / maxLeft;

        const targetIndex =
            Math.round(ratio * maxIndex);

        if (targetIndex !== currentIndex) {

            currentIndex = targetIndex;

            carousel.trigger(
                "to.owl.carousel",
                [targetIndex, 150]
            );
        }
    }

    /* 상태바 잡기 */
    statusBar.addEventListener("pointerdown", function (event) {

        dragging = true;

        statusBar.setPointerCapture(event.pointerId);

        moveCarousel(event.clientX);
    });

    /* 상태바 끌기 */
    statusBar.addEventListener("pointermove", function (event) {

        if (!dragging) {
            return;
        }

        moveCarousel(event.clientX);
    });

    /* 상태바 놓기 */
    function stopDragging(event) {

        if (!dragging) {
            return;
        }

        dragging = false;

        updateStatusThumb(currentIndex, true);

        if (statusBar.hasPointerCapture(event.pointerId)) {
            statusBar.releasePointerCapture(event.pointerId);
        }
    }

    statusBar.addEventListener("pointerup", stopDragging);
    statusBar.addEventListener("pointercancel", stopDragging);

});