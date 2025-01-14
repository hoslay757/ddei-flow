<script setup lang="ts">
import DDeiEditorView from "ddei-editor";
import { DDeiCoreTopMenuSimplePanel, DDeiExtQuickStyle } from "ddei-editor";
import { getCurrentInstance, markRaw } from "vue";
import DDeiFlow from "@ddei-flow";
import DDeiQuickFlow from "@ddei-quickflow";
import { DDeiQuickFlowOperatePanel } from "@ddei-quickflow";
import operateViewDemo from "./operate-view-demo.vue";
import custUserTaskDemo from "./user-task-demo.vue"
//获取主对象实例，代替this获取$refs
const { proxy } = getCurrentInstance()
const options = markRaw({
  config:{
    controlDefines: [
      {
        'id': '1000011',
        define: {
          border: {
            color: "red"
          }
        },
        viewer: custUserTaskDemo
      }
    ],
  },
  //配置扩展插件
  extensions: [

    DDeiFlow,
    DDeiQuickFlow,
    DDeiQuickFlowOperatePanel.configuration({
      viewer: operateViewDemo
    })
  ],
  nodeGroupConfig: {
    "taskGroup": [
      {
        name: "ddei.flow.task",
        icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
          <use xlink:href="#icon-ddei-flow-user-task"></use>
        </svg>`,
        type: "task"
      },
      {
        name: "ddei.flow.script",
        icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
          <use xlink:href="#icon-ddei-flow-script-task"></use>
        </svg>`,
        type: "script"
      },
      {
        name: "ddei.flow.service",
        icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
          <use xlink:href="#icon-ddei-flow-service-task"></use>
        </svg>`,
        type: "service"
      },
      {
        name: "ddei.flow.manual",
        icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
          <use xlink:href="#icon-ddei-flow-manual-task"></use>
        </svg>`,
        type: "manual"
      },
      {
        name: "ddei.flow.branch",
        icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
          <use xlink:href="#icon-ddei-flow-gateway-xor"></use>
        </svg>`,
        type: "branch"
      }
    ]
  },
  nodeConfig : {
    start: {
      model: "1000001",
      width: 50,
      height: 50,
      textField: "name"
    },
    task: {
      model: "1000011",
      width: 160,
      height: 80,
      textField: "name"
    },
    script: {
      model: "1000021",
      width: 160,
      height: 80,
      textField: "name"
    },
    manual: {
      model: "1000051",
      width: 160,
      height: 80,
      textField: "name"
    },
    service: {
      model: "1000031",
      width: 160,
      height: 80,
      textField: "name"
    },
    branch: {
      model: "1000202",
      width: 60,
      height: 60,
      textField: "name"
    },
    condition: {
      model: "100001",
      width: 100,
      height: 40,
      textField: "name"
    },
    converge: {
      model: "1000204",
      width: 60,
      height: 60,
      textField: "name"
    },
    end: {
      model: "1000003",
      width: 50,
      height: 50,
      textField: "name"
    }
  }
})


</script>

<template>
  <DDeiEditorView ref="ddei_editor_1" :options="options" id="ddei_editor_1"></DDeiEditorView>
</template>