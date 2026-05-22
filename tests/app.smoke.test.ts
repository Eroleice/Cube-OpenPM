/**
 * 文件用途：验证最小工程基线的 smoke 路径可执行。
 * 所属模块：测试模块。
 * 架构层级：质量保障层（Smoke Test）。
 * 典型入口：npm run test 通过 Vitest 运行。
 * 边界说明：只验证入口渲染与 DOM 环境可用，不覆盖业务功能验收。
 */
import { describe, expect, it } from 'vitest';
import { renderApp } from '../src/main';

describe('app smoke', () => {
  /**
   * 用途：确认 DOM 环境可用且入口挂载链路可以执行。
   * 调用时机：作为最小 smoke 验收用例执行。
   * 断言范围：容器内出现稳定根节点与基线文案，证明挂载副作用已生效。
   */
  it('mounts baseline app into a DOM container', () => {
    const container = document.createElement('div');

    renderApp(container);

    const root = container.querySelector('[data-testid="app-root"]');
    expect(root).not.toBeNull();
    expect(container.textContent).toContain('Cube OpenPM baseline ready.');
  });
});
