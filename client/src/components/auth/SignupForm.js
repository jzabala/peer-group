
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import RequestButton from '../common/RequestButton';
import  {signup, countryList} from '../../actions/auth';
import {  addFlashMessage} from '../../actions/flashMessages';
import {  validateSignup} from '../../validators/authValidator';
import withHandlers from '../../utils/withHandlers';
import AutoCompleteList from '../common/AutoCompleteList';
import './SignupForm.css';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
        city: '',
      },
      errors : {},
      isSubmit : false,
      redirectTo : '',
      cityCountry : '',
      timer : null,
      countryList : {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = props.handleChange.bind(this);
    this.handleGetPlace = this.handleGetPlace.bind(this);
    this.handleSubmitError = props.handleSubmitError.bind(this);
    this.resetErrorsRequest = props.resetErrorsRequest.bind(this);
  }
  callCountryAPI(typePlace){
    const places = countryList(typePlace);
    const world = { place : [] };
         places.then((response_) => {
                  const data = response_.data.data.places.sort((a,b)=>{
                           if(a.country < b.country){
                             return 1;
                            }
                          else if(a.country > b.country){
                             return -1;
                           }
                        else{
                            return 0;
                           }
                      });
           for(let item = 0; item < data.length; item++){
                var city = data[item].city;
                var country = data[item].country;
                world.place.push({id : item, country : country, city : city});
             }
         this.setState({ ...this.state, countryList : world});
   });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.resetErrorsRequest();
    const validation = validateSignup(this.state.form);
    console.log(validation);
    validation.then((data) => {
        signup(data).then(
          () => {
            console.log("ENtro");
            this.setState({
              redirectTo: '/login'
            });
            this.props.addFlashMessage({
              type: "success",
              strong: "Successful Signup!",
              text: "You can login now.",
              duration: 5000,
              timeout: false,
            });
          },
          this.handleSubmitError,
        )
      },
      this.handleSubmitError,
    );
  }
  handleGetPlace(e){
    var places = Object.create(null);
    var typePlace = e.target.value;
    this.setState({...this.state, cityCountry : typePlace});
    if(typePlace.length > 0){
        if(this.state.timer === null){
          /*Try to make a small debounce at this part later create a help  fucntion for handle the debounce*/
          this.callCountryAPI(typePlace);
          this.setState({ timer : true });
          window.setTimeout(()=>{this.setState({...this.state, timer : null })},300);
        }
     }else{
         this.setState({ form:{...this.state.form, country: ''}, countryList : null });
     }
  }
  handleClickCountry(country){
    const countryList = Object.create(null);
    let splitCountry = country.split(',');
    try {
      this.setState({
        form:{...this.state.form, city:splitCountry[0], country: splitCountry[1]},
        cityCountry: country, countryList: countryList
       });
    } catch (e) {
      this.setState({
        form:{...this.state.form, city:splitCountry[0], country: 'NaN'},
        cityCountry: splitCountry[0], countryList: countryList
       });
    }
  }
  render() {
    return ( < div > { this.state.redirectTo ? < Redirect to={ this.state.redirectTo } /> : < form onSubmit={ this.handleSubmit } className="SignupForm_form" >
      <TextFieldGroup
             name="username"
             placeholder="Username"
             value={ this.state.form.username }
             errors={ this.state.errors.username }
             onChange={ this.handleChange }
           />
       < TextFieldGroup
        name="email"
        placeholder="Enter email"
        value = { this.state.form.email}
        errors = {this.state.errors.email}
        onChange = {this.handleChange}
        />
        < TextFieldGroup
        name="password"
        type="password"
        placeholder = "Password"
        onChange = { this.handleChange }
        errors = { this.state.errors.password }
        value = { this.state.form.password } />
        <TextFieldGroup
        name = "confirmPassword"
        type = "password"
        placeholder = "Confirm Password"
        onChange = {this.handleChange}
        errors = {this.state.errors.confirmPassword}
        value = {this.state.form.confirmPassword}
        />
        <TextFieldGroup
        name = "country"
        placeholder = "City, Country"
        onChange={this.handleGetPlace}
        errors = {this.state.errors.country}
        value = {this.state.cityCountry}
        />
        {this.state.countryList !== null && this.state.countryList.place !== undefined ? <AutoCompleteList world={this.state.countryList.place} onClick={(e)=>this.handleClickCountry(e)}/> : null}
        <RequestButton
        className = "btn btn-primary SignupForm_submit"
        disabled = { this.state.isSubmit } >
        Submit <
        /RequestButton> < /
        form >
      } <
      /div>

    );
  }
}

export default connect(null, { addFlashMessage })(withHandlers(SignupForm));
