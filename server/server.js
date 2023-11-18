const Jimp = require("jimp");
const fs = require("fs");
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 5000

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

const folders = fs.readdirSync('./images');
const obj = {};
folders.forEach(item => {
  obj[item] = {
    folder: item,
    files: fs.readdirSync(`./images/${item}`)
  };
});

async function index(image_index, res) {
  const colors = [ 'green', 'red', 'blue', 'yellow', 'purple', 'orange', 'pink', 'lightblue', 'gold', 'black'];
  for (let i = 0; i < image_index; i++) {
    const image_container = await new Jimp(24, 24, colors[Math.floor(Math.random() * colors.length)]);
    for (const key of Object.keys(obj)) {
      const random = Math.floor(Math.random() * obj[key].files.length);
      const overlayPath = `images/${obj[key].folder}/${obj[key].files[random]}`;
      try {
        const overlay = await Jimp.read(overlayPath);
        if (overlay.bitmap.width !== image_container.bitmap.width || overlay.bitmap.height !== image_container.bitmap.height) {
          overlay.resize(image_container.bitmap.width, image_container.bitmap.height);
        }
        image_container.composite(overlay, 0, 0, [{ mode: Jimp.BLEND_SCREEN, opacitySource: 1, opacityDest: 1 }]);
      } catch (error) {
        console.error(`Error processing overlay image ${overlayPath}:`, error);
      }
    }
    try {
      await image_container.writeAsync(`output/res_${i}.${image_container.getExtension()}`);
      res.send("done")
    } catch (error) {
      console.error(`Error writing image output/res_${i}.${image_container.getExtension()}:`, error);
    }
  }
}

// index(1);


app.get('/', (req, res) => res.send('Hello World!'))
app.post('/upload', (req, res) => {
  const uploadedDirectory = req.files.directory;
  const uploadedFiles = req.files;
  console.log("1", uploadedDirectory);
  console.log("2", uploadedFiles);
  res.send('Folder uploaded successfully')
  index(req.body.rep, res)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))