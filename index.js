const http = require("http");

http.createServer((request, response) => {
  response.writeHead(200, { 'Content-type': 'text/html' });
  response.end('<h1>Hello Word!</h2>');
}).listen(3000, (error) => {
  if (error) {
    console.log(`Erro ao criar o servidor ${error}`);
  } else {
    console.log('Servidor criado com sucesso');
  }
});