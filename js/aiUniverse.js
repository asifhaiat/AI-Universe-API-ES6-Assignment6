/* Load Ai Universe Hub data */
const getAiUniverseHubData = async () => {
  try {
    // show loading spinner
    toggleSpinner(true);
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(url);
    const data = await res.json();
    return showAiTools(data.data.tools);
  } catch (error) {
    console.error(`Error loading AI Universe Hub data: ${error}`);
  }
};

/* Display AI Universe Hub Data in Frontend */
const showAiTools = (tools) => {
  console.log(tools);

  // display only 6 ai tools
  const showMore = document.getElementById("show-more");
  if (tools.length > 6) {
    tools = tools.slice(0, 6);
    showMore.classList.remove("hidden");
  } else {
    showMore.classList.add("hidden");
  }
// 
  const aiToolsContainer = document.getElementById("ai-tools-container");
  tools.forEach((tool) => {
    const aiDiv = document.createElement("div");
    const features = tool.features.join("</li><li>");
    aiDiv.innerHTML = `
      <div class="border border-gray-300 rounded-md p-5 mt-10 shadow-md hover:-translate-y-1 hover:ease-in duration-300">
        <img src="${tool.image}" class="w-96 rounded-md" />
        <div>
            <h2 class="font-bold mt-2 mb-3">Features:</h2>
            <ul class="p-5 list-decimal">
              <li>${features}</li>
            </ul>
            <hr>
            <div class="flex justify-between items-center">
              <div>
                <h1 class="font-bold mt-5">${tool.name}</h1>
                <p><i class="fa-solid fa-calendar-days"></i>&nbsp${tool.published_in}</p>
              </div>
              <div>
                <button class="bg-[#FEF7F7] px-4 py-3 rounded-full color-[#EB5757]"><i class="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
        </div>
      </div>
    `;
    aiToolsContainer.appendChild(aiDiv);
  });

  // stop loader or spinner
  toggleSpinner(false);
};

/* Loading Spinner Function */
const toggleSpinner = (isLoading) => {
  const loadingSection = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSection.classList.remove("hidden");
  } else {
    loadingSection.classList.add("hidden");
  }
};

/*  add show more button event listener, add spinner,  displayed rest ofo the data*/
document.getElementById("show-more-btn").addEventListener("click", function () {
  // console.log("Show more button clicked");
  // start loader
  toggleSpinner(true);
  // get all ai tools
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((response) => response.json())
    .then((data) => {
      showAiTools(data.data.tools);
    });
});

// load the initial ai tools
getAiUniverseHubData();
