import express from 'express';
import bcrypt from 'bcryptjs';
import {
  validateNewUser
} from '../validators/userValidator';
import User from '../models/user';
import {
  serverError
} from '../utils/handlers';
import axios from 'axios';

const router = express.Router();

router.post('/', (req, res) => {

  var done = false;
  const user = { ...req.body
  };
  validateNewUser(user).then(
    (user) => {
      const password = bcrypt.hashSync(req.body.password);
      var regexWhiteSpace = /\s/g;
      var address = "address=" + req.body.city.replace(regexWhiteSpace, "+") + "+" + req.body.country.replace(regexWhiteSpace, "+");
      var apiKey = "&key=AIzaSyBcASq82k5do_ZviitsV64QybYzsa-9O-E";
      var geodecodificacionUrl = "https://maps.googleapis.com/maps/api/geocode/json?" + address + apiKey;

      axios.get(geodecodificacionUrl)
        .then(function(response) {
          let data = response.data;
          if (data.status == 'OK') {
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            //var timestamp = new Date().toMinute/1000;
            var timeZoneAPI = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=14.27111111111111${apiKey}`;
            axios.get(timeZoneAPI)
              .then(function(responseTimeZone) {
                console.log(responseTimeZone)
              })
              .catch(function() {
                return res.status(500).json({
                  "error": "server out"
                });
              });
            //Save user to dataBase
            /*  new User({ ...user,
                password,
                lat,
                lng
              }).save().then(
                () => {
                  console.log("entro");
                  console.log(user);
                  res.end();
                },
                () => {},
                err => serverError(res, err),
              );*/
            res.end();
          } else {
            return res.status(500).json({
              "error": "server out"
            });
          }
        }).catch(() => {
          console.log(`Got error: ${e}`);
        });

    },
    (errors) => {
      res.status(400).json({
        errors
      });
    },
  );
});

export default router;
