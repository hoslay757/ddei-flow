<script setup lang="ts">
import DDeiEditorView from "ddei-editor";
import { DDeiCoreTopMenuSimplePanel } from "ddei-editor";
import {  getCurrentInstance } from "vue";
import DDeiFlow from "@ddei-flow";
//获取主对象实例，代替this获取$refs
const { proxy } = getCurrentInstance()

const options = {
  //配置扩展插件
  extensions: [

    DDeiFlow,
    // DDeiCoreTopMenuSimplePanel.configuration({
    //   direct: 2,//方向，1纵向，2横向
    //   position: 3,//位置1-9顺时针，1为左上角，9为中心
    //   drag: 1,//是否允许拖拽位置
    //   items: [//自定义菜单
    //     {
    //       id: "ddei-core-save",
    //       name: "Save"
    //     },
    //     {
    //       id: "ddei-core-open",
    //       name: "打开"
    //     },
        
    //     {
    //       id: "ddei-core-new",
    //       name: "新建"
    //     },
    //     {
    //       name: "测试",
    //       action: function (editor) {
    //         console.log("测试:" + editor.id)
    //       }
    //     }
    //   ]
    // }),
  ],
}
</script>

<template>
  <div style="padding-top:500px;">
    <DDeiEditorView ref="ddei_editor_1" :options="options" id="ddei_editor_1"></DDeiEditorView>
  </div>
</template>