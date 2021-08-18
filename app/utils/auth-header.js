import AuthService from "../services/AuthService";

export default function authHeader() {
  const token = AuthService.getUserToken();

  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
}
