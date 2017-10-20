import React, { Component } from 'react';
import axios from 'axios';
import store, { fetchCampus } from '../store';

export default class AddCampusForm extends Component {

  constructor() {
    super();
    this.state = store.getState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleSubmit() {
    axios.post('api/campuses', {
      name: this.state.name,
      imageURL: this.state.imageURL,
    })
      .then(res => res.data)
      .then(newCampus => {
        store.dispatch(fetchCampus(newCampus.id))
      })
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleImageChange(event) {
    this.setState({ imageURL: event.target.value });
  }

  render() {
    return (
      <form className="add-form interior" onSubmit={this.handleSubmit}>
        <label>Campus Name:
          <input className="form-control" type="text" value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <label>Add Image Url:
          <input className="form-control" type="text" value={this.state.imageURL} onChange={this.handleImageChange} />
        </label>
        <input className="btn btn-info save-btn" type="submit" value="save" />
      </form>
    )
  }
}
