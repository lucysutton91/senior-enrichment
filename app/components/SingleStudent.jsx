import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store, { changeStudentEditingStatus, fetchStudent } from '../store';


export default class SingleStudent extends Component {

  constructor () {
    super();
    this.state = store.getState();
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));    
    const studentId = this.props.match.params.studentId;
    store.dispatch(fetchStudent(studentId));
    
    // axios.get(`/api/students/${studentId}`)
    //     .then(res => res.data)
    //     .then(currentStudent => {
    //         this.setState({ currentStudent })
    //     })
    //     .then(() => {
    //       axios.get(`/api/campuses/${this.state.currentStudent.campusId}`)
    //         .then(res => res.data)
    //         .then(currentCampus => {
    //           this.setState({ currentCampus })
    //       });
    //     })
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  toggleEdit() {
    store.dispatch(changeStudentEditingStatus(true));
  }

  render () {
      const student = this.state.currentStudent;
      const view = this.state.editingStudent ? <EditStudentForm student={student} /> : (
      <div className="edit-form interior">
      
          <h2>{campus.name}</h2>
          <img className ="campus-image" src={campus.imageURL} />
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
          <button className="edit-campus btn btn-hg btn-primary" onClick={this.toggleEdit}>Edit</button>
      
    </div>
        )
        return view;
    // return (
    //     <div className="interior">
    //         <h2>{student.name}</h2>
    //         <h3>Email: {student.email}</h3>
    //         <Link to={`/campuses/${campus.id}`}>
    //           <h3>Campus: {campus.name}</h3>
    //         </Link>
    //     </div>

    // );
  }
}

