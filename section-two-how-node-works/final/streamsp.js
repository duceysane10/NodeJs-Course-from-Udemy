const fs = require('fs');
const server = require('http').createServer();

server.on('request',(req,res) => {
    
    const readble = fs.createReadStream("test-file.txt");
    readble.pipe(res);
});

server.listen(8000,'127.0.0.1', ()=>{
    console.log('Server listening on port');
});
