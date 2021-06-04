const sharp = require("sharp");

let path = process.argv[2];
let width = Number(process.argv[3]);

sharp(path)
  .resize(width)
  .toFile('./temp/output.jpg', (error) => {
    if (error) {
      console.log(`Erro ao redimensionar a imagem -> ${error.message}`);
    } else {
      console.log('Imagem redimensionada com sucesso');
    }
  });