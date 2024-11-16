document.addEventListener("DOMContentLoaded", function () {
    const navTabsTop = document.querySelector('.nav_tabs_top');

    if (navTabsTop) {
        const tabs = navTabsTop.querySelectorAll('.leftbar-tab.clickable');

        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                tabs.forEach(t => t.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }

    const tabsMain = document.querySelector('.tab-main');
    if (tabsMain) {
        const tabItems = tabsMain.querySelectorAll('.tab-item');

        tabItems.forEach(tab => {
            tab.addEventListener('click', function () {
                tabItems.forEach(t => t.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
});
