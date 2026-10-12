// Vite raw imports in tests (file content as a string).
declare module "*?raw" {
  const content: string;
  export default content;
}
