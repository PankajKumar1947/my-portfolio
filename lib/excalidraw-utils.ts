import { AppState } from "@excalidraw/excalidraw/types";

/**
 * Sanitizes Excalidraw appState for persistence.
 * Excalidraw appState contains many transient properties (like collaborators Map)
 * that should not be JSON serialized or stored in a database.
 */
export const sanitizeAppState = (appState: Partial<AppState>) => {
  const {
    // Exclude transient/unserializable properties
    collaborators,
    editingGroupId,
    editingLinearElement,
    multiElement,
    resizingElement,
    selectionElement,
    startBoundElement,
    suggestedBindings,
    toast,
    
    // Include the rest
    ...persistableState
  } = appState;

  return {
    ...persistableState,
    // Ensure certain defaults if they were stripped
    isLoading: false,
  };
};

/**
 * A more aggressive sanitizer that only keeps known essential properties.
 * Use this if the base sanitizer still allows large/problematic state through.
 */
export const essentialAppState = (appState: Partial<AppState>) => {
  return {
    viewBackgroundColor: appState.viewBackgroundColor,
    theme: appState.theme,
    scrollX: appState.scrollX,
    scrollY: appState.scrollY,
    zoom: appState.zoom,
    currentItemStrokeColor: appState.currentItemStrokeColor,
    currentItemBackgroundColor: appState.currentItemBackgroundColor,
    currentItemFillStyle: appState.currentItemFillStyle,
    currentItemStrokeWidth: appState.currentItemStrokeWidth,
    currentItemStrokeStyle: appState.currentItemStrokeStyle,
    currentItemRoughness: appState.currentItemRoughness,
    currentItemOpacity: appState.currentItemOpacity,
    currentItemFontFamily: appState.currentItemFontFamily,
    currentItemFontSize: appState.currentItemFontSize,
    currentItemTextAlign: appState.currentItemTextAlign,
    currentItemStartArrowhead: appState.currentItemStartArrowhead,
    currentItemEndArrowhead: appState.currentItemEndArrowhead,
  };
};
