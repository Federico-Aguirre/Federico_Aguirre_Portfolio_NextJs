"use client";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

const ScrollbarCustom = ({ children }: { children: React.ReactNode }) => {
  return (
    <OverlayScrollbarsComponent
      defer
      element="div"
      options={{
        scrollbars: {
          visibility: "auto",
          autoHide: "move", // Cambiado de 'leave' a 'move' para mayor sensibilidad
          autoHideDelay: 1000, // Tu segundo de espera
          theme: "os-theme-custom",
        },
      }}
      style={{ height: "100vh", width: "100%" }}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default ScrollbarCustom;