// console.log('JavaScript file added');

/* Load Ai Universe Hub data */
const getAiUniverseHubData = async () => {
  try {
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
  const aiToolsContainer = document.getElementById("ai-tools-container");
  tools.forEach((tool) => {
    const aiDiv = document.createElement("div");
    aiDiv.innerHTML = `
      <div class="border border-gray-300 rounded-md p-5 mt-10 shadow-md hover:-translate-y-1 hover:ease-in duration-300">
        <img src="${tool.image}" class="w-96 rounded-md" />
        <div>
            <h1 class="font-bold mt-5">Features</h1>
            <ul class="p-5 list-decimal">
              <li></li>
              <li></li>
              <li></li>
            </ul>
        </div>
      </div>
    `;
    aiToolsContainer.appendChild(aiDiv);
  });
};

getAiUniverseHubData();
