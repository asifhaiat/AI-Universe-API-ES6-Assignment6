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
  console.log(tools);

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
              <div>
                <button class="bg-[#FEF7F7] px-4 py-3 rounded-full color-[#EB5757]"><i class="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
        </div>
      </div>
    `;
    aiToolsContainer.appendChild(aiDiv);
  });

  // initially it shows first six tools
  const showMore = document.getElementById("show-more");
  if (toolsData.length > tools.length + document.querySelectorAll(".show-more").length) {
    showMore.classList.remove("hidden");
  } else {
    showMore.classList.add("hidden");
  }

  // hide "Show more" button if all tools are displayed
  if (toolsData.length === document.querySelectorAll(".border").length) {
    document.getElementById("show-more").classList.add("hidden");
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

document.getElementById("show-more-btn").addEventListener("click", async function () {
  // show loading spinner
  toggleSpinner(true);

  try {
    const currentToolsLength = document.querySelectorAll(".border").length;
    const nextTools = toolsData.slice(currentToolsLength, currentToolsLength + 6);

    // wait for 1 second to simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // display more tools
    showAiTools(nextTools);
  } catch (error) {
    console.error(`Error loading more AI tools: ${error}`);
  } finally {
    // hide loading spinner
    toggleSpinner(false);
  }
});

// load the initial ai tools
getAiUniverseHubData();
