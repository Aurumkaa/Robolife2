// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
    Avatar,
    Card,
    CardContent,
    LinearProgress,
    linearProgressClasses,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from '@mui/material';
import { RiLeafLine } from 'react-icons/ri';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const CardStyle = styled(Card)(({ theme, color, colorbg }) => ({
    background: colorbg,
    marginBottom: '22px',
    overflow: 'hidden',
    color: '#787878',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: '157px',
        height: '157px',
        background: color,
        borderRadius: '50%',
        top: '-105px',
        right: '-96px'
    }
}));

const OtherCard = ({ color, type, result, lastData }) => {
    const theme = useTheme();
    return (
        <CardStyle color={color} colorbg={result.status ? 'rgba(255,233,239,0.6)' : theme.palette.primary.light}>
            <CardContent sx={{ p: 2 }}>
                <List sx={{ p: 0, m: 0 }}>
                    <ListItem alignItems="flex-start" disableGutters sx={{ p: 0 }}>
                        <ListItemAvatar sx={{ mt: 0 }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.largeAvatar,
                                    color: color,
                                    border: 'none',
                                    borderColor: color,
                                    background: '#fff',
                                    marginRight: '12px'
                                }}
                            >
                                {type === 'humidity' && <RiLeafLine size={30} />}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            sx={{ mt: 0 }}
                            primary={
                                <Typography variant="subtitle1" sx={{ color: '#4c4c4c' }}>
                                    {type === 'humidity' && 'Влажность листа (3 дня)'}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="caption">
                                    {result.fact}/{result.min} min
                                </Typography>
                            }
                        />
                    </ListItem>
                    {result.status && (
                        <>
                            <ListItem>
                                <Typography variant="body1">Внимание! Влажность листа последние три дня превышает 80% времени</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1">
                                    Возможна локализация грабковых болезней, а также паразитов. Рекоммендуется проверить данные. В случае
                                    необходимости провести мероприятия по защите растений.
                                </Typography>
                            </ListItem>
                        </>
                    )}
                </List>
            </CardContent>
        </CardStyle>
    );
};

export default OtherCard;
