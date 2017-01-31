import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaGroup from '../common/TextAreaGroup';
import RequestButton from '../common/RequestButton';
import PathItem from './PathItem';
import { kebabCase } from '../../utils/functions';
import { validateNewPath } from '../../validators/pathValidator.js'
import withHandlers from '../../utils/withHandlers';
import { createPath } from '../../actions';
import { addFlashMessage } from '../../actions/flashMessages';
import './NewPathForm.css';

const url = R.compose(kebabCase, R.replace(/[^a-zA-Z0-9-\s_]/g, ''));

const initialStaet = {
  form: {
    name: '',
    url: '',
    description: '',
    items: [
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
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleItemsChange = this.handleItemsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetErrorsRequest = props.resetErrorsRequest.bind(this);
    this.handleSubmitError = props.handleSubmitError.bind(this);
    this.handleChange = props.handleChange.bind(this);
  }
  handleNameChange(e) {
    const form = { ...this.state.form, name: e.target.value };
    if(this.state.changeUrl) {
      form.url = url(e.target.value);
    }
    this.setState({ form });
  }
  handleUrlChagne(e) {
    this.setState({
      changeUrl: false,
      form: { ...this.state.form, url: url(e.target.value) }
    });
  }
  handleAddItem() {
    const form = this.state.form;

    this.setState({
      form: { ...form, items: [ ...form.items, { name: '' } ] },
    });
  }
  handleRemoveItem(indexItem) {
    return (e) => {
      const { form, errors } = this.state;
      const items = form.items.filter(
        // eslint-disable-next-line
        (item, index) => index != indexItem
      );

      const newErrors = !errors.items ? errors :
        // eslint-disable-next-line
        errors.items.filter((item, index) => index != indexItem);

      this.setState({ form: { ...form, items }, errors: newErrors });
    }
  }
  handleItemsChange(e) {
    const form = this.state.form;
    const items = form.items.map(
      // eslint-disable-next-line
      (item, index) => index == e.target.dataset.index ?
        { ...item, name: e.target.value } :
        item
    );
    this.setState({ form: { ...form,  items } });
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
    const { form, errors } = this.state;
    return (
      <form className="NewPathForm-form" onSubmit={ this.handleSubmit }>
        <TextFieldGroup
          name="name"
          placeholder="Name"
          value={ form.name }
          errors={ errors.name }
          onChange={ this.handleNameChange }
        />

        <TextFieldGroup
          name="url"
          placeholder="Url"
          value={ form.url }
          errors={ errors.url }
          onChange={ this.handleUrlChagne }
        />

        <TextAreaGroup
          name="description"
          placeholder="Description"
          value={ form.description }
          errors={ errors.description }
          onChange={ this.handleChange }
        />

        <fieldset className="form-group text-left NewPathForm-items"
          onChange={ this.handleItemsChange }
        >
          <h5 className="text-center">Items</h5>
          {
            this.state.form.items.map(
              (item, index) => <PathItem
                key={ index }
                index={ index }
                value={item.name}
                onDelete={ this.handleRemoveItem(index) }
                placeholder="Name"
                errors={ errors.items && errors.items[index] &&
                  errors.items[index].name }
              />
            )
          }
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={ this.handleAddItem }
          >
            Add item
          </button>
        </fieldset>

        <RequestButton
          className="btn btn-primary"
          request={ this.state.isSubmit }
        >
          Submit
        </RequestButton>
      </form>
    );
  }
}

export default connect(
  null,
  { createPath, addFlashMessage }
)(withHandlers(NewPathForm));
