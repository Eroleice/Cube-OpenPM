---
id: feature-development
name: 功能开发
triggers:
  - 已确认需求落地
  - 设计规格落地
  - bugfix 方案落地
  - 可测试功能切片
defaultOwner: producer
requiredAgents:
  - orchestrator
  - producer
  - qa
optionalAgents:
  - architect
  - designer
allowedArtifactKinds:
  - task
  - sow
  - audit
  - rework
entryStages:
  - task
  - sow
  - code
  - audit
  - rework
---

# Workflow：功能开发

## 触发场景

- 需要将已确认的需求、设计规格或 bugfix 方案落地为代码。
- 需要完整交付一个可测试功能切片，而不是只做分析、设计或局部清理。
- 已经存在可引用的 DESIGN、MSC、milestone 或 task，且当前架构足以表达该功能。

## 参与 Agent

- Orchestrator：作为入口和出口，确认当前目标是否适合进入功能开发工作流。
- Producer：把第一个未完成 milestone 或已确认需求切成若干个可独立验收的 task。
- Producer：把 task 转成 OpenCode 可执行的 Statement of Work。
- QA：审查 coding report、git diff、测试证据和验收结果。
- Producer：在 audit 阻塞或需要返工时生成最小 rework SOW。
- Architect：仅在功能触及模块边界、shared contract、schema、API 或数据流时介入。

## 输入

- 已确认的需求、设计规格、bugfix 方案或用户目标。
- `.openpm/progression/00.documents/DESIGN.md`
- `.openpm/progression/00.documents/MSC.md`
- 相关 ADR、milestone、task、SOW、coding report、audit。
- 当前仓库事实、测试命令、失败日志或用户提供的验收口径。

## 流程步骤

1. Orchestrator 判断目标是否已经有足够规格进入开发；不足时转入系统设计工作流。
2. Producer 生成或选择当前 milestone 下的一组最小可验收 task。
3. Producer 生成执行 SOW，明确目标、当前事实、修改范围、不做、必跑检查和风险。
4. OpenCode 根据 SOW 执行代码修改，并生成 coding report。
5. QA 根据 SOW、coding report、git diff 和检查结果审计。
6. audit 通过或有条件通过时生成 commit record；阻塞或需要返工时进入 rework。
7. Producer 只针对 audit 中必须关闭的问题生成 rework SOW。

## 专家调用约束

- 默认只调用 Producer、QA，必要时再让 Architect 或 Designer 介入。
- 不得为同一问题同时调用多个规划角色；先由 Orchestrator 收敛上下文。
- Architect 只处理架构边界、shared contract、schema、API、事件、权限或数据流问题。
- Designer 不参与已确认规格的普通落地，除非需求边界出现冲突或空白。
- Agent 不得声称已经修改源码；真实执行必须由 OpenCode 或本地工具完成。

## 阶段产物

- task：`.openpm/progression/02.task/*.md`
- SOW：`.openpm/progression/03.sow/*.md`
- coding report：`.openpm/progression/04.coding/*.md`
- audit：`.openpm/progression/05.audit/*.md`
- rework SOW：`.openpm/progression/03.sow/*.rework-XX.md`
- commit record：`.openpm/progression/06.commit/*.md`

## 验收标准

- 功能行为满足 task 和 SOW 的验收标准。
- git diff 只覆盖允许修改范围。
- 必跑检查已执行并记录结果；无法执行时必须说明原因和风险。
- 用户可见行为、错误反馈、边界输入和回归风险已被审计。
- coding report、audit 和 commit record 能追溯到同一个 task 链路。

## 升级规则

- 功能无法由现有 MSC 清晰表达时，升级到架构变更工作流。
- DESIGN 存在需求空白、冲突或验收标准不清时，升级到系统设计工作流。
- audit 结论为阻塞或需要返工时，升级到 rework 循环。
- 涉及安全、权限、数据迁移、兼容性或 public contract 时，必须让 Architect 复核。

## 降级规则

- 如果目标只是补充规格、澄清范围或整理验收标准，降级到系统设计工作流。
- 如果问题只需修复已知 bug 且不新增功能范围，降级到缺陷修复与回归工作流。
- 如果没有真实执行条件，可降级为本地骨架产物，但 audit 必须阻塞，不能进入真实完成。

## 阶段完成定义

- 已生成并审计 coding report。
- audit 结论为通过或有条件通过，或已明确进入 rework。
- 所有失败检查、未覆盖风险和后续动作已写入 audit。
- 通过或有条件通过时，由 `openpm commit` 调用 OpenCode 执行本轮 workflow 相关的 `git commit`，并生成 commit record。


