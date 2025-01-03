<script setup lang="ts">
import DDeiEditorView from "ddei-editor";
import { DDeiCoreTopMenuSimplePanel, DDeiExtQuickStyle } from "ddei-editor";
import { getCurrentInstance, markRaw } from "vue";
import DDeiFlow from "@ddei-flow";
import DDeiQuickFlow from "@ddei-quickflow";
import { DDeiQuickFlowOperatePanel } from "@ddei-quickflow";
import operateViewDemo from "./operate-view-demo.vue";
//获取主对象实例，代替this获取$refs
const { proxy } = getCurrentInstance()
const options = markRaw({
  //配置扩展插件
  extensions: [

    DDeiFlow,
    DDeiQuickFlow,
    DDeiQuickFlowOperatePanel.configuration({
      viewer: operateViewDemo
    })
  ]
})


</script>

<template>
  <DDeiEditorView ref="ddei_editor_1" :options="options" id="ddei_editor_1"></DDeiEditorView>
</template>