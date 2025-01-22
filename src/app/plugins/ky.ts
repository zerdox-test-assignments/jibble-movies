import { type App, type ObjectPlugin, type InjectionKey } from "vue";
import ky, { type Options as PluginOptions, type KyInstance } from "ky";
import { injectStrict } from "@/shared/utils";

const plugin: ObjectPlugin = {
  install(app: App, options: PluginOptions): void {
    const kyInstance = ky.create({
      ...options,
    });
    app.config.globalProperties.$ky = kyInstance;
    app.provide(injectionKeyKy, kyInstance);
  },
};

const injectionKeyKy: InjectionKey<KyInstance> = Symbol("kyInstance");
function injectKy(): KyInstance {
  return injectStrict<KyInstance>(injectionKeyKy);
}

export { plugin, type PluginOptions, injectionKeyKy, injectKy };
