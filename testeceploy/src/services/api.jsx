import axios from 'axios';
import systemConfigs from '../userConfig';

const apiGIFromJsonArchive = axios.create({
  baseURL: systemConfigs.generalConfigs.APIGIInternet
});

export async function SystemInitialization(){
  try {
    const {data, status} = await apiGIFromJsonArchive.get(`/endpoints/?codigoCliente=${systemConfigs.generalConfigs.CompanyKey}`);
    console.log(data);
    if (status === 200) {
      if(data){
        return data;
      }
    }
  } catch (error) {
    console.log("Um erro foi disparado: " + error)
  }
}
