const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    description : String,
    startDate : String,
    startHour : String,
    endDate : String,
    endHour : String,
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
});

module.exports = mongoose.model('Event', EventSchema);