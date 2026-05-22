/**
 * 文件用途：初始化浏览器入口并渲染最小应用界面。
 * 所属模块：应用启动模块。
 * 架构层级：运行时适配层（Browser Bootstrap）。
 * 典型入口：index.html 通过 <script type="module" src="/src/main.ts"> 自动加载。
 * 边界说明：仅处理 DOM 挂载，不实现业务规则、渲染引擎或领域能力。
 */
import { App } from './App';

/**
 * 用途：将最小应用内容渲染到指定容器。
 * 调用方：浏览器入口自动执行，测试可直接调用该函数验证入口可执行。
 * 参数：container 为目标挂载容器，必须为有效 HTMLElement。
 * 返回值：无。
 * 失败场景：由调用方保证容器有效；非法输入属于调用方违约。
 */
export function renderApp(container: HTMLElement): void {
  container.innerHTML = App();
}

/**
 * 用途：从文档中查找 #app 并执行最小挂载。
 * 调用方：浏览器入口自动调用；测试可选择跳过并直接调用 renderApp。
 * 返回值：无。
 * 失败场景：当页面没有 #app 容器时不执行挂载，避免在测试导入阶段产生副作用错误。
 */
export function mountFromDocumentRoot(): void {
  const root = document.getElementById('app');
  if (!root) {
    return;
  }

  renderApp(root);
}

mountFromDocumentRoot();
