---
id: documentation-maintenance
name: 文档维护
triggers:
  - README 更新
  - 注释补齐
  - 规则整理
  - artifact 文案修正
  - 非行为性维护
defaultOwner: producer
requiredAgents:
  - orchestrator
  - producer
optionalAgents:
  - designer
  - architect
  - qa
allowedArtifactKinds:
  - design
  - msc
  - milestone
  - task
  - sow
  - audit
  - rework
entryStages:
  - design
  - msc
  - milestone
  - task
  - sow
  - audit
  - rework
---

# Workflow：文档维护

## 触发场景

- README、规则、role card、workflow、prompt、注释或 artifact 文案需要整理。
- 任务目标明确为说明、注释、格式、示例、轻量结构对齐或非行为性维护。
- 需要修正文档与当前实现之间的小范围描述偏差，但不改变真实产品行为。

## 参与 Agent

- Orchestrator：判断维护任务是否真的不改变行为，并确认是否可轻量直出。
- Producer：主责维护范围、改动清单、交付说明和后续项。
- Designer：仅在文档影响用户理解、需求边界或验收口径时介入。
- Architect：仅在文档涉及模块边界、public contract、schema、API、数据流或 ADR 时介入。
- QA：仅在文档维护需要验证事实、检查链接、确认命令或避免误导性完成声明时介入。

## 输入

- 用户要求维护的文档、注释、规则或 artifact。
- 当前仓库事实、相关源码、测试、README、DESIGN、MSC、ADR、task、SOW、coding report 或 audit。
- 已知不一致点、目标读者、输出语言和必须保留的约束。

## 流程步骤

1. Orchestrator 判断任务是否属于非行为性维护；如涉及真实代码行为变化，转入功能开发或缺陷修复。
2. Producer 明确维护范围、允许修改文件、禁止扩大范围和验收口径。
3. 必要时由 Designer、Architect 或 QA 补充需求、架构或事实核验。
4. OpenCode 或本地执行环境完成文档、注释或规则修改。
5. 根据修改类型运行最小必要检查，例如 Markdown 链接检查、typecheck、测试或只读核验。
6. 输出简版报告；如维护影响长期规则或项目记忆，追加项目记忆更新。

## 专家调用约束

- 默认轻量直出，不做角色广播。
- 不得借文档维护扩大到功能实现、重构、架构迁移或范围重写。
- 文档不得把未实现能力写成已实现；实现状态不明时必须标为待确认或目标蓝图。
- 注释补齐必须解释职责、调用边界和维护风险，不写重复代码字面意思的低价值注释。
- 规则维护必须保持 rules、role card、workflow、output contract 和 CLI 实际行为一致。

## 阶段产物

- 更新后的 Markdown 文档、规则、workflow、role card、prompt、注释或 artifact。
- 必要时生成 task、SOW、coding report 或 audit，用于记录正式维护链路。
- 简版报告，包含结果、涉及文件、已运行检查、风险与下一步。

## 验收标准

- 文档与当前实现、CLI 行为、artifact 契约和项目规则一致。
- 修改范围只覆盖维护目标，没有夹带行为性代码变更。
- Markdown 使用简体中文，保留必要英文专有名词、命令、路径和 API 名。
- 如果更新注释，注释解释职责、调用方式、关键参数、边界和风险。
- 如果无法验证某项描述，必须明确标记为待确认、目标蓝图或后续项。

## 升级规则

- 发现文档与实现存在会影响架构判断的冲突时，升级到架构变更工作流。
- 发现需求、用户流程或验收口径不清时，升级到系统设计工作流。
- 维护过程中需要真实功能改动或修复行为缺陷时，升级到功能开发或缺陷修复与回归工作流。
- 发现安全、隐私、权限、数据迁移或生产风险时，必须引入 Architect 和 QA。

## 降级规则

- 如果只是只读分析或无需落盘修改，可以降级为简版报告。
- 如果维护项已经被现有 artifact 明确覆盖，可以降级为引用现有 artifact 并说明无需修改。
- 如果缺少足够事实判断正确性，降级为待确认事项。

## 阶段完成定义

- 维护目标已完成，或无法完成的原因和下一步已明确。
- 涉及文件、检查命令、未验证事项和残余风险已记录。
- 如文档内容会影响后续 workflow，已写入项目记忆或对应 artifact。
