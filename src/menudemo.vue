<script lang="ts">
export default {
  name: "ddei-flow-topmenu-demo",
  props: {
    //外部传入的插件扩展参数
    options: {
      type: Object,
      default: null
    },
    editor: {
      type: Object,
      default: null
    },
    model: {
      type: Object,
      default: null
    }
  },
  methods: {
    test(){
      let flowAPI = this.editor.flow
      console.log(flowAPI.toBPMNXML(false,true))
    }
  }
};
</script>

<template>
    <div style="color:red" @click="test">
      自定义
    </div>
</template>