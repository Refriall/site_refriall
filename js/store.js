            document.addEventListener("DOMContentLoaded", function() {
                const tbody = document.getElementById("lista");
                const noDataMessage = document.getElementById("noDataMessage");
                const cartTotalElement = document.getElementById("cart__total");
            
                // Recuperando dados do localStorage
                const produtos = JSON.parse(localStorage.getItem("Produtos")) || [];
                
                if (produtos.length > 0) {
                    produtos.forEach(function(produto, index) {
                        const tr = document.createElement("tr");
                      
                        // Célula para o produto
                        const tdProduct = document.createElement("td");
                        const productLink = document.createElement("a");
                        const productThumbnail = document.createElement("img");
                        
                        tdProduct.className = "product__thumbnail";
                        productLink.href = `product.html?cod=${produto.cod}`;
                        productThumbnail.src = "./images/products/iPhone/iphone4.jpeg"; // Substitua pelo caminho da imagem
                        
                        productLink.appendChild(productThumbnail);
                        tdProduct.appendChild(productLink);
                        
                        // Célula para o nome e código do produto
                        const tdName = document.createElement("td");
                        const productName = document.createElement("a");
                        
                        tdName.className = "product__name";
                        productName.href = `product.html?cod=${produto.cod}`;
                        productName.textContent = `${produto.title} - Código: ${produto.cod}`;
                        tdName.appendChild(productName);
                        
                        // Célula para a quantidade do produto
                        const tdQuantity = document.createElement("td");
                        const inputCounter = document.createElement("div");
                        const counterWrapper = document.createElement("div");
                        const minusBtn = document.createElement("span");
                        const inputQty = document.createElement("input");
                        const plusBtn = document.createElement("span");
                        
                        tdQuantity.className = "product__quantity";
                        inputCounter.className = "input-counter";
                        minusBtn.className = "minus-btn";
                        inputQty.className = "counter-btn";
                        plusBtn.className = "plus-btn";
                        
                        minusBtn.innerHTML = `<svg><use xlink:href="./images/sprite.svg#icon-minus"></use></svg>`;
                        plusBtn.innerHTML = `<svg><use xlink:href="./images/sprite.svg#icon-plus"></use></svg>`;
                        
                        inputQty.type = "text";
                        inputQty.min = "1";
                        inputQty.value = produto.quantity || 1; // Use a quantidade salva ou 1
                        inputQty.max = "10";
                        
                        counterWrapper.appendChild(minusBtn);
                        counterWrapper.appendChild(inputQty);
                        counterWrapper.appendChild(plusBtn);
                        inputCounter.appendChild(counterWrapper);
                        tdQuantity.appendChild(inputCounter);
                        
                        // ... Configuração do botão de aumento ...
                        
                        plusBtn.addEventListener("click", function() {
                            const updatedQty = parseInt(inputQty.value) + 1;
                            inputQty.value = updatedQty;
                            produto.quantity = updatedQty; // Atualiza a quantidade no objeto produto
                          updateCartTotal();
                            updateLocalStorage(produtos); // Atualiza o localStorage
                        });
                        
                        // Botão de diminuição
                        minusBtn.addEventListener("click", function() {
                            const updatedQty = parseInt(inputQty.value) - 1;
                            if (updatedQty >= 1) {
                                inputQty.value = updatedQty;
                                produto.quantity = updatedQty; // Atualiza a quantidade no objeto produto
                              updateCartTotal();
                                updateLocalStorage(produtos); // Atualiza o localStorage
                            }
                        });

    // Salvar valor digitado no inputQty
    inputQty.addEventListener("input", function() {
        const enteredValue = inputQty.value;

        // Remove caracteres não numéricos, exceto vírgulas e pontos
        const numericValue = enteredValue.replace(/[^0-9.,]/g, '');

        // Remove espaços em branco
        const trimmedValue = numericValue.replace(/\s+/g, '');

        // Se não houver nenhum valor digitado, ou se for igual a 0, define como "1"
        const finalValue = trimmedValue === '' || trimmedValue === '0' ? '1' : trimmedValue;

        // Substitui vírgulas por pontos para salvar como decimal
        const decimalValue = finalValue.replace(',', '.');

        // Atualiza o valor do campo
        inputQty.value = finalValue;

        const enteredQty = parseFloat(decimalValue);
        if (!isNaN(enteredQty) && enteredQty >= 1) {
            produto.quantity = enteredQty;
          updateCartTotal();
            updateLocalStorage(produtos);
        }
    });
                        // ... Configuração da lixeira ...
                        const removeCartItemLink = document.createElement("a");
                        
                        removeCartItemLink.href = "#"; // Adicione a URL correta aqui
                        removeCartItemLink.className = "remove__cart-item";
                        removeCartItemLink.innerHTML = `<svg><use xlink:href="./images/sprite.svg#icon-trash"></use></svg>`;
                        
                        removeCartItemLink.addEventListener("click", function() {
                            produtos.splice(index, 1); // Remove o item do array de produtos
                          updateCartTotal();
                            updateLocalStorage(produtos); // Atualiza o localStorage
                            tbody.removeChild(tr); // Remove a linha da tabela

                            if (produtos.length === 0) {
                                noDataMessage.style.display = "block"; // Mostra a mensagem de "Nenhum dado encontrado"
                            }
                        });
                        
                        // ... Adicione as células à linha da tabela ...
                        
                        tr.appendChild(tdProduct);
                        tr.appendChild(tdName);
                        tr.appendChild(tdQuantity);
                      const tdActions = document.createElement("td");
                        tr.appendChild(tdActions);
                        
                        tdActions.appendChild(removeCartItemLink);
                        
                        tbody.appendChild(tr);               
                    });
                } else {
                    noDataMessage.style.display = "block"; // Mostra a mensagem de "Nenhum dado encontrado"
                }

function updateCartTotal() {
  // Calcular a soma das quantidades de todos os produtos
  const totalQuantity = produtos.reduce((sum, product) => sum + parseInt(product.quantity), 0);

  // Atualizar o conteúdo do elemento com o total calculado
  cartTotalElement.textContent = totalQuantity;

  // Verificar se o total é maior que 10 e adicionar a classe expanded
  if (totalQuantity >= 10) {
    cartTotalElement.classList.add("expanded");
  } else {
    cartTotalElement.classList.remove("expanded");
  }
}

                function updateLocalStorage(data) {
                    localStorage.setItem("Produtos", JSON.stringify(data));
                }
            });