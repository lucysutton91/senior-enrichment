import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class AllStudents extends Component {
    
      constructor () {
        super();
        this.state = {
          currentStudent : {},
          campuses : [],
          currentCampus : {},
          email : '',
          name : ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCampusChange = this.handleCampusChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
      }

      componentDidMount () {
        axios.get(`/api/campuses`)
        .then(res => res.data)
        .then(campuses => {
          this.setState({ campuses })
        });
      }
    
      handleSubmit (event) {
        axios.post('api/students', {
            name : this.state.name,
            email : this.state.email,
            campusId : this.currentCampus.id
        } )
        .then(res => res.data)
        .then(newStudent => {
            this.setState({ currentStudent : newStudent })
        })
      }

      handleEmailChange (event) {
        this.setState({email: event.target.value});
      }

      handleNameChange (event) {
        this.setState({name: event.target.value});
      }

      handleCampusChange (event) {
        this.setState({currentCampus: event.target.value});
      }
    
      render () {
          console.log('state', this.state)
        const campuses = this.state.campuses;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <label>Email:
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                <label>Select Campus:
                    <select value={this.state.currentCampus} onChange={this.handleCampusChange}>
                        {
                            campuses.map(campus => {
                                return (
                                    <option key ={campus.name} value={campus}>{campus.name}</option>
                                )
                            })
                        }
                    </select>
                </label>

                <input type="submit" value="save" />
            </form>
        )
        
      }
    }
    