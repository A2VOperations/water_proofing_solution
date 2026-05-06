import { useTheme } from 'styled-components';

export function StyledComponent({ children }) {
  const theme = useTheme();
  return <div style={{ width: theme?.sizes?.full || '100%' }}>{children}</div>;
}
