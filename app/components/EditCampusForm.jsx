import React, { Component } from 'react';
import store, { fetchStudentsByCampus, fetchCampus, changeCampusEditingStatus } from '../store';
import axios from 'axios';

export default class EditCampusForm extends Component {

  constructor (props) {
    super(props);
    this.state = store.getState();
    this.removeStudentClick = this.removeStudentClick.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

    componentDidMount () {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
        // store.dispatch(fetchCampus(this.props.campus.id));
        // store.dispatch(fetchStudentsByCampus(this.props.campus.id));
      }

    componentWillUnmount() {
        this.unsubscribe();
    }

  removeStudentClick (student, event) {
    axios.put(`/api/students/${student.id}`, {
        name: student.name,
        email: student.email,
        campusId : null
    })
    .then(() => {
        store.dispatch(fetchStudentsByCampus(this.state.currentCampus.id));
    })
  }

  handleNameChange (event) {
    this.setState({ name : event.target.value });
  }

  handleImageChange (event) {
    this.setState({ imageURL : event.target.value } );
  }

  handleSumbit (event) {
    axios.put(`/api/campuses/${this.state.currentCampus.id}`, {
        name: this.state.name ? this.state.name : this.state.currentCampus.name,
        imageURL : this.state.imageURL ? this.state.imageURL : this.state.imageURL
    })
    .then(res => res.data)
    .then(updatedCampus => {
        store.dispatch(fetchCampus(this.state.currentCampus.id))
        store.dispatch(fetchStudentsByCampus(this.state.currentCampus.id))
        store.dispatch(changeCampusEditingStatus(false));
    })
  }

  render () {
      const campus = this.props.campus;
      const students = this.props.students;
    return (
        <form className="edit-form interior">
            <label className="edit-form-el">Update Campus Name:
                <input className="form-control" type="text" defaultValue={campus.name} value={this.state.name} onChange={this.handleNameChange} />
            </label>
            <label className="edit-form-el">Update Image Url:
                <input className="form-control" type="text" defaultValue={campus.imageURL} value={this.state.imageURL} onChange={this.handleImageChange} />
            </label>
            <label className="edit-form-el">Students at {campus.name}:
                    <ul className="campus-edit-student-list">
                    {
                        students.map(student => {
                            return (
                                <div key={student.id} className="edit-form-el">
                                    <li className="edit-form-name">{student.name} ({student.email})</li>
                                    <button className="remove-campus btn btn-danger edit-form-el" onClick={(e) => this.removeStudentClick(student, e)}>Remove Student</button>
                                </div>
                            )
                        })
                    }
                    </ul>
            </label>
            <button className="btn btn-info" onClick={this.handleSumbit}>Save Changes</button>
        </form>
)
  }
    
}
