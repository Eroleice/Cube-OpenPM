# 项目记忆

这里记录每次 workflow 结束后需要带入后续判断的显式记忆。内容必须短，只保留跨任务仍有价值的信息。

## 记录格式

每次 workflow 结束后追加一个 `## <ISO 时间> <来源 Agent>` 小节。小节内只写两类内容：

- 本次完成：一句话说明这次做了什么，并附上相关 artifact 路径，例如 task、SOW、coding report、audit、rework 或 commit record。
- 后续对齐：列出后续功能或模块开发时必须继续遵守的长期约束、接口边界、风险、决策或待对齐事项。

## 示例

```md
## 2026-05-21T12:00:00.000Z producer

- 本次完成：完成 OpenPM workflow 模板重组，相关产物见 `.openpm/progression/02.task/001.task-workflow.md`、`.openpm/progression/05.audit/001.task-workflow.md`。
- 后续对齐：后续新增 workflow 时必须保持 Producer 负责交付切片、QA 负责质量审核，工作流模板必须包含升级和降级规则。
```

## 适合记录

- 已确认且会影响后续开发的架构决策。
- 后续功能或模块必须对齐的接口、边界、目录、约束和测试门禁。
- 跨任务依赖。
- 重要未解决风险和后续 owner。

## 避免记录

- 密钥。
- 完整任务流水。
- 临时推理过程。
- 已经由某个具体 artifact 捕获的细节。
- 没有后续影响的短期执行细节。


## 2026-05-21T14:38:53.769Z architect

- 本次完成：生成浏览器 3D 魔方项目的 MSC 架构边界，相关产物应落入 `.openpm/progression/00.documents/MSC.md`。
