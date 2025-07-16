document.addEventListener("DOMContentLoaded", () => {
  const packageList = document.getElementById("package-list");

  if (packageList) {
    fetch("data/packages.json")
      .then(res => res.json())
      .then(data => {
        data.forEach(pkg => {
          const card = document.createElement("div");
          card.className = "package-card";

          card.innerHTML = `
            <img src="${pkg.image}" alt="${pkg.title}" onerror="this.src='assets/fallback.jpg';" />
            <div class="content">
              <h3>${pkg.title}</h3>
              <p>${pkg.description}</p>
              <p class="price">Price: ₹${pkg.price}</p>
            </div>
          `;

          packageList.appendChild(card);
        });
      })
      .catch(err => {
        console.error("Failed to load packages:", err);
        packageList.innerHTML = "<p>Failed to load packages.</p>";
      });
  }
});
