import {
  AuthService,
  JWT_TOKEN_KEY,
  environment
} from "./chunk-XITOMCV3.js";
import {
  HttpClient,
  NgClass,
  NgIf,
  Router
} from "./chunk-OEXDCHFF.js";
import {
  catchError,
  inject,
  input,
  map,
  of,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-3XL36YAT.js";

// src/app/model/user.model.ts
var UserDTO = class {
  email;
  alias;
  constructor(email, alias) {
    this.email = email;
    this.alias = alias;
  }
};

// src/app/service/user.service.ts
var UserService = class _UserService {
  http;
  webUrl;
  userEndpoint;
  constructor(http) {
    this.http = http;
    this.webUrl = environment.domain;
    this.userEndpoint = this.webUrl + "/user";
  }
  getUsers() {
    let users = [];
    console.log("User Service - get users: ");
    return this.http.get(this.userEndpoint).pipe(map((items) => {
      items.map((item) => {
        users.push(new UserDTO(item.email, item.alias));
      });
      return users;
    }), catchError((error) => {
      console.log(error);
      return of([]);
    }));
  }
  getUserByAlias(alias) {
    return this.http.get(this.userEndpoint + "/name/" + alias).pipe(map((response) => {
      return new UserDTO(response.email, response.alias);
    }), catchError((error) => {
      console.log(error);
      return of(new UserDTO("null", "null"));
    }));
  }
  static \u0275fac = function UserService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
};

// src/app/components/home-child/home-child.component.ts
function HomeChildComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 0)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", user_r1.email, " : ", user_r1.alias, "");
  }
}
function HomeChildComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 0)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", user_r2.email, " : ", user_r2.alias, "");
  }
}
function HomeChildComponent_span_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, ", with email: ");
    \u0275\u0275elementEnd();
  }
}
var HomeChildComponent = class _HomeChildComponent {
  userService = inject(UserService);
  userList;
  alias;
  email;
  clicked = false;
  parentMessage = input("External message");
  localMessage = input("Inner message");
  users = signal([
    { email: "q1@local.ro", alias: "Alias-q1" },
    { email: "admin@local.ro", alias: "Admin" }
  ]);
  constructor() {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers().subscribe((result) => {
      this.userList = result;
    });
  }
  getUserByAlias() {
    let index = Math.floor(Math.random() * 2);
    if (this.clicked) {
      this.alias = this.users()[index].alias;
      this.email = this.users()[index].email;
    } else {
      this.userService.getUsers().subscribe((result) => {
        this.alias = result[index].alias;
        this.email = result[index].email;
      });
    }
    this.clicked = !this.clicked;
  }
  static \u0275fac = function HomeChildComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomeChildComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeChildComponent, selectors: [["app-home-child"]], inputs: { parentMessage: [1, "parentMessage"], localMessage: [1, "localMessage"] }, decls: 20, vars: 5, consts: [[1, "mb-2", "flex", "gap-4", "items-center"], ["id", "user-click", 3, "click"], [4, "ngIf"]], template: function HomeChildComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2");
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "h3");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h4");
      \u0275\u0275text(5, "Home users:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "ul");
      \u0275\u0275repeaterCreate(7, HomeChildComponent_For_8_Template, 3, 2, "li", 0, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "h4");
      \u0275\u0275text(10, "Server users:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "ul");
      \u0275\u0275repeaterCreate(12, HomeChildComponent_For_13_Template, 3, 2, "li", 0, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "p")(15, "span", 1);
      \u0275\u0275listener("click", function HomeChildComponent_Template_span_click_15_listener() {
        return ctx.getUserByAlias();
      });
      \u0275\u0275text(16, "User (click for random):");
      \u0275\u0275elementEnd();
      \u0275\u0275text(17);
      \u0275\u0275template(18, HomeChildComponent_span_18_Template, 2, 0, "span", 2);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("Nested component - message from parent: ", ctx.parentMessage(), "");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Nested component - local component message: ", ctx.localMessage(), "");
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.users());
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.userList);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.alias, "");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.alias != null);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.email);
    }
  }, dependencies: [NgIf], styles: ["\n\n#user-click[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: blue;\n}\n#user-click[_ngcontent-%COMP%]:hover {\n  color: #999;\n}\n/*# sourceMappingURL=home-child.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeChildComponent, { className: "HomeChildComponent", filePath: "src/app/components/home-child/home-child.component.ts", lineNumber: 16 });
})();

// src/app/home/home.component.ts
var _c0 = (a0) => ({ "warning-color": a0 });
function HomeComponent_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 3);
    \u0275\u0275listener("click", function HomeComponent_span_2_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetSessionTimeout());
    });
    \u0275\u0275text(1, "=> ");
    \u0275\u0275elementStart(2, "span", 4);
    \u0275\u0275text(3, "Extend");
    \u0275\u0275elementEnd()();
  }
}
var initialValue = "Session in progress";
var expireValue = "Session expiring soon";
var HomeComponent = class _HomeComponent {
  homeMessage = signal(initialValue);
  authService = inject(AuthService);
  router = inject(Router);
  isToExpire = false;
  timeout;
  constructor() {
    this.timeout = this.authService.jwt_expiration_seconds * 1e3;
    this.setSessionTimeout();
    this.prepareToExtendSession();
  }
  timeoutId = -1;
  prepareResetTimeoutId = -1;
  completed = false;
  running = false;
  setSessionTimeout = () => {
    this.running = true;
    this.timeoutId = setTimeout(() => {
      this.running = false;
      this.completed = true;
      this.authService.logout();
      this.router.navigate(["/signin"]).then(() => console.log("Logged out, redirecting to signin..."));
    }, this.timeout);
    console.log("Timeout Complete");
  };
  prepareToExtendSession = () => {
    if (this.timeoutId > 0) {
      this.prepareResetTimeoutId = setTimeout(() => {
        this.homeMessage.set(expireValue);
        this.isToExpire = true;
      }, this.timeout - 5e4);
    }
  };
  resetSessionTimeout = () => {
    this.completed = false;
    this.running = false;
    if (this.prepareResetTimeoutId > 0) {
      clearTimeout(this.prepareResetTimeoutId);
      this.prepareResetTimeoutId = -1;
    }
    if (this.timeoutId > 0) {
      clearTimeout(this.timeoutId);
      this.timeoutId = -1;
      this.homeMessage.set(initialValue);
      this.isToExpire = false;
      let oldToken = sessionStorage.getItem(JWT_TOKEN_KEY)?.toString();
      this.authService.refreshJwtToken().subscribe(() => {
        let newToken = sessionStorage.getItem(JWT_TOKEN_KEY)?.toString();
        if (oldToken === newToken) {
          throw new Error("Token not refreshed!");
        }
        this.timeout = this.authService.jwt_expiration_seconds * 1e3;
        this.setSessionTimeout();
        this.prepareToExtendSession();
      });
    }
  };
  static \u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 4, vars: 6, consts: [[3, "ngClass"], ["class", "my-tooltip", "id", "ext", 3, "click", 4, "ngIf"], [3, "parentMessage"], ["id", "ext", 1, "my-tooltip", 3, "click"], [1, "my-tooltiptext"]], template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275template(2, HomeComponent_span_2_Template, 4, 0, "span", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275element(3, "app-home-child", 2);
    }
    if (rf & 2) {
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(4, _c0, ctx.isToExpire));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.homeMessage(), " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isToExpire);
      \u0275\u0275advance();
      \u0275\u0275property("parentMessage", ctx.homeMessage());
    }
  }, dependencies: [HomeChildComponent, NgIf, NgClass], styles: ["\n\nh2[_ngcontent-%COMP%]   #ext[_ngcontent-%COMP%] {\n  padding-left: 12px;\n  font-size: 24px;\n  font-weight: bolder;\n  cursor: pointer;\n  color: lightseagreen;\n}\nh2[_ngcontent-%COMP%]   #ext[_ngcontent-%COMP%]:hover {\n  color: #666;\n}\nh2[_ngcontent-%COMP%] {\n  text-align: right;\n  padding-right: 12px;\n  font-size: 24px;\n  color: #fff;\n  background-color: #333;\n}\n.warning-color[_ngcontent-%COMP%] {\n  text-align: right;\n  color: indianred;\n}\n.my-tooltip[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n}\n.my-tooltip[_ngcontent-%COMP%]   .my-tooltiptext[_ngcontent-%COMP%] {\n  font-size: 16px;\n  visibility: hidden;\n  bottom: 100%;\n  left: 50%;\n  width: 60px;\n  margin-left: -30px;\n  background-color: #333;\n  color: lightseagreen;\n  text-align: center;\n  padding: 4px;\n  border-radius: 4px;\n  position: absolute;\n  z-index: 1;\n}\n.my-tooltip[_ngcontent-%COMP%]:hover   .my-tooltiptext[_ngcontent-%COMP%] {\n  visibility: visible;\n}\n/*# sourceMappingURL=home.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/home/home.component.ts", lineNumber: 18 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-Z2PTQTC3.js.map
