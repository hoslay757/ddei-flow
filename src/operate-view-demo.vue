<script lang="ts">
import { getCurrentInstance, render, createVNode } from "vue"
import { DDeiQuickFlowAddNodePanel } from "@ddei-quickflow";
export default {
  name: "ddei-quickflow-operate-view",
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

  methods:{
    getPluginInsByClass(editor, cls) {
      for (let i = 0; i < editor.plugins.length; i++) {
        if (editor.plugins[i] == cls || editor.plugins[i] instanceof cls) {

          return editor.plugins[i]
        }
      }
    },
    mouseEnter(el){
      let editor = this.editor;
      if (editor.tempQuickFlowAddNode) {
        let vNode = editor.tempQuickFlowAddNode;
        vNode.component.isUnmounted = true
        vNode.component.update()
        vNode.el.parentElement.remove()
        delete editor.tempQuickFlowAddNode
      }
      if (!editor.tempQuickFlowAddNode) {
        let opts = { editor: editor, model: this.model }
        let addNodePlugin = this.getPluginInsByClass(editor, DDeiQuickFlowAddNodePanel)

        let addNodeView = addNodePlugin.options.viewer

        let btnVNode = createVNode(addNodeView, opts);
        let appContext = editor.appContext;
        //挂载
        btnVNode.appContext = appContext;
        editor.tempQuickFlowAddNode = btnVNode

        let parentNode = document.getElementById(this.editor.containerid)
        
        let div = document.createElement("div")
        div.setAttribute("mid", editor.id + "_quickflow_addnode")
        parentNode.appendChild(div)
        //渲染并挂载组件
        render(btnVNode, div);
      }
      if (editor.tempQuickFlowAddNode) {
        let dialogEL = editor.tempQuickFlowAddNode.el;
        dialogEL.style.display = "block"
        let ele = this.$refs['operateGroupDiv'];
        dialogEL.style.left = (ele.offsetLeft+el.offsetWidth+20) + "px"
        dialogEL.style.top = (ele.offsetTop + ele.offsetHeight / 2 - dialogEL.offsetHeight/2) + "px"
      }
    }
  }
};
</script>
<template>
  <div ref="operateGroupDiv" class="ddei-quickflow-operate-group">
    <svg class="icon extbtn" aria-hidden="true" @mouseenter="mouseEnter($el)">
      <use xlink:href="#icon-add-layer"></use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-quickflow-operate-group {
  font-size: 14px;
  user-select: none;
  pointer-events: none;
  display: block;
  position: fixed;
  z-index: 99999;
  .icon{
      fill: red;
  }
  svg{
    pointer-events: initial;
  }
}
</style>