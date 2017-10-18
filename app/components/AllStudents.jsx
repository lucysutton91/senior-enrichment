import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddStudentForm from './AddStudentForm';


export default class AllStudents extends Component {

  constructor () {
    super();
    this.state = {
      students: [],
      response: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  componentDidMount () {
    axios.get(`/api/students`)
      .then(res => res.data)
      .then(students => {
        this.setState({ students })
      });
  }

  handleClick (studentId, event) {
    axios.delete(`/api/students/${studentId}`)
    .then((response) => {
      this.setState({ response }); //the page is not refreshing
    })
  }

  render () {
      const students = this.state.students;
    return (
        <div>
        <h1>The Students:</h1>
        <Link to="/students/add_student">
          <button>Add Student</button>
        </Link>
        {
            students.map(student => {
              return (
                <div key={student.id}>
                    <Link to={`/students/${student.id}`}>
                    <div>
                        <img className ="studentImage" src="image_assets/profile_placeholder.png" width="50" />
                        <p>{student.name}</p>
                    </div>
                    </Link>
                        <button className="remove-student" onClick={(e) => this.handleClick(student.id, e)}>x</button>
                </div>
              );
            })
        }
      </div>
    );
  }
}
