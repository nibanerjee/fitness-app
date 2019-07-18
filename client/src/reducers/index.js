import { combineReducers } from 'redux';

const INITIAL_STATE = {
    isSignedIn : null,
    userId : null,
}

const USER = {
    userId : null,
    bmi : null,
    gender : null,
    goal : null
}

const WORKOUTS = {
    workouts : null
}

const UserReducer = (state = USER,action) => {
    switch(action.type){
        case 'PERSIST_BMI' :
        return {...state,bmi : action.payload.bmi,userId : action.payload.userId,gender : action.payload.gender,goal : action.payload.goal,id : action.payload.id};
        case 'EDIT_BMI' :
        return {...state,bmi : action.payload.bmi,userId : action.payload.userId,gender : action.payload.gender,goal : action.payload.goal,id : action.payload.id};
        case 'FETCH_BMI' :
        return {...state,bmi : action.payload[0].bmi,userId : action.payload[0].userId,gender : action.payload[0].gender,goal : action.payload[0].goal,id : action.payload[0].id};
        default:
        return state;
    }
}

const WorkoutReducer = (state = WORKOUTS,action) => {
    switch(action.type){
        case 'FETCH_WORKOUTS' :
        return {...state,workouts : action.payload};
        default:
        return state;
    }
}

const AuthReducer = (state = INITIAL_STATE, action) => {
   switch(action.type){
       case 'SIGN_IN' :
       return {...state, isSignedIn : true, userId : action.payload}
       case 'SIGN_OUT':
       return {...state, isSignedIn : false, userId : null}
       default :
       return state;
   }
};

export default combineReducers({
    auth : AuthReducer,
    user : UserReducer,
    workout : WorkoutReducer
});