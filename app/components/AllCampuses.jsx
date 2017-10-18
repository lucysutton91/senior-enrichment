import React, { Component } from 'react';
import axios from 'axios';


export default class AllCampuses extends Component {

  constructor () {
    super();
    this.state = {
      campuses: []
    };
  }

  componentDidMount () {
    axios.get(`/api/campuses`)
      .then(res => res.data)
      .then(campuses => {
        this.setState({ campuses })
      });
  }

  render () {
      const campuses = this.state.campuses;
      console.log(campuses)
    return (
        <div>
        {
            campuses.map(campus => {
              return (
                <div key={campus.id}>
                  <h2>{ campus.name }</h2>
                </div>
              );
            })
          }
      </div>
    );
  }
}
