/**
 * 文件用途：提供项目最小可运行的应用根视图。
 * 所属模块：应用入口展示模块。
 * 架构层级：表现层（UI Shell）。
 * 典型入口：由 src/main.ts 的 renderApp() 调用并挂载到 #app。
 * 边界说明：仅负责输出最小占位界面，不承载业务状态、交互逻辑或求解流程。
 */
export function App(): string {
  return '<main data-testid="app-root">Cube OpenPM baseline ready.</main>';
}
