import React, { Component } from 'react';



export default class Root extends Component () {
    // constructor () {
    //   super();
    //   this.state = {
    //     students : [],
    //     campuses : [],
    //     selectedStudent : '',
    //     selectedCampus : ''
    //   }
    // }

    render () {
      return (
        <div>
          <Navbar />
          <Switch>
            <Route exact path='/students' component={AllStudents} />
            <Route exact path='/campuses' component={AllCampuses} />
            <Route exact path='/students/:studentId' component={OneStudent} />
            <Route exact path='/campuses/:campusId' component={OneCampus} />
          </Switch>
        </div>
      )
  }
}
