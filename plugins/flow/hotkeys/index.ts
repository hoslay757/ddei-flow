import {DDeiPluginBase} from "ddei-editor";
import DDeiKeyActionCancelChooseActivity from "./actions/key-action-cancel-choose-activity"

/**
 * 快捷键扩展
 */
class DDeiFlowHotkeys extends DDeiPluginBase{

  type: string = "package"
  /**
   * 缺省实例
   */
  static defaultIns:DDeiFlowHotkeys = new DDeiFlowHotkeys(null);


  plugins: object[] = [DDeiKeyActionCancelChooseActivity
  ]


  getHotKeys(editor){
    
    let hotkeys = []
    this.plugins?.forEach(plugin=>{
      let ls
      if (DDeiPluginBase.isSubclass(plugin, DDeiPluginBase)) {
        ls = plugin.defaultIns.getHotKeys(editor);
      } else if (plugin instanceof DDeiPluginBase) {
        ls = plugin.getHotKeys(editor);
      }

      if (ls?.length > 0) {
        hotkeys = hotkeys.concat(ls);
      }
    })
    return hotkeys
  }


  static configuration(options) {
    let hotkeys = new DDeiFlowHotkeys(options);
    for (let i = 0; i < hotkeys.plugins?.length;i++){
      hotkeys.plugins[i] = hotkeys.plugins[i].configuration(options,true)
    }
    return hotkeys;
  }
}
export {
  DDeiFlowHotkeys, DDeiKeyActionCancelChooseActivity
}
export default DDeiFlowHotkeys