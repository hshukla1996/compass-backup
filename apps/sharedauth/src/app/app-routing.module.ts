import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthcodeComponent } from './authcode/authcode.component';
import { AuthhomeComponent } from './authhome/authhome.component';
import { RoutePath } from './shared/route-strategies';
import { DeviceTypeComponent } from './login-rba/device-type/device-type.component';
import { VerifyEmailComponent } from './login-rba/verify-email/verify-email.component';
import { VerifyPersonalInfoComponent } from './login-rba/verify-personal-info/verify-personal-info.component';
import { VerifySecurityQuestionComponent } from './login-rba/verify-security-question/verify-security-question.component';
import { RegisterComponent } from './register/register.component';
import { CreateUserAndPasswordComponent } from './register/create-user-and-password/create-user-and-password.component';
import { ActiveCaseComponent } from './register/active-case/active-case.component';
import { ConnectCaseComponent } from './register/connect-case/connect-case.component';
import { GoPaperlessComponent } from './register/go-paperless/go-paperless.component';
import { RegistrationConfirmationComponent } from './register/registration-confirmation/registration-confirmation.component';
import { SecurityQuestionsComponent } from './register/security-questions/security-questions.component';
import { TermsAndConditionsComponent as RegisterTCS } from './register/terms-and-conditions/terms-and-conditions.component';
import { TermsAndConditionsComponent as LoginTCS } from './login-rba/terms-and-conditions/terms-and-conditions.component';
import { ChangeConfirmationComponent as EmailCS } from './change-email/change-confirmation/change-confirmation.component';
import { ChangeConfirmationComponent as ChangePasswordCS } from './change-password/change-confirmation/change-confirmation.component';
import { ChangeConfirmationComponent as SecurityCS } from './change-security-questions/change-confirmation/change-confirmation.component';
import { ChangeConfirmationComponent as ForgotPasswordCS } from './forgot-password/change-confirmation/change-confirmation.component';
import { ChangeConfirmationComponent as ForgotUsernameCS } from './forgot-username/change-confirmation/change-confirmation.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { NewEmailComponent } from './change-email/new-email/new-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NewPasswordComponent as ChangeNP } from './change-password/new-password/new-password.component';
import { NewPasswordComponent as ForgotNP } from './forgot-password/new-password/new-password.component';
import { ChangeSecurityQuestionsComponent } from './change-security-questions/change-security-questions.component';
import { NewQuestionsComponent } from './change-security-questions/new-questions/new-questions.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AnswerSecurityQuestionsComponent } from './forgot-password/answer-security-questions/answer-security-questions.component';
import { ForgotUsernameComponent } from './forgot-username/forgot-username.component';
import { SelectAndVerifyComponent } from './forgot-username/select-and-verify/select-and-verify.component';
import { LoginRbaComponent } from './login-rba/login-rba.component';
import { PageNotFoundComponent } from '@compass-ui/ui';


const routes: Routes = [
  {
    path: '',
    component: AuthhomeComponent
  },
  {
    path: 'authcode',
    component: AuthcodeComponent
  },
  {
    path: RoutePath.LOGIN_RBA,
    children: [
      {
        path: "",
        component: LoginRbaComponent
      },
      {
        path: RoutePath.DEVICE_TYPE,
        component: DeviceTypeComponent
      },
      {
        path: RoutePath.VERIFY_EMAIL,
        component: VerifyEmailComponent
      },
      {
        path: RoutePath.VERIFY_PERSONAL_INFO,
        component: VerifyPersonalInfoComponent
      },
      {
        path: RoutePath.VERIFY_SECURITY_QUESTION,
        component: VerifySecurityQuestionComponent
      },
      {
        path: RoutePath.LOGIN_TERMS_AND_CONDITIONS,
        component: LoginTCS
      }
    ]
  },
  {
    path: RoutePath.REGISTER,
    children: [
      {
        path: "",
        component: RegisterComponent
      },
      {
        path: RoutePath.CREATE_USER,
        component: CreateUserAndPasswordComponent
      },
      {
        path: RoutePath.ACTIVE_CASE,
        component: ActiveCaseComponent
      },
      {
        path: RoutePath.CONNECT_CASE,
        component: ConnectCaseComponent
      },
      {
        path: RoutePath.GO_PAPERLESS,
        component: GoPaperlessComponent
      },
      {
        path: RoutePath.REGISTRATION_CONFIRMATION,
        component: RegistrationConfirmationComponent
      },
      {
        path: RoutePath.SECURITY_QUESTIONS,
        component: SecurityQuestionsComponent
      },
      {
        path: RoutePath.REGISTRATION_TERMS_AND_CONDITIONS,
        component: RegisterTCS
      }
    ]
  },
  {
    path: RoutePath.CHANGE_EMAIL,
    children: [
      {
        path: "",
        component: ChangeEmailComponent
      },
      {
        path: RoutePath.NEW_EMAIL,
        component: NewEmailComponent
      },
      {
        path: RoutePath.CHANGE_EMAIL_CONFIRMATION,
        component: EmailCS
      }
    ]
  },
  {
    path: RoutePath.CHANGE_PASSWORD,
    children: [
      {
        path: "",
        component: ChangePasswordComponent
      },
      {
        path: RoutePath.CHANGE_NEW_PASSWORD,
        component: ChangeNP
      },
      {
        path: RoutePath.CHANGE_PASSWORD_CONFIRMATION,
        component: ChangePasswordCS
      }
    ]
  },
  {
    path: RoutePath.CHANGE_SECURITY,
    children: [
      {
        path: "",
        component: ChangeSecurityQuestionsComponent
      },
      {
        path: RoutePath.NEW_QUESTIONS,
        component: NewQuestionsComponent
      },
      {
        path: RoutePath.CHANGE_SECURITY_CONFIRMATION,
        component: SecurityCS
      }
    ]
  },
  {
    path: RoutePath.FORGOT_PASSWORD,
    children: [
      {
        path: "",
        component: ForgotPasswordComponent
      },
      {
        path: RoutePath.ANSWER_SECURITY_QUESTIONS,
        component: AnswerSecurityQuestionsComponent
      },
      {
        path: RoutePath.FORGOT_NEW_PASSWORD,
        component: ForgotNP
      },
      {
        path: RoutePath.FORGOT_PASSWORD_CONFIRMATION,
        component: ForgotPasswordCS
      }
    ]
  },
  {
    path: RoutePath.FORGOT_USERNAME,
    children: [
      {
        path: "",
        component: ForgotUsernameComponent
      },
      {
        path: RoutePath.SELECT_AND_VERIFY,
        component: SelectAndVerifyComponent
      },
      {
        path: RoutePath.FORGOT_USERNAME_CONFIRMATION,
        component: ForgotUsernameCS
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }