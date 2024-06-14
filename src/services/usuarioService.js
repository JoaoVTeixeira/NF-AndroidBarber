import axios from 'axios';


var usuarioService = {
  
  // método para cadastrar um usuário
  postUsuario: async (Cadastro) => {
    Cadastro.role = "cliente";
    console.log(Cadastro)
    var usuarioAPI = axios.post(`https://nf-android-backend-grzvk96jl-joaos-projects-d68ebd5d.vercel.app/users/cadastrar/`,Cadastro);
    return await usuarioAPI;
  },

  // método para validar o login do usuário
  loginUsuario: async (user) => {
    console.log(user)
    var usuarioAPI = axios.post(`https://nf-android-backend-grzvk96jl-joaos-projects-d68ebd5d.vercel.app/users/login`, user);
    return await usuarioAPI;
  },
  updateUsuario: async (id,user) => {
    var usuarioAPI = axios.put(`https://nf-android-backend-grzvk96jl-joaos-projects-d68ebd5d.vercel.app/users/atualizar/`+id,user);
    return await usuarioAPI;

  }
}

export default usuarioService;