import React, { Component } from 'react';
import axios from 'axios';
import store, { fetchCampuses, fetchStudent, fetchCampus } from '../store';

export default class AddStudentForm extends Component {

    constructor() {
        super();
        this.state = store.getState();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCampusChange = this.handleCampusChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
        store.dispatch(fetchCampuses());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleSubmit() {
        axios.post('api/students', {
            name: this.state.name,
            email: this.state.email,
            campusId: this.state.currentCampus.id
        })
            .then(res => res.data)
            .then(newStudent => {
                store.dispatch(fetchStudent(newStudent.id));
            })
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleCampusChange(event) {
        let campusId = Number(event.target.value);
        store.dispatch(fetchCampus(campusId))
    }

    render() {

        const campuses = this.state.campuses;
        return (
            <form className="add-form interior" onSubmit={this.handleSubmit}>
                <label>Name:
                    <input className="form-control" type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <label>Email:
                    <input className="form-control" type="text" value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                <label>Select Campus:
                    <select className="form-control" value={this.state.currentCampusId} onChange={this.handleCampusChange}>
                        {
                            campuses.map(campus => {
                                return (
                                    <option key={campus.name} value={campus.id}>{campus.name}</option>
                                )
                            })
                        }
                    </select>
                </label>
                <input className="btn btn-info save-btn" type="submit" value="save" />
            </form>
        )
    }
}
