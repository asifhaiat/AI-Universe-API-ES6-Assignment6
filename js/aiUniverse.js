/* Load Ai Universe Hub data */
let toolsData = [];

const getAiUniverseHubData = async () => {
  try {
    // show loading spinner
    toggleSpinner(true);

    // wait for 1 second to simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(url);
    const data = await res.json();
    toolsData = data.data.tools;
    showAiTools(toolsData.slice(0, 6));
  } catch (error) {
    console.error(`Error loading AI Universe Hub data: ${error}`);
  }
};

/* Display AI Universe Hub Data in Frontend */

const showAiTools = (tools) => {
  // console.log(tools);

  // hide the spinner
  toggleSpinner(false);

  const aiToolsContainer = document.getElementById("ai-tools-container");

  tools.forEach((tool) => {
    const aiDiv = document.createElement("div");
    aiDiv.innerHTML = `
      <div class="border border-gray-300 rounded-md p-5 mt-10 shadow-md hover:-translate-y-1 hover:ease-in duration-300">
        <img src="${tool.image ? tool.image : "No Image Found"}" class="w-96 rounded-md mx-auto" />
        <div class="px-5">
            <h2 class="font-bold mt-2 mb-3">Features:</h2>
            <ul class="p-5 list-decimal">
            ${
              tool.features.length > 0
                ? tool.features.map((feature) => `<li>${feature}</li>`).join("")
                : "<li>No features found</li>"
            }
            </ul>          
            <hr>
            <div class="flex justify-between items-center">
              <div>
                <h1 class="font-bold mt-5">${tool.name ? tool.name : "No name found"}</h1>
                <p><i class="fa-solid fa-calendar-days"></i>&nbsp${
                  tool.published_in ? tool.published_in : "No published date found"
                }</p>
              </div>
              <button type="button"
              onclick="toggleModal('aiHubDetailsModal'); loadAiHubDetails('${tool.id}')" 
              class="bg-[#FEF7F7] px-4 py-3 rounded-full color-[#EB5757]">
              <i class="fa-solid fa-arrow-right"></i>
              </button>
              
            </div>
        </div>
      </div>
    `;
    aiToolsContainer.appendChild(aiDiv);
  });

  // initially it shows first six tools
  const showMore = document.getElementById("show-more");
  if (toolsData.length > numToolsDisplayed) {
    showMore.classList.remove("hidden");
  } else {
    showMore.classList.add("hidden");
  }
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

/* Add event Listener to show more button an displayed all data  */
let numToolsDisplayed = 6;
document.getElementById("show-more-btn").addEventListener("click", async function () {
  // show loading spinner
  toggleSpinner(true);

  try {
    const nextTools = toolsData.slice(numToolsDisplayed, numToolsDisplayed + 6);

    // wait for 1 second to simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // display more tools
    showAiTools(nextTools);

    // update the number of tools displayed
    numToolsDisplayed += nextTools.length;

    // hide "Show more" button if all tools are displayed
    if (numToolsDisplayed === toolsData.length) {
      document.getElementById("show-more").classList.add("hidden");
    }
  } catch (error) {
    console.error(`Error loading more AI tools: ${error}`);
  } finally {
    // hide loading spinner
    toggleSpinner(false);
  }
});

/* Modal */
const loadAiHubDetails = async (id) => {
  try {
    // show loading spinner
    // toggleSpinner(true);

    // wait for 1 second to simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(`Error loading AI Universe Hub data: ${error}`);
  }
};

// load the initial ai tools
getAiUniverseHubData();
