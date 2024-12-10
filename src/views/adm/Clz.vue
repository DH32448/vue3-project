<template>
  <div style="height: 80vh;">
    <div style="display: flex; justify-content: space-between;">
      <h3>班级管理</h3>
      <h4>当前状态: {{ actmsg[actidx] }}</h4>
      <el-button type="primary" @click="go2Add">添加新班级</el-button>
    </div>
    <div style="display: flex">
      <div style="width: 67%; border: red 1px solid; padding: 10px;">
        <el-table :data="clzs" border style="width: 100%">
          <el-table-column prop="clzno" label="班级编号" width="180"></el-table-column>
          <el-table-column prop="clzname" label="班级名称" width="180"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="go2Update(scope.row)">修改</el-button>
              <el-button size="small" type="danger" @click="del(scope.row.clzno)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="width: 32%; border: blue 1px solid; padding: 10px;">
        <el-form :model="formClz" label-width="100px">
          <el-form-item label="班级编号">
            <el-input v-model="formClz.clzno" :readonly="actidx != 1"></el-input>
          </el-form-item>
          <el-form-item label="班级名称">
            <el-input v-model="formClz.clzname"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doUpdate" v-show="actidx == 0">修改</el-button>
            <el-button type="primary" @click="doAdd" v-show="actidx == 1">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { $get, $postx } from '@/ajax/index.js';

const store = useStore();
const clzs = ref([]);
const formClz = ref({});
const actmsg = ['修改', '添加'];
const actidx = ref(1); // 0 显示修改    1  显示添加

const del = (clzno) => {
  $get("/api/adm/clz/remove/" + clzno)
    .then((resp) => {
      clzs.value = resp.data.data;
      ElMessage.success('删除成功');
    })
    .catch((error) => {
      ElMessage.error('删除失败: ' + error.message);
    });
};

const go2Update = (e) => {
  actidx.value = 0;
  $get("/api/adm/clz/findOne/" + e.clzno)
    .then((resp) => {
      formClz.value = resp.data.data;
    });
};

const doUpdate = () => {
  $postx("/api/adm/clz/update", formClz.value)
    .then((resp) => {
      store.commit("show", resp.status + ": " + resp.data.msg);
      clzs.value = resp.data.data;
    })
    .catch((error) => {
      ElMessage.error('更新失败: ' + error.message);
    });
};

const go2Add = () => {
  actidx.value = 1;
  formClz.value = {};
};

const doAdd = () => {
  $postx("/api/adm/clz/add", formClz.value)
    .then((resp) => {
      store.commit("show", resp.status + ": " + resp.data.msg);
      clzs.value = resp.data.data;
    })
    .catch((error) => {
      ElMessage.error('添加失败: ' + error.message);
    });
};

onMounted(() => {
  $get("/api/public/getClzs")
    .then((resp) => {
      clzs.value = resp.data.data;
    })
    .catch((error) => {
      ElMessage.error('加载班级失败: ' + error.message);
    });
});
</script>

<style scoped>
.el-table {
  margin-top: 20px;
}
</style>
