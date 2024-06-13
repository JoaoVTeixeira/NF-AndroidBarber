import axios from "axios";

var barbeirosService = {

    getBarbeiro: async()=>{
        var barbeirosApi = axios.get(`http://10.0.2.2:5000/api/funcionarios/`);
        return await barbeirosApi;


    },

    getBarbeiroId: async(id)=>{
        var barbeirosApi = axios.get(`https://barbertimeapi.vercel.app/api/funcionarios/`+id);
        return await barbeirosApi;


    }
    ,
    getBarbeiroByUnidade: async(id)=>{
        var barbeirosApi = axios.get(`https://barbertimeapi.vercel.app/api/funcionarios/unidades/`+id);
        return await barbeirosApi;


    }
    




}

export default barbeirosService;