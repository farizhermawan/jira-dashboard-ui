import fetch from "node-fetch";
import {AUTH_KEY, API_URL} from "../constants/Environment";

class AuthService {

  static signInWithGoogle() {
    window.location.href = API_URL + '/v1/auth/google/login?redirect=' + window.location.origin + "/callback";
  }

  static signInWithYahoo() {
    window.location.href = API_URL + '/v1/auth/yahoo/login?redirect=' + window.location.origin + "/callback";
  }

  static async callbackAuth() {
    const response = await fetch(API_URL + '/v1/auth/refresh' + window.location.search, {});
    const result = await response.json();
    const user = await this.fetchIdentity(result.access_token);
    const date = new Date();
    date.setSeconds(date.getSeconds() + result.expires_in);

    if (!user) return false;
    if (user.roles.indexOf("admin") === -1) return false;

    return {
      user: user,
      token: result.access_token,
      expired_at: date,
    };
  }

  static async fetchIdentity(access_token) {
    const response = await fetch(API_URL + '/v1/auth/me', {
      headers: { 'Authorization': 'Bearer ' + access_token }
    });
    const json = await response.json();

    if (json.error) return false;

    return {
      profile: json.profile,
      roles: json.roles
    };
  }

  static getCurrentUser() {
    return JSON.parse(window.localStorage.getItem(AUTH_KEY));
  }

  static getAuthToken() {
    return this.getCurrentUser() ? this.getCurrentUser().token : null;
  }
}

export default AuthService;
