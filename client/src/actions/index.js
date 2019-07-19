import fitnessService from '../services/FitnessService';

export const signIn = (userId) => {
    return {
        type : 'SIGN_IN',
        payload : userId
    } 
}

export const signOut = () => {
    return {
        type : 'SIGN_OUT'
    } 
}

export const PersistBMIData = (bmi,gender,goal) => {
   return async (dispatch,getState) => {
        const {userId} = getState().auth;
        const response = await fitnessService.post('/users',{bmi,userId,gender,goal});
        dispatch({
            type : 'PERSIST_BMI',
            payload : response.data
        });
   }
}

export const EditBMIData = (bmi,gender,goal) => {
    return async (dispatch,getState) => {
         const {userId} = getState().auth;
         const {id} = getState().user;
         const response = await fitnessService.patch(`/users/${id}`,{bmi,userId,gender,goal});
         dispatch({
             type : 'EDIT_BMI',
             payload : response.data
         });
    }
 }


export const FetchBMIData = () => {
    return async (dispatch,getState) => {
        const {userId} = getState().auth;
        const response = await fitnessService.get(`/users?userId=${userId}`);
        if(response.data.length){
            dispatch({
                type : 'FETCH_BMI',
                payload : response.data
            });
        }
    }
}

const calculateObesity = (bmi) => {
    if(bmi < 18.5){
        return 'underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return 'healthyweight';
    } else if(bmi >= 25 && bmi <= 29.9) {
        return 'overweight';
    } else if (bmi >= 30) {
        return 'obese';
    }
}
export const FetchWorkoutData = () => {
    return async (dispatch,getState) => {
        const {bmi,gender,goal} = getState().user;
        const response = await fitnessService.get('/workouts');
        const obesity = calculateObesity(bmi);
        dispatch({
            type : 'FETCH_WORKOUTS',
            payload : response.data[gender][obesity][goal]
        });
    }
}

export const CreateUserPosts = (targetId,content) => {
    return async (dispatch,getState) => {
        const {userId} = getState().auth;
        const response = await fitnessService.post('/posts',{sourceId : userId,targetId,content});
        dispatch({
            type : 'CREATE_POSTS',
            payload : response.data
        });
    }
}

export const FetchUserPosts = () => {
    return async (dispatch,getState) => {
        const {userId} = getState().auth;
        const response = await fitnessService.get(`/posts?q=${userId}`);
        dispatch({
            type : 'FETCH_POSTS',
            payload : response.data
        });
    }
}

export const UpdateRegisteredEvents = (userRegistered,eventId) => {
    return async (dispatch,getState) => {
        const response = await fitnessService.patch(`/events/${eventId}`,{userRegistered});
        const updatedresponse = await fitnessService.get('/events');
        dispatch({
            type : 'UPDATE_REGISTERED_EVENTS',
            payload : updatedresponse.data
        });
    }
}

export const FetchEvents = () => {
    return async (dispatch,getState) => {
        const response = await fitnessService.get('/events');
        dispatch({
            type : 'FETCH_EVENTS',
            payload : response.data
        });
    }
}
