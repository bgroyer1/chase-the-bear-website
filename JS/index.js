const quotes = [
    `"You must see this band. Let’s help them establish a core base and turn this into their proper new home … Chase The Bear were relentless from start to finish.”<br>
    - Jon Williams (DJ and Host, What Was That Radio)`, 

    `"Inspired by the likes of The Trews and The Glorious Sons, Chase The Bear, given time and resources, could join the ranks of these successful Canadian rock bands."<br>
    - Darrell Gilmour (Vice President, Macklam Feldman Management)`,

    `"One kickass rock band"<br>
    - Colin MacDonald (The Trews)`
];

let currentIndex = 0;

function showNextQuote() {
    const quoteText = document.querySelector(".quote-text");

    // Fade out
    quoteText.classList.remove('visible');

    // After the fade-out is done, switch the quote and fade in
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % quotes.length;
        quoteText.innerHTML = quotes[currentIndex];
        quoteText.classList.add('visible');
    }, 2000);  
}

window.onload = () => {
    const quoteText = document.querySelector(".quote-text");
    quoteText.innerHTML = quotes[currentIndex];
    quoteText.classList.add('visible');  // Show the first quote

    // Change quotes every 5 seconds
    setInterval(showNextQuote, 9000); 
};


document.addEventListener("DOMContentLoaded", () => {

    const navIMG = document.querySelector("#nav-img")

    if (navIMG) {
        navIMG.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: smooth
            })
        })
    }
})
