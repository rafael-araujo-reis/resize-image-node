const sharp = require("sharp");
const compress_images = require("compress-images");
const fs = require("fs");

let path = process.argv[2];
let width = Number(process.argv[3]);

function resize(inputPath, outputPath, width) {
  sharp(inputPath)
    .rotate(45)
    .resize(width)
    .toFile(outputPath, (error) => {
      if (error) {
        console.log(`Erro ao redimensionar a imagem -> ${error.message}`);
      } else {
        console.log('Imagem redimensionada com sucesso');
        compress(outputPath, './compressed/');
      }
    });
}

function compress(inputPath, outputPath) {
  compress_images(inputPath, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
    function (error, completed, statistic) {
      console.log("-------------");
      console.log(error);
      console.log(completed);
      console.log(statistic);
      console.log("-------------");

      deleteFileTemp(inputPath);
    }
  );
}

function deleteFileTemp(inputFile) {
  fs.unlink(inputFile, (error) => {
    if (error) {
      console.log(`Error ao excluir o arquivo temporário -> ${error.code}: ${error.message}`);
    } else {
      console.log('Arquivo excluido com sucesso');
    }
  });
}

resize(path, './temp/output.jpg', width);