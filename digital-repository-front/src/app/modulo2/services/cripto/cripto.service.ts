import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CriptoService {

  constructor() { }

// Función para cifrar
 encryptData(data: string, secretKey: string): string {
  const ciphertext = CryptoJS.AES.encrypt(data, secretKey).toString();
  return encodeURIComponent(ciphertext);
}

// Función para descifrar
 decryptData(encryptedData: string, secretKey: string): string {
  const ciphertext = decodeURIComponent(encryptedData);
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Función para cifrar un arreglo de identidades
 encryptArray(identities: string[], secretKey: string): string {
  const dataToEncrypt = identities.join(','); // Convertir el arreglo a una cadena separada por comas
  const ciphertext = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
  return encodeURIComponent(ciphertext);
}

// Función para descifrar y obtener un arreglo de identidades
 decryptArray(encryptedData: string, secretKey: string): string[] {
  const ciphertext = decodeURIComponent(encryptedData);
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData.split(','); // Convertir la cadena a un arreglo separado por comas
}
}
