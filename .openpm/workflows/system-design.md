---
id: system-design
name: 系统设计
triggers:
  - 用户想法转规格
  - DESIGN 空白
  - DESIGN 冲突
  - MVP 范围定义
  - milestone 验收标准
defaultOwner: designer
requiredAgents:
  - orchestrator
  - designer
optionalAgents:
  - architect
  - producer
  - qa
allowedArtifactKinds:
  - design
  - msc
  - milestone
  - task
entryStages:
  - design
  - msc
  - milestone
  - task
---

# Workflow：系统设计

## 触发场景

- 需要把用户想法转化为可实现规格。
- DESIGN.md 中某个系统存在空白、冲突或需要细化。
- 需要为 MVP 或某个里程碑定义系统范围和验收标准。
- 用户提出新目标，但尚未形成可执行 task 或 SOW。

## 参与 Agent

- Orchestrator：判断设计入口、收敛上下文并给出出口。
- Designer：主责整理需求、系统范围、用户流程、验收口径和待确认事项。
- Architect：当设计触及模块边界、数据流、shared contract 或系统通信时介入。
- Producer：当设计已经足够稳定，需要形成到 MVP 验收为止的一组 milestone 时介入。
- Producer：仅在设计已确认且需要把当前 milestone 拆成 implementation task 时介入。
- QA：仅在需要审查设计与现有 artifact 是否冲突时介入。

## 输入

- 用户原始想法、业务目标、约束和不做范围。
- 现有 IDEA、DESIGN、MSC、ADR、milestone、task 和项目记忆。
- 用户反馈、竞品约束、日志、缺陷背景或已确认的非功能要求。
- 当前项目事实和已知实现边界。

## 流程步骤

1. Orchestrator 判断目标是否属于系统设计，而不是直接开发或修复。
2. Designer 整理 DESIGN 草案或 DESIGN 增量，明确系统范围、目标用户、关键流程、数据状态、非功能要求和验收口径。
3. Designer 标出待确认事项，不替用户做关键业务取舍。
4. Architect 复核会影响 MSC、模块边界、shared contract 或数据流的部分。
5. 如设计可以进入交付，Producer 形成从当前阶段到 MVP 版本验收所需的一组 milestone。
6. 需要落地时，Producer 将第一个未完成 milestone 拆成若干个可执行 task。
7. Orchestrator 输出下一步：继续设计、进入架构变更、进入功能开发、等待用户确认或停止。

## 专家调用约束

- Designer 是唯一主责专家；Architect 只处理架构影响。
- 不得在待确认事项未回复时生成 MSC、milestone 或 SOW，除非该事项不影响当前切片。
- 不得把设计阶段输出写成已经实现。
- 不得在系统范围未确认时进入功能开发。
- Producer 只规划到 MVP 版本验收所需的 milestone，不一次规划 post-MVP 或完整长期路线图。

## 阶段产物

- DESIGN.md 或 DESIGN 增量。
- 待确认事项。
- MSC 更新建议或架构影响说明。
- 一组到 MVP 验收为止的 milestone。
- 必要时生成当前 milestone 的一组 task。
- 项目记忆更新。

## 验收标准

- 系统目标、用户问题、功能范围、不做范围和验收口径清楚。
- 关键用户流程、数据状态、边界输入、错误反馈和非功能要求可被后续 task 引用。
- 待确认事项只包含会影响架构、范围、实现或验收的问题。
- DESIGN 与 MSC、ADR 和已有 milestone 不冲突；冲突已记录处理方式。
- 已明确下一步进入架构变更、功能开发、缺陷修复、等待确认或停止。

## 升级规则

- 设计发现现有架构无法表达目标能力时，升级到架构变更工作流。
- 设计已经确认且需要落地代码时，升级到功能开发工作流。
- 设计来源是 bug 或回归失败时，升级到缺陷修复与回归工作流。

## 降级规则

- 信息不足时降级为待确认事项。
- 目标过大时降级为 MVP 范围定义或第一个 milestone 设计。
- 如果只是文案、注释或非行为性整理，降级为文档维护 task，而不是完整功能开发。

## 阶段完成定义

- DESIGN 或设计增量已经形成，并且待确认事项状态清楚。
- 影响架构的内容已经交给 Architect 复核或明确无需复核。
- MVP 或当前 milestone 的系统范围和验收标准已经可引用。
- 下一步 workflow 和推荐命令已经明确。


