import axios from "axios";

var reservasService = {

    getReservas: async(id)=>{
        var reservasApi = axios.get(`http://10.0.2.2:5000/api/reservas/cliente/`+id);
        return await reservasApi;
    },

    getHorariosDisponiveis: async(barbeiro,id)=>{
        var reservasApi = axios.get(`http://10.0.2.2:5000/api/reservas/horas/`+barbeiro+'/'+id+'/');
        return await reservasApi;
    },
    
    createReserva: async(reserva)=>{
        var reservasApi = axios.post(`http://10.0.2.2:5000/api/reservas/`, reserva);
        return await reservasApi;
    },
    cancelaReserva: async(reserva)=>{

        var reservasApi = axios.put(`https://barbertimeapi.vercel.app/api/reservas/cancelar/`+reserva);
        return await reservasApi;
    
    }

}

export default reservasService;