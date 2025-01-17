import {DDei} from "ddei-editor";
import {DDeiKeyAction} from "ddei-editor";
import { DDeiEditor } from "ddei-editor";

/**
 * 键行为:取消控件创建
 * 取消控件创建
 */
class DDeiKeyActionCancelChooseActivity extends DDeiKeyAction {

  name: string = "ddei-core-keyaction-cancel-choose-activity"


  /**
   * 缺省实例
   */
  static defaultIns: DDeiKeyActionCancelChooseActivity = new DDeiKeyActionCancelChooseActivity();

  defaultOptions: object = {
    'keys': [
      {
        keys: "27"
      }
    ]
  }

  getHotKeys(editor) {
    return [this];
  }


  static configuration(options, fullConfig: boolean = false) {
    //解析options，只使用自己相关的
    if (options) {
      let newOptions = {}
      if (fullConfig) {
        if (fullConfig) {
          if (options[DDeiKeyActionCancelChooseActivity.defaultIns.name]) {
            for (let i in options[DDeiKeyActionCancelChooseActivity.defaultIns.name]) {
              newOptions[i] = options[DDeiKeyActionCancelChooseActivity.defaultIns.name][i]
            }
          }
        }
      } else {
        newOptions = options
      }
      if (newOptions && Object.keys(newOptions).length !== 0) {
        let panels = new DDeiKeyActionCancelChooseActivity(newOptions);
        return panels;
      }
    }
    return DDeiKeyActionCancelChooseActivity;
  }

  static modify(fn) {
    return DDeiKeyActionCancelChooseActivity.defaultIns.modify(fn)
  }

  // ============================ 方法 ===============================
  action(evt: Event, ddInstance: DDei, editor: DDeiEditor): void {
    
    editor.tempCallActivity?.render?.clearCachedValue();
    delete editor.tempCallActivity
    
    delete editor.tempChooseCallActivity
  }

}


export default DDeiKeyActionCancelChooseActivity
