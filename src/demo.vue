<script setup lang="ts">
import DDeiEditorView from "ddei-editor";
import { DDeiCoreStandLayout } from "ddei-editor";
import { ref, getCurrentInstance } from "vue";
import { DDeiEditor, DDeiFile } from "ddei-editor";
import DDeiFlow from "@ddei-flow";
//获取主对象实例，代替this获取$refs
const { proxy } = getCurrentInstance()

const options = {
  //配置扩展插件
  extensions: [

    DDeiFlow
  ],
}

</script>

<template>
  <DDeiEditorView ref="ddei_editor_1" :options="options" id="ddei_editor_1"></DDeiEditorView>
</template>