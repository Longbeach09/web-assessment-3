import axios from "axios";

const randomFossilBtn = document.getElementById("get-random-fossil");

randomFossilBtn.addEventListener("click", async () => {
  try {
    const response = await axios.get("/random-fossil.json");

    const imgDiv = document.querySelector("#random-fossil-image");
    const nameParagraph = document.querySelector("#random-fossil-name");

    imgDiv.src = response.data.img;
    nameParagraph.textContent = response.data.name;
  } catch (error) {
    console.error("Error fetching random fossil:", error);
  }
});
