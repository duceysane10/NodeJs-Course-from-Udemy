
const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.allTours = (req, res) => {
    res.status(200).json({
        status: 200,
        result: tours.length,
        Tours:{
            tours
        }
    })
}

// Geting Single Tour
exports.getTour = (req, res) => {
    // console.log(req.params.id)
    const tour =  tours[req.params.id];
    console.log(tour)
    if(req.params.id > (tours.length -1) * 1){
        return res.status(404).json({
            statusbar: 'error',
            message : "Invalid"
        }); 
    }
    res.status(200).json({
        status: 200,
        tour
    })
}

// creating New Tour 
exports.createTour = (req, res) =>{
    console.log(req.body);
    if(!req.body.name || !req.body.price){
     return res.status(400).json({
         status : 404,
         message : "name and price are required"
     })
    } 

    const newId = (tours.length -1)+1;
    const newTour = Object.assign({"id":newId},req.body)
    tours.push(newTour);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,JSON.stringify(tours),() =>{
     res.status(200).json({
         statusbar: 'success',
         message: 'new tour Added successfully',
         Tour : newTour
        })
    });
 
 }