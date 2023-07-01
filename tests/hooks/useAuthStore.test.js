/* eslint-disable no-undef */
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store/auth/authSlice";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import {testUserCredentials} from './../fixtures/testUser';
import {useAuthStore} from '../../src/hooks/useAuthStore';
import {initialState, notAutheticatedState} from '../fixtures/authStates';


const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: {...initialState}
        }
    })
}

describe('Pruebas en useAuthStore', () => {
    test('debe de devolver los valores por defecto', () => {
        const mockStore = getMockStore({...initialState});

        const {result} = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function)
        });
    });

    test('startLogin debe de realizar el login correctamente', async() => {
        localStorage.clear();
        const mockStore = getMockStore({...notAutheticatedState});
        const {result} = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });
        await act(async() => {
            await result.current.startLogin(testUserCredentials);
        });

        const {errorMessage, status, user} = result.current;

        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: {name: 'Test', uid: '649a1356bc7991bb67f9df1f'}
        });

    });
    
    
});
