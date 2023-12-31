const getProducts = async () => {
  try {
    const results = await fetch("./data/products.json");
    const data = await results.json();
    const products = data.products;
    return products;
  } catch (err) {
    console.log(err);
  }
};

/*
=============
carrega categorias de produtos
=============
 */
document.addEventListener('DOMContentLoaded', async () => {
  const categoryCenter = document.querySelector(".category__center");
  const cartTotalElement = document.getElementById("cart__total");
  let produtos = JSON.parse(localStorage.getItem("Produtos")) || [];

  function displayProductItems(items) {
    let displayProduct = items.map(
      product => `
                  <div class="product category__products">
                    <div class="product__header">
                      <img src=${product.image.img1} alt="product">
                    </div>
                    <div class="product__footer">
                      <h1>${product.title}</h1>
                      <div class="rating">
                        <svg>
                          <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                        </svg>
                        <svg>
                          <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                        </svg>
                        <svg>
                          <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                        </svg>
                        <svg>
                          <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                        </svg>
                        <svg>
                          <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                        </svg>
                      </div>
                      <div class="product__price">
                        <h4>Cód: ${product.cod}</h4>
                      </div>
                    </div>
                  <ul>
                      <li>
                        <a data-tip="Quick View" data-place="left" href="product.html?cod=${product.cod}">
                          <svg>
                            <use xlink:href="./images/sprite.svg#icon-eye"></use>
                          </svg>
                        </a>
                      </li>
                  </ul>
                  <button type="button" class="product__btn">Add to cart</button>
                  </div>
      `
    );
  
    displayProduct = displayProduct.join("");
    if (categoryCenter) {
      categoryCenter.innerHTML = displayProduct;
    }

    const addToCartButtons = document.querySelectorAll(".product__btn");
    addToCartButtons.forEach(button => {
      button.addEventListener("click", function () {
        const productTitle = button.parentElement.querySelector("h1").textContent;
        const productCod = button.parentElement.querySelector(".product__price h4").textContent.split(" ")[1];

        const foundIndex = produtos.findIndex(product => product.cod === productCod);
        if (foundIndex !== -1) {
          produtos[foundIndex].quantity = (parseInt(produtos[foundIndex].quantity) + 1).toString();
        } else {
          produtos.push({
            title: productTitle,
            cod: productCod,
            quantity: "1"
          });
        }

        updateLocalStorage(produtos);
        updateCartTotal();
      });
    });

    updateCartTotal();
  }
  
  function updateLocalStorage(data) {
    localStorage.setItem("Produtos", JSON.stringify(data));
  }

  function updateCartTotal() {
    // Calcular a soma das quantidades de todos os produtos
    const totalQuantity = produtos.reduce((sum, product) => sum + parseInt(product.quantity), 0);

    // Atualizar o conteúdo do elemento com o total calculado
    cartTotalElement.textContent = totalQuantity;
  }

  const products = await getProducts();
  displayProductItems(products);
});
/*
=============
filtro
=============
 */

const filterBtn = document.querySelectorAll(".filter-btn");
const categoryContainer = document.getElementById("category");

if (categoryContainer) {
  categoryContainer.addEventListener("click", async e => {
    const target = e.target.closest(".section__title");
    if (!target) return;

    const id = target.dataset.id;
    const products = await getProducts();

    if (id) {
      // remove botões ativos
      Array.from(filterBtn).forEach(btn => {
        btn.classList.remove("active");
      });
      target.classList.add("active");

      // carrega os produtos
      let menuCategory = products.filter(product => {
        if (product.category === id) {
          return product;
        }
      });

      if (id === "All Products") {
        displayProductItems(products);
      } else {
        displayProductItems(menuCategory);
      }
    }
  });
}

/*
=============
detalhes dos produtos a esquerda
=============
 */
const pic1 = document.getElementById("pic1");
const pic2 = document.getElementById("pic2");
const pic3 = document.getElementById("pic3");
const pic4 = document.getElementById("pic4");
const pic5 = document.getElementById("pic5");
const picContainer = document.querySelector(".product__pictures");
const zoom = document.getElementById("zoom");
const pic = document.getElementById("pic");
// lista de fotos
const picList = [pic1, pic2, pic3, pic4, pic5];
// foto ativa
let picActive = 1;

["mouseover", "touchstart"].forEach(event => {
  if (picContainer) {
    picContainer.addEventListener(event, e => {
      const target = e.target.closest("img");
      if (!target) return;

      const imageUrl = target.src;

      const parts = imageUrl.split("/");

      const imagePath = parts[parts.length - 2] + "/" + parts[parts.length - 1];

      const id = `images/products/${imagePath}`;
      changeImage(`${id}`, id);
    });
  }
});

// escolhe imagem ativa
const changeImage = (imgSrc, n) => {
  // escolhe a principal imagem ativa
  pic.src = imgSrc;
  // muda o background-image
  zoom.style.backgroundImage = `url(${imgSrc})`;
  //   atualiza a imagem ao lado
  picActive = n;
};

/*
=============
Detalhes do produto (inferior)
=============
 */

const btns = document.querySelectorAll(".detail-btn");
const detail = document.querySelector(".product-detail__bottom");
const contents = document.querySelectorAll(".content");

if (detail) {
  detail.addEventListener("click", e => {
    const target = e.target.closest(".detail-btn");
    if (!target) return;

    const id = target.dataset.id;
    if (id) {
      Array.from(btns).forEach(btn => {
        // remover todos os btn ativos
        btn.classList.remove("active");
        e.target.closest(".detail-btn").classList.add("active");
      });
      // esconde outros btn ativos
      Array.from(contents).forEach(content => {
        content.classList.remove("active");
      });
      const element = document.getElementById(id);
      element.classList.add("active");
    }
  });
}

