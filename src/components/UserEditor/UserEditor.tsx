import { useContext, useRef, useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { OdsUserInfo, odsShadows } from '@ods/cucumber';
import { UserContext } from 'contexts/UserContext';
import { deepPurple } from '@mui/material/colors';
import { OdsAppBarAvatarButton } from '@ods/cucumber/components';

/**
 * Editor panel for setting the mock user that gets used in the appbar and other menus.
 */
export default function UserEditor() {
  const { user: currentUser, setUser } = useContext(UserContext);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [prevUsers, setPrevUsers] = useState<OdsUserInfo[]>([]);
  const colorPickerEl = useRef<HTMLInputElement>();

  const addUserAndSet = (user: OdsUserInfo) => {
    const existingIndex = prevUsers.findIndex((u) => u.fullName === user.fullName);
    const newUsers = [...prevUsers];
    if (existingIndex >= 0) {
      newUsers[existingIndex] = user;
    } else {
      newUsers.push(user);
    }
    setPrevUsers(newUsers);
    void setUser(user);
  };

  const useExistingUser = (user: OdsUserInfo) => {
    setUserName(user.fullName);
    setUserEmail(user.email ?? '');
    if (colorPickerEl.current) colorPickerEl.current.value = user.color ?? deepPurple[400];
    void setUser(user);
  };

  return (
    <Paper elevation={3} sx={{ boxShadow: odsShadows.sm, mb: 3, p: 1.5 }}>
      <Box display="flex" gap={3} alignItems="stretch" justifyContent="stretch">
        <Box flexShrink={0}>
          <Typography variant="h5">User</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Set the dummy signed in user.
          </Typography>
          <Box display="flex" gap={1} marginTop={2}>
            <TextField
              label="Full Name"
              size="small"
              variant="outlined"
              value={userName}
              onChange={(val) => setUserName(val.target.value)}
            />
            <TextField
              label="Email"
              size="small"
              variant="outlined"
              value={userEmail}
              onChange={(val) => setUserEmail(val.target.value)}
            />
            <TextField
              label="Colour"
              size="small"
              variant="outlined"
              type="color"
              sx={{ width: 100 }}
              defaultValue={deepPurple[400]}
              slotProps={{
                htmlInput: {
                  ref: colorPickerEl,
                },
              }}
            />
            <Button
              variant="text"
              color="primary"
              onClick={() =>
                addUserAndSet({ fullName: userName, email: userEmail, color: colorPickerEl.current?.value })
              }
            >
              Set User
            </Button>
          </Box>
        </Box>
        <Box display="flex" flexGrow={1} alignItems="stretch">
          {prevUsers.length > 0 && (
            <Paper
              elevation={2}
              sx={{ p: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', flexGrow: 1 }}
            >
              {prevUsers.map((u) => (
                <OdsAppBarAvatarButton
                  key={`useritem${u.fullName}`}
                  user={u}
                  onClick={() => useExistingUser(u)}
                  sx={{
                    backgroundColor: (theme) =>
                      currentUser.fullName === u.fullName ? theme.vars.palette.action.selected : undefined,
                  }}
                />
              ))}
            </Paper>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
