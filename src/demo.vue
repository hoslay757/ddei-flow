<script setup lang="ts">
import DDeiEditorView from "ddei-editor";
import { DDeiCoreTopMenuSimplePanel } from "ddei-editor";
import { getCurrentInstance } from "vue";
import { DDeiFlowSettingButtonDialog } from "../plugins/index";
import DDeiFlow from "@ddei-flow";
import buttondemo from "./buttondemo.vue"
//获取主对象实例，代替this获取$refs
const { proxy } = getCurrentInstance()

const options = {
  i18n: {
    lang: 'en_US'
  },
  //配置扩展插件
  extensions: [

    DDeiFlow,
    DDeiCoreTopMenuSimplePanel.configuration({
      direct: 2,//方向，1纵向，2横向
      position: 2,//位置1-9顺时针，1为左上角，9为中心
      drag: 1,//是否允许拖拽位置
      items: [//自定义菜单
        {
          id: "ddei-core-save",
          name: "Save"
          
        },
        {
          id: "ddei-core-open",
          name: "ddei.open"
        },
        {
          id: "ddei-core-download",
          name: "ddei.download"
        },
        
        {
          id: "ddei-core-new",
          name: "ddei.new"
        },
        {
          name: "测试",
          action: function (editor) {
            if (!editor.flow.bpmnAfterProcessorFN){
              editor.flow.bpmnAfterProcessorFN = function(node,tabLevel,result){
                if(node?.bpmnType == 'StartEvent'){
                  
                }
                return result
              }
            }
            console.log(editor.flow.toBPMNXML(false,true))
          }
        }
      ]
    }),
    // DDeiFlowSettingButtonDialog.configuration({
    //   buttons:[
    //     {
    //       id: 'ddei-flow-change-bpmnsubtype'
    //     },
    //     {
    //       id: 'ddei-flow-choose-activity'
    //     },
    //     {
    //       id: 'ddei-flow-expand-or-not'
    //     },
    //     {
    //       id: 'ddei-flow-lock-or-unlock'
    //     },
    //     {
    //       viewer: buttondemo
    //     },
    //     {
    //       id: 'ddei-flow-remove-control'
    //     }
    //   ],
    // }),
  ],
}
</script>

<template>
    <DDeiEditorView ref="ddei_editor_1" :options="options" id="ddei_editor_1"></DDeiEditorView>
</template>