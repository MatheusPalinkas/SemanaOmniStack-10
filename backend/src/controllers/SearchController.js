const Dev = require('../models/Dev');
const parseStringAsArray = require('./utils/parseStringAsArray');

// index, show, store, update e destroy

//Tipos de parametros:
//Query params: req.query => GET
//Route params: req.params => PUT, DELETE
//Body: req.body => POST, PUT 
module.exports = {
    async index(req, res){
        const { latitude, longitude, techs } = req.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                },
            },
        });
        
        return res.json({devs: devs});
    },
}