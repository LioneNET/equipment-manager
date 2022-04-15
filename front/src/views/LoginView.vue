<template>
  <div class="login-place">
    <div class="card">
      <h5 class="card-header">Авторизация</h5>
      <div class="card-body">
        <div v-if="errorMessage" class="alert alert-danger d-flex justify-content-between" role="alert">
          {{errorMessage}}
          <button type="button" class="btn-close" v-on:click="()=>errorMessage=''"></button>
        </div>
        <div class="row">
          <label for="staticEmail" class="col-sm-2 form-label">Email</label>
          <div class="col-sm-10 valid-filed">
            <input type="text" class="form-control" 
              :class="!loginValid.isValid && 'is-invalid'" id="staticEmail" 
              v-model="inputLogin" />
            <div class="invalid-feedback" :class="!loginValid.isValid && 'd-block' ">
              Введите корректный мали
            </div>
          </div>
        </div>
        <div class="row">
          <label for="inputPassword" class="col-sm-2 form-label">Пароль</label>
          <div class="col-sm-10 valid-filed">
            <input type="password" class="form-control" 
              :class="!passwordValid.isValid && 'is-invalid'" id="inputPassword"
              v-model="inputPassword" />
            <div class="invalid-feedback" :class="!passwordValid.isValid && 'd-block' ">
              Введите корректный пароль
            </div>
          </div>
        </div>
        <div class="row-auto">
          <button :disabled="btnIsDisable || isLoading" type="button" class="btn btn-primary" v-on:click="handleLogin">
            <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Войти
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: '',
      isValidItems: [],
      btnIsDisable: false,
      loginValid: {
        name: 'login',
        isValid: true,
        value: "mail@mail.ru",
        rules: /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/,
      },
      passwordValid: {
        name: 'password',
        isValid: true,
        value: "password",
        rules: /([A-Za-z\d]{8,16})/,
      },
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.auth.isLoading
    },
    inputLogin: {
      set(value) {
        this.loginValid.value = value
        this.checkRules(this.loginValid)
      },
      get() {
        return this.loginValid.value
      }
    },
    inputPassword: {
      set(value) {
        this.passwordValid.value = value
        this.checkRules(this.passwordValid)
      },
      get() {
        return this.passwordValid.value
      }
    },
  },
  methods: {
    checkRules(field) {
      if(!field.value.match(field.rules)) {
        field.isValid = false
        this.isValidItems = [...this.isValidItems.filter(i => field.name !== i)]
      } else {
        field.isValid = true
        if(this.isValidItems.indexOf(field.name) === -1) {
          this.isValidItems.push(field.name)
        }
      }

      if(this.isValidItems.length > 1) {
        this.btnIsDisable = false
      } else {
        this.btnIsDisable = true
      }
    },
    async handleLogin() {
      try {
        await this.$store.dispatch("login", {
          email: this.inputLogin,
          password: this.inputPassword.trim()
        })
        this.$router.push('/')
      } catch (e) {
        this.errorMessage = e.data['error']
      }
    },
  }
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
