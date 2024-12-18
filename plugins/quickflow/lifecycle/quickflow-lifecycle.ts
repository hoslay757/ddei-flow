import { DDeiAbstractShape,DDeiLifeCycle, DDeiFuncData, DDeiEditorUtil, DDeiUtil, DDeiFuncCallResult, DDeiEditorEnumBusCommandType, DDeiEnumBusCommandType } from "ddei-editor";
import { clone} from "ddei-editor";
import { getIncludeModels, showSettingButton, changeSettingButtonPos, updateCallActivityView } from "../controls/util"


class DDeiQuickFlowLifeCycle extends DDeiLifeCycle {
  
  name: string = "ddei-quick-flow-lifecycle"
  /**
   * 缺省实例
   */
  static defaultIns: DDeiQuickFlowLifeCycle = new DDeiQuickFlowLifeCycle();
  
  /**
   * 鼠标移动进入控件的钩子，该插件由它来进行整体分发
   */
  EVENT_EDITOR_INIT: DDeiFuncData | null = new DDeiFuncData("ddei-quickflow-editor-init", 1, (operateType, data, ddInstance, evt) => {
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    if (editor?.flow){
      let flowAPI = editor.flow;

      let stage = ddInstance.stage;
      if (!stage.flowDesignData){
        //加载初始化数据
        //position，图像在画布的整体位置，0正中，1上、2右、3下、4左
        let flowData = `{
"direct":3,
"position":1,
"marginY":20,
"spaceHeight":40,
"config":{
  "begin": {
    "model":"1000001",
    "width":50,
    "height":50,
    "textField": "name",
    "fields":[
      {
        "key":"name",
        "field":"name"
      }
    ]
  },
  "usertask": {
    "model":"1000011",
    "width":160,
    "height":80,
    "textField": "name",
     "fields":[
      {
        "key":"name",
        "field":"name"
      }
    ]
  },
  "scripttask": {
    "model":"1000021",
    "width":160,
    "height":80,
    "textField": "name",
    "fields":[
      {
        "key":"name",
        "field":"name"
      }
    ]
  },
  "end": {
    "model":"1000003",
    "width":50,
    "height":50,
    "textField": "name",
    "fields":[
      {
        "key":"name",
        "field":"name"
      }
    ]
  }
},
"data":
    {
      "id": "begin",
      "name": "开始",
      "type": "begin",
       "children": [
        {
          "id": "task_1",
          "name": "任务节点1",
          "type": "usertask",
          "children": [
            {
              "id": "end",
              "name": "结束",
              "type": "end"
            }
          ]
        }
      ]
    }
}`;
        stage.flowDesignData = JSON.parse(flowData);
      }
    
      flowAPI.loadFromFlowData(stage.flowDesignData, true);
      editor.ddInstance["AC_DESIGN_DRAG"] = false
      editor.ddInstance["AC_DESIGN_LINK"] = false
      editor.ddInstance["AC_DESIGN_ROTATE"] = false
      editor.ddInstance["AC_DESIGN_SCALE"] = false
      
    }
    
  });


  EVENT_CONTROL_VIEW: DDeiFuncData | null = new DDeiFuncData("ddei-quickflow-control-view-after", 1, (operateType, data, ddInstance, evt) => {
    data?.models?.forEach(model => {
      if (model.bpmnBaseType == 'Sequence'){
        if (operateType == 'VIEW-HIDDEN'){
          
        } else if (operateType == 'VIEW'){
          
        }
      }
    });
  });




  


}

export default DDeiQuickFlowLifeCycle