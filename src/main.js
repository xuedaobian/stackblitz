import { createApp } from 'vue'
import 'ant-design-vue/dist/antd.css';
import { Button } from 'ant-design-vue';
import App from './App.vue'
const app = createApp(App);
app.use(Button);
app.mount('#app');
