import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class AddStudentForm extends Component {
    
      constructor () {
        super();
        this.state = {
          currentStudent : {},
          campuses : [],
          currentCampusId : 'none',
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
        const campusId = Number(this.state.currentCampusId);
        axios.post('api/students', {
            name : this.state.name,
            email : this.state.email,
            campusId : campusId
        } )
        .then(res => res.data)
        .then(newStudent => {
            this.setState({ currentStudent : newStudent })
            console.log('New student: ', newStudent)
        })
      }

      handleEmailChange (event) {
        this.setState({email: event.target.value});
      }

      handleNameChange (event) {
        this.setState({name: event.target.value});
      }

      handleCampusChange (event) {
        this.setState({currentCampusId: event.target.value});
      }
    
      render () {
          
        const campuses = this.state.campuses;
        return (
            <form className="add-form interior" onSubmit={this.handleSubmit}>
                <label>Name:
                    <input className="form-control" type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <label>Email:
                    <input className="form-control" type="text" value={this.state.email} onChange={this.handleEmailChange} />
                </label>

                <label>Select Campus:
                    <select className="form-control" value={this.state.currentCampusId} onChange={this.handleCampusChange}>
                        {
                            campuses.map(campus => {
                                return (
                                    <option key ={campus.name} value={campus.id}>{campus.name}</option>
                                )
                            })
                        }
                    </select>
                </label>

                <input className="btn btn-info" type="submit" value="save" />
            </form>
        )
        
      }
    }
    
