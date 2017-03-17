<template>
  <div id="resumeEditor">
    <nav>
      <ul>
        <li v-for="item in resume.config"
            :class="{active: item.field === selected}"
            @click="selected = item.field">
            <svg class="icon">
              <use :xlink:href="`#icon-${item.icon}`"></use>
            </svg>
        </li>
      </ul>
    </nav>
    <ul class="panels">
      <li v-for="item in resume.config"
          v-show="item.field === selected">
        <div v-if="resume[item.field] instanceof Array">
          <div class="subitem" v-for="(subitem, i) in resume[item.field]">
            <div class="resumeField" v-for="(value,key) in subitem">
              <label> {{ key }}</label>
              <input type="text" :value="value" @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)">
            </div>
            <hr>
          </div>
        </div>
        <div class="resumeField" 
             v-for="(value,key) in resume[item.field]"
             v-else>
          <label>{{ key }}</label>
          <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`, $event.target.value)">
        </div>   
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'resumeEditor',
    data(){
      return {
        
      }
    },
    computed:{
      selected:{
        get(){
          return this.$store.state.selected
        },
        set(value){
          return this.$store.commit('switchTab',value)
        }
      },
      resume(){
        return this.$store.state.resume
      }
    },
    methods:{
        changeResumeField(path,value){
          this.$store.commit('updateResume',{
            path,
            value
          })
        }
    }
  }
</script>

<style scope lang="scss">
  #resumeEditor {
    background: #ffffff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    display: flex;
    overflow: auto;
    > nav {
      width: 80px;
      background: black;
      color: white;
      li {
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 16px;
        margin-bottom: 16px;
        &.active {
          background: white;
          color: black;
        }
      }
    }
    > .panels {
      flex:auto;
      > li {
        padding: 24px;
      }
    }
  }
  ul {
    list-style: none;
  }
  svg.icon {
    width: 24px;
    height:24px;
  }
  .resumeField {
    > label {
      display: block;
    }
    input[type=text] {
      margin: 16px 0;
      border: 1px solid #ddd;
      box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.25);
      width: 100%;
      height: 40px;
      padding: 0 8px;
    }
  }
  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 24px 0;
  }
</style>