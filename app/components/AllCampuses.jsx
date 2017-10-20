import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store, { fetchCampuses } from '../store';

export default class AllCampuses extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = store.getState();
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    store.dispatch(fetchCampuses());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleClick(campusId, event) {
    axios.delete(`/api/campuses/${campusId}`)
      .then(() => {
        store.dispatch(fetchCampuses());
      })
  }

  render() {
    const campuses = this.state.campuses;
    return (
      <div className="interior">
        <div className="page-header">
          <h1>The Campuses:</h1>
          <Link to="/campuses/add_campus">
            <button className="btn btn-success add-btn">Add Campus</button>
          </Link>
        </div>
        <div className="row">
          {
            campuses.map(campus => {
              return (
                <div className="col col-4 page-square" key={campus.name}>
                  <Link to={`/campuses/${campus.id}`} >
                    <div>
                      <img className="campusImage" src={campus.imageURL} width="200" />
                      <h2 className="campus-name">{campus.name}</h2>
                    </div>
                  </Link>
                  <button className="remove-student btn btn-danger" onClick={(e) => this.handleClick(campus.id, e)}>x</button>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
