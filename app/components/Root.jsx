import React, { Component } from 'react';
import store, { fetchStudents } from '../store'

// export default class Root extends Component () {
//   // constructor () {
//   //   super();
//   //   this.state = store.getState();
//   // }

//   componentDidMount () {
//     this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
//   }

//   componentWillUnmount () {
//     this.unsubscribe();
//   }


//   render () {
//     console.log(this);
//     return (
//       <div>
//         <Navbar />
//         <h1>I'm Here</h1>
//         {
//         // <Switch>
//         //   <Route exact path='/students' component={AllStudents} />
//         //   <Route exact path='/campuses' component={AllCampuses} />
//         //   <Route exact path='/students/:studentId' component={OneStudent} />
//         //   <Route exact path='/campuses/:campusId' component={OneCampus} />
//         // </Switch>
//         }
//       </div>
//     )
//   }
// }

export default function Root () {
  return (
    <h1>Hello</h1>
  )
}