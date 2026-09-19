import { getDb } from '../db/connect.js';
import { generateConfirmationCode } from '../includes/helpers.js';
import Schedule from '../models/schemas/schedules.js';
import Trip from '../models/schemas/trips.js';

const bookingPage = async (req, res) => {
    const { scheduleId } = req.params;

    const schedule = await Schedule.findOne({ id: Number(scheduleId) }).lean();
    if (!schedule) {
        return res.status(404).render('errors/404', {
            title: 'Schedule Not Found',
            error: `Schedule ${scheduleId} was not found.`,
        });
    }

    const trip = await Trip.findOne({ id: schedule.tripId }).lean();
    const ticketClasses = await db.collection('ticketClasses').find({}).toArray();
    const ticketOptions = ticketClasses.map((ticketClass) => ({
        class: ticketClass.class,
        name: ticketClass.name,
        price: trip.distance * ticketClass.pricePerKm,
        amenities: ticketClass.amenities,
        description: ticketClass.description
    }));

    return res.render('trips/book', {
        title: 'Book Trip',
        schedule,
        ticketOptions
    });
};

const processBookingRequest = async (req, res) => {
    const confirmation = {
        id: generateConfirmationCode(),
        createdAt: new Date().toISOString(),
        ...req.body
    };
    await getDb().collection('confirmations').insertOne(confirmation);

    res.redirect(`/trips/confirmation/${confirmation.id}`);
};

export { bookingPage, processBookingRequest };
