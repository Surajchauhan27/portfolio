/**
 * Icon Registry — single place that maps string names → Lucide components.
 *
 * WHY THIS EXISTS:
 * config.js is a plain data file (no React imports).
 * Components need React icon components.
 * This registry bridges the two without polluting config with React deps.
 *
 * Usage:
 *   import { resolveIcon } from '../utils/icons';
 *   const Icon = resolveIcon('Terminal'); // → Lucide Terminal component
 */
import {
  Terminal, Table, BarChart3, Wrench, PieChart, Microscope,
  GraduationCap, Lightbulb, Puzzle, MessageSquare, Eye,
  Code2, GitCommit, Users, Cpu, Zap,
  Mail, Linkedin, Github, ExternalLink,
  MapPin, Clock, CheckCircle, ArrowRight,
  User, Award, Calendar, Target, BookOpen,
  Database, Layers, Code, TrendingUp,
} from 'lucide-react';

const ICON_REGISTRY = {
  Terminal, Table, BarChart3, Wrench, PieChart, Microscope,
  GraduationCap, Lightbulb, Puzzle, MessageSquare, Eye,
  Code2, GitCommit, Users, Cpu, Zap,
  Mail, Linkedin, Github, ExternalLink,
  MapPin, Clock, CheckCircle, ArrowRight,
  User, Award, Calendar, Target, BookOpen,
  Database, Layers, Code, TrendingUp,
};

/**
 * @param {string} name - Icon name matching the Lucide export name
 * @returns {React.ComponentType | null}
 */
export function resolveIcon(name) {
  const Icon = ICON_REGISTRY[name];
  if (!Icon && process.env.NODE_ENV === 'development') {
    console.warn(`[icons] Unknown icon: "${name}". Add it to ICON_REGISTRY in utils/icons.js`);
  }
  return Icon ?? null;
}
