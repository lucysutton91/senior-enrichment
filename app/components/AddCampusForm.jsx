import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class AddCampusForm extends Component {
    
      constructor () {
        super();
        this.state = {
          currentCampus : {},
          name : '',
          imageURL : ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
      }
    
      handleSubmit (event) {
        axios.post('api/campuses', {
            name : this.state.name,
            imageURL : this.state.imageURL,
        } )
        .then(res => res.data)
        .then(newCampus => {
            this.setState({ currentCampus : newCampus })
            console.log('New student: ', newCampus)
        })
      }

      handleNameChange (event) {
        this.setState({ name : event.target.value });
      }

      handleImageChange (event) {
        this.setState({ imageURL : event.target.value } );
      }
    
      render () {
        console.log('state', this.state)
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Campus Name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <label>Add Image Url:
                    <input type="text" value={this.state.imageURL} onChange={this.handleImageChange} />
                </label>
                <input type="submit" value="save" />
            </form>
        )
        
      }
    }
    