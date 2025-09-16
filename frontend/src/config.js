export const API_URL = "http://localhost:5000/api";
import { API_URL } from './config';

async function fetchUsers() {
  const response = await fetch(`${API_URL}/auth/users`);
  const data = await response.json();
  console.log(data);
}
