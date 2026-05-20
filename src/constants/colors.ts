import { useTheme } from "@/hooks/useTheme";

export const colors = {
  light: {
    /* Core */
    background: "#fcf9f8",
    foreground: "#1c1b1b",

    /* Surface */
    surface: "#fcf9f8",
    surfaceDim: "#dcd9d9",
    surfaceBright: "#fcf9f8",

    surfaceContainerLowest: "#ffffff",
    surfaceContainerLow: "#f6f3f2",
    surfaceContainer: "#f0edec",
    surfaceContainerHigh: "#ebe7e7",
    surfaceContainerHighest: "#e5e2e1",

    /* Text */
    onSurface: "#1c1b1b",
    onSurfaceVariant: "#5a4136",

    /* Brand */
    primary: "#ff6b00",
    onPrimary: "#ffffff",

    primaryContainer: "#ff6b00",
    onPrimaryContainer: "#572000",

    secondary: "#5f5e5e",
    onSecondary: "#ffffff",

    secondaryContainer: "#e4e2e1",
    onSecondaryContainer: "#656464",

    tertiary: "#7c5800",
    onTertiary: "#ffffff",

    tertiaryContainer: "#c78f00",
    onTertiaryContainer: "#422d00",

    /* Borders */
    outline: "#8e7164",
    outlineVariant: "#e2bfb0",

    /* Error */
    error: "#ba1a1a",
    onError: "#ffffff",
  },

  dark: {
    /* Core */
    background: "#131313",
    foreground: "#e5e2e1",

    /* Surface */
    surface: "#131313",
    surfaceDim: "#131313",
    surfaceBright: "#3a3939",

    surfaceContainerLowest: "#0e0e0e",
    surfaceContainerLow: "#1c1b1b",
    surfaceContainer: "#201f1f",
    surfaceContainerHigh: "#2a2a2a",
    surfaceContainerHighest: "#353534",

    /* Text */
    onSurface: "#e5e2e1",
    onSurfaceVariant: "#e2bfb0",

    /* Brand */
    primary: "#ff6b00",
    onPrimary: "#ffffff",

    primaryContainer: "#ff6b00",
    onPrimaryContainer: "#572000",

    secondary: "#c8c6c5",
    onSecondary: "#303030",

    secondaryContainer: "#474746",
    onSecondaryContainer: "#b7b5b4",

    tertiary: "#ffba20",
    onTertiary: "#412d00",

    tertiaryContainer: "#c78f00",
    onTertiaryContainer: "#422d00",

    /* Borders */
    outline: "#a98a7d",
    outlineVariant: "#5a4136",

    /* Error */
    error: "#ffb4ab",
    onError: "#690005",
  },
};

export const radius = {
  sm: 4,
  default: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};