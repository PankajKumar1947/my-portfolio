"use client";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawProps } from "@excalidraw/excalidraw/types";

import "@excalidraw/excalidraw/index.css";

const ExcalidrawWrapper: React.FC<ExcalidrawProps> = (props) => {
  return (
    <div className="portfolio-excalidraw w-full h-full">
      <Excalidraw {...props} />
    </div>
  );
};
export default ExcalidrawWrapper;