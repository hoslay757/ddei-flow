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
  EVENT_EDITOR_INIT: DDeiFuncData | null = new DDeiFuncData("ddei-flow-mouse-move-in-control", 1, (operateType, data, ddInstance, evt) => {
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    if (editor?.flow){
      let flowAPI = editor.flow;
      //加载初始化数据
      //position，图像在画布的整体位置，0正中，1上、2右、3下、4左
      let flowData = `{
"direct":3,
"position":1,
"marginY":20,
"config":{
  "begin": {
    "model":"1000001",
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
      flowAPI.loadFromFlowData(flowData, true);
    }
    
  });

}

export default DDeiQuickFlowLifeCycle