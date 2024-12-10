<template>
  <div style="height: 80vh;">
    <div style="display: flex; justify-content: space-between;">
      <h3>课程管理</h3>
      <el-button type="primary" @click="go2Add">添加新课程</el-button>
    </div>
    <hr>
    <el-table :data="courses" border style="width: 90%; margin-top: 20px;">
      <el-table-column prop="cno" label="课程编号" width="180"></el-table-column>
      <el-table-column prop="cname" label="课程名称" width="180"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="go2Update(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="del(scope.row.cno)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="actmsg[actidx]" v-model="bShow" width="40%">
      <el-form :model="formObj" label-width="120px">
        <el-form-item label="课程编号">
          <el-input v-model="formObj.cno" :readonly="actidx == 0"></el-input>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="formObj.cname"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="bShow = false">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { $get, $postj } from '@/ajax/index.js';

const store = useStore();
const formObj = ref({});
const courses = ref([]);
const bShow = ref(false);
const actmsg = ['修改', '添加'];
const actidx = ref(1); // 0 显示修改    1  显示添加

const go2Add = () => {
  actidx.value = 1;
  formObj.value = {};
  bShow.value = true;
};

const go2Update = (e) => {
  actidx.value = 0;
  bShow.value = true;
  $get("/api/adm/course/findOne/" + e.cno)
    .then((resp) => {
      formObj.value = resp.data.data;
    });
};

const save = () => {
  let url = "/api/adm/course/add";
  if (actidx.value == 0) {
    url = "/api/adm/course/update";
  }
  $postj(url, formObj.value)
    .then((resp) => {
      bShow.value = false;
      store.commit("show", resp.status + ":" + resp.data.msg);
      courses.value = resp.data.data;
    })
    .catch((error) => {
      ElMessage.error('保存失败: ' + error.message);
    });
};

const del = (cno) => {
  $get("/api/adm/course/remove/" + cno)
    .then((resp) => {
      courses.value = resp.data.data;
      ElMessage.success('删除成功');
    })
    .catch((error) => {
      ElMessage.error('删除失败: ' + error.message);
    });
};

onMounted(() => {
  $get("/api/adm/course/findAll")
    .then((resp) => {
      courses.value = resp.data.data;
    })
    .catch((error) => {
      ElMessage.error('课程失败: ' + error.message);
    });
});
</script>

<style scoped>
.el-table {
  margin-top: 20px;
}
</style>
