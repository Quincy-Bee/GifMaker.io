const imageUpload = document.getElementById("imageUpload");
const previewContainer = document.getElementById("previewContainer");
const generateBtn = document.getElementById("generateBtn");
const gifResult = document.getElementById("gifResult");
const speedInput = document.getElementById("speedInput");

let uploadedImages = [];

// ✅ UPLOAD + PREVIEW
imageUpload.addEventListener("change", function () {
  uploadedImages = [...imageUpload.files];
  showPreviews();
});

function showPreviews() {
  previewContainer.innerHTML = "";

  uploadedImages.forEach((file) => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.width = 120;
    previewContainer.appendChild(img);
  });
}

// ✅ BUTTON CLICK
generateBtn.addEventListener("click", function () {
  if (uploadedImages.length === 0) {
    alert("Please upload images first.");
    return;
  }

  createGif();
});

// ✅ CREATE GIF
function createGif() {
  gifResult.innerHTML = "<p>Generating GIF...</p>";

const gif = new GIF({
  workers: 2,
  quality: 10,

});

console.log("GIF finished");


  const images = previewContainer.querySelectorAll("img");

  images.forEach((img) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.naturalWidth || 100;
    canvas.height = img.naturalHeight || 100;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    gif.addFrame(canvas, {
      delay: Number(speedInput.value),
      copy: true
    });
  });

  gif.on("finished", function (blob) {
    const url = URL.createObjectURL(blob);

    gifResult.innerHTML = `
      <h3>Your GIF</h3>
      <img src="${url}" />
      <br><br>
      <a href="${url}" download="my-gif.gif">Download GIF</a>
    `;
  });

  gif.render();
}