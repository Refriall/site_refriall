document.addEventListener("DOMContentLoaded", function() {
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("searchInput");

  const performSearch = async function(searchTerm) {
    try {
      // Carregar os produtos do JSON usando fetch
      const response = await fetch("../data/products.json");
      if (!response.ok) {
        throw new Error("Erro ao carregar produtos.");
      }
      const data = await response.json();

      const matchedProducts = data.products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

      if (matchedProducts.length > 0) {
        // Redirecionar para a página do primeiro produto encontrado
        window.location.href = `https://refriall.lojapvh.repl.co/product.html?cod=${encodeURIComponent(matchedProducts[0].cod)}`;
      } else {
        alert("Nenhum produto similar encontrado.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  searchButton.addEventListener("click", function() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
      performSearch(searchTerm);
    }
  });

  searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== "") {
        performSearch(searchTerm);
      }
    }
  });
});
