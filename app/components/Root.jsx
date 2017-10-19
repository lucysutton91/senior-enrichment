// import React, { Component } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
// import Navbar from './Navbar';
// import AllCampuses from './AllCampuses';
// import SingleCampus from './SingleCampus';
// import AllStudents from './AllStudents';
// import SingleStudent from './SingleStudent';

// export default class Main extends Component {
//   render () {  
//     return (
      // <div>
      //   <Switch>
      //     <Route exact path="/campuses" component={AllCampuses} />
      //   </Switch>
      // </div>
//     )
//   }
// }

// export default Root;


import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import AddStudentForm from './AddStudentForm';
import AddCampusForm from './AddCampusForm';
import Navbar from './Navbar';

const Root = (props) => {
  return (
    <div className="body-border">
      <Navbar />
      <Switch>
        <Route exact path="/campuses" component={AllCampuses} />
        <Route exact path="/students" component={AllStudents} />
        <Route exact path="/campuses/add_campus" component={AddCampusForm} />
        <Route exact path="/campuses/:campusId" component={SingleCampus} />
        <Route exact path="/students/add_student" component={AddStudentForm} />
        <Route exact path="/students/:studentId" component={SingleStudent} />
        <Route path="/" />
      </Switch>
    </div>
  )
}

export default Root;
