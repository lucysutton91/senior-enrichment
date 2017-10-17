// import { createStore, applyMiddleware } from 'redux';
// import rootReducer from './reducers';
// import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
// import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

// export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))

import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// INITIAL STATE

const initialState = {
  students: [],
  campuses: [],
  currentStudent: {},
  currentCampus: {}
};

// ACTION TYPES

const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
const ADD_STUDENT = 'ADD_STUDENT';
const ADD_CAMPUS = 'ADD_CAMPUS';


// ACTION CREATORS

export function getStudents (students) {
    const action = { type: GET_STUDENTS, students };
    return action;
}

export function getStudent (student) {
    const action = { type: GET_STUDENT, student };
    return action;
}

export function getCampuses (campuses) {
    const action = { type: GET_CAMPUSES, campuses };
    return action;
}

export function getCampus (campus) {
    const action = { type: GET_CAMPUS, campus };
    return action;
}

export function addStudent (studentInfo) {
    const action = { type: ADD_STUDENT, studentInfo };
    return action;
}

export function addCampus (campusInfo) {
    const action = { type: ADD_CAMPUS, campusInfo };
    return action;
}

// THUNK CREATORS

export function fetchStudents () {

  return function thunk (dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      });
  }
}

export function fetchStudent () {
    
    return function thunk (dispatch) {
        return axios.get('/api/student/:studentId')
            .then(res => res.data)
            .then(student => {
                const action = getStudent(student);
                dispatch(action);
            });
    }
}

export function fetchCampuses () {
    
      return function thunk (dispatch) {
        return axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => {
                const action = getCampuses(campuses);
                dispatch(action);
            });
    }
}
    
export function fetchCampus () {
    
    return function thunk (dispatch) {
        return axios.get('/api/campus/:campusId')
            .then(res => res.data)
            .then(campus => {
                const action = getCampus(campus);
                dispatch(action);
            });
    }
}

export function registerStudent (studentInfo) {

  return function thunk (dispatch) {
    return axios.post('/api/students', studentInfo)
        .then(res => res.data)
        .then(newStudent => {
            const action = addStudent(newStudent);
            dispatch(action);
        });
    }
}

export function registerCampus (campusInfo) {
    
    return function thunk (dispatch) {
        return axios.post('/api/campuses', campusInfo)
            .then(res => res.data)
            .then(newCampus => {
                const action = addCampus(newCampus);
                dispatch(action);
            });
    }
    
}

// REDUCER

function reducer (state = initialState, action) {

  switch (action.type) {

    case GET_STUDENTS:
        return {
            //...store,
            students: action.students
        };

    case GET_STUDENT:
        return {
            // ...store,
            currentStudent: action.currentStudent
        };

    case GET_CAMPUSES:
        return {
            // ...store,
            campuses: campuses
        };

    case GET_CAMPUS:
        return {
            // ...store,
            currentCampus: action.campus
        };
    
    case ADD_STUDENT:
        return {
            // ...store,
        students: [...action.students, action.student]
    };

    case ADD_CAMPUS:
        return {
            // ...store,
        campuses: [...action.campuses, action.campus]
        };

    default:
        return state;

    }
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

export default store;

