
const url= require('url');
const http= require('http');
const fs = require('fs');
// importing third party libraries
const slugify = require('slugify');

// importing modules
const Tempreplace = require('./modules/replaceTemplate');


//////////////////////////////////////////////////////
//////// File System

// SYNCHRONOUS BLOCKING
// // importing the fs module from the file system module 



// // Reading Fiiles
// const textin =fs.readFileSync('./starter/txt/input.txt','utf8');
// console.log(textin);

// // Writing Filles
// const textWr = (`This what i know Avacodo: ${textin}.\n created on ${Date.now()}`);
// fs.writeFileSync('./starter/txt/output.txt', textWr);
// console.log(textWr);

// // ASYNCHRONOUS Non-BLOCKING
// fs.readFile('./starter/txt/start.txt', 'utf8',(err,data1) =>{
//     console.log (data1);
//     fs.readFile('./starter/txt/append.txt', 'utf8',(err,data) =>{
//         console.log (data);
//         fs.writeFile('./starter/txt/new.txt', `${data1}:\n ${data}.`,err=>{
//             console.log ('new fille created');
//         });
//     });
// });
// console.log('file is readings');



//////////////////////////////////////////////////////
//////// Server


const tempoverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const product = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const dataApi = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(dataApi);

const server =http.createServer((req,res) =>{
    // qUERYGA WUXUU II HAAYAA PRODUCT GA LA GUJIYAY iD GIISA ; HALKA PATHNAME UU II HAAYO PATHNAME KA
   const {query,pathname}= (url.parse(req.url,true));  
    // Overview page
    if(pathname=== '/' || pathname=== '/overview'){
        res.writeHead(200,{'Content-Type': 'text/html',});
        
        // Waxaan shubeenaa Xogta Api ga laga keeno Card keena inagoo ku dul wareegeeno
        const cardOver = dataObj.map(el => Tempreplace(tempCard,el)).join('');
        const lastoutput = tempoverview.replace(`{%PRODUCT_CARDS%}`,cardOver)
        res.end(lastoutput);
    }
        else if(pathname=== '/product'){
            res.writeHead(200,{'Content-Type': 'text/html',});
            const producCard = dataObj[query.id];
            const lastoutput = Tempreplace(product, producCard);
            res.end(lastoutput);
            
        }
    // Api access
    else if(pathname=== '/api'){
        res.writeHead(200,{
            'Content-Type': 'application/json',
        });
        res.end(dataApi);
    }
    else{
        res.writeHead(404, {
           'Content-type' : 'text/html',
           'my-own-header' : 'hello world'
        });
        res.end('<h1>404 Page Not Found</h1>');
    }
});

server.listen(8000,'127.0.0.1',() =>{
    console.log('Server listening on port 8000');
});