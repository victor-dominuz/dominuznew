const carousel = document.getElementById("carousel");

for (let i = 1; i <= 12; i++) {
  const img = document.createElement("img");
  img.src = `imagens/${i}.png`;
  img.alt = `Página ${i}`;
  carousel.appendChild(img);
}