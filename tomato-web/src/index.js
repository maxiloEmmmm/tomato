import maxiloVue from 'maxilo-vue';
import App from './App';
import './router';
import './config';
import './store';
import './i18n';
import './utils';
import './component';
import "./db"
import "./boostrap"


maxiloVue.target = App;
maxiloVue.run();