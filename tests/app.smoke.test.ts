/**
 * 文件用途：验证最小工程基线的 smoke 路径可执行。
 * 所属模块：测试模块。
 * 架构层级：质量保障层（Smoke Test）。
 * 典型入口：npm run test 通过 Vitest 运行。
 * 边界说明：仅覆盖本 task 约定的初始 UI 可见骨架，不验证后续 3D、打乱或求解业务闭环。
 */
import { describe, expect, it } from 'vitest';
import { renderApp } from '../src/main';

describe('app smoke', () => {
  /**
   * 用途：确认 DOM 环境可用且入口挂载链路可以执行。
   * 调用时机：作为最小 smoke 验收用例执行。
   * 断言范围：容器内出现稳定根节点与基线文案，证明挂载副作用已生效。
   */
  it('renders initial cube ui shell into a DOM container', () => {
    const container = document.createElement('div');

    renderApp(container);

    const root = container.querySelector('[data-testid="app-root"]');
    expect(root).not.toBeNull();

    const cubeStage = container.querySelector('[data-testid="cube-stage"]');
    expect(cubeStage).not.toBeNull();
    expect(cubeStage?.textContent).toContain('3D 魔方展示承载区域');

    const scrambleButton = container.querySelector('button[aria-label="随机打乱（后续实现）"]');
    expect(scrambleButton).not.toBeNull();
    expect((scrambleButton as HTMLButtonElement).disabled).toBe(true);

    const solveButton = container.querySelector('button[aria-label="求解（后续实现）"]');
    expect(solveButton).not.toBeNull();
    expect((solveButton as HTMLButtonElement).disabled).toBe(true);

    const speedRange = container.querySelector('input[type="range"][aria-label="速度（后续实现）"]');
    expect(speedRange).not.toBeNull();
    expect((speedRange as HTMLInputElement).disabled).toBe(true);

    const level3Button = Array.from(container.querySelectorAll('button')).find(
      (button) => button.textContent?.trim() === '3 阶'
    ) as HTMLButtonElement | undefined;
    const level4Button = Array.from(container.querySelectorAll('button')).find(
      (button) => button.textContent?.trim() === '4 阶'
    ) as HTMLButtonElement | undefined;
    const level5Button = Array.from(container.querySelectorAll('button')).find(
      (button) => button.textContent?.trim() === '5 阶'
    ) as HTMLButtonElement | undefined;

    expect(level3Button).toBeDefined();
    expect(level3Button?.getAttribute('aria-pressed')).toBe('true');
    expect(level4Button).toBeDefined();
    expect(level5Button).toBeDefined();

    const shuffleCounter = container.querySelector('[data-testid="shuffle-step-count"]');
    const solveCounter = container.querySelector('[data-testid="solve-step-count"]');
    expect(shuffleCounter?.textContent).toContain('0');
    expect(solveCounter?.textContent).toContain('0');
  });
});
