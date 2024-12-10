<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h3>教师-{{ actmsg[actidx] }}</h3>
      <el-button type="primary" @click="go2Add">继续添加</el-button>
    </div>
    <el-form :model="formTea" label-width="100px" style="width: 80%; border: blue 1px solid; padding: 20px;">
      <el-form-item label="教师编号" :rules="[{ required: true, message: '请输入教师编号', trigger: 'blur' }]">
        <el-input v-model="formTea.uid" :readonly="actidx !== 2" />
      </el-form-item>
      <el-form-item label="教师姓名" :rules="[{ required: true, message: '请输入教师姓名', trigger: 'blur' }]">
        <el-input v-model="formTea.uname" />
      </el-form-item>
      <el-form-item label="教师电话" :rules="[{ required: true, message: '请输入教师电话', trigger: 'blur' }]">
        <el-input v-model="formTea.phone" />
      </el-form-item>
      <el-form-item label="密码" v-if="actidx === 1" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
        <el-input v-model="formTea.pwd" />
      </el-form-item>
      <el-form-item label="头像">
        <el-image
          style="width: 8vw; height: 8vw"
          :src="`${imgurl}/api/public/showimg/${formTea.pic}`"
          fit="cover"
        />
        <el-upload
          action=""
          :auto-upload="false"
          :on-change="handleChange"
          :show-file-list="false"
        >
          <el-button slot="trigger" type="primary">选择图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update" v-show="actidx === 0">修改</el-button>
        <el-button type="primary" @click="add" v-show="actidx === 1">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();

const formTea = reactive({
  uid: 0,
  uname: '',
  phone: '',
  pwd: '',
  pic: ''
});

const actmsg = ['修改', '添加', '显示'];
const actidx = ref(2);
const imgurl = ref("http://localhost:9000");
const file = ref(null);

const go2Add = () => {
  actidx.value = 1;
  Object.assign(formTea, { uid: 0, uname: '', phone: '', pwd: '', pic: '' });
};

const add = () => {
  const fd = new FormData();
  fd.append("uid", 0);
  fd.append("uname", formTea.uname);
  fd.append("phone", formTea.phone);
  fd.append("pwd", formTea.pwd);
  if (file.value) {
    fd.append("mypic", file.value.raw);
  }
  this.$postf("/api/adm/tea/add", fd).then((resp) => {
    Object.assign(formTea, resp.data.data);
    actidx.value = 2;
    store.commit("show", " 添加成功 ...");
    ElMessage.success('添加成功');
  }).catch(error => {
    ElMessage.error('添加失败');
  });
};

const update = () => {
  const fd = new FormData();
  fd.append("uid", formTea.uid);
  fd.append("uname", formTea.uname);
  fd.append("phone", formTea.phone);
  fd.append("pwd", formTea.pwd);
  fd.append("pic", formTea.pic);
  if (file.value) {
    fd.append("mypic", file.value.raw);
  }
  this.$postf("/api/adm/tea/update", fd).then((resp) => {
    Object.assign(formTea, resp.data.data);
    actidx.value = 2;
    store.commit("show", " 修改成功 ...");
    ElMessage.success('修改成功');
  }).catch(error => {
    ElMessage.error('修改失败');
  });
};

const handleChange = (uploadFile) => {
  file.value = uploadFile;
};

onMounted(() => {
  const id = route.query.uid;
  console.log(id);
  if (id === undefined || id === "0") { // 添加
    Object.assign(formTea, { uid: 0, uname: '', phone: '', pwd: '', pic: '' });
    actidx.value = 1;
  } else { // 更新
    this.$get(`/api/adm/tea/findById/${id}`).then((resp) => {
      Object.assign(formTea, resp.data.data);
      actidx.value = 0;
    });
  }
});
</script>

<style scoped>

</style>
