# ADR

- 记录类型：Architecture Decision Record
- 用途：记录后续有关架构调整的假设、决策、原因和影响。

## 使用方式

- 每次架构边界、模块职责、数据流、技术选型或重要约束发生变化时，在下方追加一条记录。
- 保留历史记录，不要覆盖已经做出的决策。
- 如果决策被推翻，新增一条 supersede 记录说明原因。

## 记录模板

### ADR-0001：待记录

- 日期：待补充
- 状态：提议中|已接受|已废弃|已替代
- 背景：待补充
- 决策：待补充
- 依据：待补充
- 影响：待补充
- 后续动作：待补充

### ADR-0002：最小前端工程基线（task-001 rework-01）

- 日期：2026-05-21
- 状态：已接受
- 背景：仓库此前缺少可构建、可类型检查、可测试的浏览器前端工程基线，导致 task-001 初始 UI 验收阻塞。
- 决策：采用 Vite + TypeScript strict + Vitest(jsdom) 建立最小前端基线；入口为 `index.html` + `src/main.ts`；UI 骨架组装在 `src/app.ts`；smoke 测试入口为 `tests/app.smoke.test.ts`；`package.json` 以 `build`、`typecheck`、`test` 作为质量门禁基础脚本。
- 依据：该组合为关闭当前阻塞项所需最小依赖集合，满足浏览器入口、构建、strict 类型检查与 UI smoke 可运行要求，且不引入重型 3D 引擎或复杂 E2E。
- 影响：后续前端任务默认沿用该工程 contract；领域能力（CubeState/Move/RunMode 等）仍需后续 task 独立建立，不得由当前 UI 展示态替代。
- 后续动作：后续若需引入 3D 引擎、UI 框架或 E2E 体系，必须新增 ADR 评估替代方案、复杂度与维护成本。
