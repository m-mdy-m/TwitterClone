const navMobile = document.getElementById("nav-mobile");
const iconNavigation = document.getElementById("iconNavigation");
const cancelIcon = document.getElementById("cancelIcon");
// Add event listener to the navigation icon to open the mobile navigation
iconNavigation.addEventListener("click", () => {
    console.log('clicked');
    navMobile.style.cssText=`
    width: 66.666667%;
    height:100%;
    display: block !important;
    transition: all 2s;
    `
});

// Add event listener to the cancel icon to close the mobile navigation
cancelIcon.addEventListener("click", () => {
    navMobile.style.cssText=`
    display: hidden;
    `
});
