import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '@/components/WelcomePage.vue';
import AdminLogin from '@/components/AdminLogin.vue';
import CarInventory from '@/components/CarInventory.vue';
import AddCar from '@/components/AddCar.vue';
import UpdateCarStatus from '@/components/UpdateCarStatus.vue';
import AdminDashboard from '@/components/AdminDashboard.vue'; 

const routes = [
  { path: '/', name: 'WelcomePage', component: WelcomePage },
  { path: '/admin-login', name: 'AdminLogin', component: AdminLogin },
  { path: '/car-list', name: 'CarList', component: CarInventory },
  { path: '/add-car', name: 'AddCar', component: AddCar },
  { path: '/update-car-status', name: 'UpdateCarStatus', component: UpdateCarStatus },
  { path: '/admin-dashboard', name: 'AdminDashboard', component: AdminDashboard } 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
