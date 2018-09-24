import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const { name, email, phone } = res.data;

    this.setState({ name, email, phone });
  }

  OnInputChange = e => this.setState({ [e.target.name]: e.target.value });

  editContact = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }

    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }

    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

    const newContact = { name, email, phone };

    const { id } = this.props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      newContact
    );

    dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

    this.setState({ name: '', email: '', phone: '', errors: {} }, () =>
      this.props.history.push('/')
    );
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-4">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.editContact.bind(this, dispatch)}>
                  <TextInputGroup
                    name="name"
                    placeholder="Enter Name..."
                    label="Name"
                    value={name}
                    onChange={this.OnInputChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    type="email"
                    name="email"
                    placeholder="Enter Email..."
                    label="Email"
                    value={email}
                    onChange={this.OnInputChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    name="phone"
                    placeholder="Enter Phone..."
                    label="Phone"
                    value={phone}
                    onChange={this.OnInputChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-block btn-light"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
