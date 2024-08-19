document.addEventListener("DOMContentLoaded", () => {
    const navIMG = document.querySelector("#nav-img")

    if (navIMG) {
        navIMG.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behaviour: smooth
            })
        })
    }
})
