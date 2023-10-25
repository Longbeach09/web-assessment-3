import axios from "axios";

const randomFossilBtn = document.getElementById("get-random-fossil");

randomFossilBtn.addEventListener("click", async () => {
  const response = await axios.get("/random-fosiil.json");

  console.log(response);

  const imgDiv = document.querySelector("#img-div");
  imgDiv.setAttribute(src, response.data.img);
});

//
