# 全局规则

## 信息源优先级

- 将 `.openpm/progression/00.documents/DESIGN.md` 作为项目设计的主要事实来源
- 将 `.openpm/progression/00.documents/MSC.md` 作为架构边界的主要事实来源
- 将 `.openpm/memory/project-memory.md` 作为跨任务长期上下文来源，但它不得覆盖 `DESIGN.md`，`MSC.md`，rules，workflow 或当前 task 文件中的明确约束。

## 默认技术栈

- OpenPM 默认主要服务 TypeScript 项目；如项目包含 `tsconfig.json`，必须保持 TypeScript strict mode，不得通过关闭 strict、放宽 tsconfig 或跳过类型检查来完成任务。
- 如果当前项目不是 TypeScript 项目，Agent 必须先在 DESIGN、SOW 或 audit 中明确记录技术栈差异和适用的检查命令，再继续执行；不要把 TypeScript 专属规则机械套用到非 TypeScript 项目。
- Agent 必须优先识别当前仓库已有的包管理器、脚本、测试框架、目录结构和构建入口，再决定执行方式；默认约束不能覆盖项目内已经明确存在的工程约定。

## Markdown 语言规则

- 所有 `.md` artifact、workflow、rule、role card 和最终报告默认使用简体中文编写。
- 框架名、库名、协议名、API 名、类型名、文件路径、命令、错误码和专有概念可以保留英文。

## Agent 与 Workflow 扩展规则

- `.openpm/agents/<agent-id>.md` 可新增 Agent；`agent-id` 只能使用小写字母、数字和连字符。
- `.openpm/workflows/<workflow-id>.md` 可新增 workflow；`workflow-id` 只能使用小写字母、数字和连字符。
- Markdown frontmatter 中的 `id` 如果存在，必须与文件名一致。
- Agent frontmatter 中的 `defaultModel` 必须引用 `.openpm/config/models.yaml` 中已存在的模型别名。
- 自定义 Agent 默认只参与会诊、审查或门禁；除非 workflow 明确声明并且 CLI 支持对应 artifact，否则不要让自定义 Agent 直接主责生成核心 artifact。
- 自定义 workflow 引用的 `defaultOwner`、`requiredAgents` 和 `optionalAgents` 必须指向已存在 Agent。
- 新增 workflow 只会进入 Orchestrator routing 候选；新增 CLI 命令、artifact 类型或落盘目录仍需要显式系统能力支持。
- Orchestrator routing 输出后必须经过 registry tool 核验，确认最终 workflow、主责 Agent 和参与 Agent 都已注册；不齐全时终止任务。

## 协作规则

- 只处理当前角色和任务范围内的工作
- 不要默默把任务扩展到其他角色的职责区
- 跨层或跨系统变更必须交由 Architect 复核
- 范围取舍、优先级和里程碑冲突必须交由 Producer 复核
- 验收、回归和质量门禁必须交由 QA 复核
- 任何改变架构、持久化结构、公共协议、领域规则、资源管线或部署假设的决定都必须记录在 `.openpm/progression/00.documents/ADR.md`

## 规则文件分工

- `.openpm/rules/output-contracts.md` 是常见 Agent 输出格式的唯一模板来源
- `.openpm/rules/opencode-execution.md` 是 OpenCode 执行阶段的唯一细则来源
- `.openpm/rules/shared-role-card-rules.md` 是记录所有 Agent role card 的通用执行边界；单个 role card 只保留角色特有职责。

## 目录边界规则

- 修改前必须先识别当前 TypeScript 项目的真实目录结构、入口文件、测试目录、构建配置和已有模块边界。
- 如果项目已有明确结构，优先沿用现有结构，不要为了套用模板而新建平行架构。
- 如果项目尚无清晰结构，普通产品代码可以建议写入 `src/app`，共享纯类型、schema、序列化辅助、品牌化 ID、Result/AppError 等跨模块基础代码可以建议写入 `src/shared`。
- 后续可能需要手动调整的配置参数可以建议写入 `src/constants`，但必须先确认项目没有更合适的配置目录或框架约定。
- `.openpm` 只存放 Agent 协作资料，包括 rules、role card、workflow、skill、进度文档和长期记忆
- 不要把项目代码写进 `.openpm`
- 不要把 Agent 协作资料、workflow prompt、运行日志或项目管理 artifact 写进产品源码目录
- 如果任务确实需要偏离上述目录边界，必须在最终报告中说明原因、影响范围，并交由 Agent:技术架构 复核。
- 永远禁止访问：`node_modules/`，`dist/`，`.env`
- 禁止访问，除非有明确命令：`logs/`

## 实现规则

- 新内容优先通过配置表达，只有配置无法表达新规则时才新增系统能力
- 如果使用 `src/constants` 或项目既有常量目录，每个独立模块应使用一个单独的 `.ts` 文件，例如窗口参数放入 `src/constants/window.ts`，不得在业务实现文件中直接散落设定参数
- 常量目录中每个导出的参数必须用中文注释说明：用途、影响范围、建议调整范围或合法取值范围
- 领域规则必须保持确定性、可测试
- 存档数据必须是可序列化的普通数据
- 优先复用项目已有的品牌化 ID、共享类型和错误处理模式
- 用户可见闭环必须有 smoke 覆盖；脆弱的领域规则必须有单元测试

## 代码真实性与现状核验规则

- 如果文档声称某模块已落地，但源码中不存在对应文件、测试、导出或运行入口，必须把该文档内容视为目标蓝图、历史假设或待补齐能力，而不是当前事实
- 发现文档现状与源码不一致时，不得基于不存在的实现继续编写代码；必须在最终报告中列出冲突，并交由 Agent:技术架构 更新文档
- 新增代码应优先贴合源码中已经存在的真实模式；如果源码还没有对应模式，必须先建立最小清晰边界，而不是假设完整框架已经存在

## 模块公共边界规则

- 每个业务模块必须有清晰 public contract。跨模块只能依赖公开的 facade、use-case、DTO、event、schema、repository interface 或模块 index 导出的稳定 API
- 禁止从其他模块导入 `internal`、`private`、测试 fixture、临时脚本、未公开适配器或未被明确标记为 public contract 的文件
- 新模块必须说明：所属层级、权威状态、输入输出、公开 API、禁止依赖、测试入口
- 模块内部可以拆分规则、状态转换、查询、校验、适配器和测试数据；不得把跨职责流程集中到一个泛化的 manager/controller/service 文件中
- 如果确实需要新增跨模块 contract，必须同步说明类型、schema、调用方向、错误模型和向后兼容影响

## 复杂度预算与拆分触发规则

- 单个代码文件超过 300 行是复杂度审查触发器，不是硬性失败条件。普通产品源码超过 300 行时，Agent 必须说明保留原因或拆分；超过 500 行默认优先拆分。schema、contract、fixture 和测试文件可以合理超过 300 行，但必须保持单一职责，并在超过 500 行时说明为什么不拆。拆分的判断标准是职责边界、可读性、测试定位和维护风险，而不是单纯行数。
- 单个函数超过 80 行、单个类超过 200 行、单个模块公开导出超过 12 个符号时，Agent 必须说明为什么仍然合理，或在同次任务中拆分。
- 新功能如果触及 3 个以上架构层、8 个以上文件，或同时修改多个区域，必须先产出实现切片计划，不得一次性堆成大 patch。
- 避免创建 `manager.ts`、`service.ts`、`controller.ts` 这类含义不清的泛化文件名；如果框架约定确实需要使用 `service` 或 `controller` 命名，文件顶端注释必须说明唯一职责、调用边界和不可承担的职责。
- 修改已有臃肿文件时，不允许继续向其中追加新职责；应优先提取纯规则、DTO、schema、adapter、view model、测试 fixture 或专门的能力模块。
- 如果复杂度预算因框架入口、聚合导出或测试 fixture 等原因被合理突破，必须在最终报告中说明原因、风险和后续收敛条件。

## 安全、隐私与合规规则

- 不得读取、复制、输出或写入真实密钥、token、cookie、私钥、`.env` 内容、生产账号、用户隐私数据或带凭据的内部 URL。
- 如果任务需要引用敏感配置，只能引用环境变量名、配置键名或脱敏示例，不得写入真实值。
- artifact、日志、coding report、audit 和项目记忆不得记录敏感数据原文；必要时使用 `<redacted>` 或说明“已脱敏”。
- 涉及认证、授权、支付、数据删除、审计日志、加密、权限绕过、迁移、备份恢复或生产数据处理时，必须升级到 Architect 和 QA 复核。
- 涉及医疗、金融、法律、儿童数据或其他高风险合规领域时，必须列为人工确认事项；Agent 不得自动放行合规结论。

## 非功能要求规则

- DESIGN、MSC、SOW 和 audit 应按项目相关性覆盖性能、可靠性、可观测性、安全、可访问性、兼容性、迁移、回滚和可维护性。
- 不相关的非功能项可以明确写为“不涉及”，但不得忽略明显相关的风险。
- 用户可见功能必须说明错误反馈、空状态、边界输入和失败恢复；后台或 CLI 功能必须说明错误码、日志、退出码或可诊断信息。
- 数据结构、文件格式、schema、API 或持久化变更必须说明兼容策略、迁移策略和回滚风险。

## 依赖与库引入规则

- 不得为了单个功能随意引入新运行时依赖
- 新增第三方库必须说明用途、替代方案、包体或性能影响、运行环境兼容性和维护风险，并由 Architect 复核
- 对已经被固定技术栈覆盖的能力，优先使用既有技术栈和本项目封装；确实需要替换或绕过时，必须走 architecture-change workflow

## 输出规则

任何正式 workflow 完成后，Agent 最终报告都必须是一份可直接归档或交接的中文报告。轻量维护、只读检查或单步命令可以使用简版报告，但仍必须说明结果、涉及文件、已运行检查和风险。

具体模板以 `.openpm/rules/output-contracts.md` 为准.

## 简版报告规则

适用于文档维护、只读检查、单文件低风险改动或用户明确要求简短反馈的任务：

- 结果：说明完成了什么或为什么没有执行。
- 涉及文件：列出新增、修改、删除的文件；没有文件改动时明确说明。
- 已运行检查：列出实际执行的命令；未运行时说明原因。
- 风险与下一步：列出残余风险、阻塞点或建议的后续动作。

## 归档交付物规则

正式 workflow 任务完成后必须交付能映射到 `.openpm/rules/output-contracts.md` 的内容：

- Agent 交付的所有文稿均为 markdown 文件
- 使用工作流：实际采用的 workflow 名称或文件名
- 参与 Agent：本次实际参与工作的 Agent 名称列表，不要写所有可用 Agent
- Workflow 基础链路、动态调整和实际链路：说明 workflow 模板、本次临时追加的 Agent 及原因，以及最终真实执行链路
- 设计或实现结论：说明最终决策、实现结果或未实现原因
- 任务拆分或实际修改说明：规划类任务给出任务拆分，实施类任务给出真实修改说明
- 涉及文件清单：列出新增、修改、删除的文件；如果没有修改文件，必须明确说明
- 架构影响说明：说明是否触及模块边界、数据流、通信协议或目录结构
- 常量/可调参数影响说明：说明是否新增或修改常量目录或可调参数
- 已运行测试：列出实际运行的检查、测试或 smoke；未运行时必须说明原因
- 风险与后续交接备注：说明残余风险、阻塞点和下一步交接对象
- 项目记忆更新：只记录 `本次完成` 和 `后续对齐` 两类信息；`本次完成` 必须一句话概括本次 workflow 并附相关 artifact 路径，`后续对齐` 只写后续功能或模块开发必须遵守的长期约束、接口边界、风险或决策。
