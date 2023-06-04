const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "/src/pages/404/index.html",
    500: "/src/pages/500/index.html",
    "/": "/src/pages/main/index.html",
    "/profile": "/src/pages/profile/index.html",
    "/login": "/src/pages/login/index.html",
    "/signin": "/src/pages/signin/index.html"
};

const handleLocation = async () => {
    const path = window.location.pathname;
    console.log('first', path);
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    console.log('html', html);
    document.getElementById("root").innerHTML = html;
};

window.onpopstate = handleLocation;
handleLocation();
export default route;