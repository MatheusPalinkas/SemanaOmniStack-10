const api = require('../services/api');
const Dev = require('../models/Dev');
const parseStringAsArray = require('./utils/parseStringAsArray');

// index, show, store, update e destroy

//Tipos de parametros:
//Query params: req.query => GET
//Route params: req.params => PUT, DELETE
//Body: req.body => POST, PUT 
module.exports = {
    async store(req, res) {
        const { gitHub_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ gitHub_username });

        if (!dev) {
            const response = await api.get(`/${gitHub_username}`);

            const { avatar_url, bio } = response.data;
            const techsArray = parseStringAsArray(techs.toUpperCase());
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
            let { name } = response.data;
            if (!name)
                name = response.data.login;

            dev = await Dev.create({
                gitHub_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }

        return res.json(dev)
    },
    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs)
    },
    async update(req, res) {
        const { id } = req.params;
        const { name, techs, latitude, longitude, avatar_url, bio } = req.body;
        const techsArray = (!techs && typeof (techs) != 'undefined') ? parseStringAsArray(techs.toUpperCase()) : techs.toUpperCase();

        let location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };
        const oldDev = await Dev.findOne({ _id: id });

        oldDev.name = name;
        oldDev.techs = techsArray;
        oldDev.avatar_url = avatar_url;
        oldDev.bio = bio;
        oldDev.location = location;

        let dev = await Dev.updateOne({ _id: id }, oldDev);
        dev = await Dev.findOne({ _id: id });

        return res.json(dev)
    },
    async destroy(req, res) {
        const { id } = req.params;

        const response = await Dev.deleteOne({ _id: id });

        const IsDelete = response.deletedCount > 0? true: false;
        return res.json(IsDelete);
    },

}