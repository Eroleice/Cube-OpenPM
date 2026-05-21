# 输出契约

## IDEA

`IDEA.md` 由用户手写，保存在 `.openpm/progression/00.documents/IDEA.md`。

它可以是不专业、不完整的项目想法，但不应包含密钥或账号信息。

## DESIGN

`DESIGN.md` 由 `openpm design` 根据 IDEA 整理，保存在 `.openpm/progression/00.documents/DESIGN.md`。

必须包含：

- 项目愿景
- 核心目标
- 功能范围
- 不做范围
- 验收口径

## MSC

`MSC.md` 由 `openpm msc` 根据 DESIGN 生成，保存在 `.openpm/progression/00.documents/MSC.md`。

必须包含：

- 架构目标
- 模块列表
- 模块通信
- 数据流
- 风险与约束

## Milestone

Milestone 保存在 `.openpm/progression/01.milestone/`。

```md
# NNN.milestone-title

- 来源：DESIGN.md + MSC.md

## 目标
## 范围
## 预计 Task 切片
## 验收
```

## Task

Task 保存在 `.openpm/progression/02.task/`。

每个 task 必须可以独立测试和验收，切片大小要适合一次 SOW/code/audit 循环。

```md
# NNN.task-M-from-XXX.milestone-Y

- 来源 Milestone: .openpm/progression/01.milestone/<milestone>.md

## 目标
## 独立验收标准
## 建议切片大小
## 不做
## 后续 SOW 备注
```

命名规则：

- `NNN` 是全局 task 文档序号，跨 milestone 连续递增，不和 milestone 前缀绑定。
- `task-M` 是当前来源 milestone 内的 task 顺位，从 `task-1` 开始递增。
- `from-XXX.milestone-Y` 必须准确引用来源 milestone。
- 示例：`001.task-1-from-001.milestone-1`、`002.task-2-from-001.milestone-1`、`003.task-1-from-002.milestone-2`。

## SOW

SOW 是 Statement of Work，保存在 `.openpm/progression/03.sow/`。

```md
# NNN.task-title

- 来源 Task: .openpm/progression/02.task/<task>.md

## 施工目标
## 当前事实
## 修改范围
## 不做
## 必跑检查
## 风险
```

## Coding Report

Coding report 保存在 `.openpm/progression/04.coding/`。

```md
# NNN.task-title

- 来源 SOW: .openpm/progression/03.sow/<sow>.md
- 执行者: OpenCode
- 完成时间: <ISO timestamp>

## 摘要
## 修改文件列表
## 新增文件列表
## 文件分类与范围
## OpenPM artifact 提交策略
## Git 审计证据
## 执行测试命令和结果
## 验收结果
## Coding Report 证据要求闭环
## SOW 验收映射
## stderr
## 交接备注
```

Coding report 必须作为 audit 可消费的证据包，而不只是执行摘要：

- 必须列出修改文件和新增文件。
- 必须区分产品代码、测试代码、工程配置、文档和 OpenPM progression artifact。
- 必须记录 `git status --short`、`git diff --name-status` 和 `git diff --stat`，或说明无法获得的原因。
- 对 code 阶段新增文件，OpenPM 可以执行 `git add -N` 建立 intent-to-add，只用于让 `git diff` 展示新增文件内容；这不等于正式 stage 或 commit。
- 必须列出可解析的测试/验证命令结论；成功命令可以只记录“通过”，失败、超时或异常必须保留必要输出。
- 必须把 SOW 中的验收、必跑检查、测试要求或修改范围条目映射到文件证据、检查证据和 audit 核验方式。
- 若 SOW 包含“Coding Report 证据要求”，coding report 必须逐条回应这些报告要求；对 package.json、脚本/依赖、lint、smoke、UI 验收项、未跟踪文件和 progression artifact 等要求必须给出事实、证据位置、命令结论或明确不适用/未设置原因。
- Coding report 不直接替 QA 判定验收通过；最终结论仍由 audit 基于 SOW、diff、源码事实和检查证据给出。
- Commit 前已经存在的本轮 task、SOW、coding report、audit 和必要 rework SOW 都是 workflow 记录，必须由 `openpm commit` 纳入最终提交；`.openpm/logs/`、`.openpm/tmp/` 和运行缓存不属于提交范围。
- 审计阶段本轮 `.openpm/progression/04.coding/<coding>.md` 处于未跟踪状态是预期的待提交 workflow artifact 状态，不能单独作为 audit 阻塞原因；QA 应把它记录为 commit 阶段必须入库的范围要求。

## 完整会诊门禁

完整会诊门禁不单独落盘为 progression artifact，但会写入 story log、project memory 和最终主责 Agent 的上下文。

所有参与门禁核验的 Agent，包括 QA、Producer、Architect 和自定义门禁 Agent，都必须在输出第一段单独包含一行结论：

```md
- 结论：通过|有条件通过|需要返工|阻塞
```

门禁输出必须包含这些二级标题：

- 核验范围
- 结论
- 发现
- 必须满足的约束
- 放行条件

结论为 `需要返工` 或 `阻塞` 时，当前完整会诊不得继续生成最终 artifact。

## Audit

Audit 保存在 `.openpm/progression/05.audit/`。

Audit 结论必须是以下之一：

- 通过
- 有条件通过
- 需要返工
- 阻塞

结论判定标准：

- `通过`：SOW 验收项有证据闭环，必跑检查已执行或合理豁免，未发现必须关闭的问题。
- `有条件通过`：核心验收可放行，但存在明确非阻塞风险、后续 task 或人工确认项；必须说明条件和 owner。
- `需要返工`：实现方向基本可用，但存在必须关闭的问题；必须列出最小返工范围。
- `阻塞`：缺少真实执行证据、检查失败、范围越界、关键需求未满足、审计格式无效或风险无法判断；不得进入 commit。

Audit 必须检查 coding report、SOW、task、git status、相关 git diff 和必要源码事实。

Audit 不能把 OpenCode `success` 或退出码 `0` 单独视为验收通过；但当 coding report 已按标准章节提供测试/验证命令通过结论时，也不能仅因成功 stdout/stderr 未全文内联而阻塞。阻塞应基于检查缺失、检查失败、diff/源码与报告矛盾、SOW 验收不满足、范围越界或风险无法判断。

Audit 必须优先核验 coding report 的“Coding Report 证据要求闭环”章节；该章节已逐条回应 SOW 报告要求时，不应再因缺少另一套同义摘要而阻塞，但仍应基于源码、diff、测试文件和命令结论核验其真实性。

Audit 不得仅因本轮 OpenPM progression artifact 在 audit 阶段未跟踪而阻塞：`.openpm/progression/04.coding/<coding>.md` 是 code 阶段刚生成的待提交记录，`.openpm/progression/05.audit/<audit>.md` 是当前 audit 输出，生成前不可能已被跟踪。Audit 可以要求 `openpm commit` 将本轮 workflow 记录入库，但不能把该状态判定为实现或验收失败。产品代码、测试代码或工程配置文件若未跟踪且缺少可审查 diff 或文件证据，仍应按证据缺口阻塞。

```md
# NNN.task-title

- 审查类型: Agent audit | 本地 audit 骨架
- 来源 Coding Report: .openpm/progression/04.coding/<coding>.md
- 审查者: QA
- 完成时间: <ISO timestamp>
- 结论: 通过 | 有条件通过 | 需要返工 | 阻塞

## 摘要
## 验收证据
## 发现的问题
## 风险与条件
## 必须返工项
## 后续关键点
```

## Commit Record

Commit record 保存在 `.openpm/progression/06.commit/`。

`openpm commit` 只有 audit 结论为通过或有条件通过时才能执行，并由 OpenCode 执行本轮 workflow 相关的 git commit。

`openpm commit` 必须把 commit 前已经存在的本轮 workflow 记录与通过审计的代码改动一起入库，包括 task、SOW、coding report、audit 和必要 rework SOW；不得把 `.openpm/logs/`、`.openpm/tmp/` 或运行缓存纳入提交。Commit record 由提交完成后生成，用于记录已完成的提交事实。

```md
# NNN.task-title

- 记录类型: OpenCode commit record
- 来源 Task: .openpm/progression/02.task/<task>.md
- 来源 SOW: .openpm/progression/03.sow/<sow>.md
- 来源 Coding Report: .openpm/progression/04.coding/<coding>.md
- 来源 Audit: .openpm/progression/05.audit/<audit>.md
- Audit 结论: 通过 | 有条件通过

## 摘要
## Commit Message
## 提交范围
## 代码行数
## 风险
```
