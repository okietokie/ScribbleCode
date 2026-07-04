// Theme Types
export type ThemeColor = 'paper' | 'ink' | 'yellow' | 'blue' | 'green' | 'purple' | 'red';

export interface ThemeTokens {
  colors: {
    paper: string;
    paperPage: string;
    ink: string;
    yellow: string;
    blue: string;
    green: string;
    purple: string;
    red: string;
  };
  spacing: number[];
  borderRadius: {
    hand: string;
    handLg: string;
    handXl: string;
  };
  shadows: {
    paper: string;
    paperHover: string;
    sticker: string;
    stickerHover: string;
  };
  animationDurations: {
    fast: string;
    normal: string;
    slow: string;
  };
  zIndex: {
    dropdown: number;
    sticky: number;
    modal: number;
    tooltip: number;
  };
}

// Component Props Types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export interface BadgeProps {
  children: React.ReactNode;
  color?: ThemeColor;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  color?: ThemeColor;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

export interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  isLocked?: boolean;
  onComplete?: () => void;
}

export interface AchievementBadgeProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isEarned: boolean;
  earnedAt?: Date;
}

export interface XPPillProps {
  currentXP: number;
  maxXp: number;
  level: number;
}

export interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
}

export interface MissionBannerProps {
  title: string;
  description: string;
  reward: number;
  isCompleted: boolean;
  onClaim?: () => void;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export interface StickerProps {
  children: React.ReactNode;
  rotation?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightedLines?: number[];
}

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export interface LoadingSkeletonProps {
  variant?: 'text' | 'card' | 'avatar' | 'list';
  lines?: number;
  className?: string;
}

// Layout Types
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

export interface SidebarProps {
  items: NavItem[];
  isOpen: boolean;
  onToggle: () => void;
  activeItemId: string;
}

export interface NavbarProps {
  title: string;
  userAvatar?: string;
  userName?: string;
  onMenuClick?: () => void;
}

export interface AppShellProps {
  children: React.ReactNode;
  sidebarItems?: NavItem[];
}

// Animation Types
export interface AnimationPreset {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

export type AnimationName = 
  | 'fadeIn'
  | 'slideUp'
  | 'pageFlip'
  | 'stickerPop'
  | 'bounce'
  | 'wiggle'
  | 'scale'
  | 'hoverLift'
  | 'paperDrop';

// Store Types
export interface BaseStore<T> {
  state: T;
  actions: Record<string, (...args: unknown[]) => void>;
}

// Route Types
export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  label: string;
  protected?: boolean;
}

// Responsive Types
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'largeDesktop';

export interface ResponsiveConfig {
  mobile: { min: 0; max: 639 };
  tablet: { min: 640; max: 1023 };
  desktop: { min: 1024; max: 1279 };
  largeDesktop: { min: 1280 };
}
