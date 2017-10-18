import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class SingleCampus extends Component {

  constructor () {
    super();
    this.state = {
      currentCampus: {},
      students : []
    };
  }

  componentDidMount () {
    const campusId = this.props.match.params.campusId;
    axios.get(`/api/campuses/${campusId}`)
        .then(res => res.data)
        .then(currentCampus => {
            this.setState({ currentCampus })
        });
    axios.get(`/api/campuses/${campusId}/students`)
        .then(res => res.data)
        .then(students => {
            this.setState({ students })
    });
  }

  render () {
      const campus = this.state.currentCampus;
      const students = this.state.students;
    return (
        <div>
            <h2>{campus.name}</h2>
            <img className ="campusImage" src={`/image_assets/${campus.name}.png`} width="200" />
            <h3>Students at {campus.name}</h3>
            <ul className="student-list">
            {
                students.map(student => {
                    return (
                        <Link key={student.name} to={`/students/${student.id}`}>
                            <li>{student.name}  {student.email}</li>
                        </Link>
                    )
                })
            }
            </ul>
        </div>

    );
  }
}
