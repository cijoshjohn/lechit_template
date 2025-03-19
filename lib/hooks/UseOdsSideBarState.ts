import { useState } from 'react';
import { useDebounce } from './UseDebounce';
import { useResetAfterTime } from './UseResetAfterTime';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OdsContextType } from '../contexts/OdsContext';

export interface OdsSideBarState {
  /**
   * Whether the side bar has been expanded (persistant).
   */
  expanded: boolean;

  /**
   * Expands the side bar open or closed (persistant).
   */
  setExpanded: (open: boolean) => void;

  /**
   * Whether the side bar is being previewed (temporary).
   */
  previewing: boolean;

  /**
   * Sets whether the side bar is being previewed (temporary).
   * Note: There is a short debounce time applied to preview state by default.
   * @param immediate Specify true to ignore debouncing and update state immediately.
   */
  setPreviewing: (previewing: boolean, immediate?: boolean) => void;

  /**
   * Whether the side bar is open and visible at all, either by previewing or being expanded.
   */
  open: boolean;
}

/**
 * Creates a new side bar state with handlers for previewing and expanding with appropriate debouncing.
 * A default is provided via {@link OdsContextType.defaultSideBarState}.
 */
export function useOdsSideBarState(): OdsSideBarState {
  const [expanded, setExpanded] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [previewingDebounced, setPreviewingImmediately] = useDebounce(previewing, setPreviewing, 300);
  const [preventPreview, setPreventPreview] = useResetAfterTime(undefined, false, 300);

  const setPreviewingHandler = (previewing: boolean, immediate?: boolean) => {
    if (previewing && preventPreview) {
      return;
    }

    if (immediate) {
      setPreviewingImmediately(previewing);
    } else {
      setPreviewing(previewing);
    }
  };

  const setExpandedHandler = (open: boolean) => {
    if (!open) {
      // Dont allow previewing for a short amount of time after closing from being expanded.
      // Helps prevent accidental re-opening by moving the mouse over the side bar while it is doing its closing animation.
      setPreventPreview(true);
    }
    setExpanded(open);
  };

  return {
    expanded,
    setExpanded: setExpandedHandler,
    previewing: previewingDebounced,
    setPreviewing: setPreviewingHandler,
    open: expanded || previewingDebounced,
  };
}
