import { Mode } from '@mui/system/cssVars/useCurrentColorScheme';

export interface OdsPrefsLocalStorage {
  activeMode: Mode;
  activeThemeId: string;
}

export type OdsPrefsLocalStorageKeys = keyof OdsPrefsLocalStorage;

export class OdsPrefsLocalStorageService {
  private userKey(userId: string) {
    return `ods.user:${userId}`;
  }

  public get(userId: string): OdsPrefsLocalStorage | undefined {
    const value = localStorage.getItem(this.userKey(userId));
    if (!value) {
      return undefined;
    }
    try {
      return JSON.parse(value) as OdsPrefsLocalStorage;
    } catch (e) {
      console.error(`Unable to read from local storage: ${e}`);
      return undefined;
    }
  }

  public set<T>(userId: string, key: OdsPrefsLocalStorageKeys, value: T): void {
    const currentValue = this.get(userId);
    const newKeyValue = Array.isArray(value) ? [...value] : typeof value === 'string' ? value : { ...value };
    const newValue = { ...currentValue, [key]: newKeyValue };
    localStorage.setItem(this.userKey(userId), JSON.stringify(newValue));
  }
}
