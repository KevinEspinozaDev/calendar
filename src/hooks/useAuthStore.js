import { useDispatch, useSelector } from "react-redux";
import {calendarApi} from './../apis';

export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({email, password}) => {
        
        const url = '/auth';

        try {
            const resp = await calendarApi.post(url, {email, password});
            console.log({resp});

        } catch (error) {
            console.log(error);
        }

    }


    return {
        // Properties
        status, 
        user, 
        errorMessage,

        // Methods
        startLogin,
    }
}