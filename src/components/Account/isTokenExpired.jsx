import {jwtDecode} from 'jwt-decode';

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now();
  } catch {
    return true; 
  }
};

