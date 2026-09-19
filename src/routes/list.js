import Trip from "../models/schemas/trips.js";

export default async (req, res) => {
    const [regions, trips, seasons] = await Promise.all([
        Trip.distinct("region"),
        Trip.find({}).sort({ id: 1 }).lean(),
        Trip.distinct("bestSeason"),
    ]);

    res.render("trips/list", {
        title: "Scenic Train Trips",
        regions,
        trips,
        seasons,
    });
};
