<template>
  <div>
    <div class="page">
      <header>
        <topBar></topBar>
      </header>
      <main>
        <resumeEditor></resumeEditor>
        <resumePreview></resumePreview>
      </main>
    </div>
  </div>
</template>

<script>
import 'normalize.css/normalize.css'
import './assets/reset.css'

import topBar from './components/topBar'
import resumeEditor from './components/resumeEditor'
import resumePreview from './components/resumePreview'
import icons from './assets/icons'
import store from './store/index'
import AV from './lib/leancloud'
import getAVUser from './lib/getAVUser'

export default {
  name: 'app',
  store,
  components:{
    topBar,
    resumeEditor,
    resumePreview
  },
  created(){
    document.body.insertAdjacentHTML('afterbegin',icons)
    let state = localStorage.getItem('state')
    if(state){
      state = JSON.parse(state)
    }
    this.$store.commit('initState',state)
    this.$store.commit('setUser',getAVUser())
  }
}
</script>

<style>

  svg.icon {
    height: 1em;
    width: 1em;
    fill: currentColor;
    vertical-align: -0.1em;
    font-size: 16px;
  }
  .page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #eaebec;
  }

  .page > main {
    flex-grow: 1;
  }

  .page > main {
    min-width: 1024px;
    max-width: 1440px;
    margin-top: 16px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-around;
    align-self: center;
    width:100%;
  }

  #resumeEditor {
    min-width: 35%;
    background: #444;
  }

  #resumePreview {
    width: 61.66667%;
    background:#777;
  }
</style>
