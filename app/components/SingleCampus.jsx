import React, { Component, TextInput } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class SingleCampus extends Component {

  constructor () {
    super();
    this.state = {
      currentCampus: {},
      students : [],
      isEditing: false
    };
      this.toggleEdit = this.toggleEdit.bind(this);
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

  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }

  render () {
    console.log('state', this.state)
    const campus = this.state.currentCampus;
    const students = this.state.students;
    return (
    <div className="interior">
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
            <button className="edit-campus btn btn-hg btn-primary" onClick={this.toggleEdit}>Edit</button>
        </div>
    </div>
    );
  }
}
