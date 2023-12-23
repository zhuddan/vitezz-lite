<script setup lang="ts">
import { getCodeImg } from '@/api/login';
import { useUserStore } from '@/store/modules/user';

const router = useRouter();
const username = ref('admin');
const password = ref('admin123');
const code = ref('');
const uuid = ref('');
const codeUrl = ref('');

const userStore = useUserStore();
const loading = ref(false);
function handleLogin() {
  if (!username.value) {
    alert('用户名不能为空');
    return;
  }
  if (!password.value) {
    alert('密码不能为空');
    return;
  }

  if (!(`${code.value}`)) {
    alert('验证码不能为空');
    return;
  }
  loading.value = true;
  userStore
    .login(username.value, password.value, code.value, uuid.value)
    .then(() => {
      router.push('/');
    })
    .catch(() => {
      code.value = '';
      getCode();
    })
    .finally(() => {
      loading.value = false;
    });
}
function getCode() {
  getCodeImg().then((res) => {
    codeUrl.value = `data:image/gif;base64,${res.img}`;
    uuid.value = res.uuid;
  });
}

getCode();
</script>

<template>
  <div style="overflow: hidden">
    <div class="login">
      <input id="username" v-model="username" type="text" placeholder="用户名">
      <input id="password" v-model="password" type="text" placeholder="密码">
      <div class="code-input-container clearfix">
        <input id="code" v-model="code" type="number" placeholder="验证码" @keydown.enter="handleLogin">
        <img :src="codeUrl" object-fit="fill" @click="getCode">
      </div>
      <button :disabled="loading" class="login-button btn-primary" @click="handleLogin">
        {{
          !loading ? 'login' : 'logging...'
        }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .login {
    margin: 200px auto 0;
    width: 300px;
  }

  input{
    height: 40px;
    width: 100%;
    margin-bottom: 10px;
  }

  .code-input-container {
    display: flex;

    input {
      width: 131px;
      margin-right: 8px;
      margin-bottom: 0;
      flex: 1;
    }

    img {
      height: 40px;
      display: block;
      width: 106px;
    }
  }

  .login-button {
    width: 100%;
    font-size: 16px;
    margin-top: 20px;
    height: 40px;
    box-sizing: border-box;
  }
</style>
