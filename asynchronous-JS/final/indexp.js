const fs = require('fs');
const superagent = require('superagent');


const readFilePro = file =>{
    return new Promise((resolve,rejects) =>{
        fs.readFile(file,(err,data) =>{
           if (err) rejects('I could not find that file 😫'); 
           resolve(data);
        });
    })
    
}

const writefFiePro = (file,data)  => {
    return new Promise((resolve,rejects) =>{
        fs.writeFile(file,data, err =>{
          if (err) rejects('I could not write');  
          resolve('success')
        });
        
    })
}

const getDogimg = async ()=>{
    try {
        const getingFile = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`eeyga : ${getingFile}`);
    
    const doginfo1 =  superagent.get(`https://dog.ceo/api/breed/${getingFile}/images/random`);       
    const doginfo2 =  superagent.get(`https://dog.ceo/api/breed/${getingFile}/images/random`);       
    const doginfo3 =  superagent.get(`https://dog.ceo/api/breed/${getingFile}/images/random`);       

    const allimg = await Promise.all([doginfo1,doginfo2,doginfo3]);
    const imgages = allimg.map(el=>el.body.message);
    // writing dog images in to our dog-img.txt file
    console.log(imgages)
    await writefFiePro('dog-img.txt',imgages.join('\n'));
    console.log(`Saved Dog-img 😍 `);
    } catch(err){
        console.log(err);
    }
}
getDogimg();