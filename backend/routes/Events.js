const express = require('express');
const router = express.Router();
const EventsController = require('../controllers/Events')

router.get('/myNotes/:id', EventsController.getEventsByOwner);
router.get('/getEvents', EventsController.getEvents);
router.post('/myNotes/:id', EventsController.createEvent);
router.delete('/myNotes/:id', EventsController.deleteEvent);
router.put('/myNotes/:id', EventsController.editEvent);

module.exports = router;