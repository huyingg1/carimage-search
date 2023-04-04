//use them in .env
const apiKey = "AIzaSyB-BArGjCw9SwaEhbcvIsQzt4VJQTrutjY";
const searchEngineId = "73c9743b993f04bdb";
const form = document.getElementById("search-form");

async function fetchGoogleImage(searchQuery) {
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(
    searchQuery
  )}&searchType=image&num=1`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.items && data.items[0]) {
    return data.items[0];
  } else {
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const carMake = document.getElementById("car-make").value;
  const carModel = document.getElementById("car-model").value;
  const searchQueryBase = `${carMake} ${carModel}`.trim();

  if (searchQueryBase) {
    try {
      const exteriorImage = await fetchGoogleImage(searchQueryBase);
      const interiorImage = await fetchGoogleImage(
        searchQueryBase + " interior"
      );

      const template = Handlebars.compile(
        document.getElementById("image-template").innerHTML
      );
      const html = template({ exteriorImage, interiorImage });
      document.getElementById("images-container").innerHTML = html;
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }
});
