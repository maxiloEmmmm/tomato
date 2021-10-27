import maxiloVue from 'maxilo-vue';
import './middleware'; 
let $router = maxiloVue.make("router").getRoute();

$router.add('/notification/:id', () => import('pages/notification'))
$router.add('/setting', () => import('pages/setting'))
$router.add('/chart', () => import('pages/chart'))

$router.group("/", () => import('pages/action-layout'), r => {
    return [
        r.add("", () => import('pages/action-start'), {name: "action-start"}),
        r.add("action-before", () => import('pages/action-before'), {name: "action-before"}),
        r.add("action-tomato", () => import('pages/action-tomato'), {name: "action-tomato"}),
        r.add("action-confirm", () => import('pages/action-confirm'), {name: "action-confirm"}),
        r.add("action-rest", () => import('pages/action-rest'), {name: "action-rest"}),
    ]
})