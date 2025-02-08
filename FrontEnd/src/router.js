import Vue from 'vue';
import Router from 'vue-router';
import UserHome from './components/User/Home.vue';
import DataAnalystHome from './components/Data_Analyst/Home.vue';
import ModeratorHome from './components/Moderator/Home.vue';
import SignUp from './components/Sign_Up/SignUp.vue';
import Login from './components/Login/Login.vue';
import EventPage from './components/EventPage/EventPage.vue';
import Comment from './components/Comment/CommentSection.vue';
import SuggestionEvent from "./components/User/SuggestionEvent.vue";
import SuggEvents from './components/User/SuggEvents.vue'

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: Login,
    },
    {
        path: '/UserHome',
        component: UserHome
    },
    {
        path: '/DataAnalystHome',
        component: DataAnalystHome
    },
    {
        path: '/ModeratorHome',
        component: ModeratorHome
    },
    {
        path: '/SignUp',
        component: SignUp
    },
    {
        path: '/EventPage',
        component: EventPage
    },
    {
        path: '/Comment',
        component: Comment
    },
    {
        path: '/SuggestionEvent',
        component: SuggestionEvent
    },
    {
        path: '/SuggEvents',
        component: SuggEvents
    },
    {
        path: '*', // Rotte non definite
        redirect: '/',
    },
];

const router = new Router({
    routes,
    mode: 'history', // Utilizza la modalità di storia per evitare # nelle URL
});

export default router;
