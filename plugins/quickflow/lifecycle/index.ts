import { DDeiPluginBase, DDeiEditor } from "ddei-editor";
import DDeiQuickFlowLifeCycle from "./quickflow-lifecycle"

class DDeiQuickFlowLifeCycles extends DDeiPluginBase {
  type: string = "package"


  /**
   * 缺省实例
   */
  static defaultIns: DDeiQuickFlowLifeCycle = new DDeiQuickFlowLifeCycle(null);


  lifecycles: object = DDeiQuickFlowLifeCycle;

  getLifeCyclies(editor:DDeiEditor) {
    if (DDeiPluginBase.isSubclass(this.lifecycles, DDeiPluginBase)) {
      return this.lifecycles.defaultIns.getLifeCyclies(editor);
    } else if (this.lifecycles instanceof DDeiPluginBase) {
      return this.lifecycles.getLifeCyclies(editor);
    }
  }


  static modify(fn) {
    return DDeiQuickFlowLifeCycles.defaultIns.modify(fn)
  }

  static configuration(options) {
    let core = new DDeiQuickFlowLifeCycles(options);
    core.lifecycles = core.lifecycles.configuration(options)
    return core;
  }
}

export { DDeiQuickFlowLifeCycles }
export * from "./quickflow-lifecycle"
export default DDeiQuickFlowLifeCycles;