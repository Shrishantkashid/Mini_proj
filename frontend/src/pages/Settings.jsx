import React from "react";
import { useTheme } from "next-themes";

export default function Settings() {
  const { theme, setTheme, systemTheme } = useTheme();

  const current = theme === "system" ? systemTheme : theme;

  return (
    <div className="min-h-screen">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <section className="card">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Appearance</h2>
          <p className="text-gray-600 mb-6 text-sm">Choose your display theme. "System" follows your OS preference.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`rounded-lg border px-4 py-3 text-left transition-colors ${current === "light" ? "border-primary-500 ring-2 ring-primary-200" : "border-gray-200 hover:border-gray-300"}`}
            >
              <div className="font-medium">Light</div>
              <div className="text-xs text-gray-500">Bright interface</div>
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`rounded-lg border px-4 py-3 text-left transition-colors ${current === "dark" ? "border-primary-500 ring-2 ring-primary-200" : "border-gray-200 hover:border-gray-300"}`}
            >
              <div className="font-medium">Dark</div>
              <div className="text-xs text-gray-500">Low-light friendly</div>
            </button>
            <button
              type="button"
              onClick={() => setTheme("system")}
              className={`rounded-lg border px-4 py-3 text-left transition-colors ${theme === "system" ? "border-primary-500 ring-2 ring-primary-200" : "border-gray-200 hover:border-gray-300"}`}
            >
              <div className="font-medium">System</div>
              <div className="text-xs text-gray-500">Match OS setting</div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}












