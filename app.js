document.addEventListener('DOMContentLoaded', () => {

    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeMobileBtn = document.getElementById('closeMobileBtn');
    const mobileNav = document.getElementById('mobileNav');
    const body = document.body;

    hamburgerBtn?.addEventListener('click', () => {
        mobileNav.classList.add('active');
        body.style.overflow = 'hidden';
    });

    closeMobileBtn?.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        body.style.overflow = '';
    });

    const mobileInsBtn = document.getElementById('mobileInsBtn');
    const mobileInsSubmenu = document.getElementById('mobileInsSubmenu');

    mobileInsBtn?.addEventListener('click', () => {
        mobileInsBtn.classList.toggle('active');
        mobileInsSubmenu.style.maxHeight =
            mobileInsSubmenu.style.maxHeight
                ? null
                : mobileInsSubmenu.scrollHeight + 'px';
    });

    const desktopBtn = document.getElementById('desktopInsuranceBtn');
    const megaMenu = document.getElementById('megaMenu');
    const siteHeader = document.getElementById('siteHeader');
    const pageOverlay = document.getElementById('pageOverlay');

    desktopBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.innerWidth < 992) return;

        megaMenu.classList.toggle('active');
        siteHeader.classList.toggle('menu-open');
        pageOverlay.classList.toggle('active');
    });

    pageOverlay?.addEventListener('click', () => {
        megaMenu.classList.remove('active');
        siteHeader.classList.remove('menu-open');
        pageOverlay.classList.remove('active');
    });


    let isSingleTrip = false;
    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            isSingleTrip = tab.dataset.tab === 'single';
            if (isSingleTrip) {
                selectedDestinations = [];
                tagsContainer.innerHTML = '';
            }
        });
    });


    const destinationInput = document.getElementById('destinationInput');
    const dropdown = document.getElementById('destinationDropdown');
    const tagsContainer = document.getElementById('tagsContainer');

    let selectedDestinations = [];
    let activeIndex = -1;

    const destinations = [
        {
            title: 'Popular Destinations',
            items: [
                'Bali (Indonesia)',
                'New Zealand',
                'USA (United States)',
                'United Kingdom'
            ]
        },
        {
            title: 'World Wide',
            items: ['All of Europe', 'All of Asia']
        }
    ];

    function renderDropdown(search = '') {
        dropdown.innerHTML = '';
        let found = false;

        destinations.forEach(group => {
            const filtered = group.items.filter(item =>
                item.toLowerCase().includes(search.toLowerCase()) &&
                !selectedDestinations.includes(item)
            );

            if (!filtered.length) return;
            found = true;

            const title = document.createElement('div');
            title.className = 'dropdown-title';
            title.textContent = group.title;
            dropdown.appendChild(title);

            filtered.forEach(item => {
                const div = document.createElement('div');
                div.className = 'dropdown-item';
                div.textContent = item;

                div.addEventListener('click', () => {
                    if (isSingleTrip && selectedDestinations.length === 1) return;
                    addTag(item);
                    destinationInput.value = '';
                    closeDropdown();
                });

                dropdown.appendChild(div);
            });
        });

        if (!found) {
            dropdown.innerHTML =
                `<div class="dropdown-empty">Destination not found</div>`;
        }

        activeIndex = -1;

    }

    destinationInput.addEventListener('keydown', (e) => {
        const items = dropdown.querySelectorAll('.dropdown-item');
        if (!items.length) return;


        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIndex = (activeIndex + 1) % items.length;
            updateActiveItem(items);
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeIndex = (activeIndex - 1 + items.length) % items.length;
            updateActiveItem(items);
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex > -1) {
                items[activeIndex].click();
            }
        }

        if (e.key === 'Escape') {
            closeDropdown();
        }
    });

    function updateActiveItem(items) {
        items.forEach(item => item.classList.remove('active'));

        if (activeIndex >= 0) {
            items[activeIndex].classList.add('active');
            items[activeIndex].scrollIntoView({
                block: 'nearest'
            });
        }
    }


    function openDropdown() {
        dropdown.style.display = 'block';
        destinationInput.closest('.input-wrapper')?.classList.add('active');
    }

    function closeDropdown() {
        dropdown.style.display = 'none';
        destinationInput.closest('.input-wrapper')?.classList.remove('active');
    }


    function addTag(value) {
        if (selectedDestinations.includes(value)) return;

        if (isSingleTrip) {
            selectedDestinations = [];
            tagsContainer.innerHTML = '';
        }

        selectedDestinations.push(value);

        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.innerHTML = `${value} <button type="button" class="remove-tag">×</button>`;
        tagsContainer.appendChild(tag);
    }

    tagsContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('remove-tag')) return;

        const tag = e.target.parentElement;
        const value = tag.firstChild.textContent.trim();
        selectedDestinations = selectedDestinations.filter(v => v !== value);
        tag.remove();
    });


    destinationInput.addEventListener('focus', () => {
        openDropdown();
        renderDropdown();
    });

    destinationInput.addEventListener('input', (e) => {
        openDropdown();
        renderDropdown(e.target.value);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.form-group')) {
            closeDropdown();
        }
    });

});


document.getElementById('insuranceForm').addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = 'choose-plan/index.html';
});


const addAgeBtn = document.getElementById('addAgeBtn');
const ageWrapper = document.getElementById('ageWrapper');

let ageCount = 1;

addAgeBtn?.addEventListener('click', () => {
    ageCount++;

    const newBox = document.createElement('div');
    newBox.className = 'age-box';

    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.id = `age-${ageCount}`;
    input.setAttribute('aria-label', `Traveller age ${ageCount}`);

    newBox.appendChild(input);
    ageWrapper.insertBefore(newBox, addAgeBtn);
});



