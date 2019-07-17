import { combineReducers } from 'redux';

const INITIAL_STATE = {
    isSignedIn : null,
    userId : null,
}
const USER = {
    bmi : null,
    userId : null,
}


const UserReducer = (state = USER,action) => {
    switch(action.type){
        case 'PERSIST_BMI' :
        return {...state,[action.payload.id] : action.payload};
        case 'FETCH_BMI' :
        return {...state,bmi : action.payload[0].bmi,userId : action.payload[0].userId};
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
    user : UserReducer
});