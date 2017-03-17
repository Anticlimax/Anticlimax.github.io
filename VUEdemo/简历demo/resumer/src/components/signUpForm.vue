<template>
  <div>
    <form @submit.prevent="signUp">
      <div class="row">
        <label>用户名</label>
        <input type="text" v-model="formData.username" required>
      </div>
      <div class="row">
        <label>密码</label>
        <input type="password" v-model="formData.password" required>
      </div>
      <div class="actions">
        <input type="submit" value="提交">
        <span class="errorMessage">{{ errorMessage }}</span>
      </div>
    </form>
  </div>
</template>

<script>
  import AV from '../lib/leancloud'
  import getErrorMessage from '../lib/getErrorMessage'
  import getAVUSer from '../lib/getAVUser'

  export default {
    name:'signUpForm',
    data(){
      return {
        formData:{
          username:'',
          password:''
        },
        errorMessage:''
      }
    },
    computed(){

    },
    methods:{
      signUp(){
        let {username,password} = this.formData
        var user = new AV.User()
        user.setUsername(username)
        user.setPassword(password)
        user.signUp().then(() => {
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