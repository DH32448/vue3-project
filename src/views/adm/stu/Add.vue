<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h3>学生-{{ actmsg[actidx] }}</h3>
      <el-button @click="go2Back">返回</el-button>
      <el-button @click="go2Add">继续添加</el-button>
    </div>
    <hr>
    <el-form :model="formStu" label-width="100px" style="width: 80%">
      <el-form-item label="学生编号">
        <el-input v-model="formStu.uid" :readonly="actidx != 2" />
      </el-form-item>
      <el-form-item label="学生姓名">
        <el-input v-model="formStu.uname" />
      </el-form-item>
      <el-form-item label="学生电话">
        <el-input v-model="formStu.phone" />
      </el-form-item>
      <el-form-item label="密码" v-if="actidx == 1">
        <el-input v-model="formStu.pwd" />
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          action="/api/adm/stu/upload"
          :on-change="handleChange"
          :auto-upload="false"
          ref="upload"
        >
          <el-button slot="trigger" type="primary">选取文件</el-button>
          <el-button type="success" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
        <div style="width: 8vw; height: 8vw; margin-top: 10px;">
          <el-image
            style="width: 100%; height: 100%"
            :src="`${imgurl}/api/public/showimg/${formStu.pic}`"
            fit="cover"
          />
        </div>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="formStu.clz.clzno" placeholder="请选择班级">
          <el-option
            v-for="c in clzs"
            :key="c.clzno"
            :label="c.clzname"
            :value="c.clzno"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update" v-show="actidx == 0">修改</el-button>
        <el-button type="primary" @click="add" v-show="actidx == 1">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const formStu = reactive({ clz: {} });
const clzs = ref([]);
const actmsg = ['修改', '添加', '显示'];
const actidx = ref(2);
const imgurl = ref("http://localhost:9000");
const upload = ref(null);

const go2Add = () => {
  actidx.value = 1;
  formStu.uid = 0;
  formStu.clz = {};
};

const add = () => {
  const fd = new FormData();
  fd.append("uid", 0);
  fd.append("uname", formStu.uname);
  fd.append("phone", formStu.phone);
  fd.append("pwd", formStu.pwd);
  fd.append("clz.clzno", formStu.clz.clzno);
  const file = upload.value.uploadFiles[0].raw;
  fd.append("mypic", file);

  $postf("/api/adm/stu/add", fd).then((resp) => {
    formStu.value = resp.data.data;
    actidx.value = 2;
    ElMessage.success("添加成功");
  }).catch(error => {
    ElMessage.error("添加失败");
  });
};

const update = () => {
  const fd = new FormData();
  fd.append("uid", formStu.uid);
  fd.append("uname", formStu.uname);
  fd.append("phone", formStu.phone);
  fd.append("pwd", formStu.pwd);
  fd.append("clz.clzno", formStu.clz.clzno);
  fd.append("pic", formStu.pic);
  const file = upload.value.uploadFiles[0]?.raw;
  if (file) {
    fd.append("mypic", file);
  }

  $postf("/api/adm/stu/update", fd).then((resp) => {
    formStu.value = resp.data.data;
    actidx.value = 2;
    ElMessage.success("修改成功");
  }).catch(error => {
    ElMessage.error("修改失败");
  });
};

const go2Back = () => {
  router.push('/adm/stu');
};

const handleChange = (file, fileList) => {
  if (fileList.length > 1) {
    fileList.shift();
  }
};

const submitUpload = () => {
  upload.value.submit();
};

const $postf = (url, data) => {
  return fetch(url, {
    method: 'POST',
    body: data
  }).then(response => response.json());
};

onMounted(() => {
  const id = router.currentRoute.value.query.uid;
  console.log(id);
  if (id === undefined || id === "0") { // 添加
    formStu.uid = 0;
    actidx.value = 1;
  } else { // 更新
    $get(`/api/adm/stu/findById/${id}`).then((resp) => {
      formStu.value = resp.data.data;
      actidx.value = 0;
    });
  }

  $get("/api/public/getClzs").then((resp) => {
    clzs.value = resp.data.data;
  });
});
</script>

<style scoped>
</style>
