
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});
// console.log(process.env)


app.listen(5000,()=>{
    console.log('app listening on port 5000');
});