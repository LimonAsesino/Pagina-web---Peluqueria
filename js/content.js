const SERVICES_GRID = document.getElementById('services-grid');
const GALLERY_GRID = document.getElementById('gallery-grid');
const SERVICE_COUNT = document.getElementById('service-count');

function createServiceCard(service) {
  const card = document.createElement('article');
  card.className = 'service-card';

  const media = document.createElement('div');
  media.className = 'service-media';
  if (service.icon) media.setAttribute('data-icon', service.icon);

  const body = document.createElement('div');
  body.className = 'service-body';

  const title = document.createElement('h3');
  title.textContent = service.title || 'Título del servicio';

  const description = document.createElement('p');
  description.textContent = service.description || 'Descripción breve del servicio.';

  const link = document.createElement('a');
  link.className = 'service-link';
  link.href = service.linkUrl || '#contacto';
  link.textContent = service.linkText || 'Reservar →';

  body.append(title, description, link);
  card.append(media, body);
  return card;
}

function createGalleryItem(item) {
  const div = document.createElement('div');
  div.className = 'gallery-item';
  if (item.variation) div.classList.add(item.variation);
  if (item.imageUrl) div.style.backgroundImage = `url(${item.imageUrl})`;
  div.setAttribute('data-label', item.label || 'Galería');
  return div;
}

function renderContent(data) {
  if (!data) return;

  if (Array.isArray(data.services)) {
    SERVICES_GRID.innerHTML = data.services.length > 0 ? '' : '<p class="data-placeholder">No hay servicios registrados en <code>data/content.json</code>.</p>';
    data.services.forEach(service => SERVICES_GRID.appendChild(createServiceCard(service)));
    if (SERVICE_COUNT) SERVICE_COUNT.textContent = `${data.services.length}+`;
  }

  if (Array.isArray(data.gallery) && data.gallery.length > 0) {
    GALLERY_GRID.innerHTML = '';
    data.gallery.forEach(item => GALLERY_GRID.appendChild(createGalleryItem(item)));
  }
}

async function loadData() {
  try {
    const response = await fetch('data/content.json');
    if (!response.ok) throw new Error('No se pudo cargar el contenido.');
    const data = await response.json();
    renderContent(data);
  } catch (error) {
    console.error(error);
    if (SERVICES_GRID) SERVICES_GRID.innerHTML = '<p class="data-placeholder">Error al cargar los servicios. Verifica <code>data/content.json</code>.</p>';
    if (GALLERY_GRID) GALLERY_GRID.innerHTML = '<p class="data-placeholder">Error al cargar la galería. Verifica <code>data/content.json</code>.</p>';
  }
}

loadData();
