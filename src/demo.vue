<script setup lang="ts">
import DDeiEditorView from "ddei-editor";
import { DDeiCoreTopMenuSimplePanel, DDeiExtQuickStyle } from "ddei-editor";
import { getCurrentInstance,onMounted } from "vue";
import { DDeiFlowAPI } from "../plugins/index";
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
            //获取流程API
            let flowAPI = editor.flow
            //设置以code作为key字段,默认以id作为key字段
            flowAPI.setJsonKeyField("code")
            //获取流程图
            let graphs = flowAPI.getFlowGraphs();
            if (graphs?.length > 0) {
              let graph = graphs[0]
              //设置画布属性
              graph.setData({
                mark:{
                  type:1,
                  data:"1234",
                  direct:1
                }
              }, false)
              //获取节点
              let userTask1 = graph.getFlowNode("userTest1");
              //设置节点属性
              userTask1?.setData({
                name:"用户-设置",
                border:{
                  color:"red"
                },
                fill: {
                  color: "grey",
                },
                textStyle:{
                  bold:1
                },
                isLoop:1
              },false)
              //批量设置节点属性
              graph?.setNodesData({
                "st1": {
                  name: "st1",
                  border: {
                    color: "blue"
                  },
                  fill: {
                    color: "grey",
                  },
                },
                "st2": {
                  name: "st2",
                  border: {
                    color: "green"
                  },
                  isLoop: 1
                },
              }, false)
              //刷新画布
              flowAPI.refresh()
              //获取json字符串
              let flowObj = flowAPI.toFlowObject()
              console.log(flowObj)
              console.log(JSON.stringify(flowObj))
              //获取bpmnxml
              console.log(flowAPI.toBPMNXML())
            }
          }
        }
      ]
    }),
    // DDeiExtQuickStyle
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

onMounted(()=>{
  
})
</script>

<template>
    <DDeiEditorView ref="ddei_editor_1" :options="options" id="ddei_editor_1"></DDeiEditorView>
</template>