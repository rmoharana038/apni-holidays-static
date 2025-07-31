function initializeCommonScripts() {
  // Toggle mobile menu
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      document.getElementById('nav-links').classList.toggle('show');
    });
  }

  // Back to Top button logic
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
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
  }

  // Highlight active nav link
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.href === window.location.href || window.location.href.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
}

// This part is for packages.html specifically, will be called from there
function loadPackagesFromJSON() {
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
          card.innerHTML = `
            <img src="${pkg.image}" alt="${pkg.title}" onerror="this.src='assets/fallback.jpg';" />
            <div class="content">
              <h3>${pkg.title}</h3>
              <p>${pkg.description}</p>
              <div class="price">₹${pkg.price}</div>
            </div>
          `;
          container.appendChild(card);
        });
      } else {
        container.innerHTML = '<p>Invalid package data format.</p>';
      }
    })
    .catch(() => {
      container.innerHTML = '<p>Failed to load packages.</p>';
    });
}

// Custom notification function
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Automatically remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Custom confirmation function
function showConfirmation(message) {
  return new Promise((resolve) => {
    const confirmationDialog = document.createElement('div');
    confirmationDialog.className = 'confirmation-dialog';
    confirmationDialog.innerHTML = `
      <p>${message}</p>
      <button id="confirm-yes">Yes</button>
      <button id="confirm-no">No</button>
    `;
    document.body.appendChild(confirmationDialog);

    document.getElementById('confirm-yes').addEventListener('click', () => {
      confirmationDialog.remove();
      resolve(true);
    });

    document.getElementById('confirm-no').addEventListener('click', () => {
      confirmationDialog.remove();
      resolve(false);
    });
  });
}
