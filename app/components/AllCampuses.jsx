import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store, { fetchCampuses } from '../store';

export default class AllCampuses extends Component {

  constructor () {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = store.getState();
  }
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    store.dispatch(fetchCampuses());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleClick (campusId, event) {
    axios.delete(`/api/campuses/${campusId}`)
    .then(() => {
      store.dispatch(fetchCampuses());
    })
  }

  render () {
      const campuses = this.state.campuses;
    return (
        <div className="interior">
          <Link to="/campuses/add_campus">
            <button className="btn btn-success add-btn">Add Campus</button>
          </Link>
        {
            campuses.map(campus => {
              return (
                <div key={campus.name}>
                  <Link to={`/campuses/${campus.id}`} >
                    <div>
                      <h2>{campus.name}</h2>
                      <img className ="campusImage" src={`/image_assets/${campus.name}.png`} width="200" />
                    </div>
                  </Link>
                  <button className="remove-campus btn btn-danger" onClick={(e) => this.handleClick(campus.id, e)}>x</button>
                </div>
              );
            })
        }
      </div>
    );
  }
}
