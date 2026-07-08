export function getLanguageClass(language: string) {

  const langMap: Record<string, string> = {

    Python: "language-python",
    "C++": "language-cpp",
    Java: "language-java",
    JavaScript: "language-javascript",
    TypeScript: "language-typescript",
    Go: "language-go",
    Rust: "language-rust"

  };

  return langMap[language] ?? "language-plaintext";

}