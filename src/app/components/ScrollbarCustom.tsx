"use client";

import React, { ComponentPropsWithoutRef } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export interface ScrollbarCustomProps
  extends Omit<ComponentPropsWithoutRef<typeof OverlayScrollbarsComponent>, "options"> {
  children: React.ReactNode;
  /**
   * Etiqueta accesible para describir la región desplazable a los lectores de pantalla.
   * @example "Contenido principal" o "Lista de mensajes"
   */
  "aria-label"?: string;
  /**
   * ID del elemento que describe el contenido de este contenedor desplazable.
   */
  "aria-labelledby"?: string;
  /**
   * Opciones personalizadas para OverlayScrollbars.
   */
  options?: ComponentPropsWithoutRef<typeof OverlayScrollbarsComponent>["options"];
  /**
   * Altura del contenedor.
   * @default "100%"
   */
  height?: string;
  /**
   * Altura máxima del contenedor.
   */
  maxHeight?: string;
}

const ScrollbarCustom = ({
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  options,
  height = "100%",
  maxHeight,
  style,
  tabIndex = 0,
  ...props
}: ScrollbarCustomProps) => {
  // Un área desplazable requiere un rol semántico si tiene una etiqueta explícita
  const hasLabel = Boolean(ariaLabel || ariaLabelledby);
  const regionRole = hasLabel ? "region" : undefined;

  return (
    <OverlayScrollbarsComponent
      defer
      element="div"
      role={regionRole}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      // Permite que usuarios naveguen por el scroll usando solo el teclado (Tab + Flechas)
      tabIndex={tabIndex}
      options={{
        scrollbars: {
          // Visibilidad constante para evitar desorientación visual
          visibility: "auto",
          autoHide: "never", 
          clickScroll: true, // Facilita el desplazamiento con clics directos
          theme: "os-theme-custom",
          ...options?.scrollbars,
        },
        ...options,
      }}
      style={{
        height,
        maxHeight,
        width: "100%",
        // Asegura un indicador visual claro cuando recibe el foco vía teclado
        outlineOffset: "-2px",
        ...style,
      }}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default ScrollbarCustom;