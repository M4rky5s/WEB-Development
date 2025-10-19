const container = document.getElementById("container");
const newGridBtn = document.getElementById("newGridBtn");

function setColor(red, green, blue){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

let userGridSize;

function makeDivs(n = 16) {

    n = Math.max(1, Math.min(100, Number(n) || 16));

    container.innerHTML = "";

    const totalSize = 640;
    const cellSize = totalSize / n;

    for(let i = 0; i < n * n; i++){
        let cell = document.createElement("div");
        cell.className = "cell";
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cell.addEventListener("mouseenter", () => {
            if(!cell.style.backgroundColor){
                cell.style.backgroundColor = setColor();
            }
        })
        container.appendChild(cell);
    }
}

newGridBtn.addEventListener("click", () => {
    const input = prompt("Enter new grid size (1- 100)");
    if(input !== null && input.trim() !== ""){
        const num = parseInt(input);
        if(num > 0 && num <= 100){
            userGridSize = num;
            makeDivs(userGridSize);
            console.log("New size: ", userGridSize);
        } else {
            alert("Enter a number from 1 to 100");
        }
    }
})

makeDivs(16);