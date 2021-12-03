const mongoose = require('mongoose');
const schema = mongoose.Schema;

let photosSchema = new mongoose.Schema({
    comp_id: {type: Number, required: true},
    comp_photos: {type: String, required: true}
});

const photosModel = mongoose.model('photos', photosSchema);
module.exports = photosModel;