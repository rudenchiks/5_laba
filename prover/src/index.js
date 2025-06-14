import React from "react";
import { createRoot } from "react-dom/client";
import ParagraphPreview from "./App";

const text = `Первое предложение первого абзаца. Остальная часть первого абзаца.
Второй абзац. Конец второго абзаца.
Третий абзац. Конец третьего абзаца.`;

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ParagraphPreview text={text} />
  </React.StrictMode>
);
