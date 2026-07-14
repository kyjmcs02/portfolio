window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 0) { // 스크롤을 조금이라도 내리면
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});