import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('../views/Login.vue');
const Adm = () => import('../views/adm/Adm.vue');
const Stu = () => import('../views/stu/Main.vue');
const Tea = () => import('../views/tea/Main.vue');

const Adm_Clz = () => import('../views/adm/Clz.vue');
const Adm_Course = () => import('../views/adm/Course.vue');
const Adm_Task = () => import('../views/adm/Task.vue');
const Adm_Head = () => import('../views/adm/Head.vue');
const Adm_Tea_Show = () => import('../views/adm/tea/Show.vue');
const Adm_Tea_Add = () => import('../views/adm/tea/Add.vue');
const Adm_Stu_Show = () => import('../views/adm/stu/Show.vue');
const Adm_Stu_Add = () => import('../views/adm/stu/Add.vue');

const Tea_Mark_Go = () => import('../views/tea/GoMark.vue');
const Tea_Mark_Do = () => import('../views/tea/DoMark.vue');
const Tea_Head = () => import('../views/tea/Head.vue');
const Tea_Pwd = () => import('../views/tea/Pwd.vue');

const Stu_Mark = () => import('../views/stu/Mark.vue');
const Stu_Course = () => import('../views/stu/Course.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', component: Login },
        { path: '/adm', component: Adm,
            children: [
                { path: 'clz', component: Adm_Clz },
                { path: 'course', component: Adm_Course },
                { path: 'tea', component: Adm_Tea_Show },
                { path: 'addtea', component: Adm_Tea_Add },
                { path: 'stu', component: Adm_Stu_Show },
                { path: 'addstu', component: Adm_Stu_Add },
                { path: 'task', component: Adm_Task },
                { path: 'head', component: Adm_Head }
            ],
        },
        { path: '/stu', component: Stu,
            children: [
                { path: 'head', component: Tea_Head },
                { path: 'pwd', component: Tea_Pwd },
                { path: 'course', component: Stu_Course },
                { path: 'mark', component: Stu_Mark }
            ]
        },
        { path: '/tea', component: Tea,
            children: [
                { path: 'mark', component: Tea_Mark_Go },
                { path: 'domark', component: Tea_Mark_Do },
                { path: 'head', component: Tea_Head },
                { path: 'pwd', component: Tea_Pwd }
            ]
        },
        { path: "/", redirect: "/login" }
    ]
})

export default router;
