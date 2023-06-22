import { useDispatch, useSelector } from "react-redux";
import {calendarApi} from './../apis';
import {clearErrorMessage, onChecking, onLogin, onLogout} from './../store';

export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({email, password}) => {

        dispatch(onChecking());
        
        const url = '/auth';

        try {
            const {data} = await calendarApi.post(url, {email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({name: data.name, uid: data.uid}));

        } catch (error) {
            dispatch(onLogout('Wrong authentication.'));

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async({name, email, password}) => {

        dispatch(onChecking());

        const url = '/auth/new';

        try {
            const {data} = await calendarApi.post(url, {name, email, password});

            if (data) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());

                dispatch(onLogin({name: data.name, uid: data.uid}));
            }

        } catch (error) {
            
            dispatch(onLogout(error.response.data?.msg || 'Error al registrar usuario.'));

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async() => {

        const url = 'auth/renew';

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const {data} = await calendarApi.get(url);

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({name: data.name, uid: data.uid}));

        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }


    return {
        // Properties
        status, 
        user, 
        errorMessage,

        // Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}