import Vue from 'vue';
import App from './components/App.vue';
import '../index.css';
import BootstrapVue from 'bootstrap-vue';
import { IconsPlugin } from 'bootstrap-vue';
import router from './router.js';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
    router,  // Collega il router all'app
    render: (h) => h(App),
}).$mount('#app');
