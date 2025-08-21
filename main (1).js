import { movies } from './movies.js';

const wrapper = document.getElementById("wrapper");
const input = document.getElementById('input');
const sortSelect = document.getElementById('sort');
const categorySelect = document.getElementById('category');

const cleanMovies = movies.filter(m => m && typeof m.Title === "string" && m.Title.trim() !== "");
let filteredMovies = [...cleanMovies];

const categories = [...new Set(
  cleanMovies.flatMap(m => m.Categories.split("|"))
)].sort();

categorySelect.innerHTML += categories.map(cat => `<option value="${cat}">${cat}</option>`).join("");
function renderMovies(movieList) {
  wrapper.innerHTML = movieList.map(movie => `
    <div class="card bg-base-100 w-80 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300">
      <figure class="h-56 overflow-hidden rounded-t-2xl">
      </figure>
      <div class="card-body p-4">
        
        <h2 class="card-title text-xl font-bold text-primary">
          ${movie.Title}
        </h2>
        <p class="text-sm text-gray-500 mb-3 italic">Year: ${movie.movie_year}</p>
        
        <div class="mb-3 flex flex-wrap gap-2">
          ${movie.Categories.split("|").map((category, i) => `
            <div class="badge ${i % 2 === 0 ? "badge-secondary" : "badge-accent"} px-3 py-2 text-xs">
              ${category}
            </div>
          `).join("")}
        </div>

        <p class="text-sm text-gray-700 line-clamp-4 leading-relaxed">
          ${movie.summary}
        </p>
      </div>
    </div>
  `).join("");
}

function applyFilters() {
  const searchTerm = input.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  filteredMovies = cleanMovies.filter(movie => {
    const matchesSearch = movie.Title.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "" || movie.Categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  applySortAndRender();
}

function applySortAndRender() {
  const sortValue = sortSelect.value;
  let sortedMovies = [...filteredMovies];

  if (sortValue === "az") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sortValue === "za") {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (sortValue === "year-desc") {
    sortedMovies.sort((a, b) => b.movie_year - a.movie_year);
  } else if (sortValue === "year-asc") {
    sortedMovies.sort((a, b) => a.movie_year - b.movie_year);
  }

  renderMovies(sortedMovies);
}

input.addEventListener('input', applyFilters);
sortSelect.addEventListener('change', applySortAndRender);
categorySelect.addEventListener('change', applyFilters);

applyFilters();

console.log("rasm ob tashalgan qdirib otirmela");
