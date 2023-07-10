import Route from './route';

class Router {
  private static __instance: Router;

  private routes: Route[] = [];

  private _currentRoute: Route | null = null;

  private history = window.history;

  constructor(private _rootQuery:string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  use(pathname:string, block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      this._onRoute(event.currentTarget.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname) {
    const route = this.getRoute(pathname);

    // if (!route || this._currentRoute) {
    if (!route || this._currentRoute) {
      if (this._currentRoute !== pathname) this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname:string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router('#app');
