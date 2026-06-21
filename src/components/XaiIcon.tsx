import {
  AlertTriangle,
  BookOpen,
  Box,
  Brain,
  ClipboardCheck,
  ClipboardList,
  FileX2,
  Landmark,
  LayoutGrid,
  Network,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Target,
  Trophy,
  User,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { XaiIconName } from '../data/explainabilityInfographic';

const iconMap: Record<XaiIconName, LucideIcon> = {
  user: User,
  scale: Scale,
  landmark: Landmark,
  box: Box,
  network: Network,
  'file-x': FileX2,
  'alert-triangle': AlertTriangle,
  'clipboard-list': ClipboardList,
  brain: Brain,
  'shield-check': ShieldCheck,
  'book-open': BookOpen,
  'clipboard-check': ClipboardCheck,
  target: Target,
  'layout-grid': LayoutGrid,
  users: Users,
  'shield-alert': ShieldAlert,
  shield: Shield,
  trophy: Trophy,
};

interface Props {
  name: XaiIconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export default function XaiIcon({ name, className, size = 20, strokeWidth = 1.75 }: Props) {
  const Icon = iconMap[name];
  return <Icon className={className} size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}
