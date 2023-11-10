import User from "../models/User.js";

export const getPeople = async (req, res) => {
  const colorado = {
    center: {
      type: "Point",
      coordinates: [33.880446840788395, 35.50140072082387],
    },
    maxDistance: 100,
  };
  User.find({
    location: {
      $nearSphere: {
        $maxDistance: 100000, //meters
        $geometry: {
          type: "Point", //type =>polyline =>circle
          coordinates: [33.880446840788395, 35.50140072082387], //user geolocation
        },
      },
    },
  })
    .then((result) => {
      res.status(200).json({ users: result, success: true });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
