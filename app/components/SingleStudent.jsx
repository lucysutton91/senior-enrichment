import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store, { changeStudentEditingStatus, fetchStudent, fetchCampus } from '../store';
import EditStudentForm from './EditStudentForm';

export default class SingleStudent extends Component {

  constructor() {
    super();
    this.state = store.getState();
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    const studentId = this.props.match.params.studentId;
    store.dispatch(fetchStudent(studentId))
    .then(() => {
      store.dispatch(fetchCampus(this.state.currentStudent.campusId))
    })
    store.dispatch(changeStudentEditingStatus(false));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  toggleEdit() {
    store.dispatch(changeStudentEditingStatus(true));
  }

  render() {
    const student = this.state.currentStudent;
    const campus = this.state.currentCampus;
    const view = this.state.editingStudent ? <EditStudentForm student={student} campus={campus} /> : (
      <div className="edit-form interior">
        <img className="student-image" src="image_assets/profile_placeholder.png" width="100%" />
        <h2>{student.name}</h2>
        <h3>{student.email}</h3>
        <Link to={`/campuses/${campus.id}`}>
          <h3>Campus: {campus.name}</h3>
        </Link>
        <button className="edit-campus edit-form-el btn btn-hg btn-primary" onClick={this.toggleEdit}>Edit</button>
      </div>
    )
    return view;
  }
}

