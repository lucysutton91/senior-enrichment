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
    currentCampus: {},
    editingCampus: false,
    editingStudent: false
};

// ACTION TYPES

const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
const ADD_STUDENT = 'ADD_STUDENT';
const ADD_CAMPUS = 'ADD_CAMPUS';
const TOGGLE_EDIT_CAMPUS = 'TOGGLE_EDIT_CAMPUS';
const TOGGLE_EDIT_STUDENT = 'TOGGLE_EDIT_STUDENT';


// ACTION CREATORS

export function changeCampusEditingStatus(boolean) {
    const action = { type: TOGGLE_EDIT_CAMPUS, boolean };
    return action;
}

export function changeStudentEditingStatus(boolean) {
    const action = { type: TOGGLE_EDIT_STUDENT, boolean };
    return action;
}

export function getStudents(students) {
    const action = { type: GET_STUDENTS, students };
    return action;
}

export function getStudent(student) {
    const action = { type: GET_STUDENT, student };
    return action;
}

export function getCampuses(campuses) {
    const action = { type: GET_CAMPUSES, campuses };
    return action;
}

export function getCampus(campus) {
    const action = { type: GET_CAMPUS, campus };
    return action;
}

export function addStudent(studentInfo) {
    const action = { type: ADD_STUDENT, studentInfo };
    return action;
}

export function addCampus(campusInfo) {
    const action = { type: ADD_CAMPUS, campusInfo };
    return action;
}

// THUNK CREATORS

export function fetchStudents() {

    return function thunk(dispatch) {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(students => {
                const action = getStudents(students);
                dispatch(action);
            });
    }
}

export function fetchStudent(studentId) {

    return function thunk(dispatch) {
        return axios.get(`/api/students/${studentId}`)
            .then(res => res.data)
            .then(student => {
                const action = getStudent(student);
                dispatch(action);
            });
    }
}

export function fetchCampuses() {

    return function thunk(dispatch) {
        return axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => {
                const action = getCampuses(campuses);
                dispatch(action);
            });
    }
}

export function fetchCampus(campusId) {

    return function thunk(dispatch) {
        return axios.get(`/api/campuses/${campusId}`)
            .then(res => res.data)
            .then(campus => {
                const action = getCampus(campus);
                dispatch(action);
            });
    }
}

export function registerStudent(studentInfo) {

    return function thunk(dispatch) {
        return axios.post('/api/students', studentInfo)
            .then(res => res.data)
            .then(newStudent => {
                const action = addStudent(newStudent);
                dispatch(action);
            });
    }
}

export function registerCampus(campusInfo) {

    return function thunk(dispatch) {
        return axios.post('/api/campuses', campusInfo)
            .then(res => res.data)
            .then(newCampus => {
                const action = addCampus(newCampus);
                dispatch(action);
            });
    }

}

export function fetchStudentsByCampus(campusId) {

    return function thunk(dispatch) {
        return axios.get(`/api/campuses/${campusId}/students`)
            .then(res => res.data)
            .then(students => {
                const action = getStudents(students);
                dispatch(action);
            });
    }

}

// REDUCER

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {

        case GET_STUDENTS:
            newState = Object.assign({}, state, { students: action.students });
            break;

        case GET_STUDENT:
            newState = Object.assign({}, state, { currentStudent: action.student });
            break;

        case GET_CAMPUSES:
            newState = Object.assign({}, state, { campuses: action.campuses });
            break;

        case GET_CAMPUS:
            newState = Object.assign({}, state, { currentCampus: action.campus });
            break;

        case ADD_STUDENT:
            newState = Object.assign({}, state, { students: [...action.students, action.student] });
            break;

        case ADD_CAMPUS:
            newState = Object.assign({}, state, { campuses: [...action.campuses, action.campus] });
            break;

        case TOGGLE_EDIT_CAMPUS:
            newState = Object.assign({}, state, { editingCampus: action.boolean });
            break;

        case TOGGLE_EDIT_STUDENT:
            newState = Object.assign({}, state, { editingStudent: action.boolean });
            break;

        default:
            newState = state;
            break;
    }
    return newState;
}

// CREATE AND EXPORT STORE

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(
        thunkMiddleware,
        createLogger()
    ))
);

export default store;

