import axios from "axios";

var unidadesService = {

    getUnidades: async()=>{

        try {
            var unidadesApi = axios.get(`http://10.0.2.2:5000/api/unidades/`, {
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