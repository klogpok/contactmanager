import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Consumer } from '../../context';

export default class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onShowClick = e => {
    e.preventDefault();
    this.setState({ showContactInfo: !this.state.showContactInfo });
  };

  onDeleteClick = async (id, dispatch, e) => {
    e.preventDefault();

    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (e) {
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <a href="" onClick={this.onShowClick}>
                  <i className="fas fa-sort-down text-dark ml-2" />
                </a>
                <a
                  href=""
                  className="float-right"
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                >
                  <i className="fas fa-times text-danger" />
                </a>
                <Link to={`contact/edit/${id}`} className="float-right mr-3">
                  <i className="fas fa-edit text-primary" />
                </Link>
              </h4>
              {showContactInfo && (
                <ul className="list-group mt-3">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
