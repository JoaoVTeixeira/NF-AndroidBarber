import axios from "axios";

var servicosService = {

    getServico: async()=>{
        var servicosApi = axios.get(`https://nf-android-backend-grzvk96jl-joaos-projects-d68ebd5d.vercel.app/api/servicos/`);
        
        return await servicosApi;
    }
    



}

export default servicosService;