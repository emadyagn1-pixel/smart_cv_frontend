export interface CVTemplate {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    accent: string;
    border: string;
    background: string;
  };
  preview: string;
}

export const cvTemplates: CVTemplate[] = [
  {
    id: "blue",
    name: "Professional Blue",
    colors: {
      primary: "rgb(37, 99, 235)", // blue-600
      primaryDark: "rgb(29, 78, 216)", // blue-700
      primaryLight: "rgb(191, 219, 254)", // blue-200
      accent: "rgb(96, 165, 250)", // blue-400
      border: "rgb(191, 219, 254)", // blue-200
      background: "rgb(239, 246, 255)", // blue-50
    },
    preview: "Blue theme with professional appearance",
  },
  {
    id: "gray",
    name: "Modern Gray",
    colors: {
      primary: "rgb(71, 85, 105)", // slate-600
      primaryDark: "rgb(51, 65, 85)", // slate-700
      primaryLight: "rgb(226, 232, 240)", // slate-200
      accent: "rgb(100, 116, 139)", // slate-500
      border: "rgb(226, 232, 240)", // slate-200
      background: "rgb(248, 250, 252)", // slate-50
    },
    preview: "Clean gray theme for modern look",
  },
  {
    id: "purple",
    name: "Creative Purple",
    colors: {
      primary: "rgb(126, 34, 206)", // purple-700
      primaryDark: "rgb(107, 33, 168)", // purple-800
      primaryLight: "rgb(233, 213, 255)", // purple-200
      accent: "rgb(168, 85, 247)", // purple-500
      border: "rgb(233, 213, 255)", // purple-200
      background: "rgb(250, 245, 255)", // purple-50
    },
    preview: "Creative purple for standout CVs",
  },
  {
    id: "green",
    name: "Fresh Green",
    colors: {
      primary: "rgb(22, 163, 74)", // green-600
      primaryDark: "rgb(21, 128, 61)", // green-700
      primaryLight: "rgb(187, 247, 208)", // green-200
      accent: "rgb(34, 197, 94)", // green-500
      border: "rgb(187, 247, 208)", // green-200
      background: "rgb(240, 253, 244)", // green-50
    },
    preview: "Fresh green for eco-friendly feel",
  },
  {
    id: "orange",
    name: "Energetic Orange",
    colors: {
      primary: "rgb(234, 88, 12)", // orange-600
      primaryDark: "rgb(194, 65, 12)", // orange-700
      primaryLight: "rgb(254, 215, 170)", // orange-200
      accent: "rgb(251, 146, 60)", // orange-400
      border: "rgb(254, 215, 170)", // orange-200
      background: "rgb(255, 247, 237)", // orange-50
    },
    preview: "Energetic orange for dynamic CVs",
  },
  {
    id: "teal",
    name: "Professional Teal",
    colors: {
      primary: "rgb(15, 118, 110)", // teal-700
      primaryDark: "rgb(17, 94, 89)", // teal-800
      primaryLight: "rgb(153, 246, 228)", // teal-200
      accent: "rgb(20, 184, 166)", // teal-500
      border: "rgb(153, 246, 228)", // teal-200
      background: "rgb(240, 253, 250)", // teal-50
    },
    preview: "Professional teal for tech roles",
  },
];
