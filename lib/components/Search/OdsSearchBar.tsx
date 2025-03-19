import { SearchSharp } from '@mui/icons-material';
import {
  FilledInput,
  FormControl,
  FormControlProps,
  Input,
  InputAdornment,
  InputLabel,
  InputLabelProps,
  InputProps,
  OutlinedInput,
} from '@mui/material';
import { useDebounce } from '../../hooks/UseDebounce';
import { useOptionalState, OptionalState } from '../../hooks/UseOptionalState';
import React, { useEffect, useId } from 'react';

export type OdsSearchBarProps = FormControlProps & {
  /**
   * The function that gets called after a debounce delay when the search string changes.
   */
  onFetch: (searchString: string) => Promise<void>;

  /**
   * The optional search string state.
   * Can be left uncontrolled if the search text never needs to be modified from outside the component.
   */
  searchString?: OptionalState<string>;

  /**
   * Amount of time in milliseconds to wait after typing before trying to call the fetch function.
   */
  debounceDelay?: number;

  /**
   * The variant passed down to the input and input label.
   */
  variant?: 'standard' | 'outlined' | 'filled';

  /**
   * The text used for the search bar label.
   */
  label?: string;

  /**
   * The icon on the left side of the search text field.
   * If undefined, the {@link SearchSharp} icon is used.
   */
  iconLeft?: React.ReactNode;

  /**
   * The icon on the right side of the search text field.
   */
  iconRight?: React.ReactNode;

  slotProps?: {
    input?: InputProps;
    inputLabel?: InputLabelProps;
  };
};

/**
 * A standard search bar that wraps a {@link FormControl} and {@link Input}.
 * Handles debouncing the text before calling a fetch function.
 */
export function OdsSearchBar(props: OdsSearchBarProps) {
  const {
    onFetch,
    searchString: optSearchString,
    debounceDelay,
    variant,
    label,
    iconLeft,
    iconRight,
    slotProps,
    ...derivedProps
  } = props;

  const [searchString, setSearchString] = useOptionalState<string>(optSearchString, '');
  const [debouncedSearchString] = useDebounce(searchString, setSearchString, debounceDelay ?? 500);
  const inputId = useId();

  useEffect(() => {
    void onFetch(debouncedSearchString);
  }, [debouncedSearchString]);

  const inputProps: InputProps = {
    id: inputId,
    value: searchString,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchString(event.target.value);
    },
    startAdornment: <InputAdornment position="start">{iconLeft ?? <SearchSharp />}</InputAdornment>,
    endAdornment: iconRight ? <InputAdornment position="end">{iconRight}</InputAdornment> : undefined,
    ...slotProps?.input,
  };

  const renderInput = () => {
    switch (variant) {
      case 'standard':
        return <Input {...inputProps} />;
      case 'outlined':
      default:
        return <OutlinedInput label={searchString !== '' ? label : undefined} {...inputProps} />;
      case 'filled':
        return <FilledInput {...inputProps} />;
    }
  };

  return (
    <FormControl size="small" variant={variant} fullWidth {...derivedProps}>
      <InputLabel
        htmlFor={inputId}
        shrink={variant === 'filled' || searchString !== ''}
        sx={{
          transition: 'all 0.15s ease',
          marginLeft: '32px',
          '&.MuiInputLabel-shrink': { marginLeft: 0 },
        }}
        {...slotProps?.inputLabel}
      >
        {label}
      </InputLabel>
      {renderInput()}
    </FormControl>
  );
}
