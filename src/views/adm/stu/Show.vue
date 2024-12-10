<template>
    <div>
        <div style="display: flex; justify-content: space-between;">
            <h3>学生管理</h3>
            <h4><button @click="go2Add">添加新学生</button></h4>
        </div>
        <hr>
        <div style="width: 98% ; border: red 1px solid">
            <table border="1" style="width: 100%">
                <tr v-for="e in stus" :key="e.uid">
                    <td>{{ e.uid }}</td>
                    <td>{{ e.uname }}</td>
                    <td>{{ e.phone }}</td>
                    <td>{{ e.clz.clzno }}</td>
                    <td>{{ e.clz.clzname }}</td>
                    <td>
                        <div style="width: 4vw; height: 4vw">
                            <img :src="`${imgurl}/api/public/showimg/${e.pic}`" style="width: 100%;height: 100%">
                        </div>
                    </td>
                    <td><button @click="go2Update(e)">修改</button></td>
                    <td><button @click="del(e.uid)">删除</button></td>
                </tr>
            </table>
            <div style="display: flex; justify-content: center;">
                <p><button @click="move(-1)">上一页</button></p>
                <p>{{ page.num }}/{{ totalPage }}</p>
                <p><button @click="move(1)">下一页</button></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { $get } from '@/ajax/index.js';

const store = useStore();
const router = useRouter();

const stus = ref([]);
const page = ref({
    num: 1,
    lines: 6,
    total: 0
});

const imgurl = 'http://localhost:9000';

const del = (uid) => {
    $get("/api/adm/stu/del/" + uid)
        .then((resp) => {
            console.log(resp.data);
            stus.value = resp.data.data;
        });
};

const go2Add = () => {
    store.state.pagenum = page.value.num;
    router.push({
        path: '/adm/addstu',
        query: {
            uid: 0,
        }
    });
};

const go2Update = (e) => {
    console.log(e);
    store.state.pagenum = page.value.num;
    router.push({
        path: '/adm/addstu',
        query: {
            uid: e.uid,
        }
    });
};

const move = (n) => {
    page.value.num = page.value.num + n;
    if (page.value.num < 1) {
        page.value.num = 1;
        return;
    }
    if (page.value.num > totalPage.value) {
        page.value.num = totalPage.value;
        return;
    }
    $get("/api/adm/stu/findPage", { pagenum: page.value.num, lines: page.value.lines })
        .then((resp) => {
            console.log(resp.data.data);
            stus.value = resp.data.data.students;
            page.value.total = resp.data.data.total;
        });
};

const totalPage = computed(() => {
    let n = page.value.total / page.value.lines;
    console.log("未取整页数=" + n);
    n = Math.floor(n);
    let y = page.value.total % page.value.lines;
    console.log("页数=" + n + "    余数=" + y);
    if (y > 0) n = n + 1;
    return n;
});

onMounted(() => {
    page.value.num = store.state.pagenum;
    $get("/api/adm/stu/findPage", { pagenum: page.value.num, lines: page.value.lines })
        .then((resp) => {
            console.log(resp.data.data);
            stus.value = resp.data.data.students;
            page.value.total = resp.data.data.total;
        });
});
</script>

<style>
</style>
