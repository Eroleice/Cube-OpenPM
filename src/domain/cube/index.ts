/**
 * 文件用途：聚合导出 cube 领域的最小公共契约与状态入口。
 * 所属模块：cube 领域模块。
 * 架构层级：领域层（Public Facade）。
 * 典型入口：由应用层或后续渲染适配层通过该文件消费稳定 contract。
 * 边界说明：仅暴露窄接口，避免泄漏 UI、渲染或未来算法实现细节。
 */

export {
  createIdlePlaybackState,
  isCubeSize,
  parseCubeSize,
  type CubeSize,
  type Move,
  type MoveSequence,
  type MoveSequenceSource,
  type PlaybackState,
  type RunMode
} from './contracts';
export {
  createSolvedCubeState,
  isSolvedCubeState,
  type CubeFace,
  type CubeState,
  type FaceColor,
  type FaceStickers
} from './state';
