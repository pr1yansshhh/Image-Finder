const accessKey = "7TkUTzYZ701eu1NkB02Ubq77dbvOpTzV7sxKOWv_rdI";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;
let isLoading = false;

async function searchImages() {
  if (isLoading) return; 
  isLoading = true;

  keyword = searchBox.value;
  const perPage = 12;

  try {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=${perPage}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      const results = data.results;

      if (results.length === 0) {
        searchResult.innerHTML = "No results found.";
      } else {
        results.forEach((result) => {
          const image = document.createElement("img");
          image.src = result.urls.small;

          const imageLink = document.createElement("a");
          imageLink.href = result.links.html;
          imageLink.target = "_blank";
          imageLink.appendChild(image);

          searchResult.appendChild(imageLink);
        });

        showMoreBtn.style.display = "block";
      }
    } else {
      searchResult.innerHTML = "Error fetching results.";
    }
  } catch (error) {
    console.error("An error occurred:", error);
    searchResult.innerHTML = "An error occurred while fetching results.";
  } finally {
    isLoading = false;
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchResult.innerHTML = ""; 
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});


searchImages();
