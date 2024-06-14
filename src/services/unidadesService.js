import axios from "axios";

var unidadesService = {

    getUnidades: async()=>{

        try {
            var unidadesApi = axios.get(`https://nf-android-backend-grzvk96jl-joaos-projects-d68ebd5d.vercel.app/api/unidades/`, {
                maxRedirects: 5, // Set the maximum number of redirects to follow
              });
            return await unidadesApi;
        } catch (error) {
            console.error("Error occurred while fetching services:", error);
            throw error;
        }
        
       


    }
    



}

export default unidadesService;