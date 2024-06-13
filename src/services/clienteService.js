import axios from 'axios';


var clientesService = {
  
  // método para cadastrar um usuário
  postClientes: async (Cadastro,id) => {
    Cadastro.role = "cliente";
    console.log(Cadastro)
    var clientesAPI = axios.post(`https://barbertimeapi.vercel.app/api/clientes/`,Cadastro,id);
    return await clientesAPI;
  },
  getClientes: async() =>{
    var clientesAPI = axios.get(`https://barbertimeapi.vercel.app/api/clientes/`);
    return await clientesAPI;
  }
  ,
  // método para validar o login do usuário
  getClienteById: async (id) => {
    var clientesAPI = axios.get(`https://barbertimeapi.vercel.app/api/clientes/`+id);
    return await clientesAPI;
  },
  updateCliente: async (id,user) => {
    var clientesAPI = axios.put(`https://barbertimeapi.vercel.app/api/clientes/`+id,user);
    return await clientesAPI;
  }
}

export default clientesService;