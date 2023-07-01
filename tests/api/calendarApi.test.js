import calendarApi from "../../src/apis/calendarApi";

/* eslint-disable no-undef */
describe('pruebas en calendarApi', () => { 
      
   test('debe de tener la configuración por defecto', () => {   
      expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
   });

   test('debe de tener el x-token en el header de todas las peticiones', 
      async() => { 
         localStorage.setItem('token', 'ABC-123');
         const token = localStorage.getItem('token');

         try {
            const res = await calendarApi.post('/auth', {
               email: 'test@gmail.com',
               password: '123456',
            });
            expect(res.config.headers["x-token"]).toBe(token);
            console.log(res.config.headers['x-token']);
            
         } catch (error) {
            console.log(error);
         }
   });
     
});
