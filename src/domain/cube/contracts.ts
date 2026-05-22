/**
 * 文件用途：定义魔方领域最小公共契约（阶数、转动语义、运行模式）。
 * 所属模块：cube 领域模块。
 * 架构层级：领域层（Domain Contract）。
 * 典型入口：由 src/domain/cube/index.ts 统一导出给后续应用层与渲染适配层消费。
 * 边界说明：仅声明可序列化的领域契约，不包含 UI、DOM、Three.js、动画或输入事件实现。
 */

/**
 * 用途：约束当前支持的魔方阶数。
 * 调用时机：创建状态、解析外部输入或校验任务参数时使用。
 * 合法值：仅允许 3、4、5；扩展到其他阶数必须走 ADR 变更流程。
 */
export type CubeSize = 3 | 4 | 5;

const LEGAL_CUBE_SIZES = [3, 4, 5] as const;

/**
 * 用途：运行时判断输入是否为合法 CubeSize。
 * 调用方：外部输入边界、测试或状态构造入口。
 * 参数：value 为任意未知输入。
 * 返回值：true 表示输入可安全收窄为 CubeSize，false 表示非法值。
 */
export function isCubeSize(value: unknown): value is CubeSize {
  return typeof value === 'number' && Number.isInteger(value) && LEGAL_CUBE_SIZES.includes(value as CubeSize);
}

/**
 * 用途：将未知输入解析为 CubeSize；非法输入返回 undefined 以避免静默归一化。
 * 调用时机：需要从运行时输入安全构造领域状态时。
 * 参数：value 为任意未知输入。
 * 返回值：合法时返回 CubeSize，非法时返回 undefined。
 */
export function parseCubeSize(value: unknown): CubeSize | undefined {
  if (!isCubeSize(value)) {
    return undefined;
  }

  return value;
}

/**
 * 用途：约束一次最小层转动动作的公共语义。
 * 调用方：后续手动转动、打乱或求解流程可共用该契约。
 * 字段说明：
 * - face 表示目标面；
 * - layerIndex 表示从该面向内的层索引，取值范围由调用方结合阶数约束；
 * - quarterTurns 表示转动单位，1/-1 为 90 度，2/-2 为 180 度。
 */
export interface Move {
  readonly face: 'U' | 'D' | 'L' | 'R' | 'F' | 'B';
  readonly layerIndex: number;
  readonly quarterTurns: -2 | -1 | 1 | 2;
}

/**
 * 用途：标记动作序列来源，便于后续区分人工操作、打乱或求解输出。
 * 调用时机：创建 MoveSequence 时提供最小来源元数据。
 */
export type MoveSequenceSource = 'manual' | 'scramble' | 'solve';

/**
 * 用途：表达有序动作列表；不在本 task 中承诺转动执行算法。
 * 调用方：后续播放、撤销、求解对接可复用该结构。
 */
export interface MoveSequence {
  readonly source: MoveSequenceSource;
  readonly moves: ReadonlyArray<Move>;
}

/**
 * 用途：定义最小运行模式边界，为后续流程扩展保留稳定状态字面量。
 * 调用时机：流程编排层需要表达当前运行阶段时。
 */
export type RunMode =
  | 'idle'
  | 'manual-turning'
  | 'scrambling'
  | 'solving'
  | 'animating'
  | 'switching-size'
  | 'error';

/**
 * 用途：定义最小播放状态结构。
 * 调用方：后续自动流程或队列调度可在该结构上扩展。
 * 边界：当前仅承载 mode，不包含队列、速度或动画细节。
 */
export interface PlaybackState {
  readonly mode: RunMode;
}

/**
 * 用途：创建初始 idle 播放状态。
 * 调用时机：应用启动或流程重置时。
 * 返回值：只包含 mode=idle 的可序列化对象。
 */
export function createIdlePlaybackState(): PlaybackState {
  return { mode: 'idle' };
}
