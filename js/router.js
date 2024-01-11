export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()

        window.history.pushState({}, "", event.target.href)

        this.handle()
    }
    handleClass() {
        const { pathname } = window.location;
        const body = document.querySelector('body');

        body.classList.remove('home', 'universe', 'exploration');

        if (pathname === '/') {
            body.classList.add('home');
        } else if (pathname === '/universe') {
            body.classList.add('universe');
        } else if (pathname === '/exploration') {
            body.classList.add('exploration');
        }
    }

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes["/"]

        fetch(route)
        .then(data => data.text())
        .then(html => {
            document.querySelector('#app').innerHTML = html
        })
         this.handleClass()
        
    }
}