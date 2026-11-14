import type { ComponentType } from 'react';
import type { ArtProps } from './primitives';
import {
  EnergyBalance, MetabolismFlow, TdeeComposition, FatDistribution, VisceralSubcutaneous,
  FatBreakdown, MuscleFat, WeightFluctuation, Plateau, HungerSatiety, SleepFat, HabitLoop,
} from './science';
import {
  HealthyPlate, ProteinFoods, CarbFoods, HealthyFats, FiberSources, PortionGuide, FoodLabel,
} from './nutrition';
import {
  Walking, Running, Cycling, Squat, PushUp, DumbbellArt, Stretching,
  CalculatorArt, WeightScale, LogoMark,
} from './movement';

export * from './science';
export * from './nutrition';
export * from './movement';
export { Art, C, Label, Arrow, BodySilhouette, FoodToken, Caption } from './primitives';
export type { ArtProps } from './primitives';

/** 名称 → 组件注册表。文章与栏目配置只需写字符串，即可渲染对应插画。 */
export const ILLUSTRATION_REGISTRY: Record<string, ComponentType<ArtProps>> = {
  EnergyBalance, MetabolismFlow, TdeeComposition, FatDistribution, VisceralSubcutaneous,
  FatBreakdown, MuscleFat, WeightFluctuation, Plateau, HungerSatiety, SleepFat, HabitLoop,
  HealthyPlate, ProteinFoods, CarbFoods, HealthyFats, FiberSources, PortionGuide, FoodLabel,
  Walking, Running, Cycling, Squat, PushUp, DumbbellArt, Stretching,
  CalculatorArt, WeightScale,
};

export const ILLUSTRATION_NAMES = Object.keys(ILLUSTRATION_REGISTRY);

export function Illustration({ name, className, title }: ArtProps & { name: string }) {
  const Component = ILLUSTRATION_REGISTRY[name] ?? EnergyBalance;
  return <Component className={className} title={title} />;
}

export { LogoMark };
