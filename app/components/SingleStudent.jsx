import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class SingleStudent extends Component {

  constructor () {
    super();
    this.state = {
      currentStudent : {},
      currentCampus : {}
    };
  }

  componentDidMount () {
    const studentId = this.props.match.params.studentId;
    axios.get(`/api/students/${studentId}`)
        .then(res => res.data)
        .then(currentStudent => {
            this.setState({ currentStudent })
        })
        .then(() => {
          axios.get(`/api/campuses/${this.state.currentStudent.campusId}`)
            .then(res => res.data)
            .then(currentCampus => {
              this.setState({ currentCampus })
          });
        })
  }

  render () {
      const student = this.state.currentStudent;
      const campus = this.state.currentCampus;
    return (
        <div>
            <h2>{student.name}</h2>
            <h3>Email: {student.email}</h3>
            <Link to={`/campuses/${campus.id}`}>
              <h3>Campus: {campus.name}</h3>
            </Link>
        </div>

    );
  }
}
