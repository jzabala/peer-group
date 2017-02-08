import R from 'ramda';
import jwtDecode from 'jwt-decode';
import api from '../api';
import * as fromAuthHandler from '../utils/authTokenHandler';
import {  normalizeUser} from '../normalizers';
import React from 'react';
import http from 'axios';

export const signup = user => api.post('/users', user).then(null,
  ({
    response
  }) => Promise.reject(response.data.errors),
);

const loginUser = (user) => ({
  type: 'LOGIN_USER',
  users: normalizeUser(user),
});

export const authenticateUser = dispatch => R.compose(
    dispatch,
    loginUser,
    R.prop('user'),
    jwtDecode,
    fromAuthHandler.setAuthTokenRequest,
  );

export const login = user => dispatch => {
  return api.post('/authenticate', user).then(
    ({
      data
    }) => {
      fromAuthHandler.storeAuthToken(data.token);
      authenticateUser(dispatch)(data.token);
    },
    ({
      response
    }) => Promise.reject(response.data.errors),
  );
}

export const logout = (id) => dispatch => {
  fromAuthHandler.removeAuthToken();
  fromAuthHandler.deleteAuthTokenRequest();
  dispatch({
    type: 'LOGOUT_USER'
  });
  dispatch({
    type: 'REMOVE_USER',
    userId: id
  });
}

export const countryList = (name) => {
  const key = 'AIzaSyBcASq82k5do_ZviitsV64QybYzsa-9O-E';
   const url_city = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${name}&types=geocode&language=en&key=${key}`;
    http.get(url_city)
        .then((response)=>{
          if(response.status === 'OK'){
              const data = response.predictions[0];
              var Places = { city:"", country:""};
              var descriptionPlace = [];
              for(let item in data){
                console.log(item.description);
                descriptionPlace.push(item.description);
              }
              return  descriptionPlace;
          }
          else{ return "No match";}

        })
        .catch(()=>{return "Error come up with the API";})
  return {world:[{
               place:{
                 id:1,
                      country:"Republica Dominicana",
                      city: "Santo Domingo"
                    }},
              {place:{
                     id:2,
                     country:"USA",
                     city:"New York"
                   }},
              {place:{
                id:3,
                     country:"Colombia",
                     city:"Bogota"
                   }}
]};
}
