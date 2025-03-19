import { OdsUserInfo } from '@ods/cucumber';
import React, { PropsWithChildren, useState } from 'react';

export const guestUser: OdsUserInfo = {
  fullName: 'Guest',
};

export interface UserContextInfo {
  user: OdsUserInfo;
  setUser: (user?: OdsUserInfo) => Promise<void>;
}

export const UserContext = React.createContext<UserContextInfo>({
  user: guestUser,
  setUser: () => Promise.resolve(),
});

export default function UserProvider(props: PropsWithChildren) {
  const [user, setUser] = useState<OdsUserInfo | undefined>(undefined);

  const setUserHandler = async (user?: OdsUserInfo): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setUser(user);
  };

  const value: UserContextInfo = {
    user: user ?? guestUser,
    setUser: setUserHandler,
  };
  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
}
