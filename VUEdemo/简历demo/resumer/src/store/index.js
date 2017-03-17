import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: 'profile',
    resume: {
      config: [{
          field: 'profile',
          icon: 'id'
        },
        {
          field: 'workHistory',
          icon: 'work'
        },
        {
          field: 'education',
          icon: 'book'
        },
        {
          field: 'projects',
          icon: 'heart'
        },
        {
          field: 'awards',
          icon: 'cup'
        },
        {
          field: 'contacts',
          icon: 'phone'
        }
      ],
      profile: {
        name: '',
        city: '',
        title: '',
        birthday:''
      },
      workHistory: [{
          company: 'AL',
          content: '我的第二份工作是'
        },
        {
          company: 'TX',
          content: '我的第一份工作是'
        }
      ],
      education: [{
          school: 'AL',
          content: '文字'
        },
        {
          school: 'AL',
          content: '文字'
        }
      ],
      projects: [{
          name: 'AL',
          content: '文字'
        },
        {
          name: 'AL',
          content: '文字'
        }
      ],
      awards: [{
          name: 'AL',
          content: '文字'
        },
        {
          name: 'AL',
          content: '文字'
        }
      ],
      contacts: [{
          contacts: 'AL',
          content: '18671777177'
        },
        {
          contacts: 'AL',
          content: '121121121'
        }
      ]
    }
  },
  mutations: {
    switchTab(state,payload){
      state.selected = payload
    }
  }
})
