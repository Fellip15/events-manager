
const mongoose = require("mongoose");
const { isValidObjectId, ObjectId } = require('mongoose');
const EventsModel = require('../models/Events');

module.exports.getEventsByOwner = async (req, res) => {
    const id = mongoose.mongo.ObjectId(req.params.id);

    const events = await EventsModel.find({owner : id});
    console.log(events);
    if (events.length > 0)
        return res.status(200).json(events);
    else if (events.length == 0)
        return res.status(200);
    
    return res.status(200).json(events);
}

module.exports.getEvents = async (req, res) => {
    const eventsFound = await EventsModel.find();
    
    return res.status(200).json(eventsFound);
}

module.exports.createEvent = async (req, res) => {
    const id = req.params.id;

    if (!req.body.description.length || !req.body.startDate.length || !req.body.endDate.length
        || !req.body.startHour.length || !req.body.endHour.length)
        return res.status(400);

    const newEvent = new EventsModel({
        description : req.body.description,
        startDate : req.body.startDate,
        startHour : req.body.startHour,
        endDate : req.body.endDate,
        endHour : req.body.endHour,
        owner : id,
    });

    const eventAdded = await newEvent.save();

    return res.status(200).json(eventAdded);
}

module.exports.deleteEvent = async (req, res) => {
    const id = req.params.id;
    if(!isValidObjectId(id))
        return res.status(404).send("Event not found");

    const eventModelDeleted = await EventsModel.findOneAndDelete({ _id: id }).exec();
    if(eventModelDeleted)
        return res.status(200).json(eventModelDeleted);

    return res.status(404).send("Event not found");
}

module.exports.editEvent = async (req, res) =>{
    const id = req.params.id;

    const editedEvent = await EventsModel.findOneAndUpdate(
        {_id : id}, 
        {
            description : req.body.description,
            startDate : req.body.startDate,
            startHour : req.body.startHour,
            endDate : req.body.endDate,
            endHour : req.body.endHour
        }, 
        {new: true}
    ).exec();
    
    if(editedEvent)
        return res.status(200).json(editedEvent);

    return res.status(404).json("CardList not found");
}