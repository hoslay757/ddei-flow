<script setup lang="ts">
import DDeiEditorView from "ddei-editor";
import { DDeiCoreTopMenuSimplePanel, DDeiExtQuickStyle } from "ddei-editor";
import { getCurrentInstance,onMounted } from "vue";
import { DDeiFlowAPI } from "../plugins/index";
import DDeiFlow from "@ddei-flow";
import buttondemo from "./buttondemo.vue"
//获取主对象实例，代替this获取$refs
const { proxy } = getCurrentInstance()

const designDemoData = `
  {"id":"aab10fc554396e57be87476a08a9b7f4","name":"NewFile_NEW","desc":"","extData":{},"state":2,"publish":"0","lastUpdateTime":1731377998939,"path":"/NewFile_NEW","sheets":[{"name":"Page-1","desc":"Page-1","stage":{"id":"stage_1","layers":[{"id":"layer_default","name":"L-1","models":{"start_6":{"id":"start_6","modelCode":"1000001","modelType":"DDeiPolygon","cpv":{"x":23.087500000000013,"y":100.89895833333333,"z":1},"hpv":[{"x":23.087500000000013,"y":100.89895833333333,"z":1},{"x":49.54583333333335,"y":100.89895833333333,"z":1}],"exPvs":{"_29d741ad02e56403beb625c4ac49e0b6":{"x":28.37911591934002,"y":100.89895833333333,"z":1,"id":"_29d741ad02e56403beb625c4ac49e0b6","rate":0.5,"sita":0}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Event","bpmnType":"StartEvent","bpmnSubType":1,"bpv":{"x":33.67083333333334,"y":111.48229166666667,"z":1}},"user_task_8":{"id":"user_task_8","modelCode":"1000011","modelType":"DDeiPolygon","cpv":{"x":54.57291666666667,"y":100.89895833333333,"z":1},"hpv":[{"x":54.57291666666667,"y":100.89895833333333,"z":1},{"x":81.03125,"y":100.89895833333333,"z":1}],"exPvs":{"_3404d5664e8a62ff87bef9a619726a7c":{"x":40.02083333333334,"y":100.89895833333333,"z":1,"id":"_3404d5664e8a62ff87bef9a619726a7c","index":1,"rate":0.5,"sita":180},"_bae5c309d7596150b3a10a47a995b983":{"x":69.125,"y":100.89895833333333,"z":1,"id":"_bae5c309d7596150b3a10a47a995b983","index":3,"rate":0.5,"sita":0}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Activity","bpmnType":"UserTask","border":{"round":5,"color":"blue"},"fill":{"color":"grey"},"bpv":{"x":83.67708333333334,"y":119.41979166666667,"z":1},"code":"st1","name":"st1","attachModels":["boundaryevent_16","start_22"]},"line_11":{"id":"line_11","modelCode":"1000601","modelType":"DDeiLine","hpv":[{"x":28.37911591934002,"y":100.89895833333333,"z":1},{"x":54.83744925267335,"y":100.89895833333333,"z":1}],"pvs":[{"x":28.37911591934002,"y":100.89895833333333,"z":1,"isVector3":true},{"x":40.02083333333334,"y":100.89895833333333,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":675.1195220085884,"y":778.2007874015749,"rate":0.15,"sita":0,"len":6.600028770137947}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_11_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"cpv":{"x":30.125373531439003,"y":100.89895833333333,"z":1},"hpv":[{"x":30.125373531439003,"y":100.89895833333333,"z":1},{"x":56.58370686477234,"y":100.89895833333333,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":33.30037353143901,"y":104.07395833333332,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"model":"1000601","smodel":{"id":"start_6","x":668.5194932384505,"y":778.2007874015749,"rate":0.5,"sita":0},"emodel":{"id":"user_task_8","x":748.5196850393702,"y":778.2007874015749,"rate":0.5,"sita":180}},"script_task_12":{"id":"script_task_12","modelCode":"1000021","modelType":"DDeiPolygon","zIndex":1,"cpv":{"x":168.07916666666668,"y":100.89895833333333,"z":1},"hpv":[{"x":168.07916666666668,"y":100.89895833333333,"z":1},{"x":194.53749999999982,"y":100.89895833333333,"z":1}],"exPvs":{"_750a0411e5f268bd8719ee7170b2aa17":{"x":153.52708333333334,"y":100.89895833333333,"z":1,"id":"_750a0411e5f268bd8719ee7170b2aa17","index":1,"rate":0.5,"sita":180}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Activity","bpmnType":"ScriptTask","border":{"round":5,"color":"red"},"fill":{"color":"grey"},"textStyle":{"bold":1},"bpv":{"x":197.18333333333334,"y":119.41979166666667,"z":1},"model":"1000021","code":"userTest1","name":"用户-设置","isLoop":1,"includePModelId":"subprocess_14"},"line_13":{"id":"line_13","modelCode":"1000601","modelType":"DDeiLine","zIndex":1,"hpv":[{"x":78.65,"y":100.89895833333333,"z":1},{"x":105.10833333333335,"y":100.89895833333333,"z":1}],"pvs":[{"x":69.125,"y":100.89895833333333,"z":1,"isVector3":true},{"x":153.52708333333334,"y":100.89895833333333,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":870.3696850393702,"y":778.2007874015749,"rate":0.15,"sita":0,"len":47.85}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_13_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"cpv":{"x":81.7853125,"y":100.89895833333333,"z":1},"hpv":[{"x":81.7853125,"y":100.89895833333333,"z":1},{"x":108.24364583333335,"y":100.89895833333333,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":84.96031250000001,"y":104.07395833333332,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"model":"1000601","smodel":{"id":"user_task_8","x":858.5196850393702,"y":778.2007874015749,"rate":0.5,"sita":0},"emodel":{"id":"script_task_12","x":918.5196850393702,"y":778.2007874015749,"rate":0.5,"sita":180}},"subprocess_14":{"id":"subprocess_14","modelCode":"1000091","modelType":"DDeiPolygon","cpv":{"x":153.52708333333334,"y":100.89895833333333,"z":1},"hpv":[{"x":153.52708333333334,"y":100.89895833333333,"z":1},{"x":179.98541666666668,"y":100.89895833333333,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Activity","bpmnSubType":1,"bpmnType":"SubProcess","allowIncludeModel":1,"otherWidth":110,"otherHeight":70,"isExpand":1,"border":{"round":5},"bpv":{"x":232.90208333333334,"y":153.81562499999995,"z":1},"includeModels":["script_task_12"],"code":"sub1"},"boundaryevent_16":{"id":"boundaryevent_16","modelCode":"1000004","modelType":"DDeiPolygon","zIndex":1,"cpv":{"x":59.60000000000001,"y":110.159375,"z":1},"hpv":[{"x":59.60000000000001,"y":110.159375,"z":1},{"x":86.05833333333334,"y":110.159375,"z":1}],"exPvs":{"_8aa01bef9ab6650bbeb3b44a3dfbee17":{"x":59.60000000000001,"y":115.45104166666667,"z":1,"id":"_8aa01bef9ab6650bbeb3b44a3dfbee17","sita":90}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Event","bpmnSubType":4,"bpmnType":"BoundaryEvent","bpv":{"x":70.18333333333334,"y":120.74270833333333,"z":1},"attachPModel":"user_task_8"},"script_task_18":{"id":"script_task_18","modelCode":"1000021","modelType":"DDeiPolygon","zIndex":1,"cpv":{"x":69.125,"y":142.96770833333335,"z":1},"hpv":[{"x":69.125,"y":142.96770833333335,"z":1},{"x":95.58333333333334,"y":142.96770833333335,"z":1}],"exPvs":{"_6d7832bd73fb66a0b62f7b6ea37d811a":{"x":69.125,"y":133.70729166666666,"z":1,"id":"_6d7832bd73fb66a0b62f7b6ea37d811a","index":2,"rate":0.5,"sita":-90}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Activity","bpmnType":"ScriptTask","border":{"round":5},"bpv":{"x":98.22916666666669,"y":161.48854166666666,"z":1},"code":"script1"},"line_21":{"id":"line_21","modelCode":"1000601","modelType":"DDeiLine","zIndex":1,"hpv":[{"x":69.125,"y":115.45104166666667,"z":1},{"x":95.58333333333334,"y":115.45104166666667,"z":1}],"pvs":[{"x":59.60000000000001,"y":115.45104166666667,"z":1,"isVector3":true},{"x":59.60000000000001,"y":124.57914129300332,"z":1},{"x":69.125,"y":124.57914129300332,"z":1},{"x":69.125,"y":133.70729166666666,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":786.5196660305866,"y":838.3757730164709,"rate":0.15,"sita":90,"ovi":{"x":null,"y":null,"z":1},"len":5.174985614931018}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_21_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"rotate":90.0002,"cpv":{"x":59.59999497059265,"y":116.82025661060791,"z":1},"hpv":[{"x":59.59999497059265,"y":116.82025661060791,"z":1},{"x":59.59989778370762,"y":143.27858994376274,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":56.424983308187876,"y":119.99524494816023,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0},"start_22":{"id":"start_22","modelCode":"1000001","modelType":"DDeiPolygon","zIndex":1,"cpv":{"x":52.19166666666667,"y":91.63854166666667,"z":1},"hpv":[{"x":52.19166666666667,"y":91.63854166666667,"z":1},{"x":78.65,"y":91.63854166666667,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Event","bpmnType":"StartEvent","bpmnSubType":10,"bpv":{"x":62.775000000000006,"y":102.22187500000001,"z":1},"attachPModel":"user_task_8"}},"midList":["start_6","user_task_8","line_11","subprocess_14","script_task_12","line_13","boundaryevent_16","script_task_18","line_21","start_22"],"modelType":"DDeiLayer","baseModelType":"DDeiLayer","index":-1,"background":null,"display":1,"lock":false,"print":true,"centerOpPoints":[],"modelCode":"DDeiLayer","modelChanged":true,"modelNumber":10}],"layerIndex":0,"idIdx":24,"modelType":"DDeiStage","ratio":1,"width":2245.0393700787404,"height":1587.4015748031497,"wpv":{"x":-366.5196850393702,"y":-579.2007874015749,"z":0},"links":[{"smpath":"exPvs._29d741ad02e56403beb625c4ac49e0b6","dmpath":"startPoint","smid":"start_6","dmid":"line_11"},{"smpath":"exPvs._3404d5664e8a62ff87bef9a619726a7c","dmpath":"endPoint","smid":"user_task_8","dmid":"line_11"},{"smpath":"exPvs._bae5c309d7596150b3a10a47a995b983","dmpath":"startPoint","smid":"user_task_8","dmid":"line_13"},{"smpath":"exPvs._750a0411e5f268bd8719ee7170b2aa17","dmpath":"endPoint","smid":"script_task_12","dmid":"line_13"},{"smpath":"exPvs._8aa01bef9ab6650bbeb3b44a3dfbee17","dmpath":"startPoint","smid":"boundaryevent_16","dmid":"line_21"},{"smpath":"exPvs._6d7832bd73fb66a0b62f7b6ea37d811a","dmpath":"endPoint","smid":"script_task_18","dmid":"line_21"}],"mark":{"type":1,"data":"1234","direct":1},"spv":{"x":561.2598425196851,"y":396.85039370078744,"z":1},"modelCode":"DDeiStage","unit":"mm"},"active":1,"modelType":"DDeiSheet","unicode":"d21f968942a56d21aa89928db4975d2e"}],"currentSheetIndex":0,"modelType":"DDeiFile","modelNumber":10,"unicode":"4885bfd8f85e6eb7ba060ee3160077a2","localFileHandler":{},"local":1,"ddeiVersion":1242}
`

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

  //获取编辑器 
  let editor = proxy.$refs["ddei_editor_1"].editor;
  // editor.setEditable(false)
  //获取流程API
  let flowAPI = editor.flow
  //设置以code作为key字段,默认以id作为key字段
  flowAPI.setJsonKeyField("code")
  let busiData = {
    st1: {
      border: {
        color: "green",
        width: 5
      },
      fill: {
        type: 0
      },
      name:"已加载"
    },
    userTest1: {
      border: {
        color: "green",
        width: 5
      },
      fill: {
        type: 0
      }
    }
  }
  //加载数据
  flowAPI.loadData(designDemoData, busiData)
})
</script>

<template>
    <DDeiEditorView ref="ddei_editor_1" :options="options" id="ddei_editor_1"></DDeiEditorView>
</template>