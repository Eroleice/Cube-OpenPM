# ADR

- 记录类型：Architecture Decision Record
- 用途：记录后续有关架构调整的假设、决策、原因和影响。

## 使用方式

- 每次架构边界、模块职责、数据流、技术选型或重要约束发生变化时，在下方追加一条记录。
- 保留历史记录，不要覆盖已经做出的决策。
- 如果决策被推翻，新增一条 supersede 记录说明原因。

## 记录模板

### ADR-0001：工程基线初始化（前端 TypeScript + Vite + Vitest）

- 日期：2026-05-22
- 状态：已接受
- Owner：Architect
- 背景：仓库缺少 `package.json`、入口文件、源码目录、测试目录和基础脚本，导致后续 SOW 无法基于可执行工程事实推进。
- 决策：建立最小前端工程基线，固定包管理器声明为 `npm@10.8.2`，使用 `Vite` 作为构建入口，使用 `TypeScript(strict)` 作为静态类型约束，使用 `Vitest + jsdom` 作为测试框架，并提供 `build`、`typecheck`、`test` 必跑脚本。
- 依据：该组合满足最小浏览器入口、TypeScript 严格模式、DOM 测试环境和低维护成本要求，且可直接支撑后续魔方业务功能迭代。
- 影响：
  - 新增最小目录与文件：`src/`、`tests/`、`index.html`、`vite.config.ts`、`vitest.config.ts`、`tsconfig.json`。
  - 新增脚本与依赖，后续任务需沿用现有基线，避免引入平行工具链。
  - 回滚策略：如需迁移到其他构建/测试栈，可通过新 ADR 声明 supersede，并在迁移完成前保持现有脚本兼容。
- 兼容策略：当前以 Node/npm 生态为目标执行环境；`packageManager` 字段用于项目声明版本，允许本地补丁级差异但不得影响 `build/typecheck/test` 通过。
- 后续动作：后续涉及工具链替换、测试框架切换或 strict 规则调整，必须新增 ADR 记录并由 Architect 复核。
