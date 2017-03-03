import express from 'express';
import bcrypt from 'bcryptjs';
import { validateNewUser, validateUserPath } from '../validators/userValidator';
import User from '../models/user';
import UserPath from '../models/userPath';
import * as handlers from '../utils/handlers';
import { parseToUserPath } from '../utils/functions';
import authenticate from '../middlewares/authenticate';
import axios from 'axios';

const router = express.Router();

router.get('/getCountryList', (req, res)=>{
  const key = 'AIzaSyBcASq82k5do_ZviitsV64QybYzsa-9O-E';
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.url_city}&types=geocode&language=en&key=${key}`;
  axios.get(url)
        .then((response)=>{
         if(response.status == 200){
              const data = response.data.predictions;
              var descriptionPlaces = {places:[]};
              for(let item = 0; item < data.length; item++){
                   var city = data[item].structured_formatting.main_text;
                   var country = data[item].structured_formatting.secondary_text;
                  descriptionPlaces.places.push({city:city, country:country});
                }
                return  res.status(200).json({data:descriptionPlaces});
          }
          else{ return res.status(404).json({data:"No data found"}); }
        })
        .catch(()=>{return res.status(500).json({data:"Error en la API"});})
})

router.post('/', (req, res) => {

  const user = { ...req.body };
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

router.post('/paths', authenticate, (req, res) => {
  const user = req.user;
  const requestBody = { ...req.body };
  requestBody.username = user.username;
  validateUserPath(requestBody).then(
    (requestData) => {
      const result = UserPath.findOne({ username: user.username, pathUrl: requestData.pathUrl });
      result.then(
        (dbUserPath) => {
          let userPath = dbUserPath;
          if (userPath) {
            const milestone = requestData.milestone;
            const milestones = userPath.milestones.filter(
              // eslint-disable-next-line eqeqeq
              m => m.milestoneId != milestone.milestoneId,
            );
            userPath.milestones = [...milestones, milestone];
            userPath.history.push(milestone);
          } else {
            userPath = new UserPath(parseToUserPath(requestData, user));
          }
          handlers.return200(
            res,
            userPath.save().then(
              userPathResult => userPathResult.milestones,
              err => Promise.reject(err),
            ),
          );
        },
        (error) => handlers.serverError(res, error),
      );
    },
    errors => handlers.validationError(res, errors),
  );
});

router.get('/paths/:url', authenticate, (req, res) =>
  UserPath.findOne({ username: req.user.username, pathUrl: req.params.url })
    .then(
      (userPath) => userPath ?
        res.json(userPath.milestones) :
        res.status(404).json(
          { errors: { general: 'User path not found' } },
        ),
      (error) => handlers.serverError(res, error),
      ),
    );

export default router;
