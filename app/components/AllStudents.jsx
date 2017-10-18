import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class AllStudents extends Component {

  constructor () {
    super();
    this.state = {
      students: []
    };
  }

  componentDidMount () {
    axios.get(`/api/students`)
      .then(res => res.data)
      .then(students => {
        this.setState({ students })
      });
  }

  render () {
      const students = this.state.students;
    return (
        <div>
        <h1>The Students:</h1>
        {
            students.map(student => {
              return (
                <Link key={student.name} to={`/students/${student.id}`}>
                  <div>
                    <img className ="studentImage" src="image_assets/profile_placeholder.png" width="50" />
                    <p>{student.name}</p>
                  </div>
                </Link>
              );
            })
        }
      </div>
    );
  }
}
