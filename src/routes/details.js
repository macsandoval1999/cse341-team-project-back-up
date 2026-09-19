import Trip from "../models/schemas/trips.js";
import Schedule from "../models/schemas/schedules.js";

export default async (req, res) => {
  const { tripId } = req.params;
  const [details, schedules] = await Promise.all([
    Trip.findOne({ id: tripId }).lean(),
    Schedule.find({ tripId }).sort({ id: 1 }).lean(),
  ]);

  if (!details) {
    return res.status(404).render("errors/404", {
      title: "Trip Not Found",
      error: `Trip ${tripId} was not found.`,
    });
  }

  return res.render("trips/details", {
    title: "Trip Details",
    details: { ...details, schedules },
  });
};
