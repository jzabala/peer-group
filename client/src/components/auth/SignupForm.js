
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
        countryList:{},
        city: '',
      },
      errors: {},
      isSubmit: false,
      redirectTo: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = props.handleChange.bind(this);
    this.handleGetPlace = this.handleGetPlace.bind(this);
    this.handleSubmitError = props.handleSubmitError.bind(this);
    this.resetErrorsRequest = props.resetErrorsRequest.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.resetErrorsRequest();
    const validation = validateSignup(this.state.form);
    validation.then((data) => {
        signup(data).then(
          () => {
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
      if(e.target.value.length > 0){
        places = countryList(e.target.value);
        const world = {place:[]};
        const place = e.target.value;
             places.then((response_) =>{
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
             this.setState({
                            form:{...this.state.form, countryList : world, country: place}
                          });
       });
     }else{
       this.setState({
                      form:{...this.state.form, countryList : '', country: ''}
                    });
     }
  }
  handleClickCountry(country){
    const countryList = Object.create(null);
    this.setState({
      form:{...this.state.form, countryList: countryList, country: country}
    });
  }
  render() {
    return ( < div > { this.state.redirectTo ? < Redirect to={ this.state.redirectTo } /> : < form onSubmit={ this.handleSubmit } className="SignupForm_form" >
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
        onChange = {
          this.handleChange
        }
        errors = {
          this.state.errors.password
        }
        value = {
          this.state.form.password
        }
        />


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
        placeholder = "Enter country"
        onChange={this.handleGetPlace}
        errors = {this.state.errors.country}
        value = {this.state.form.country}
        />
        {this.state.form.countryList.place !== undefined ? <AutoCompleteList world={this.state.form.countryList.place} onClick={(e)=>this.handleClickCountry(e)}/> : null}
         <TextFieldGroup
        name = "city"
        placeholder = "Enter city"
        type = "text"
        onChange = {this.handleChange}
        errors = {
          this.state.errors.city
        }
        value = {
          this.state.form.city
        }
        /> <
        RequestButton
        className = "btn btn-primary SignupForm_submit"
        disabled = {
          this.state.isSubmit
        } >
        Submit <
        /RequestButton> < /
        form >
      } <
      /div>

    );
  }
}

export default connect(null, { addFlashMessage })(withHandlers(SignupForm));
