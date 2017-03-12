import Vue from 'vue/dist/vue.js'
import AV from 'leancloud-storage'

var APP_ID = 'jar0NBSjKFbExYq9gIGCBQSH-gzGzoHsz'
var APP_KEY = 'qPnShdfLCeP2VQMTMKrFw6hg'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})


var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: [],
    actionType: 'signUp',
    formData: {
      username: '',
      password: ''
    },
    currentUser: null
  },
  created: function () {
    window.onbeforeunload = () => {
      let dataString = JSON.stringify(this.todoList)
      let unSubmit = this.newTodo
      window.localStorage.setItem('myTodos', dataString)
      window.localStorage.setItem('unSub', unSubmit)
    }

    let oldDataString = window.localStorage.getItem('myTodos')
    let oldData = JSON.parse(oldDataString)
    this.todoList = oldData || []

    let oldSubmit = window.localStorage.getItem('unSub')
    this.newTodo = oldSubmit || ''

    this.currentUser = this.getCurrentUser()
  },
  methods: {
    addTodo: function () {
      let time = new Date();
      let timeStr = time.getFullYear() + '/' +
        time.getMonth() + '/' +
        time.getDate() + ' ' +
        time.toTimeString().slice(0, 8)


      this.todoList.push({
        title: this.newTodo,
        createAt: timeStr,
        done: false
      })
      this.newTodo = ''
    },
    removeTodo: function (todo) {
      let index = this.todoList.indexOf(todo)
      this.todoList.splice(index, 1)
    },
    signUp: function () {
      let user = new AV.User()
      user.setUsername(this.formData.username)
      user.setPassword(this.formData.password)
      user.signUp().then((loginedUser) => {
        this.currentUser = this.getCurrentUser()
      }, function (error) {
        alert("注册失败")
      })
    },
    login: function () {
      AV.User.logIn(this.formData.username, this.formData.password)
        .then((loginedUser) => {
          this.currentUser = this.getCurrentUser()
        }, function (error) {
          alert("登陆失败")
        })
    },
    logout: function () {
      AV.User.logOut()
      this.currentUser = null
      window.location.reload()
    },
    getCurrentUser: function () {
      let cUser = AV.User.current()
      if (cUser) {
        return {
          id: cUser.id,
          username: cUser.attributes.username,
          createAt: cUser.createdAt
        }
      } else {
        return null
      }

    }
  }
})