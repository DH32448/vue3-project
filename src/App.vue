<template>
  <div id="app">
    <el-alert v-if="err.length > 0" :title="err" type="error" show-icon />
    <div style="display: flex; justify-content: space-between">
      <p></p>
      <h2 align="center">学生成绩管理 Mark5, Vue3</h2>
      <div style="color: darkmagenta; text-align: left;
                     border-bottom: 1px solid orangered; height: 20px;">
      </div>
    </div>
    <el-menu mode="horizontal">
      <el-menu-item index="1">
        姓名: {{ name }}
      </el-menu-item>
      <el-menu-item index="2">
        角色: {{ roleName }}
      </el-menu-item>
      <el-menu-item index="3">
        <div style="width: 4vw; height: 4vw; margin-top: -3vw;">
          <img :src="`${imgurl}/api/public/showimg/${pic}`" style="width: 100%; height: 100%">
        </div>
      </el-menu-item>
      <el-menu-item index="4">
        <el-button link @click="logout">退出</el-button>
      </el-menu-item>
    </el-menu>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const imgurl = ref("http://localhost:9000");

const err = computed(() => store.state.err);
const name = computed(() => store.state.name);
const roleName = computed(() => store.state.roleName);
const pic = computed(() => store.state.pic);

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("roleName");
  localStorage.removeItem("pic");
  router.push("/login");
};

let errTimer = null;

onMounted(() => {
  console.log("App.vue-mounted");
  store.state.token = window.localStorage.getItem("token");
  store.state.roleName = window.localStorage.getItem("roleName");
  store.state.name = window.localStorage.getItem("name");
  store.state.pic = window.localStorage.getItem("pic");

  errTimer = setInterval(() => {
    store.state.errTime = store.state.errTime - 1;
    if (store.state.errTime <= 0) {
      store.state.err = "";
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(errTimer);
});
</script>

<style>
#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 90vh;
  height: 100%;
  z-index: 0;
}
</style>
