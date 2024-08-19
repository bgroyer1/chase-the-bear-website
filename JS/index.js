document.addEventListener("scroll", () => {
    const logo = document.querySelector("#nav-img")
    const scrollPosition = window.scrollY;
    const triggerPoint = 10;

    if (scrollPosition > triggerPoint) {
        logo.classList.remove("hidden")
        logo.classList.add("visible")
    } else {
        logo.classList.remove("visible")
        logo.classList.add("hidden")
    }
})