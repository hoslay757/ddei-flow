<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import { DDeiUtil } from 'ddei-editor'

export default {
  name: "ddei-flow-bpmn-viewer-sequence-flow-icon",
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

  data() {
    return {
      type: 0,
      lineColor:"black",
      lineWidth:1
    };
  },

  mounted(){
    //获取线段的属性
    this.refreshView()
    
  },

  methods:{
    refreshView(model,vNode,tempShape,composeRender){
      //获取线段的属性
      let lineModel = this.model.pModel;
      this.type = lineModel.bpmnSubType
      if (this.type) {

        let color = lineModel.render.getCachedValue("color")
        if (!color) {
          color = DDeiUtil.getStyleValue("canvas-control-border", this.editor.ddInstance);
        }
        this.lineWidth = lineModel.render.getCachedValue("width")
      }
    }
  }

  
};
</script>
<template>
  <div ref="divElement" class="ddei-flow-bpmn-viewer-sequence-flow-icon">
    <svg class="icon-svg" v-if="type == 3">
      <line x1="0" y1="0" x2="12" y2="12" :style="{'stroke':lineColor,'stroke-width':lineWidth}"/>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-sequence-flow-icon {
  position: absolute;
  pointer-events:none;
  user-select: none;
  display: none;
  .icon-svg {
    width: 100%;
    height: 100%;
    position:absolute;
    
  }
}
</style>