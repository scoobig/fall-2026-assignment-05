import products from './data/products.json';

const PRODUCTS_PER_PAGE = 5;

const productGrid = document.querySelector('#product-grid');
const prevButton = document.querySelector('#prev-page');
const nextButton = document.querySelector('#next-page');
const pageIndicator = document.querySelector('#page-indicator');

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

const createProductCard = (product) => {
  const card = document.createElement('article');
  card.className = 'product-card';

  const media = document.createElement('div');
  media.className = 'product-media';

  const image = document.createElement('img');
  image.src = product.imageUrl;
  image.alt = product.name;

  const body = document.createElement('div');
  body.className = 'product-body';

  const badge = document.createElement('p');
  badge.className = 'category-badge';
  badge.textContent = product.category;

  const title = document.createElement('h2');
  title.className = 'product-name';
  title.textContent = product.name;

  const price = document.createElement('p');
  price.className = 'product-price';
  price.textContent = formatPrice(product.price);

  const description = document.createElement('p');
  description.className = 'product-description';
  description.textContent = product.description;

  media.append(image);
  body.append(badge, title, price, description);
  card.append(media, body);

  return card;
};

const initStore = () => {
  if (!productGrid || !prevButton || !nextButton || !pageIndicator) {
    return;
  }

  let currentPage = 1;
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const renderPage = () => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const visibleProducts = products.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE,
    );

    productGrid.replaceChildren(...visibleProducts.map(createProductCard));

    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  };

  prevButton.addEventListener('click', () => {
    if (currentPage <= 1) {
      return;
    }

    currentPage -= 1;
    renderPage();
  });

  nextButton.addEventListener('click', () => {
    if (currentPage >= totalPages) {
      return;
    }

    currentPage += 1;
    renderPage();
  });

  renderPage();
};

initStore();
