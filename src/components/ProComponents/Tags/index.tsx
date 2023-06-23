import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { FCC } from 'types/react';

export type TagSeverity =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'warning'
  | 'success'
  | 'grey';

// Tag component (standalone)
interface TagProps {
  color?: TagSeverity;
}
export const Tag: FCC<TagProps> = (props) => {
  const { color: severity = 'primary', children } = props;
  const theme = useTheme();

  const bgcolor =
    severity === 'grey'
      ? theme.palette['grey']['300']
      : theme.palette[severity].main;

  const color =
    severity === 'grey'
      ? theme.palette.getContrastText(bgcolor)
      : theme.palette[severity].contrastText;

  return (
    <Typography
      variant="caption"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none',
        color,
        bgcolor,
        minWidth: 20,
        borderRadius: '4px',
        lineHeight: 'revert',
        padding: (theme) => theme.spacing(0.5, 1),
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </Typography>
  );
};

// Tag container
interface TagsProps<T extends any[]> {
  items: T;
  renderLabel: (item: T[number]) => string;
  color: TagSeverity;
}
export const Tags = <T extends any[]>(props: TagsProps<T>) => {
  const { items, renderLabel, color } = props;

  if (!Array.isArray(items)) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {items.map((item, i) => (
        <Tag key={i} color={color}>
          {renderLabel(item)}
        </Tag>
      ))}
    </Box>
  );
};
