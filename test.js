const fs = require("fs");
const path = require("path");

function getPhotoNames(folderPath) {
  const photoNames = [];
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const extname = path.extname(file).toLowerCase();
    if (
      extname === ".jpg" ||
      extname === ".jpeg" ||
      extname === ".png" ||
      extname === ".gif"
    ) {
      photoNames.push(file);
    }
  });
  return photoNames;
}

module.exports = getPhotoNames;
