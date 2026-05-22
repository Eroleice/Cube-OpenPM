/**
 * 文件用途：提供项目最小可运行的应用根视图。
 * 所属模块：应用入口展示模块。
 * 架构层级：表现层（UI Shell）。
 * 典型入口：由 src/main.ts 的 renderApp() 调用并挂载到 #app。
 * 边界说明：仅负责输出最小占位界面，不承载业务状态、交互逻辑或求解流程。
 */
export function App(): string {
  return `
    <main class="app-shell" data-testid="app-root" aria-label="魔方应用根节点">
      <h1>Cube OpenPM</h1>
      <p class="intro">3D 魔方程序初始界面骨架（当前为占位展示）。</p>

      <section
        class="cube-stage"
        data-testid="cube-stage"
        role="region"
        aria-label="3D 魔方展示承载区域（后续实现）"
      >
        3D 魔方展示承载区域（后续接入真实渲染）
      </section>

      <section class="controls" aria-label="基础控制区">
        <div class="action-buttons">
          <button type="button" disabled title="随机打乱功能后续实现" aria-label="随机打乱（后续实现）">
            随机打乱
          </button>
          <button type="button" disabled title="求解功能后续实现" aria-label="求解（后续实现）">
            求解
          </button>
        </div>

        <div class="speed-control">
          <label for="speed-range">速度</label>
          <input
            id="speed-range"
            type="range"
            min="1"
            max="10"
            value="5"
            disabled
            aria-label="速度（后续实现）"
            title="速度调节功能后续实现"
          />
        </div>

        <div class="cube-size" role="group" aria-label="魔方阶数选择">
          <button type="button" aria-pressed="true">3 阶</button>
          <button type="button" aria-pressed="false" disabled title="4 阶切换后续实现">4 阶</button>
          <button type="button" aria-pressed="false" disabled title="5 阶切换后续实现">5 阶</button>
        </div>

        <div class="counters" aria-label="步骤计数器">
          <p data-testid="shuffle-step-count">打乱步骤数：0</p>
          <p data-testid="solve-step-count">求解步骤数：0</p>
        </div>

        <p class="placeholder-note">提示：随机打乱、求解、速度与阶数切换能力将在后续任务实现。</p>
      </section>
    </main>
  `;
}
