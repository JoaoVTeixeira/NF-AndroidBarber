import axios from "axios";

var reservasService = {

    getReservas: async(id)=>{
        var reservasApi = axios.get(`https://nf-android-backend-grzvk96jl-joaos-projects-d68ebd5d.vercel.app/api/reservas/cliente/`+id);
        return await reservasApi;
    },

    getHorariosDisponiveis: async(barbeiro,id)=>{
        var reservasApi = axios.get(`https://nf-android-backend-grzvk96jl-joaos-projects-d68ebd5d.vercel.app/api/reservas/horas/`+barbeiro+'/'+id+'/');
        return await reservasApi;
    },
    
    createReserva: async(reserva)=>{
        var reservasApi = axios.post(`https://nf-android-backend-grzvk96jl-joaos-projects-d68ebd5d.vercel.app/api/reservas/`, reserva);
        return await reservasApi;
    },
    cancelaReserva: async(reserva)=>{

        var reservasApi = axios.put(`https://nf-android-backend-grzvk96jl-joaos-projects-d68ebd5d.vercel.app/api/reservas/cancelar/`+reserva);
        return await reservasApi;
    
    }

}

export default reservasService;