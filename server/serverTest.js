var fs = require('fs')
var Jimp = require("jimp");

let obj = {}
const folders = fs.readdirSync('./images')
folders.map(item => {
  obj[`${item}`] = {
    folder: `${item}`,
    files: fs.readdirSync(`./images/${item}`)
  }
})
// console.log(obj);


async function index(image_index){
  // for (let i = 0; i < image_index; i++) {
    const i = image_index
    const colors = [ 'green', 'red', 'blue', 'yellow', 'purple', 'orange', 'pink', 'lightblue', 'gold', 'black'];
    const image_container = await new Jimp(24, 24, colors[Math.floor(Math.random() * colors.length)])
    for (const key of Object.keys(obj)) {
      const random = Math.floor(Math.random() * obj[key].files.length)
      console.log(`images/${obj[key].folder}/${obj[key].files[random]}`);
      overlay(image_container, `images/${obj[key].folder}/${obj[key].files[random]}`, i)
      // console.log(random);
      // console.log('"', obj[key].files[random]);
    }
  // }
}


// index(1)


async function overlay(image_container, avatar_path, index){
  const avatar = await Jimp.read(avatar_path)
  avatar.resize(image_container.bitmap.width, image_container.bitmap.height);
  image_container.composite( avatar, 0, 0, [{ mode: Jimp.BLEND_SCREEN, opacitySource: 1, opacityDest: 1 }] )
  image_container.write(`output/res_${index}.${image_container.getExtension()}`)
  // console.log(image_container.getExtension());

}



// let image = new Jimp(300, 530, 'green', (err, image) => {
//   if (err) throw err
// })

// let message = 'Hello!'
// let x = 10
// let y = 10

// Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
//   .then(font => {
//     image.print(font, x, y, message)
//     return image
//   }).then(image => {
//     let file = `new_name.${image.getExtension()}`
//     return image.write(file) // save
//   })

// const reps = 10
// let a
// for (let i = 0; i < reps; i++) {
//   Jimp.read("lenna.png", (err, lenna) => {
//     if (err) throw err;
//     lenna
//       .resize(24, 24) // resize
//       .composite( a, 0, 0, [{
//         mode: Jimp.BLEND_MULTIPLY,
//         opacitySource: 1,
//         opacityDest: 1
//        }] )
//       .write("test/lena-small-bw.png"); // save
//   });
// }

// for (let i = 0; i < (2); i++) {
//   const acc = Jimp.read('', (err, access) => a = access)
// }


// open a file called "lenna.png"
// Jimp.read("lenna.png", (err, lenna) => {
//   if (err) throw err;
//   lenna
//     .resize(24, 24) // resize
//     .composite( a, 0, 0, [{
//       mode: Jimp.BLEND_MULTIPLY,
//       opacitySource: 1,
//       opacityDest: 1
//      }] )
//     .write("test/lena-small-bw.png"); // save
// });