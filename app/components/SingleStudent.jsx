import React, { Component } from 'react';
import axios from 'axios';


export default class SingleStudent extends Component {

  constructor (props) {
    super(props);
    this.state = {
      currentStudent : {}
    };
  }

  componentDidMount () {
    const studentId = this.props.match.params.studentId;
    axios.get(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(currentStudent => {
        this.setState({ currentStudent })
      });
  }

  render () {
    return (
      <div>
        <h1>{this.state.currentStudent}</h1>
      </div>
    );
  }
}