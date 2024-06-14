import axios from "axios";

var barbeirosService = {

    getBarbeiro: async()=>{
        var barbeirosApi = axios.get(`https://nf-android-backend-grzvk96jl-joaos-projects-d68ebd5d.vercel.app/api/funcionarios/`);
        return await barbeirosApi;


    },

    getBarbeiroId: async(id)=>{
        var barbeirosApi = axios.get(`https://nf-android-backend-grzvk96jl-joaos-projects-d68ebd5d.vercel.app/api/funcionarios/`+id);
        return await barbeirosApi;


    }
    ,
    getBarbeiroByUnidade: async(id)=>{
        var barbeirosApi = axios.get(`https://nf-android-backend-grzvk96jl-joaos-projects-d68ebd5d.vercel.app/api/funcionarios/unidades/`+id);
        return await barbeirosApi;


    }
    




}

export default barbeirosService;