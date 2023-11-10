<template>
  <div class="login-form-backgroud">
    <a-form
      class="login-form"
      :model="formState"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <h1 class="login-title">Login to xxxx</h1>
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 6, span: 16 }">
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
        <a-button type="primary" html-type="submit" class="login-form-submit-btn">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import authService from '@/utils/auth'
import { storeUserInfo } from '@/utils/token'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
interface FormState {
  username: string
  password: string
  remember: boolean
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true
})
const router = useRouter()

const onFinish = (values: any) => {
  console.log('Success:', values)
  authService
    .getUserInfo(values)
    .then((res) => {
      storeUserInfo(res)
      router.push({ name: 'dashboard' })
    })
    .catch((err) => message.error(err.message))
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<style scoped>
.login-form-backgroud {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-attachment: local;
  background-repeat: no-repeat;
  background-image: url(@/assets/login.jpg);
  overflow: auto;
  position: relative;
}
.login-form {
  position: absolute;
  top: 30%;
  right: 20%;
  color: azure;
  width: 30vw;
  height: 40vh;
  margin: auto;
  /* padding-top: 230px; */
}

.login-title {
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
  margin: 0 auto;
}

.login-form-submit-btn:hover {
  animation: pulse 0.5s ease-in;
  animation-iteration-count: infinite;
}
</style>
