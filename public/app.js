import loadHome from './features/home/home-view.js'

const routes = {
    '#/': `<h1>test</h1>`
}

function handleRoute() {
    const hash = window.location.hash;
    console.log(hash);
    const content = routes[hash] ? routes[hash] : '<h1>Erro ao carregar conteúdo</h1>';
    console.log(content);
    document.getElementById('app').innerHTML = content;
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);
handleRoute();
