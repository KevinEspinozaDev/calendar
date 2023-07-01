import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";

jest.mock('../../src/hooks/useAuthStore');

/**
 * Útil para cuando necesitamos saber si sólo se 
 * renderiza un componente y tenemos que ahorrar
 * cargar todo su código, sólo saber si se renderizó correctamente.
 * 
 */
jest.mock('../../src/calendar', () => {
    CalendarPage: () => <h1>CalendarPage</h1>
})

describe('Pruebas en <AppRouter />', () => {
    test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {
        
        const mockCheckAuthToken = jest.fn();

        jest.clearAllMocks();

        useAuthStore.mockReturnValue({
            status : 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render(<AppRouter />);
        expect(screen.getByText('Cargando...')).toBeTruthy();
        expect(mockCheckAuthToken).toHaveBeenCalled(); // Si fue llamado
    });

    test('debe de mostrar el login en caso de no estar autenticado', () => {

        const mockCheckAuthToken = jest.fn();
        useAuthStore.mockReturnValue({
            status : 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        const {container} = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        expect(screen.getByText('Ingreso')).toBeTruthy();
        expect(container).toMatchSnapshot(); //"Fotografía" del html en esta linea
    });

    test('debe de mostrar el calendario si estamos autenticados', () => {

        const mockCheckAuthToken = jest.fn();
        useAuthStore.mockReturnValue({
            status : 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        expect(screen.getByText('CalendarPage')).toBeTruthy();
        //expect(container).toMatchSnapshot(); //"Fotografía" del html en esta linea
    });
    
    
    
});
