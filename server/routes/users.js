import express from 'express';
import bcrypt from 'bcryptjs';
import { validateNewUser } from '../validators/userValidator';
import User from '../models/user';
import { serverError } from '../utils/handlers';
import axios from 'axios';

const router = express.Router();

router.post('/', (req, res) => {
  const user = { ...req.body
  };
  validateNewUser(user).then(
    (user) => {
      const password = bcrypt.hashSync(req.body.password);
      let regexWhiteSpace = /\s/g;
      let address = "address=" + req.body.city.replace(regexWhiteSpace, "+") + "+" + req.body.country.replace(regexWhiteSpace, "+");
      const apiKey = "&key=AIzaSyBcASq82k5do_ZviitsV64QybYzsa-9O-E";
      const geodecodificacionUrl = "https://maps.googleapis.com/maps/api/geocode/json?" + address + apiKey;

      axios.get(geodecodificacionUrl)
        .then(function (response) {
          const data = response.data;
          if (data.status === 'OK') {
            const lat = data.results[0].geometry.location.lat;
            const lng = data.results[0].geometry.location.lng;
            const date = new Date();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const secound = date.getSeconds();
            const totalSecound = (((hour / 60) * 60) + (minute * 60) + secound);
            const timeZoneAPI = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${totalSecound}${apiKey}`;
// Get time zone using the API of googleTimeZoneAPI
            axios.get(timeZoneAPI)
              .then(function(responseTimeZone) {
                const timeZone = responseTimeZone.data.timeZoneName;
                // Save user to dataBase
                  new User({ ...user,
                    password,
                    lat,
                    lng,
                    timeZone
                  }).save().then(
                    () => {
                      res.end();
                    },
                    err => serverError(res, err)
                  );
              })
              .catch(function() {
                return res.status(500).json({
                  error: 'server for time zone thow a error or the is a bad request'
                });
              });
          } else {
            return res.status(500).json({
              error: `server geodecodification: ${data.status}`
            });
          }
        }).catch(() => {
          return res.status(500).json({
            error: 'Error happen in the promise of geodecodification'
          });
        });

    },
    (errors) => {
      res.status(400).json({
        errors
      });
    }
  );
});

export default router;
