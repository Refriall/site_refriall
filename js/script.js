document.addEventListener('DOMContentLoaded', function() {
  const queryParams = new URLSearchParams(window.location.search);
  const produto = queryParams.get('cod');

  if (produto) {
    fetch('data/products.json')
      .then(response => response.json())
      .then(data => {
        const product = data.products.find(p => p.cod === produto);
        if (product) {

          fetch(`./textos/${product.cod}.md`)
            .then(response => response.text())
            .then(markdownContent => {
              const md = window.markdownit();

              const renderedHTML = md.render(markdownContent);

              const markdownElement = document.getElementById('markdown-content');
              markdownElement.innerHTML = renderedHTML;
            })
            .catch(error => {
              console.error('Erro ao carregar o conteúdo do arquivo:', error);
            });

          const productDetails = document.getElementById('product-title-area');
          productDetails.innerHTML = `    <div class="page__title-area">
      <div class="container">
        <div class="page__title-container">
          <ul class="page__titles">
            <li>
              <a href="/">
                <svg>
                  <use xlink:href="./images/sprite.svg#icon-home"></use>
                </svg>
              </a>
            </li>
            
            <li class="page__title">${product.title}</li>
          </ul>
        </div>
      </div>
    </div>`;

          const minhaImagem = document.getElementById('pic');

          const caminhoDaImagem = `${product.image.img1}`;

          minhaImagem.src = caminhoDaImagem;

          const description = document.getElementById('descricao');
          description.innerHTML = `
              <h3>${product.title}</h3>
              <div class="price">
                <span class="new__price">Cód: ${product.cod}</span>
              </div>
                          `;
          const productImage1 = document.getElementById('image1');
          productImage1.innerHTML = `                <div class="pictures__container">
                  <img class="picture" src="${product.image.img1}" id="pic1" />
                </div>`;

          const productImage2 = document.getElementById('image2');
          productImage2.innerHTML = `                <div class="pictures__container">
                  <img class="picture" src="${product.image.img2}" id="pic2" />
                </div>`;

          const productImage3 = document.getElementById('image3');
          productImage3.innerHTML = `                <div class="pictures__container">
                  <img class="picture" src="${product.image.img3}" id="pic3" />
                </div>`;

          const productImage4 = document.getElementById('image4');
          productImage4.innerHTML = `                <div class="pictures__container">
                  <img class="picture" src="${product.image.img4}" id="pic4" />
                </div>`;

          const productImage5 = document.getElementById('image5');
          productImage5.innerHTML = `                <div class="pictures__container">
                  <img class="picture" src="${product.image.img5}" id="pic5" />
                </div>`;

        } else {
          window.location.href = '404.html';
        }
      })
      .catch(error => console.error('Erro ao carregar dados do produto', error));
  }
});