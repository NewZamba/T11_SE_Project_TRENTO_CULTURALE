import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import {BootstrapVue,IconsPlugin} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'; // Importa i CSS di Bootstrap
import 'bootstrap-vue/dist/bootstrap-vue.css'; // Importa i CSS di BootstrapVue

// Usa BootstrapVue
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

// Usa new Vue() per creare l'app in Vue 2
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');

