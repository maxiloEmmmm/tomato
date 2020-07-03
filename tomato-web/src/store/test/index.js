import maxiloVue from 'maxilo-vue';

import auth from './auth';
import module_two from './module_two';


//两种方式因人而异

//1
const store = maxiloVue.make("store")
store.add('testAuth', auth);
store.add('testModule_two', module_two);

    //getters['testAuth/x']

    //pages/test/index.vue
    //  methods
    //      t this.$store.dispatch('testAuth/test', {u:123});

//2
// maxiloVue.store.add('test', {
//     namespaced: true,
//     modules: {
//         auth,
//         module_two
//     }
// });

    //getters['test/auth/x']

    //pages/test/index.vue
    //  methods
    //      t this.$store.dispatch('test/auth/test', {u:123});