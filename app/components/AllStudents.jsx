import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddStudentForm from './AddStudentForm';
import store, { fetchStudents } from '../store';

export default class AllStudents extends Component {

  constructor () {
    super();
    this.state = store.getState();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    store.dispatch(fetchStudents());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleClick (studentId, event) {
    axios.delete(`/api/students/${studentId}`)
    .then(() => {
      store.dispatch(fetchStudents());
    })
  }

  render () {
      console.log(this.state);
      const students = this.state.students;
    return (
        <div className="interior interior-students">
        <div className="students-header">
        <h1>The Students:</h1>
          <Link to="/students/add_student">
            <button className="btn btn-success add-btn">Add Student</button>
          </Link>
        </div>
        <div className="row">
        {
            students.map(student => {
              return (
                <div className="student-square col col-4" key={student.id} >
                    <Link to={`/students/${student.id}`} className="student-list">
                        <img className ="student-image" src="image_assets/profile_placeholder.png" width="100%" />
                        <p>{student.name}</p>
                    </Link>
                    <button className="remove-student student-list btn btn-danger" onClick={(e) => this.handleClick(student.id, e)}>x</button>
                </div>
              );
            })
        }
        </div>
      </div>
    );
  }
}
