import { Injectable } from '@angular/core';

const LOGIN_KEY: string = '0-979db954-ad29-4427-a2a3-874160b2434f';
const ACCESS_FIELD: string = 'authnResult';
const ACCESS_TOKEN: string = 'access_token';
const REFRESH_TOKEN: string = 'refresh_token';
const USER_INFO_FIELD: string = 'userData';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

  constructor() { }

  private getTokens(tokenType: string): string {
    const isLoginSuccess = sessionStorage.getItem(LOGIN_KEY);
    const hasAuth = isLoginSuccess ? JSON.parse(isLoginSuccess) : '';
    return hasAuth && !this.isEmptyObject(hasAuth[ACCESS_FIELD]) ? hasAuth[ACCESS_FIELD][tokenType] : '';
  }

  private removeTokens(tokenType: string): void {
    const isLoginSuccess = sessionStorage.getItem(LOGIN_KEY);
    const hasAuth = isLoginSuccess ? JSON.parse(isLoginSuccess) : '';
    if (hasAuth && !this.isEmptyObject(hasAuth[ACCESS_FIELD])) {
      hasAuth[ACCESS_FIELD][tokenType] = '';
      sessionStorage.setItem(LOGIN_KEY, JSON.stringify(hasAuth));
    }
  }  

  getToken(): string {
    return this.getTokens(ACCESS_TOKEN);
  }

  removeToken(): void {
    this.removeTokens(ACCESS_TOKEN);
  }

  getRefreshToken(): string {
    return this.getTokens(REFRESH_TOKEN);
  }

  removeRefreshToken(): void {
    this.removeTokens(REFRESH_TOKEN);
  }

  getUserInfo(): string {
    const isLoginSuccess = sessionStorage.getItem(LOGIN_KEY);
    const hasAuth = isLoginSuccess ? JSON.parse(isLoginSuccess) : '';
    return hasAuth && !this.isEmptyObject(hasAuth[USER_INFO_FIELD]) ? hasAuth[USER_INFO_FIELD] : '';
  }

  removeUserInfo(): void {
    const isLoginSuccess = sessionStorage.getItem(LOGIN_KEY);
    const hasAuth = isLoginSuccess ? JSON.parse(isLoginSuccess) : '';
    if (hasAuth && !this.isEmptyObject(hasAuth[USER_INFO_FIELD])) {
      hasAuth[USER_INFO_FIELD] = '{}';
      sessionStorage.setItem(LOGIN_KEY, JSON.stringify(hasAuth));
    }    
  }

  removeAllLoginSessionData(): void {
    sessionStorage.removeItem(LOGIN_KEY);
  }

  isEmptyObject(obj: string): boolean {
    return (
      Object.getPrototypeOf(obj) === Object.prototype &&
      Object.getOwnPropertyNames(obj).length === 0 &&
      Object.getOwnPropertySymbols(obj).length === 0
    )
  }
}