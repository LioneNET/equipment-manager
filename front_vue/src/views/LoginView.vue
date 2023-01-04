<template>
  <div class="login-place">
    <div class="card">
      <h5 class="card-header">Авторизация</h5>
      <div class="card-body">
        <Alert />
        <div class="row">
          <label for="staticEmail" class="col-sm-2 form-label">Email</label>
          <div class="col-sm-10 valid-filed">
            <input type="text" class="form-control" 
              :class="v$.inputLogin.$error && 'is-invalid'" id="staticEmail"
              v-model="v$.inputLogin.$model" />
            <div v-if="v$.inputLogin.$error" class="invalid-feedback d-block">
              <p v-for="error in v$.inputLogin.$errors" :key="error.$uid">{{error.$message}}</p>
            </div>
          </div>
        </div>
        <div class="row">
          <label for="inputPassword" class="col-sm-2 form-label">Пароль</label>
          <div class="col-sm-10 valid-filed">
            <input type="password" class="form-control" 
              :class="v$.inputPassword.$error && 'is-invalid'" id="inputPassword"
              v-model="inputPassword" />
            <div v-if="v$.inputPassword.$error" class="invalid-feedback d-block">
              <p v-for="error in v$.inputPassword.$errors" :key="error.$uid">{{error.$message}}</p>
            </div>
          </div>
        </div>
        <div class="row-auto">
          <button :disabled="isLoading" type="button" class="btn btn-primary" v-on:click="handleLogin">
            <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Войти
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {AUTH_MODULE} from '@/stores/const'
import {mapActions} from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import Alert from "../components/Alert.vue";

export default {
  name: 'LoginView',
  components: {Alert},
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      isLoading: false,
      inputLogin: null,
      inputPassword: null,
    };
  },
  computed: {
  },
  methods: {
    ...mapActions({
      fetchLogin: AUTH_MODULE.FETCH_AUTH,
    }),
    async handleLogin() {
      this.v$.$touch()
      if(!this.v$.$invalid) {
        this.isLoading = true
        const res = await this.fetchLogin({
          email: this.inputLogin,
          password: this.inputPassword.trim()
        })
        if(res === true) {
          location.href = '/'
        }
        this.isLoading = false
      }
    },
  },
  validations() {
    const requiredMessage = 'Поле обязательно для заполнения'
    return {
      inputLogin: {
        required: helpers.withMessage(requiredMessage, required)
      },
      inputPassword: {
        required: helpers.withMessage(requiredMessage, required)
      },
    }
  },

};
</script>

<style>

.login-place {
  max-width: 530px;
  margin: 0 auto;
  margin-top: 10vh;
}

.login-place .valid-filed {
  min-height: 70px;
}

</style>
