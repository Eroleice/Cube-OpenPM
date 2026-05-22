/**
 * 文件用途：验证 cube 领域最小公共契约与完成态模型行为。
 * 所属模块：测试模块（领域单元测试）。
 * 架构层级：质量保障层（Unit Test）。
 * 典型入口：npm test 通过 Vitest 执行。
 * 边界说明：仅依赖领域 contract，不依赖 UI、DOM 渲染、Three.js、鼠标事件或动画对象。
 */

import { describe, expect, it } from 'vitest';
import {
  createIdlePlaybackState,
  createSolvedCubeState,
  isCubeSize,
  isSolvedCubeState,
  parseCubeSize,
  type Move,
  type MoveSequence,
  type RunMode
} from '../src/domain/cube';

describe('cube domain contracts', () => {
  it('accepts legal cube sizes 3/4/5', () => {
    expect(isCubeSize(3)).toBe(true);
    expect(isCubeSize(4)).toBe(true);
    expect(isCubeSize(5)).toBe(true);

    expect(parseCubeSize(3)).toBe(3);
    expect(parseCubeSize(4)).toBe(4);
    expect(parseCubeSize(5)).toBe(5);
  });

  it('rejects illegal runtime cube size input', () => {
    expect(isCubeSize(2)).toBe(false);
    expect(isCubeSize(6)).toBe(false);
    expect(isCubeSize('3')).toBe(false);
    expect(parseCubeSize(0)).toBeUndefined();
    expect(parseCubeSize(null)).toBeUndefined();
  });

  it('creates solved cube state for 3/4/5 with serializable plain data', () => {
    const states = ([3, 4, 5] as const).map((size) => createSolvedCubeState(size));

    for (const state of states) {
      expect(state.size).toBeGreaterThanOrEqual(3);
      expect(state.size).toBeLessThanOrEqual(5);
      expect(state.solved).toBe(true);
      expect(Array.isArray(state.stickers.F)).toBe(true);
      expect(state.stickers.F).toHaveLength(state.size);
      expect(state.stickers.F[0]).toHaveLength(state.size);

      const roundtrip = JSON.parse(JSON.stringify(state));
      expect(roundtrip.size).toBe(state.size);
      expect(roundtrip.solved).toBe(true);
      expect(roundtrip.stickers.U[0][0]).toBe('white');
    }
  });

  it('marks newly created solved states as solved for 3/4/5', () => {
    expect(isSolvedCubeState(createSolvedCubeState(3))).toBe(true);
    expect(isSolvedCubeState(createSolvedCubeState(4))).toBe(true);
    expect(isSolvedCubeState(createSolvedCubeState(5))).toBe(true);
  });

  it('provides minimal ordered move sequence semantics', () => {
    const moveA: Move = { face: 'R', layerIndex: 0, quarterTurns: 1 };
    const moveB: Move = { face: 'U', layerIndex: 0, quarterTurns: -1 };
    const sequence: MoveSequence = {
      source: 'manual',
      moves: [moveA, moveB]
    };

    expect(sequence.moves[0]).toEqual(moveA);
    expect(sequence.moves[1]).toEqual(moveB);
    expect(sequence.moves.map((move) => move.face)).toEqual(['R', 'U']);
  });

  it('keeps run mode idle boundary through playback state', () => {
    const idleMode: RunMode = 'idle';
    const playback = createIdlePlaybackState();

    expect(idleMode).toBe('idle');
    expect(playback.mode).toBe('idle');
  });
});
