import axios from "axios";

var GaleriasService = {

    getGaleria: async()=>{
        var GaleriasApi = axios.get(`https://nf-android-backend.vercel.app/api/galeria/`);
        return await GaleriasApi;
    }
    



}

export default GaleriasService;