import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { $get, $postx, $postj, $postf } from "./ajax/index.js";
import store from "./store";
import ElementPlus from 'element-plus'
const app = createApp(App);

// 挂载全局方法
app.config.globalProperties.$get = $get;
app.config.globalProperties.$postx = $postx;
app.config.globalProperties.$postj = $postj;
app.config.globalProperties.$postf = $postf;

app.config.globalProperties.imgurl = "";

// 关闭生产提示
app.config.productionTip = false;

// 使用路由和存储
app.use(router);
app.use(store);
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

// 挂载应用
app.mount('#app');
