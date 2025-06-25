 <script>
    const apiBase = "https://www.themealdb.com/api/json/v1/1";

    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("search-input");
    const mealsContainer = document.getElementById("meals-container");
    const categoriesContainer = document.getElementById("categories-container");
    const menuToggle = document.getElementById("menu-toggle");
    
const sidebar = document.getElementById("sidebar");

menuToggle.onclick = () => {
  const isOpen = !sidebar.classList.contains("hidden");
  sidebar.classList.toggle("hidden");

  // Toggle icon
  menuToggle.textContent = isOpen ? "☰" : "✖";
};

    
    
    const closeSidebar = document.getElementById("close-sidebar");
    const categoryList = document.getElementById("category-list");

    menuToggle.onclick = () => sidebar.classList.remove("hidden");
    closeSidebar.onclick = () => sidebar.classList.add("hidden");

    searchBtn.onclick = () => {
      const query = searchInput.value.trim();
      if (query) fetchMealsBySearch(query);
    };

    searchBtn.onclick = () => {
  const query = searchInput.value.trim();
  if (!query) return;

  
  fetch(`${apiBase}/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      if (data.meals) {
        displayMeals(data.meals);
      } else {
       
        fetch(`${apiBase}/filter.php?c=${query}`)
          .then(res => res.json())
          .then(data => {
            if (data.meals) {
              displayMeals(data.meals);
            } else {
              mealsContainer.innerHTML = "<p>No results found 😕</p>";
            }
          });
      }
    });
};


    function fetchMealsBySearch(query) {
      fetch(`${apiBase}/search.php?s=${query}`)
        .then(res => res.json())
        .then(data => {
          if (!data.meals) {
            mealsContainer.innerHTML = "<p>No meals found 😕</p>";
          } else {
            displayMeals(data.meals);
          }
        });
    }

    function displayMeals(meals) {
      mealsContainer.innerHTML = meals.map(meal => `
        <div class="card">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <h4>${meal.strMeal}</h4>
        </div>
      `).join("");
    }

    function fetchCategories() {
      fetch(`${apiBase}/categories.php`)
        .then(res => res.json())
        .then(data => {
          categoriesContainer.innerHTML = data.categories.map(cat => `
            <div class="card">
              <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}" />
              <h4>${cat.strCategory}</h4>
            </div>`).join("");

          categoryList.innerHTML = data.categories.map(cat => `
            <li><button onclick="filterByCategory('${cat.strCategory}')">${cat.strCategory}</button></li>
          `).join("");
        });
    }

    function filterByCategory(category) {
      fetch(`${apiBase}/filter.php?c=${category}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals || []));
      sidebar.classList.add("hidden");
    }

    fetchCategories();
  </script>
