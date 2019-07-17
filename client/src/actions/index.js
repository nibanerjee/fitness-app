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

export const PersistBMIData = (bmi) => {
   return async (dispatch,getState) => {
        const {userId} = getState().auth;
        const response = await fitnessService.post('/users',{bmi,userId});
        dispatch({
            type : 'PERSIST_BMI',
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