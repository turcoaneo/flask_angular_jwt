import {
  HttpClient
} from "./chunk-FA6YMNO7.js";
import {
  catchError,
  map,
  of,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-3XL36YAT.js";

// src/app/constants/list.ts
var REF = ".";
var JWT_TOKEN_KEY = "JWT_Token";
var BASE_USER_ENDPOINT = "/user/";
var BASE_AUTH_ENDPOINT = "/auth/";

// src/environments/environment.ts
var environment = {
  domain: "http://127.0.0.1:5000"
};

// src/app/auth/auth.service.ts
var AuthService = class _AuthService {
  http;
  constructor(http) {
    this.http = http;
    this.webUrl = environment.domain;
    if (sessionStorage.getItem(JWT_TOKEN_KEY)) {
      this.isLoggedIn = true;
    }
  }
  webUrl;
  isLoggedIn = false;
  isUserRegistered = false;
  jwt_expiration_seconds = 3600;
  refreshJwtToken() {
    let action = "refreshing";
    console.log("Auth Service " + action + " token.");
    return this.http.get(this.webUrl + BASE_AUTH_ENDPOINT + "token").pipe(map((response) => {
      sessionStorage.removeItem(JWT_TOKEN_KEY);
      this.extracted(response, action);
      return true;
    }), catchError((error) => {
      console.log(error);
      this.isLoggedIn = false;
      return of(false);
    }));
  }
  login(userDetails) {
    console.log("Auth Service Login: ", userDetails.email);
    return this.http.post(this.webUrl + BASE_AUTH_ENDPOINT + "login", userDetails).pipe(map((response) => {
      this.extracted(response, "login");
      return true;
    }), catchError((error) => {
      console.log(error);
      this.isLoggedIn = false;
      return of(false);
    }));
  }
  extracted(response, action) {
    let token_duration_minutes = response["expires_minutes"];
    this.jwt_expiration_seconds = token_duration_minutes * 60;
    console.log(action, "jwt expiration seconds:", this.jwt_expiration_seconds);
    sessionStorage.setItem(JWT_TOKEN_KEY, response.token);
    this.isLoggedIn = true;
  }
  signUp(userDetails) {
    console.log("Auth Service Sign-up: ", userDetails.alias);
    return this.http.post(this.webUrl + BASE_USER_ENDPOINT, userDetails).pipe(map(() => {
      this.isUserRegistered = true;
      return true;
    }), catchError((error) => {
      console.log(error);
      this.isUserRegistered = false;
      return of(false);
    }));
  }
  logout() {
    sessionStorage.removeItem(JWT_TOKEN_KEY);
    this.isLoggedIn = false;
  }
  isAuthenticated() {
    return this.isLoggedIn;
  }
  isUserCreated() {
    return this.isUserRegistered;
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};

export {
  REF,
  JWT_TOKEN_KEY,
  BASE_USER_ENDPOINT,
  environment,
  AuthService
};
//# sourceMappingURL=chunk-4AZWKILA.js.map
