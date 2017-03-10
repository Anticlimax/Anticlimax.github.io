import Vue from 'vue/dist/vue.js'


var app = new Vue({
  el:'#app',
  data:{
    newTodo:'',
    todoList:[],
    active:false
  },
  created:function() {
    window.onbeforeunload = ()=>{
      let dataString = JSON.stringify(this.todoList)
      let unSubmit = this.newTodo
      window.localStorage.setItem('myTodos',dataString)
      window.localStorage.setItem('unSub',unSubmit)
    }

    let oldDataString = window.localStorage.getItem('myTodos')
    let oldData = JSON.parse(oldDataString)
    this.todoList = oldData || []

    let oldSubmit = window.localStorage.getItem('unSub')
    this.newTodo = oldSubmit || ''
  },
  methods:{
    addTodo:function(){
      let time = new Date();
      let timeStr = time.getFullYear() + '/' +
                    time.getMonth() + '/' +
                    time.getDate() + ' ' +
                    time.toTimeString().slice(0,8)


      this.todoList.push({
        title:this.newTodo,
        createAt:timeStr , 
        done:false
      })
      this.newTodo = ''
    },
    removeTodo:function(todo) {
      let index = this.todoList.indexOf(todo)
      this.todoList.splice(index,1)
    }
  }
})