import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', component: () => import('../views/Login.vue') },
        { path: '/adm', component: () => import('../views/adm/Adm.vue'),
            children: [
                { path: 'clz', component: () => import('../views/adm/Clz.vue') },
                { path: 'course', component: () => import('../views/adm/Course.vue') },
                { path: 'tea', component: () => import('../views/adm/tea/Show.vue') },
                { path: 'addtea', component: () => import('../views/adm/tea/Add.vue') },
                { path: 'stu', component: () => import('../views/adm/stu/Show.vue') },
                { path: 'addstu', component: () => import('../views/adm/stu/Add.vue') },
                { path: 'task', component: () => import('../views/adm/Task.vue') },
                { path: 'head', component: () => import('../views/adm/Head.vue') }
            ],
        },
        { path: '/stu', component: () => import('../views/stu/Main.vue'),
            children: [
                { path: 'head', component: () => import('../views/tea/Head.vue') },
                { path: 'pwd', component: () => import('../views/tea/Pwd.vue') },
                { path: 'course', component: () => import('../views/stu/Course.vue') },
                { path: 'mark', component: () => import('../views/stu/Mark.vue') }
            ]
        },
        { path: '/tea', component: () => import('../views/tea/Main.vue'),
            children: [
                { path: 'mark', component: () => import('../views/tea/GoMark.vue') },
                { path: 'domark', component: () => import('../views/tea/DoMark.vue') },
                { path: 'head', component: () => import('../views/tea/Head.vue') },
                { path: 'pwd', component: () => import('../views/tea/Pwd.vue') }
            ]
        },
        { path: "/", redirect: "/login" }
    ]
})

export default router;
