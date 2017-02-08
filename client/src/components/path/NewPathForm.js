import React from 'react';
import {
  connect
} from 'react-redux';
import R from 'ramda';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaGroup from '../common/TextAreaGroup';
import RequestButton from '../common/RequestButton';
import Milestone from './Milestone';
import { kebabCase } from '../../utils/functions';
import { validateNewPath } from '../../validators/pathValidator.js'
import withHandlers from '../../utils/withHandlers';
import {
  createPath
} from '../../actions';
import {
  addFlashMessage
} from '../../actions/flashMessages';
import './NewPathForm.css';

const url = R.compose(kebabCase, R.replace(/[^a-zA-Z0-9-\s_]/g, ''));

const initialStaet = {
  form: {
    name: '',
    url: '',
    description: '',
    milestones: [
      {
        name: '',
      },
    ],
  },
  errors: {},
  changeUrl: true,
  isSubmit: false,
};

export class NewPathForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialStaet;
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUrlChagne = this.handleUrlChagne.bind(this);
    this.handleAddMilestone = this.handleAddMilestone.bind(this);
    this.handleRemoveMilestone = this.handleRemoveMilestone.bind(this);
    this.handleMilestonesChange = this.handleMilestonesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetErrorsRequest = props.resetErrorsRequest.bind(this);
    this.handleSubmitError = props.handleSubmitError.bind(this);
    this.handleChange = props.handleChange.bind(this);
  }
  handleNameChange(e) {
    const form = { ...this.state.form,
      name: e.target.value
    };
    if (this.state.changeUrl) {
      form.url = url(e.target.value);
    }
    this.setState({
      form
    });
  }
  handleUrlChagne(e) {
    this.setState({
      changeUrl: false,
      form: { ...this.state.form,
        url: url(e.target.value)
      }
    });
  }
  handleAddMilestone() {
    const form = this.state.form;

    this.setState({
      form: { ...form, milestones: [ ...form.milestones, { name: '' } ] },
    });
  }
  handleRemoveMilestone(indexMilestone) {
    return (e) => {
      const { form, errors } = this.state;
      const milestones = form.milestones.filter(
        // eslint-disable-next-line
        (milestone, index) => index != indexMilestone
      );

      const newErrors = !errors.milestones ? errors :
        // eslint-disable-next-line
        errors.milestones.filter((milestone, index) => index != indexMilestone);
      this.setState({ form: { ...form, milestones }, errors: newErrors });
    }
  }
  handleMilestonesChange(e) {
    const form = this.state.form;
    const milestones = form.milestones.map(
      // eslint-disable-next-line
      (milestone, index) => index == e.target.dataset.index ?
        { ...milestone, name: e.target.value } :
        milestone
    );
    this.setState({ form: { ...form,  milestones } });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.resetErrorsRequest();

    const validation = validateNewPath(this.state.form);
    validation.then(
      path => {
        this.props.createPath(path).then(
          () => {
            this.setState(initialStaet);
            this.props.addFlashMessage({
              type: "success",
              strong: "Path added successfully!",
              text: "You can add another.",
              duration: 5000,
              timeout: false,
            });
          },
          this.handleSubmitError,
        );
      },
      errors => this.handleSubmitError(errors),
    );
  }
  render() {
    const {
      form,
      errors
    } = this.state;
    return ( <
      form className = "NewPathForm-form"
      onSubmit = {
        this.handleSubmit
      } >
      <
      TextFieldGroup name = "name"
      placeholder = "Name"
      value = {
        form.name
      }
      errors = {
        errors.name
      }
      onChange = {
        this.handleNameChange
      }
      />

      <
      TextFieldGroup name = "url"
      placeholder = "Url"
      value = {
        form.url
      }
      errors = {
        errors.url
      }
      onChange = {
        this.handleUrlChagne
      }
      />

      <
      TextAreaGroup name = "description"
      placeholder = "Description"
      value = {
        form.description
      }
      errors = {
        errors.description
      }
      onChange = {
        this.handleChange
      }
      />
        <fieldset className="form-group text-left NewPathForm-milestones"
          onChange={ this.handleMilestonesChange }
        >
          <h5 className="text-center">Milestones</h5>
          {
            this.state.form.milestones.map(
              (milestone, index) => <Milestone
                key={ index }
                index={ index }
                value={milestone.name}
                onDelete={ this.handleRemoveMilestone(index) }
                placeholder="Name"
                errors={ errors.milestones && errors.milestones[index] &&
                  errors.milestones[index].name }
              />
            )
          }
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={ this.handleAddMilestone }
          >
            Add milestone
          </button>
        </fieldset>
      <RequestButton className = "btn btn-primary"
      request = {
        this.state.isSubmit
      } >
      Submit <
      /RequestButton> <
      /form>
    );
  }
}

export default connect(
  null, {
    createPath,
    addFlashMessage
  }
)(withHandlers(NewPathForm));
