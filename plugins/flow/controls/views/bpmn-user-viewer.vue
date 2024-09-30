<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-user",
  props: {
    model: {
      type: Object,
      default: null
    },
    editor: {
      type: Object,
      default: null
    }
  },

  
};
</script>
<template>
  <div ref="divElement" class="ddei-flow-bpmn-viewer-user" title="用户">
    <svg class="icon-ddei-flow" aria-hidden="true">
      <use xlink:href="#icon-ddei-flow-user"></use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-user {
  position: absolute;
  pointer-events:none;
  user-select: none;
  display: none;
  .icon-ddei-flow {
    width: 100%;
    height: 100%;
  }
}
</style>