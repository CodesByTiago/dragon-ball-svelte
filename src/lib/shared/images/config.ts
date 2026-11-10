export const imageWidths = [96, 160, 320, 480, 640, 960, 1280] as const;

export const imageDirectories = ["characters", "planetas", "transformaciones", "transformations"];

export const imageRemotePatterns = imageDirectories.map((directory) => ({
  protocol: "https" as const,
  hostname: "^dragonball-api\\.com$",
  port: "",
  pathname: `^/${directory}/.*$`,
}));
