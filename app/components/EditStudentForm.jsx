import React, { Component } from 'react';
import store, { changeStudentEditingStatus, fetchStudent, fetchCampuses, fetchCampus } from '../store';
import axios from 'axios';

export default class EditStudentForm extends Component {

    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleSumbit = this.handleSumbit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleCampusChange = this.handleCampusChange.bind(this);
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
        store.dispatch(fetchCampuses());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    handleCampusChange(event) {
        let campusId = Number(event.target.value)
        store.dispatch(fetchCampus(campusId));
    }

    handleSumbit() {
        axios.put(`/api/students/${this.state.currentStudent.id}`, {
            name: this.state.name ? this.state.name : this.state.currentStudent.name,
            email: this.state.email ? this.state.email : this.state.currentStudent.email,
            campusId: this.state.currentCampus ? this.state.currentCampus.id : this.state.currentStudent.campusId
        })
            .then(res => res.data)
            .then(updatedStudent => {
                store.dispatch(fetchStudent(updatedStudent.id))
                store.dispatch(changeStudentEditingStatus(false));
            })
    }

    render() {
        const student = this.props.student;
        return (
            <form className="edit-form interior">
                <label className="edit-form-el">Update Student Name:
                    <input className="form-control" type="text" defaultValue={student.name} value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <label className="edit-form-el">Update Student Email:
                    <input className="form-control" type="text" defaultValue={student.email} value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                <label className="edit-form-el">Update Campus:
                    <select className="form-control" value={this.state.currentCampusId} onChange={this.handleCampusChange}>
                        {
                            this.state.campuses.map(mapCampus => {
                                return (
                                    <option key={mapCampus.name} value={mapCampus.id}>{mapCampus.name}</option>
                                )
                            })
                        }
                    </select>
                </label>
                <button className="btn btn-info edit-form-el save-btn" onClick={this.handleSumbit}>Save Changes</button>
            </form>
        )
    }
}
