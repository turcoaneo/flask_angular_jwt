import {
  FormGroup,
  FormGroupDirective,
  NgControlStatusGroup,
  ReactiveFormsModule,
  UserPassGroupComponent,
  ɵNgNoValidate
} from "./chunk-XNGLKQ7M.js";
import {
  AuthService,
  REF
} from "./chunk-U5ZTSM5Z.js";
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

// src/app/components/sign-in/sign-in.component.ts
function SignInComponent_small_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 6);
    \u0275\u0275text(1, " Authentication's been unsuccessful! Redirecting to sign-up page... ");
    \u0275\u0275elementEnd();
  }
}
var SignInComponent = class _SignInComponent {
  router = inject(Router);
  authService = inject(AuthService);
  formKey = "signInUserPass";
  formEmail = "signInEmail";
  formPass = "signInPass";
  signInTried = false;
  signInForm = new FormGroup({});
  formSubmit(form) {
    if (!form.valid) {
      console.log("Form not valid!");
      return;
    }
    let signInEmail = form.get(this.formKey + REF + this.formEmail)?.value;
    let signInPass = form.get(this.formKey + REF + this.formPass)?.value;
    let result;
    this.authService.login({ email: signInEmail, password: signInPass }).subscribe(() => {
      result = this.authService.isAuthenticated();
      if (result) {
        this.router.navigate(["/"]).then(() => console.log("Authenticated, redirecting to home..."));
      } else {
        this.signInTried = true;
        setTimeout(() => {
          this.router.navigate(["/signup"]).then(() => console.log("Not authenticated, redirecting to signup..."));
        }, 2e3);
      }
    });
  }
  static \u0275fac = function SignInComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SignInComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SignInComponent, selectors: [["app-sign-in"]], decls: 13, vars: 5, consts: [[1, "mb-2"], ["class", "error block", 4, "ngIf"], [3, "ngSubmit", "formGroup"], [3, "componentKey", "componentEmail", "componentPass"], ["type", "submit", "id", "login-submit", 1, "btn", "btn-primary"], ["routerLink", "/signup", 2, "text-decoration", "none"], [1, "error", "block"]], template: function SignInComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, SignInComponent_small_1_Template, 2, 0, "small", 1);
      \u0275\u0275elementStart(2, "form", 2);
      \u0275\u0275listener("ngSubmit", function SignInComponent_Template_form_ngSubmit_2_listener() {
        return ctx.formSubmit(ctx.signInForm);
      });
      \u0275\u0275element(3, "app-user-pass-group", 3);
      \u0275\u0275elementStart(4, "button", 4);
      \u0275\u0275text(5, "Submit");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "p");
      \u0275\u0275text(7, "Not registered? ");
      \u0275\u0275elementStart(8, "span");
      \u0275\u0275text(9, " Create an ");
      \u0275\u0275elementStart(10, "a", 5);
      \u0275\u0275text(11, "account");
      \u0275\u0275elementEnd();
      \u0275\u0275text(12, " for one month free trial ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.signInTried);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.signInForm);
      \u0275\u0275advance();
      \u0275\u0275propertyInterpolate("componentKey", ctx.formKey);
      \u0275\u0275propertyInterpolate("componentEmail", ctx.formEmail);
      \u0275\u0275propertyInterpolate("componentPass", ctx.formPass);
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, NgControlStatusGroup, FormGroupDirective, RouterLink, UserPassGroupComponent], styles: ["\n\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin-top: 10px;\n  margin-bottom: 5px;\n  text-align: left;\n  color: #333;\n  font-weight: bold;\n}\ninput[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin-bottom: 15px;\n  padding: 10px;\n  box-sizing: border-box;\n  border: 1px solid #666;\n  border-radius: 5px;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 6px;\n  border-radius: 10px;\n  margin-top: 15px;\n  margin-bottom: 15px;\n  border: none;\n  color: white;\n  background-color: #999;\n  width: 100%;\n  font-size: 24px;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  color: #666;\n  background-color: #333;\n}\n.error.block[_ngcontent-%COMP%] {\n  color: darkred;\n}\n.input-placeholder[_ngcontent-%COMP%] {\n  position: relative;\n}\n/*# sourceMappingURL=style.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SignInComponent, { className: "SignInComponent", filePath: "src/app/components/sign-in/sign-in.component.ts", lineNumber: 16 });
})();
export {
  SignInComponent
};
//# sourceMappingURL=chunk-II7NVQKQ.js.map
