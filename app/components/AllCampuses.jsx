import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    return (
        <div>
        {
            campuses.map(campus => {
              return (
                <Link key={campus.name} to={`/campuses/${campus.id}`}>
                  <div>
                    <h2>{campus.name}</h2>
                    <img className ="campusImage" src={`/image_assets/${campus.name}.png`} width="200" />
                  </div>
                </Link>
              );
            })
        }
      </div>
    );
  }
}
