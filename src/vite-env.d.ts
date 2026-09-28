/// <reference types="vite/client" />

declare module "*.md" {
  const raw: string;
  export default raw;
}
