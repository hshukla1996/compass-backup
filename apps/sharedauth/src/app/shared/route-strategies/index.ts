export enum RoutePath {
  // Common path names
  TCS = "termsAndConditions",
  NP = "newPassword",
  CS = "confirmationScreen",

  // paths
  LOGIN_RBA = "loginRBA",
  DEVICE_TYPE = "deviceType",
  VERIFY_EMAIL = "verifyEmail",
  VERIFY_PERSONAL_INFO = "verifyPersonalInfo",
  VERIFY_SECURITY_QUESTION = "verifySecurityQuestions",
  LOGIN_TERMS_AND_CONDITIONS = TCS,

  REGISTER = "register",
  CREATE_USER = "createUser",
  ACTIVE_CASE = "activeCase",
  CONNECT_CASE = "connectCase",
  GO_PAPERLESS = "goPaperless",
  REGISTRATION_CONFIRMATION = CS,
  SECURITY_QUESTIONS = "securityQuestions",
  REGISTRATION_TERMS_AND_CONDITIONS = TCS,

  CHANGE_EMAIL = "changeEmail",
  NEW_EMAIL = "newEmail",
  CHANGE_EMAIL_CONFIRMATION = CS,

  CHANGE_PASSWORD = "changePassword",
  CHANGE_NEW_PASSWORD = NP,
  CHANGE_PASSWORD_CONFIRMATION = CS,

  CHANGE_SECURITY = "changeSecurityQuestions",
  NEW_QUESTIONS = "newQuestions",
  CHANGE_SECURITY_CONFIRMATION = CS,

  FORGOT_PASSWORD = "forgotPassword",
  FORGOT_NEW_PASSWORD = NP,
  ANSWER_SECURITY_QUESTIONS = "answerSecurityQuestions",
  FORGOT_PASSWORD_CONFIRMATION = CS,

  FORGOT_USERNAME = "forgotUsername",
  SELECT_AND_VERIFY = "selectAndVerify",
  FORGOT_USERNAME_CONFIRMATION = CS
}
