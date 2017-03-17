<template>
  <div id="topBar">
    <div class="wrapper">
      <span class="logo">Resumer</span>
      <div class="actions">
        <div class="userActions" v-if="logined">
          <span class="welcome">你好， {{ user.username }}</span>
          <a href="#" class="button" @click.prevent="signOut">登出</a>
        </div>
        <div class="userActions" v-else>
          <a href="#" class="button primary" @click.prevent="signUpDialogVisible = true">注册</a>

          <a href="#" class="button" @click="signInDialogVisible = true">登陆</a>

        </div>
        <button class="button primary">保存</button>
        <button class="button">预览</button>
      </div>
    </div>
    <myDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
      <signUpForm @success="signin($event)"></signUpForm>
    </myDialog>
    <myDialog title="登陆" :visible="signInDialogVisible" @close="signInDialogVisible = false">
      <signInForm @success="signIn($event)"></signInForm>
    </myDialog>
  </div>
</template>

<script>
  import myDialog from './myDialog'
  import signUpForm from './signUpForm'
  import AV from '../lib/leancloud'
  import signInForm from './signInForm'

  export default {
    name:'topBar',
    data(){
      return {
        signUpDialogVisible: false,
        signInDialogVisible: false
      }
    },
    computed:{
      user(){
        return this.$store.state.user
      },
      logined(){
        return this.user.id
      }
    },
    components: {
      myDialog,
      signUpForm,
      signInForm
    },
    methods:{
      signIn(user){
        this.signInDialogVisible = false
        this.signUpDialogVisible = false
        this.$store.commit('setUser',user)
      },
      signOut(){
        AV.User.logOut()
        this.$store.commit('removeUser')
      }
    }
  }
</script>

<style scoped lang="scss">
  #topBar {
    background: #ffffff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    > .wrapper {
      min-width: 1024px;
      max-width: 1440px;
      margin: 0 auto;
      height: 64px;
    }
    > .wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
    }
     .logo {
      font-size: 24px;
      color: black;
    }
  }

  .button {
    width: 72px;
    height: 32px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    background: #ddd;
    color: #222;
    text-decoration: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    &:hover {
      box-shadow: 1px 1px 1px hsla(0,0,0,0.50);
    }
    &.primary {
      background: #02af5f;
      color: white;
    }
  }
  .actions {
    display: flex;
    .userActions {
      margin-right: 3em;
      .welcome {
        margin-right: .5em;
      }
    }
  }
</style>