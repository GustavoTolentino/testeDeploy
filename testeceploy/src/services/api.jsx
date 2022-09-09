import axios from 'axios';
import systemConfigs from '../userConfig';
import { useState, useEffect } from "react";

const apiGIFromJsonArchive = axios.create({
  baseURL: systemConfigs.generalConfigs.API
});

export const apiIdentidade = axios.create({
  baseURL: "https://nlgierpidentidadeapi-v1.azurewebsites.net/api/v1/Identidade"
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
