document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.plan-tab');
    
    const planHeaders = document.querySelectorAll('.plan-header-card');
    const featureVals = document.querySelectorAll('.feature-val');
    const footers = document.querySelectorAll('.grid-footer');

    let activePlan = 'voyager-plus'; 

    function updateView() {
        const isMobile = window.innerWidth <= 768;

        if (!isMobile) {
            planHeaders.forEach(el => el.style.display = 'flex');
            featureVals.forEach(el => el.style.display = 'flex');
            footers.forEach(el => {
                if(!el.classList.contains('desktop-only')) el.style.display = 'flex';
            });
            return;
        }

        
        planHeaders.forEach(el => {
            if (el.dataset.plan === activePlan) {
                el.style.display = 'flex';
            } else {
                el.style.display = 'none';
            }
        });

        featureVals.forEach(el => {
            if (el.dataset.plan === activePlan) {
                el.style.display = 'flex';
            } else {
                el.style.display = 'none';
            }
        });

        footers.forEach(el => {
            if (el.dataset.plan === activePlan) {
                el.style.display = 'flex';
            } else if (el.classList.contains('desktop-only')) {
                el.style.display = 'none';
            } else {
                el.style.display = 'none';
            }
        });
    }

    window.switchPlan = (planName) => {
        activePlan = planName;

        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        tabs.forEach(tab => {
            const onClickAttr = tab.getAttribute('onclick');
            if(onClickAttr.includes(planName)) {
                tab.classList.add('active');
            }
        });

        updateView();
    };

    updateView();

    window.addEventListener('resize', updateView);

});