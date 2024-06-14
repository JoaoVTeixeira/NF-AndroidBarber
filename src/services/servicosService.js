import axios from "axios";

var servicosService = {

    getServico: async()=>{
        var servicosApi = axios.get(`https://nf-android-backend.vercel.app/api/servicos/`);
        
        return await servicosApi;
    }
    



}

export default servicosService;