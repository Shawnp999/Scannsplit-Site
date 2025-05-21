'use strict';

window.addEventListener('DOMContentLoaded', () => {
    fix100vh();

    window.addEventListener('resize', () => {
        fix100vh();
    });

    // Scroll sections active link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.js-nav-link');

    function scrollActive(){
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        sections.forEach((section) =>{
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200;
            const sectionId = section.getAttribute('id');
            const sectionLink = document.querySelector(`.js-nav-link[href='#${sectionId}']`);

            if(scrollTop > sectionTop && scrollTop <= sectionTop + sectionHeight){
                navLinks.forEach(link => {
                    const linkHasActiveClass = link.classList.contains('header__nav-link--active');

                    if (linkHasActiveClass && link != sectionLink) {
                        link.classList.remove('header__nav-link--active');
                    } else if (!linkHasActiveClass && link == sectionLink) {
                        link.classList.add('header__nav-link--active');
                    }
                });
            }
        })
    }
    window.addEventListener('scroll', scrollActive);
    scrollActive();
    // END Scroll sections active link

    // Select
    const selects = document.querySelectorAll('.js-select');

    !!selects && selects.forEach(select => {
        const selectTrigger = select.querySelector('.js-select-btn');

        selectTrigger.addEventListener('click', function(e) {
            e.stopPropagation();

            selects.forEach(otherSelect => {
                if (otherSelect !== select) {
                    closeSelectMenu(otherSelect);
                }
            });
                
            toggleSelectMenu(select);
        });
    });

    document.addEventListener('click', function(e) {
        let isClickedDropdown = false;

        selects.forEach(select => {
            if (select.contains(e.target)) {
                isClickedDropdown = true;
            }
        });

        if (!isClickedDropdown) {
            selects.forEach(select => closeSelectMenu(select));
        }
    });

    selects.forEach(select => {
        const options = select.querySelectorAll('.js-select-option');
        
        options.forEach(option => {
            option.addEventListener('click', () => closeSelectMenu(select));
        });
    });

    function toggleSelectMenu(select) {
        const button = select.querySelector('.js-select-btn');
        select.classList.toggle('select--open');
        const isExpanded = select.classList.contains('select--open');
        button.setAttribute('aria-expanded', isExpanded ? 'true' : 'false'); 
    }

    function closeSelectMenu(select) {
        const button = select.querySelector('.js-select-btn');
        select.classList.remove('select--open');     
        button.setAttribute('aria-expanded', 'false');  
    }
    // END Select
})

function fix100vh() {
    const vh = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}