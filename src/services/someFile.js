function changeBackgroundColor() {
    const colors = ["#f28b82", "#fbbc04", "#34a853", "#4285f4", "#d7aefb"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;