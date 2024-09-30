import { DDeiPluginBase, DDeiEditor } from "ddei-editor";
import DDeiFlowLifeCycle from "./flow-lifecycle"

class DDeiFlowLifeCycles extends DDeiPluginBase {
  type: string = "package"


  /**
   * 缺省实例
   */
  static defaultIns: DDeiFlowLifeCycle = new DDeiFlowLifeCycle(null);


  lifecycles: object = DDeiFlowLifeCycle;

  getLifeCyclies(editor:DDeiEditor) {
    if (DDeiPluginBase.isSubclass(this.lifecycles, DDeiPluginBase)) {
      return this.lifecycles.defaultIns.getLifeCyclies(editor);
    } else if (this.lifecycles instanceof DDeiPluginBase) {
      return this.lifecycles.getLifeCyclies(editor);
    }
  }


  static configuration(options) {
    let core = new DDeiFlowLifeCycles(options);
    core.lifecycles = core.lifecycles.configuration(options)
    return core;
  }
}

export { DDeiFlowLifeCycles }
export * from "./flow-lifecycle"
export default DDeiFlowLifeCycles;