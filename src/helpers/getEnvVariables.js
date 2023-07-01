export const getEnvVariables = () => {

    //import.meta.env;

    return {
        // Importar todas las variables de entorno
        VITE_MODE: import.meta.env.VITE_MODE,
        VITE_API_URL: import.meta.env.VITE_API_URL,
    }

}