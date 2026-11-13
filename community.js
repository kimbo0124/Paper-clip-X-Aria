const container = document.getElementById("notes");
const pageHeight = container.parentElement.scrollHeight *0.7;
container.style.height = pageHeight + "px";

const totalNotes=50;
const placedNotes = [];

for(let i=1; i<=totalNotes; i++){
    const note = document.createElement("button");

    note.className = "note";
    note.type = "button";

    const noteW = 120;
    const noteH = 70;
    const gap = 5;

    let x, y, overlap;
    let attempts = 0;

    const pageWidth =container.clientWidth;

    do{
        x = Math.random() * (pageWidth -noteW);
        y = Math.random() * (pageHeight -noteH);

        overlap = placedNotes.some(p =>
            x < p.x + noteW + gap &&
            x + noteW + gap > p.x &&
            y < p.y + noteH + gap &&
            y + noteH + gap > p.y 
        );

            attempts++;

    } while (overlap && attempts < 10000);

    if(overlap){
        console.log("counld not find space", i);
        continue;
    
    } 
    
    placedNotes.push({ x, y});
    note.style.setProperty("--x", x + "px");
    note.style.setProperty("--y", y + "px");

    note.style.setProperty("--rotation", (Math.random() * 20 - 10) + "deg");
    note.style.setProperty("--duration", (Math.random() * 8 + 8) + "s");

    note.style.setProperty("--move-x", (Math.random() * 20 - 10) + "px");
    note.style.setProperty("--move-y", (Math.random() * 20 - 10) + "px");
    note.style.setProperty("--move-x2", (Math.random() * 20 - 10) + "px");
    note.style.setProperty("--move-y2", (Math.random() * 20 - 10) + "px");

    note.style.animationDelay = -Math.random() * 10 + "s";

    const img = document.createElement("img");
    img.className ="note-img";
    img.src = i <= 34? `ss${i}.png`:`ss${i}.jpeg`;
    img.alt = `Community memory${i}`;

    note.appendChild(img);
    container.appendChild(note);

    note.addEventListener("click", () => {
        const wasActive = note.classList.contains("active");
        
        document.querySelectorAll(".note.active").forEach((n) => n.classList.remove("active"));

        if (!wasActive) {
            note.classList.add("active");
        }
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.querySelectorAll(".note.active").forEach((n) => n.classList.remove("active"));
    }
});