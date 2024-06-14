import axios from "axios";

var GaleriasService = {

    getGaleria: async()=>{
        var GaleriasApi = axios.get(`https://nf-android-backend-grzvk96jl-joaos-projects-d68ebd5d.vercel.app/api/galeria/`);
        return await GaleriasApi;
    }
    



}

export default GaleriasService;