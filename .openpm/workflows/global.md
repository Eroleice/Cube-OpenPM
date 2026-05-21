---
id: global
name: 通用工作流规则
triggers:
  - 所有 workflow
requiredAgents:
  - orchestrator
optionalAgents:
  - designer
  - architect
  - producer
  - qa
entryStages:
  - design
  - msc
  - milestone
  - task
  - sow
  - code
  - audit
  - rework
---

# 通用工作流规则

## 适用范围

本规则适用于 OpenPM 所有 workflow。具体工作流可以补充更严格的规则，但不得放宽这里定义的事实边界、执行边界和验收边界。

## 全局原则

- 所有工作流都必须从当前仓库事实和 `.openpm/` 内的 artifact 出发。
- Agent 只负责分析、设计、规划、交接、审查或调度；真实文件修改、命令执行和报告落盘必须由本地工具或 OpenCode 完成。
- Agent 可以使用 `read_project_file` 只读工具读取 `.openpm`、`src`、`test`、`tests` 下的目标文本文件；audit 场景还可以读取 Coding Report 或 git diff 证据中明确列出的具体文件。该工具不能列目录、写文件或运行命令。
- 输出必须区分当前事实、设计蓝图、Agent 推断、用户待确认事项和建议执行项。
- 不得把本地骨架产物当成真实执行证据。
- 所有密钥只能来自环境变量，不得写入 `.openpm/`、日志、report 或 artifact。

## 通用输入

- 用户目标或失败现象。
- `.openpm/progression/00.documents/IDEA.md`
- `.openpm/progression/00.documents/DESIGN.md`
- `.openpm/progression/00.documents/MSC.md`
- ADR、milestone、task、SOW、coding report、audit、rework 和 commit record。
- 仓库事实、git diff、git status、测试命令、日志、截图或用户复现信息。

## 通用流程

1. `idea -> design` 由 Designer 根据 prompt 独立完成，不经过 Orchestrator。
2. 从 `design -> msc` 开始，Orchestrator 判断当前默认 workflow 是否适合，并说明选择理由。
3. Orchestrator 判断任务复杂度，选择轻量直出或完整会诊执行路径。
4. 检查输入是否足够；不足时先列出待确认事项或转入更合适的 workflow。
5. 选择最少必要 Agent，不做角色广播。
6. 生成阶段产物前先确认上游 artifact 没有未回复待确认事项。
7. 执行阶段必须留下 coding report、story log 和 usage log。
8. 审计阶段必须基于 artifact、git diff、命令输出和仓库事实。
9. 完成时由 Orchestrator 或当前阶段负责角色给出出口判断。

## Orchestrator 执行路径

### 轻量直出

适用于输入清楚、默认 workflow 合适、只涉及单一主责领域、没有 shared contract 或架构边界风险、没有冲突或回归证据的任务。

以下低风险任务默认可以优先选择轻量直出：文档维护、注释补齐、测试 fixture 调整、配置说明更新、artifact 文案修正、单文件非行为性整理，以及不触及 public contract、schema、API、权限、数据迁移或用户可见行为的局部改动。

流程：

1. 任务分析（Orchestrator）。
2. 任务分解（Orchestrator）。
3. 主责 Agent 直接生成目标 artifact。
4. Orchestrator routing 和主责 artifact 共同形成后续交接依据。

### 完整会诊

适用于默认 workflow 不合适、输入存在冲突或空白、涉及多个专业领域、涉及 shared contract、schema、API、权限、安全、数据迁移、回归证据、测试失败，或 Orchestrator 无法确认轻量直出安全的任务。

选择完整会诊时必须说明触发原因，例如范围冲突、架构边界变化、质量证据不足、安全风险或用户验收不清；不得因为默认保守而无理由扩大 Agent 调用范围。

流程：

1. 任务分析（Orchestrator）：理解输入文档，必要时补充读取 DESIGN、MSC、ADR、project memory、workflow、rules、最近 audit/report。
2. 任务分解（Orchestrator）：确认 workflow、参与 Agent、主责 Agent 和是否需要 QA 门禁。
3. 专家会诊（指定专家 Agent）：参与专家并联出具各自负责范围的意见。
4. 整合意见（Orchestrator）：汇总专家意见，识别冲突、缺口、范围膨胀和待确认事项。
5. 冲突裁定（QA）：当专家意见冲突、验收标准不清或 Orchestrator 无法裁定时，由 QA 裁定。
6. 门禁核验（QA + 必要专家）：QA 确认输出满足 workflow 要求，并覆盖所有输入需求；如果包含功能行为修改，Producer 必须核验是否影响其他功能或后续切片；如果包含项目结构、模块边界、目录结构、shared contract、schema、API 或数据流改变，Architect 必须作为 TA 核验是否影响其他结构。
7. 任务报告（Orchestrator）：输出结果、路径、下一步，并按项目记忆格式记录 `project-memory.md`。

当前 CLI 对完整会诊路径会先生成精简上下文包，再自动执行专家会诊、Orchestrator 整合和门禁核验；专家、整合和门禁优先读取上下文包，最终主责 Agent 再读取完整必要上下文和会诊记录生成 artifact。`code -> audit` 阶段例外：如果上下文包显示审计证据被截断，门禁 Agent 可以读取明确相关的 progression artifact、源码、测试和工程配置文件补齐证据；若文件路径来自 Coding Report 或 git diff 证据，即使不在默认源码目录中，也可以作为具体文件读取。

## 默认阶段路由

- `idea -> design`：Designer 直接根据 design prompt 生成 DESIGN，不调用 Orchestrator。
- `design -> msc`：默认 architecture-change workflow；Orchestrator 判断是否需要切换到 system-design、feature-development 或 defect-regression。
- `msc -> milestone`：默认 system-design workflow；Orchestrator 判断是否需要切换到 architecture-change、feature-development 或 defect-regression。
- `milestone -> task`：默认 feature-development workflow；Orchestrator 判断是否需要切换到 system-design、architecture-change 或 defect-regression。
- 文档、注释、说明、只读分析或非行为性整理：优先 documentation-maintenance workflow；如发现实现、架构或验收风险，再升级到对应 workflow。

## Milestone 与 Task 推进规则

- `msc -> milestone` 必须生成从当前阶段到 MVP 版本验收所需的一组 milestone，通常为 2 到 5 个。
- 每个 milestone 文件必须在 frontmatter 中记录 `summary`、`generatedAt`、`updatedAt` 和 `completedAt`；`summary` 概述该 milestone 要做的事情，未完成时 `completedAt: null`。
- milestone 的 `completedAt` 不由 OpenPM 自动填写；用户在 milestone 级审核确认可以收尾后手动修改。
- `milestone -> task` 只处理第一个未完成且尚未拆分的 milestone，并将这一个 milestone 拆成若干个 task。
- 每个 task 文件必须在 frontmatter 中记录 `summary`、`milestone`、`milestoneOrder` 和 `generatedAt`；`summary` 概述该 task 要做的事情。
- task 的 `milestoneOrder` 使用 `当前顺位/总数` 格式，例如 `3/11`；rework 继续使用原 task，因此继承原 task 顺位。
- task 是否完成由同源 commit record 判断，不在 task frontmatter 中记录完成时间。
- 同一个 milestone 下的所有 task 都有 commit record 后，`openpm next --auto` 必须停在 done，等待用户做 milestone 级审核；只有用户审核后手动填写该 milestone 的 `completedAt`，才允许运行 `openpm task` 推进下一个 milestone。

## 模块化扩展规则

- Orchestrator routing 必须从当前 `.openpm/agents/*.md` 和 `.openpm/workflows/*.md` 动态发现可选 Agent 与 workflow。
- 用户新增 Agent 或 workflow 后，不需要修改内置模板即可进入 Orchestrator 候选列表。
- Agent frontmatter 中的 `defaultModel` 必须使用 `.openpm/config/models.yaml` 中的模型别名。
- 自定义 Agent 默认用于专家会诊、审查或门禁；只有核心 Agent 或 workflow 明确允许的 Agent 可以主责生成核心 artifact。
- 自定义 workflow 可以改变路由判断、参与 Agent 和门禁要求，但不能凭空新增 CLI 命令、artifact 类型或落盘目录。
- workflow 中声明的 `defaultOwner`、`requiredAgents` 和 `optionalAgents` 必须指向已存在 Agent，否则该 workflow 不可进入 routing。
- Orchestrator 输出 routing 后，CLI 必须调用 Orchestrator registry tool 核验最终 workflow、主责 Agent 和参与 Agent；任一未注册时终止当前任务。

## 角色职责与调用边界

- Architect 负责架构边界、分层、模块通信、shared contract、schema、API、事件、权限、数据流和兼容性。
- Designer 负责用户想法、系统范围、需求边界、用户可见流程和验收口径。
- Producer 负责 milestone、范围、优先级、依赖、交付风险和切片方向。
- Producer 负责第一个可独立验收 implementation task。
- Producer 负责 OpenCode 可执行的施工说明。
- QA 负责验收、回归、证据、质量门禁、UX 风险和文档冲突审查。
- Producer 负责把 audit 必须关闭的问题转成最小 rework SOW。
- 门禁阶段中，功能行为修改必须引入 Producer 复核，项目结构或架构边界改变必须引入 Architect 作为 TA 复核。

## 通用产物规则

- artifact 必须写入 `.openpm/progression/` 对应目录。
- Markdown 产物必须遵守项目级语言规则。
- 产物必须包含来源 artifact、当前范围、不做范围、验收或检查依据。
- 不能覆盖已有 artifact；需要新一轮修改时生成新文件或 rework 文件。
- 长期有效事实应写入 `## 项目记忆更新`。每次 workflow 结束只记录 `本次完成` 和 `后续对齐` 两类内容：前者一句话概括本次工作并附相关 artifact 路径，后者说明后续功能或模块开发必须对齐的长期约束。

## 通用验收标准

- 当前阶段的输入、处理、输出和下一步可追溯。
- 产物没有把未验证事实写成已完成。
- 必跑检查、未执行原因、失败原因和残余风险被明确记录。
- 阻塞项有 owner、原因和下一步。
- 工作流出口明确为继续下一步、需要用户确认、需要返工或完成。
- 安全、隐私、合规、性能、可观测性、可访问性、兼容性和迁移风险已按项目相关性检查；不相关时可以说明不涉及。

## 通用升级规则

- 架构表达不足、跨模块边界不清或 shared contract 变化时，升级到架构变更工作流。
- 需求、系统范围或验收标准不清时，升级到系统设计工作流。
- 真实执行失败、测试失败、回归风险或线上缺陷时，升级到缺陷修复与回归工作流。
- audit 发现必须关闭的问题时，升级到 rework 循环。
- 文档维护中发现实现事实与文档冲突、注释暴露架构歧义、或维护任务实际改变行为时，升级到功能开发、系统设计或架构变更工作流。

## 通用降级规则

- 信息不足且无法合理推断时，降级为待确认事项。
- 缺少 API key 时，Agent 阶段降级为本地骨架。
- 缺少 OpenCode 或执行失败时，代码阶段仍必须生成 failure coding report。
- 本地骨架 coding report 或本地骨架 audit 不能降级为通过状态。

## 通用完成定义

- 阶段产物已写入正确目录。
- 当前 workflow 的验收标准已满足，或阻塞原因已明确记录。
- dashboard 能通过 status、story、usage、progression 和 artifact 观察到结果。
- 下一步命令、人工确认项或停止原因已经明确。
