import auth from './auth';
import nAuth from './nAuth';
import maxiloVue from 'maxilo-vue';
let middleware = maxiloVue.make("router").middleware;

middleware.add('auth', auth);
middleware.add('nAuth', nAuth);