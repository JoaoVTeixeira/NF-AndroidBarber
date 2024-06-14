import axios from "axios";

var unidadesService = {

    getUnidades: async()=>{

        try {
            var unidadesApi = axios.get(`https://nf-android-backend.vercel.app/api/unidades/`, {
                maxRedirects: 5,  
              });
            console.log(unidadesApi)
            return await unidadesApi;
        } catch (error) {
            console.error("Error occurred while fetching services:", error);
            throw error;
        }
        
       


    }
    



}

export default unidadesService;