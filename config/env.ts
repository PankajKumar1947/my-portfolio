export const env = {
  MONGODB_URI: process.env.MONGODB_URI!,
  DB_NAME: process.env.DB_NAME!,
  JWT_SECRET: process.env.JWT_SECRET || "default_secret_for_development",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY as string,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY as string,
  PORT: process.env.PORT || "3000",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@example.com",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "admin123",
  ADMIN_NAME: process.env.ADMIN_NAME || "Admin",
  NODE_ENV: process.env.NODE_ENV || "development",
} as const;

if (env.NODE_ENV === "production") {
  const required = [
    "MONGODB_URI",
    "JWT_SECRET",
    "IMAGEKIT_PRIVATE_KEY",
    "IMAGEKIT_PUBLIC_KEY",
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD"
  ];
  required.forEach((key) => {
    if (!process.env[key]) {
      console.warn(`[Config] Warning: Environment variable ${key} is missing in production.`);
    }
  });
}
