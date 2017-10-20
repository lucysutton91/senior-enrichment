import React, { Component, TextInput } from 'react';
import { Link } from 'react-router-dom';
import store, { changeCampusEditingStatus, fetchStudentsByCampus, fetchCampus } from '../store';
import EditCampusForm from './EditCampusForm';


export default class SingleCampus extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState();
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    const campusId = this.props.match.params.campusId;
    store.dispatch(fetchCampus(campusId));
    store.dispatch(fetchStudentsByCampus(campusId));
    store.dispatch(changeCampusEditingStatus(false));
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  toggleEdit() {
    store.dispatch(changeCampusEditingStatus(true));
  }

  render() {
    console.log('state', this.state)
    console.log('propz', this.props)
    const campus = this.state.currentCampus;
    const students = this.state.students;
    const view = this.state.editingCampus ? <EditCampusForm campus={campus} students={students} /> : (
      <div className="edit-form interior">
        <h2>{campus.name}</h2>
        <img className="campus-image" src={campus.imageURL} />
        <h3>Students at {campus.name}:</h3>
        <ul className="student-list">
          {
            students.map(student => {
              return (
                <Link key={student.name} to={`/students/${student.id}`}>
                  <li>{student.name}, ({student.email})</li>
                </Link>
              )
            })
          }
        </ul>
        <button className="edit-campus btn btn-hg btn-primary edit-form-el" onClick={this.toggleEdit}>Edit</button>
      </div>
    )
    return view;
  }
}
