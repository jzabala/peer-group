import R from 'ramda';
import jwtDecode from 'jwt-decode';
import api from '../api';
import * as fromAuthHandler from '../utils/authTokenHandler';
import {normalizeUser} from '../normalizers';
import React from 'react';

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
    ({data}) => {
      fromAuthHandler.storeAuthToken(data.token);
      authenticateUser(dispatch)(data.token);
    },
    ({response}) => Promise.reject(response.data.errors),
  );
}

export const logout = (id) => dispatch => {
  fromAuthHandler.removeAuthToken();
  fromAuthHandler.deleteAuthTokenRequest();
  dispatch({type: 'LOGOUT_USER'});
  dispatch({
    type: 'REMOVE_USER',
    userId: id
  });
}

export const countryList = (name) => {
   const response = api.get(`/users/getCountryList?url_city=${name}`);
    const world = {place:[]};
     response.then((response_) =>{
         const data = response_.data.data.places;
         for(let item = 0; item < data.length; item++){
             var city = data[item].city;
             var country = data[item].country;
             world.place.push({id : item, country : country, city : city});
         }
   });   
   return world;
  /*return {world:[{
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
        ]};*/
}
