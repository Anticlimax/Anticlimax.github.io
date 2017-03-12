import Vue from 'vue'
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

    this.fetchTodos()

  },
  methods: {
    fetchTodos: function () {
      this.currentUser = this.getCurrentUser()
      if (this.currentUser) {
        var query = new AV.Query('AllTodos')
        query.find()
          .then( (todos) => {
            let avAllTodos = todos[0]
            let id = avAllTodos.id
            this.todoList = JSON.parse(avAllTodos.attributes.content)
            this.todoList.id = id
          }, function (error) {
            console.log(errpr)
          })
      }
    },
    updateTodos: function () {
      let dataString = JSON.stringify(this.todoList)
      let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id)
      avTodos.set('content', dataString)
      avTodos.save().then(() => {
        console.log('更新成功')
      })
    },
    saveTodos: function () {
      let dataString = JSON.stringify(this.todoList)

      var AVTodos = AV.Object.extend('AllTodos')
      var avTodos = new AVTodos()
      var acl = new AV.ACL()
      acl.setReadAccess(AV.User.current(), true)
      acl.setWriteAccess(AV.User.current(), true)
      avTodos.set('content', dataString)
      avTodos.setACL(acl)
      avTodos.save().then((todo) => {
        this.todoList.id = todo.id
        console.log("保存成功")
      }, function (error) {
        console.error('保存失败')
      })
    },
    saveOrUpdateTodos: function () {
      if (this.todoList.id) {
        this.updateTodos()
      } else {
        this.saveTodos()
      }
    },
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
      this.saveOrUpdateTodos()
    },
    removeTodo: function (todo) {
      let index = this.todoList.indexOf(todo)
      this.todoList.splice(index, 1)
      this.saveOrUpdateTodos()
    },
    signUp: function () {
      let user = new AV.User()
      user.setUsername(this.formData.username)
      user.setPassword(this.formData.password)
      user.signUp().then((loginedUser) => {
        this.currentUser = this.getCurrentUser()
      }, function (error) {
        alert("用户名重复，请重新输入")
      })
    },
    login: function () {
      AV.User.logIn(this.formData.username, this.formData.password)
        .then((loginedUser) => {
          this.currentUser = this.getCurrentUser()
          this.fetchTodos()
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