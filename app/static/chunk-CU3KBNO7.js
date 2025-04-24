import {
  AuthService
} from "./chunk-4AZWKILA.js";
import {
  Router
} from "./chunk-FA6YMNO7.js";
import {
  inject,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-3XL36YAT.js";

// src/app/components/logout/logout.component.ts
var LogoutComponent = class _LogoutComponent {
  authService = inject(AuthService);
  router = inject(Router);
  constructor() {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(["/signin"]).then(() => console.log("Logged out, redirecting to signin..."));
    }, 1e3);
  }
  static \u0275fac = function LogoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LogoutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LogoutComponent, selectors: [["app-logout"]], decls: 2, vars: 0, template: function LogoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p");
      \u0275\u0275text(1, "Logging out...");
      \u0275\u0275elementEnd();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LogoutComponent, { className: "LogoutComponent", filePath: "src/app/components/logout/logout.component.ts", lineNumber: 12 });
})();
export {
  LogoutComponent
};
//# sourceMappingURL=chunk-CU3KBNO7.js.map
