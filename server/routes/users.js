import express from 'express';
import bcrypt from 'bcryptjs';
import { validateNewUser } from '../validators/userValidator';
import User from '../models/user';
import { serverError } from '../utils/handlers';
import axios from 'axios';

const router = express.Router();

router.get('/getCountryList', (req, res)=>{    
  const key = 'AIzaSyBcASq82k5do_ZviitsV64QybYzsa-9O-E';
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.url_city}&types=geocode&language=en&key=${key}`;
  //'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=santo&types=geocode&language=en&key=AIzaSyBcASq82k5do_ZviitsV64QybYzsa-9O-E'
  console.log(url);
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
          else{ return res.status(404).json({data:"No data found"});
        }
        })
        .catch(()=>{return res.status(500).json({data:"Error en la API"});})
})
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
