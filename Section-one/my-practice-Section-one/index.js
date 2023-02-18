// importing Packages

const fs = require('fs');
const http = require('http');
const url = require('url');

// importing modules
const Tempreplace = require('./modules/replaceTemplate');

/////////////////////////////////////
//// Fille System

// // reading File
// const readFile = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// console.log(readFile)

// // Writing file

//  fs.writeFileSync('./starter/txt/output.txt', `this is what i know about the Avacado:\n\n${readFile}`);
// console.log('writing new file');


/////////////////////////////////////
//// Server

// reading tempaltes


// const Tempreplace = (tempCard,product) =>{
//     let output = tempCard.replace(/{%PRODUCTNAME%}/g,product.productName);
//     output = output.replace(/{%IMAGE%}/g,product.image);
//     output = output.replace(/{%FROM%}/g,product.from);
//     output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
//     output = output.replace(/{%QUANTITY%}/g,product.quantity);
//     output = output.replace(/{%PRICE%}/g,product.price);
//     output = output.replace(/{%DESCRIPTION%}/g,product.description);
//     output = output.replace(/{%ID%}/g,product.id);
    
//     if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
//     return output;
//   }

const overview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const cardTemp = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const productTemp = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const readApi = fs.readFileSync('./dev-data/data.json');
// converting JSON into string
const dataObj = JSON.parse(readApi);
const server = http.createServer((req,res) =>{
    // console.log(url.parse(req.url,true));
    const {query,pathname} = (url.parse(req.url,true));
    // Home page
    if(pathname === '/' || pathname === '/overview'){
        const productCard = dataObj.map(el => Tempreplace(cardTemp,el)).join('');
        const lastOutput = overview.replace(`{%PRODUCT_CARDS%}`,productCard);
        res.writeHead(200, {'Content-Type': 'text/html'});
        // console.log(productCard);
        res.end(lastOutput);
    }
        // Single product Page
    else if(pathname === '/product'){
        
        const singleproduct = dataObj[query.id];
        const lastOutput = Tempreplace(productTemp,singleproduct);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(lastOutput);
    }
        // Api page
    else if(pathname === '/api'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(readApi)}
        // Not Found Page
    else{
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>4o4 this page</h1>')}
});

server.listen(8000,'127.0.0.1',()=>{
    console.log('Server listening on port');
})