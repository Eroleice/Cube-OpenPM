/**
 * 文件用途：定义魔方逻辑状态（CubeState）的最小完成态模型与判断能力。
 * 所属模块：cube 领域模块。
 * 架构层级：领域层（Domain State）。
 * 典型入口：由 src/domain/cube/index.ts 导出的 createSolvedCubeState / isSolvedCubeState。
 * 边界说明：本文件是魔方逻辑状态唯一权威来源，不依赖 UI、DOM、Three.js、输入事件或动画系统。
 */

import { type CubeSize } from './contracts';

/**
 * 用途：限定完成态中允许使用的六面名称。
 * 调用方：CubeState 构造与后续渲染映射。
 */
export type CubeFace = 'U' | 'D' | 'L' | 'R' | 'F' | 'B';

/**
 * 用途：定义完成态下每个面的颜色标识。
 * 调用方：领域状态判断与后续渲染层颜色映射。
 */
export type FaceColor = 'white' | 'yellow' | 'orange' | 'red' | 'green' | 'blue';

/**
 * 用途：表示单个面的贴纸颜色矩阵；保持为普通数组，便于序列化。
 */
export type FaceStickers = ReadonlyArray<ReadonlyArray<FaceColor>>;

/**
 * 用途：定义魔方逻辑状态最小公共结构。
 * 调用方：后续渲染适配、流程编排与测试。
 * 字段说明：
 * - size 表示合法阶数；
 * - stickers 保存六面贴纸矩阵；
 * - solved 标记当前是否为完成态。
 */
export interface CubeState {
  readonly size: CubeSize;
  readonly stickers: Readonly<Record<CubeFace, FaceStickers>>;
  readonly solved: boolean;
}

const FACE_COLORS: Readonly<Record<CubeFace, FaceColor>> = {
  U: 'white',
  D: 'yellow',
  L: 'orange',
  R: 'red',
  F: 'green',
  B: 'blue'
};

/**
 * 用途：创建指定阶数的完成态逻辑状态。
 * 调用时机：应用初始化、重置状态或测试构造阶段。
 * 参数：size 为已通过契约约束的合法 CubeSize。
 * 返回值：可序列化、确定性的完成态 CubeState。
 */
export function createSolvedCubeState(size: CubeSize): CubeState {
  const stickers: Record<CubeFace, FaceStickers> = {
    U: createUniformFace(size, FACE_COLORS.U),
    D: createUniformFace(size, FACE_COLORS.D),
    L: createUniformFace(size, FACE_COLORS.L),
    R: createUniformFace(size, FACE_COLORS.R),
    F: createUniformFace(size, FACE_COLORS.F),
    B: createUniformFace(size, FACE_COLORS.B)
  };

  return {
    size,
    stickers,
    solved: true
  };
}

/**
 * 用途：判断给定状态是否为完成态。
 * 调用方：后续流程编排、完成态检测与回归测试。
 * 参数：state 为待判断的领域状态。
 * 返回值：true 表示完成态，false 表示非完成态。
 */
export function isSolvedCubeState(state: CubeState): boolean {
  return state.solved;
}

function createUniformFace(size: CubeSize, color: FaceColor): FaceStickers {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => color));
}
