import {
  AuthService,
  JWT_TOKEN_KEY
} from "./chunk-U5ZTSM5Z.js";
import {
  APP_BASE_HREF,
  NgIf,
  Router,
  RouterLink,
  RouterOutlet,
  bootstrapApplication,
  provideHttpClient,
  provideRouter,
  withInterceptors
} from "./chunk-OEXDCHFF.js";
import {
  inject,
  provideZoneChangeDetection,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-3XL36YAT.js";

// src/app/auth/auth.guards.ts
var AuthGuardService = () => {
  let isAuthenticated = inject(AuthService).isAuthenticated();
  let router = inject(Router);
  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(["signin"]).then(() => console.log("Not authenticated, redirected to login page."));
    return false;
  }
};

// src/app/app.routes.ts
var appRoutes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "about"
  },
  {
    path: "about",
    loadComponent: () => import("./chunk-SUXX2POZ.js").then((m) => m.AboutComponent)
  },
  {
    path: "contact",
    loadComponent: () => import("./chunk-53XSHIK6.js").then((m) => m.ContactComponent)
  },
  {
    path: "home",
    canActivate: [AuthGuardService],
    loadComponent: () => import("./chunk-WHSMK26B.js").then((m) => m.HomeComponent)
  },
  {
    path: "signin",
    loadComponent: () => import("./chunk-II7NVQKQ.js").then((m) => m.SignInComponent)
  },
  {
    path: "logout",
    loadComponent: () => import("./chunk-MQNBKWBV.js").then((m) => m.LogoutComponent)
  },
  {
    path: "signup",
    loadComponent: () => import("./chunk-DQNAQWHP.js").then((m) => m.SignUpComponent)
  }
];

// src/app/auth/jwt-interceptor.ts
var JwtInterceptor = (req, next) => {
  const token = sessionStorage.getItem(JWT_TOKEN_KEY);
  const clonedReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
  return next(clonedReq);
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideHttpClient(withInterceptors([JwtInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    { provide: APP_BASE_HREF, useValue: "/" }
  ]
};

// src/app/components/header/header.component.ts
function HeaderComponent_span_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5)(1, "h2");
    \u0275\u0275text(2, "Logout");
    \u0275\u0275elementEnd()();
  }
}
function HeaderComponent_ul_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul")(1, "li", 6)(2, "h2");
    \u0275\u0275text(3, "Sign in");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "li", 7)(5, "h2");
    \u0275\u0275text(6, "Sign up");
    \u0275\u0275elementEnd()()();
  }
}
var HeaderComponent = class _HeaderComponent {
  authService = inject(AuthService);
  static \u0275fac = function HeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HeaderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], decls: 14, vars: 2, consts: [["routerLink", "/home"], ["routerLink", "/about"], ["routerLink", "/contact"], ["routerLink", "/logout", 4, "ngIf"], [4, "ngIf"], ["routerLink", "/logout"], ["routerLink", "/signin"], ["routerLink", "/signup"]], template: function HeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header")(1, "nav")(2, "span", 0)(3, "h1");
      \u0275\u0275text(4, "Pumi app");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "ul")(6, "li", 1)(7, "h2");
      \u0275\u0275text(8, "About");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "li", 2)(10, "h2");
      \u0275\u0275text(11, "Contact");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(12, HeaderComponent_span_12_Template, 3, 0, "span", 3)(13, HeaderComponent_ul_13_Template, 7, 0, "ul", 4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275property("ngIf", ctx.authService.isAuthenticated());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.authService.isAuthenticated());
    }
  }, dependencies: [
    RouterLink,
    NgIf
  ], styles: ["\n\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  padding-inline: 16px;\n  padding-block: 0;\n  background-color: #333;\n  color: #fff;\n  align-items: center;\n  justify-content: space-between;\n}\nheader[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 36px;\n  cursor: pointer;\n  color: #fff;\n}\nheader[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]:hover {\n  color: #999;\n}\nheader[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 32px;\n  padding-right: 24px;\n  align-items: center;\n  justify-content: space-between;\n  display: inline-flex;\n  cursor: pointer;\n  color: #fff;\n}\nheader[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]:hover {\n  color: #999;\n}\nheader[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\nheader[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding-top: 12px;\n}\nheader[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding-right: 24px;\n  align-items: center;\n  justify-content: space-between;\n  display: inline-flex;\n  cursor: pointer;\n}\nheader[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  color: #999;\n}\n@media only screen and (max-width: 992px) {\n  header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n@media only screen and (max-width: 768px) {\n  header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n}\n@media only screen and (max-width: 600px) {\n  header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n/*# sourceMappingURL=header.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src/app/components/header/header.component.ts", lineNumber: 16 });
})();

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  title = "angular-pumi";
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-header");
      \u0275\u0275elementStart(1, "main");
      \u0275\u0275element(2, "router-outlet");
      \u0275\u0275elementEnd();
    }
  }, dependencies: [RouterOutlet, HeaderComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 12 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
