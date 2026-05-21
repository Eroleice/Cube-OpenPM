---
id: architecture-change
name: 架构变更
triggers:
  - MSC 分层变化
  - 模块边界变化
  - 系统通信方式变化
  - shared contract 变化
  - 新增系统能力
defaultOwner: architect
requiredAgents:
  - orchestrator
  - architect
optionalAgents:
  - designer
  - producer
  - qa
allowedArtifactKinds:
  - msc
  - milestone
  - task
  - sow
  - audit
  - rework
entryStages:
  - msc
  - milestone
  - task
  - sow
  - audit
  - rework
---

# Workflow：架构变更

## 触发场景

- 需要修改 MSC 分层、模块边界、系统通信方式或 shared contract。
- 某个功能无法通过现有架构清晰表达。
- 需要新增系统能力、跨层通道、共享协议、schema、API、事件或数据 owner。
- 当前 task 或 SOW 发现必须先变更架构，否则会产生循环依赖、隐式共享状态或不可审计实现。

## 参与 Agent

- Orchestrator：判断是否确实需要架构变更，并负责入口和出口。
- Architect：主责架构分析、MSC 更新建议、边界定义、contract 影响和 ADR 候选。
- Designer：仅在架构变化会改变系统范围、用户流程或验收口径时介入。
- Producer：当架构变更需要拆成多个交付切片时介入。
- Producer：把已批准的架构变更 milestone 拆成可执行 task。
- Producer：把架构变更 task 转成可执行 SOW。
- QA：审计变更是否符合 MSC、ADR、contract 和测试门禁。

## 输入

- 当前 DESIGN、MSC、ADR 和项目记忆。
- 触发架构变更的功能目标、bug、audit finding 或实现阻塞。
- 相关模块路径、shared contract、schema、API、事件、数据流和权限边界。
- 当前 git diff、失败日志、测试证据或 OpenCode 报告。

## 流程步骤

1. Orchestrator 确认问题无法通过普通功能开发或缺陷修复解决。
2. Architect 分析现有 MSC 与目标能力的冲突点。
3. Architect 输出新的模块边界、依赖方向、通信方式、contract 变化和 ADR 候选。
4. 如影响系统范围或验收口径，Designer 更新 DESIGN 中对应部分。
5. 如变更较大，Producer 将架构变更拆成可交付切片。
6. Producer 生成第一个架构变更 task。
7. Producer 生成执行 SOW。
8. OpenCode 执行后，QA 审计 MSC、ADR、diff、测试和兼容性证据。

## 专家调用约束

- Architect 是唯一主责专家；其他 Agent 只能围绕范围、切片、执行和审计补充。
- 不得在没有 MSC 或 ADR 影响说明时直接进入代码执行。
- 不得把大范围架构迁移塞进一个 task；跨多个 owner 时必须拆分。
- Designer 只处理用户可见范围和验收变化，不替代 Architect 做模块设计。
- QA 必须检查 contract、兼容性、迁移、安全和回归风险。

## 阶段产物

- MSC 更新建议或新的 MSC artifact。
- ADR 记录或 ADR 候选。
- 架构变更 milestone 或 task。
- 架构变更 SOW。
- coding report。
- audit。
- 必要时生成 rework SOW。

## 验收标准

- 新架构能清楚表达目标系统能力。
- 模块 owner、依赖方向、通信方式、数据 owner 和 shared contract 明确。
- contract、schema、API、event 或文件格式变化有兼容策略。
- 迁移、安全、权限、测试和回滚风险有记录。
- 实现 diff 与 MSC、ADR 和 SOW 一致。

## 升级规则

- 如果变更影响产品范围、用户流程或验收标准，升级到系统设计工作流补齐 DESIGN。
- 如果涉及安全边界、数据迁移、破坏性 contract 或跨多个系统 owner，必须拆成 milestone 级计划。
- 如果 audit 发现架构与实现不一致，升级到 rework。

## 降级规则

- 如果现有 MSC 已能表达该功能，只需普通实现，降级到功能开发工作流。
- 如果问题只是已实现行为缺陷，不改变架构边界，降级到缺陷修复与回归工作流。
- 如果缺少足够事实判断架构影响，降级为待确认事项或调查 task。

## 阶段完成定义

- MSC 或 ADR 影响已经明确记录。
- 第一个可执行架构变更切片已经形成 task 或 SOW。
- 执行后 audit 结论为通过、有条件通过、需要返工或阻塞，且理由清楚。
- 后续架构债、迁移项或兼容风险已进入 milestone、task、audit 或项目记忆。


