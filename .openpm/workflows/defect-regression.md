---
id: defect-regression
name: 缺陷修复与回归
triggers:
  - bug
  - 测试失败
  - 构建失败
  - smoke 失败
  - 手测失败
  - 回归风险
defaultOwner: qa
requiredAgents:
  - orchestrator
  - qa
optionalAgents:
  - producer
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

# Workflow：缺陷修复与回归

## 触发场景

- 用户、QA、测试、日志或监控发现 bug。
- smoke、单测、构建或手测失败。
- audit、coding report 或 rework 发现行为回归。
- 已实现功能与 DESIGN、task、SOW 或用户验收不一致。

## 参与 Agent

- Orchestrator：确认缺陷范围、入口和出口。
- QA：主责复现证据、失败归因、回归风险和修复验收。
- Producer：当缺陷需要独立 task 承载时介入。
- Producer：把修复目标转成最小可执行 SOW。
- Producer：当 audit 阻塞或需要返工时生成 rework SOW。
- Architect：仅在根因涉及架构边界、shared contract、schema、API、数据流或权限时介入。
- Designer：仅在缺陷暴露需求或用户流程定义不清时介入。

## 输入

- bug 描述、失败日志、截图、用户复现路径或测试输出。
- 相关 DESIGN、MSC、ADR、task、SOW、coding report 和 audit。
- 当前 git status、git diff、测试命令和环境信息。
- 期望行为、实际行为、影响范围和已知 workaround。

## 流程步骤

1. Orchestrator 判断问题是否属于缺陷修复，而不是新功能或架构变更。
2. QA 整理复现条件、失败证据、影响范围和可能根因。
3. 如果需要明确修复范围，Producer 生成缺陷修复 task。
4. Producer 生成最小修复 SOW，包含复现、修改范围、不做、必跑回归检查和风险。
5. OpenCode 执行修复并生成 coding report。
6. QA 审计修复是否关闭原问题、是否引入回归、检查是否真实运行。
7. audit 通过或有条件通过时生成 commit record；否则进入 rework。

## 专家调用约束

- 默认由 QA 主导问题归因和验收。
- 不得把缺陷修复扩大为新功能、重构或架构迁移。
- Architect 只在缺陷根因触及系统边界或 shared contract 时介入。
- Designer 只在期望行为不清或用户流程定义冲突时介入。
- Producer 只能覆盖 audit 中必须关闭的问题。

## 阶段产物

- 缺陷修复 task。
- 修复 SOW。
- coding report。
- audit。
- rework SOW。
- commit record。
- 必要时的 DESIGN、MSC 或 ADR 更新建议。

## 验收标准

- bug 已复现，或无法复现的原因和推理依据已记录。
- 修复针对根因或明确说明为什么只能做缓解。
- 原失败检查已通过，或失败原因已转化为阻塞项。
- 回归检查覆盖相邻功能、边界输入和用户可见错误反馈。
- git diff 保持最小，不包含无关格式化、重构或功能扩展。

## 升级规则

- 根因来自架构边界、shared contract、schema、API、事件、权限或数据 owner 时，升级到架构变更工作流。
- 期望行为不清、验收冲突或需求定义缺失时，升级到系统设计工作流。
- 修复需要新增完整功能切片时，升级到功能开发工作流。
- audit 未通过时，升级到 rework。

## 降级规则

- 如果只是测试数据、文档或环境配置问题，降级为对应维护 task。
- 如果无法复现且缺少足够证据，降级为调查 task 或待确认事项。
- 如果已有 rework SOW 已覆盖该问题，降级为继续执行当前 rework。

## 阶段完成定义

- 原缺陷、失败命令或回归风险有明确处理结果。
- coding report 记录了修改文件、已运行检查和残余风险。
- audit 给出通过、有条件通过、需要返工或阻塞结论。
- 未关闭的问题已进入 rework、后续 task 或用户待确认事项。


