import {
  DefaultValueAccessor,
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  UserPassGroupComponent,
  Validators,
  ɵNgNoValidate
} from "./chunk-XNGLKQ7M.js";
import {
  AuthService,
  REF
} from "./chunk-KZZDHCJP.js";
import {
  CommonModule,
  NgIf,
  Router,
  RouterLink
} from "./chunk-OEXDCHFF.js";
import {
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-3XL36YAT.js";

// src/app/components/sign-up/sign-up.component.ts
function SignUpComponent_small_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 13);
    \u0275\u0275text(1, " Signup's been unsuccessful! Retry with different email and/or alias... ");
    \u0275\u0275elementEnd();
  }
}
function SignUpComponent_small_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 13);
    \u0275\u0275text(1, " Password confirmation is required! ");
    \u0275\u0275elementEnd();
  }
}
function SignUpComponent_small_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 13);
    \u0275\u0275text(1, " Password confirmation does not match the former password! ");
    \u0275\u0275elementEnd();
  }
}
var SignUpComponent = class _SignUpComponent {
  router = inject(Router);
  authService = inject(AuthService);
  hide = true;
  formKey = "signUpUserPass";
  formEmail = "signUpEmail";
  formPass = "signUpPass";
  signUpTried = false;
  signUpForm = new FormGroup({
    signUpConfirmPass: new FormControl("", [
      Validators.required
    ]),
    signUpAlias: new FormControl("", [
      Validators.required
    ])
  });
  isInvaliPassConfirmation() {
    return this.signUpForm.get(this.formKey + REF + this.formPass)?.value !== this.signUpForm.controls.signUpConfirmPass.value;
  }
  formSubmit(form) {
    if (!form.valid) {
      console.log("Form not valid!");
      return;
    }
    this.signUpTried = false;
    let signUpEmail = form.get(this.formKey + REF + this.formEmail)?.value;
    let signUpPass = form.get(this.formKey + REF + this.formPass)?.value;
    let signUpConfirmPass = form.controls["signUpConfirmPass"].value;
    let alias = form.controls["signUpAlias"].value;
    console.log("Email: ", signUpEmail, "alias: ", alias, " - pass: ", signUpPass, " - confirm: ", signUpConfirmPass);
    let result;
    this.authService.signUp({ email: signUpEmail, alias, password: signUpPass }).subscribe(() => {
      result = this.authService.isUserCreated();
      console.log("Subscription sign-up inner result: ", result);
      if (result) {
        this.router.navigate(["/signin"]).then(() => console.log("Registered, redirecting to sign-in..."));
      } else {
        this.signUpTried = true;
        setTimeout(() => {
          this.router.navigate(["/signup"]).then(() => console.log("Not created, redirecting to signup..."));
        }, 2e3);
      }
    });
  }
  toggleConfirmPassInputView() {
    this.hide = !this.hide;
  }
  static \u0275fac = function SignUpComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SignUpComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SignUpComponent, selectors: [["app-sign-up"]], decls: 27, vars: 10, consts: [[1, "mb-2"], ["class", "error block", 4, "ngIf"], [3, "ngSubmit", "formGroup"], ["for", "signUpAlias"], ["formControlName", "signUpAlias", "name", "signUpAlias", "type", "text", "id", "signUpAlias", "placeholder", "Enter alias"], [3, "componentKey", "componentEmail", "componentPass"], ["for", "signUpConfirmPass"], [1, "input-placeholder"], ["formControlName", "signUpConfirmPass", "name", "signUpConfirmPass", "id", "signUpConfirmPass", "placeholder", "Confirm password", "aria-describedby", "signUpConfirmHelp", "onpaste", "return false;", "onDrag", "return false", "onDrop", "return false", "autocomplete", "off", 2, "float", "left", 3, "type"], ["id", "toggleConfirmPass", 3, "click"], ["id", "signUpConfirmPassHelp", 1, "form-text", "text-muted", "block", "mt-6"], ["type", "submit", "id", "login-submit", 1, "btn", "btn-primary"], ["routerLink", "/signin", 2, "text-decoration", "none"], [1, "error", "block"]], template: function SignUpComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, SignUpComponent_small_1_Template, 2, 0, "small", 1);
      \u0275\u0275elementStart(2, "form", 2);
      \u0275\u0275listener("ngSubmit", function SignUpComponent_Template_form_ngSubmit_2_listener() {
        return ctx.formSubmit(ctx.signUpForm);
      });
      \u0275\u0275elementStart(3, "fieldset")(4, "label", 3);
      \u0275\u0275text(5, "Choose an alias");
      \u0275\u0275elementEnd();
      \u0275\u0275element(6, "input", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275element(7, "app-user-pass-group", 5);
      \u0275\u0275elementStart(8, "fieldset")(9, "label", 6);
      \u0275\u0275text(10, "Confirm password");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "span", 7);
      \u0275\u0275element(12, "input", 8);
      \u0275\u0275elementStart(13, "i", 9);
      \u0275\u0275listener("click", function SignUpComponent_Template_i_click_13_listener() {
        return ctx.toggleConfirmPassInputView();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "small", 10);
      \u0275\u0275text(15, "Re-type your password!");
      \u0275\u0275elementEnd();
      \u0275\u0275template(16, SignUpComponent_small_16_Template, 2, 0, "small", 1)(17, SignUpComponent_small_17_Template, 2, 0, "small", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 11);
      \u0275\u0275text(19, "Submit");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "p");
      \u0275\u0275text(21, "Already registered? ");
      \u0275\u0275elementStart(22, "span");
      \u0275\u0275text(23, " Go to ");
      \u0275\u0275elementStart(24, "a", 12);
      \u0275\u0275text(25, "sign in");
      \u0275\u0275elementEnd();
      \u0275\u0275text(26, " page ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.signUpTried);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.signUpForm);
      \u0275\u0275advance(5);
      \u0275\u0275propertyInterpolate("componentKey", ctx.formKey);
      \u0275\u0275propertyInterpolate("componentEmail", ctx.formEmail);
      \u0275\u0275propertyInterpolate("componentPass", ctx.formPass);
      \u0275\u0275advance(5);
      \u0275\u0275property("type", ctx.hide ? "password" : "text");
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.hide ? "bi bi-eye-slash" : "bi bi-eye");
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.signUpForm.controls.signUpConfirmPass.dirty && (ctx.signUpForm.controls.signUpConfirmPass.errors == null ? null : ctx.signUpForm.controls.signUpConfirmPass.errors["required"]));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.signUpForm.dirty && ctx.isInvaliPassConfirmation());
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink, UserPassGroupComponent], styles: ["\n\n#toggleConfirmPass[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-left: -30px;\n  margin-top: 5px;\n  font-size: 24px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=sign-up.component.css.map */", "\n\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin-top: 10px;\n  margin-bottom: 5px;\n  text-align: left;\n  color: #333;\n  font-weight: bold;\n}\ninput[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin-bottom: 15px;\n  padding: 10px;\n  box-sizing: border-box;\n  border: 1px solid #666;\n  border-radius: 5px;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 6px;\n  border-radius: 10px;\n  margin-top: 15px;\n  margin-bottom: 15px;\n  border: none;\n  color: white;\n  background-color: #999;\n  width: 100%;\n  font-size: 24px;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  color: #666;\n  background-color: #333;\n}\n.error.block[_ngcontent-%COMP%] {\n  color: darkred;\n}\n.input-placeholder[_ngcontent-%COMP%] {\n  position: relative;\n}\n/*# sourceMappingURL=style.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SignUpComponent, { className: "SignUpComponent", filePath: "src/app/components/sign-up/sign-up.component.ts", lineNumber: 16 });
})();
export {
  SignUpComponent
};
//# sourceMappingURL=chunk-6R25ZUIF.js.map
