// Toggle mobile menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('show');
});

// Back to Top button logic
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Load packages from packages.json (for packages.html)
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('package-list');
  if (!container) return;

  fetch('packages.json')
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        data.forEach(pkg => {
          const card = document.createElement('div');
          card.classList.add('package-card');
          card.setAttribute('data-aos', 'fade-up');
          card.innerHTML = 
            <img src="${pkg.image}" alt="${pkg.title}" onerror="this.src='assets/fallback.jpg';" />
            <div class="content">
              <h3>${pkg.title}</h3>
              <p>${pkg.description}</p>
              <div class="price">₹${pkg.price}</div>
            </div>
          ;
          container.appendChild(card);
        });
      } else {
        container.innerHTML = '<p>Invalid package data format.</p>';
      }
    })
    .catch(() => {
      container.innerHTML = '<p>Failed to load packages.</p>';
    });
});
