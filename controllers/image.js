const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY
   });

const handleApiCall = async (req, res) => {
    try {
        const data = await app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input);
        res.json(data);
    } catch (error) {
        res.status(400).json('Unable to work with API')
    }
} 

const handleImage = async (req, res, knex) => {
    const { id } = req.body;
    try {
        const entry = await knex('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries');
        res.json(entry[0]);
    } catch (error) {
        res.status(400).json('Unable to get entries')
    }
};

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}