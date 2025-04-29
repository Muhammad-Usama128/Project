const search_btn = document.getElementById("search-btn");
const Result = document.getElementById("result");
let debounceTimer;

search_btn.addEventListener("click", (e) => {
  const search_value = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();
  if (search_value == "" || search_value.length == 0) {
    Result.style.display = "none";
    Result.innerHTML = "";
  } else {
    Result.style.display = "block";
    fetch("/famous-places.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const matches = data.filter((item) =>
          item.search.some((keyword) =>
            keyword.toLowerCase().includes(search_value)
          )
        );
        if (matches.length >= 1) {
          let result_boxes = "";
          matches.forEach((item) => {
            result_boxes += `
          <div class="result-box">
            <div class="image-container">
              <img
                src="${item.image}"
                alt="${item.name}"
              />
              <div class="place-name">${item.name}</div>
            </div>
            <div class="info-area">
              <p>
                ${item.description}
              </p>
              <a
                href="${item.map_location}"
                target="_blank"
                >Visit</a
              >
            </div>
          </div>`;
          });
          result_boxes;
          Result.innerHTML = result_boxes;
        } else {
          Result.innerHTML = `<h1 class="nothing-found">Nothing Found</h1>`;
        }
      })
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
  }
});

document.getElementById("book-now").addEventListener("click", () => {
  document.getElementById("search-input").focus();
});
