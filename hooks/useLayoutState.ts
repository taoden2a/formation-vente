"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "cpv_layout_state";

export interface LayoutState {
  isSidebarOpen: boolean;
  isNotesOpen: boolean;
}

const defaultLayout: LayoutState = {
  isSidebarOpen: true,
  isNotesOpen: true,
};

export function useLayoutState() {
  const [layout, setLayout] = useState<LayoutState>(defaultLayout);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as LayoutState;
        setLayout(parsed);
      }
    } catch {
      // If error, use default
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  const saveLayout = useCallback((newLayout: LayoutState) => {
    setLayout(newLayout);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLayout));
    } catch {
      // Storage full or unavailable
    }
  }, []);

  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    saveLayout({
      ...layout,
      isSidebarOpen: !layout.isSidebarOpen,
    });
  }, [layout, saveLayout]);

  // Toggle notes panel
  const toggleNotes = useCallback(() => {
    saveLayout({
      ...layout,
      isNotesOpen: !layout.isNotesOpen,
    });
  }, [layout, saveLayout]);

  return {
    layout,
    isLoaded,
    toggleSidebar,
    toggleNotes,
  };
}
