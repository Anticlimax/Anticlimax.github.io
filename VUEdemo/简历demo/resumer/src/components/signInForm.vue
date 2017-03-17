<template>
  <div>
    <form @submit.prevent="signIn">
      <div class="row">
        <label>用户名</label>
        <input type="text" required v-model="formData.username">
      </div>
      <div class="row">
        <label>密码</label>
        <input type="password" required v-model="formData.password">
      </div>
      <div class="actions">
        <input type="submit" value="提交">
        <span> {{ errorMessage }}</span>
      </div>
    </form>
  </div>
</template>

<script>
  
  import AV from '../lib/leancloud'
  import getErrorMessage from '../lib/getErrorMessage'
  import getAVUser from '../lib/getAVUser'

  export default {
    name: 'signInForm',
    data(){
      return {
        formData: {
          username: '',
          password: ''
        },
        errorMessage:''
      }
    },
    methods: {
      signIn(){
        let{ username, password } = this.formData
        AV.User.logIn(username,password).then(() => {
          this.$emit('success',getAVUser())
        }, (error) => {
          this.errorMessage = getErrorMessage(error)
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .row {
    display: flex;
    justify-content:center;
    margin: 0.5em;
    >label {
      flex-basis: 4rem;
    }
  }
  .actions {
    display: flex;
    justify-content: center;
    > input {
      padding: 5px 10px;
      border:none;
      background: #02af5f;
      color: white;
      cursor: pointer;
    }
    > input:hover {
      box-shadow: 1px 1px 1px hsla(0,0,0,0.50);
    }
  }
</style>