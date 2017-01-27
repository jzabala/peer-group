import express from 'express';
import bcrypt from 'bcryptjs';
import {validateNewUser} from '../validations/users';
import User from '../models/user';
import {serverError} from '../utils/handlers';
import https from 'https';

const router = express.Router();

router.post('/', (req, res) => {

    const user = {...req.body};
    validateNewUser(user).then(
        () => {
            const password = bcrypt.hashSync(req.body.password);
            var regexWhiteSpace = /\s/g;
            var address = "address="+ req.body.city.replace(regexWhiteSpace, "+") + "+" + req.body.country.replace(regexWhiteSpace, "+");
            var apiKey = "&key=AIzaSyBcASq82k5do_ZviitsV64QybYzsa-9O-E";
            var geodecodificacionUrl = "https://maps.googleapis.com/maps/api/geocode/json?"+address+apiKey;

            https.get(geodecodificacionUrl, function(res) {
                const statusCode = res.statusCode;
                const contentType = res.headers['content-type'];

                let error;
                if (statusCode !== 200) {
                    error = new Error(`Request Failed.\n` +
                        `Status Code: ${statusCode}`);
                } else if (!/^application\/json/.test(contentType)) {
                    error = new Error(`Invalid content-type.\n` +
                        `Expected application/json but received ${contentType}`);
                }
                if (error) {
                    console.log(error.message);
                    // consume response data to free up memory
                    res.resume();
                    return;
                }

                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => rawData += chunk);
                res.on('end', () => {
                  try {
                    let parsedData = JSON.parse(rawData);

                     console.log(typeof parseData);
                     console.log(parsedDta.results);
                    //console.log(rawData.geometry.location);


                    //req.body.lat = rawData.geometry.location.lat;
                    //req.body.lng = rawData.geometry.location.lng;
                  } catch (e) {
                    console.log(e.message);
                  }
                });
              }).on('error', (e) => {
                console.log(`Got error: ${e.message}`);

            });
console.log(req.body);
            new User({...req.body,
                password
            }).save().then(
                () => res.end(),
                err => serverError(res, err),
            );
        },
        (errors) => {
            res.status(400).json({
                errors
            });
        },
    );
});

export default router;
