// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { RiLeafLine } from 'react-icons/ri';
import { TbTemperaturePlus } from 'react-icons/tb';
import { GiPlantWatering } from 'react-icons/gi';

// assets

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
        <CardStyle color={color} colorbg={result.status ? 'rgba(255,233,239,0.6)' : 'rgba(231,241,255,0.6)'}>
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
                                {type === 'frost' && <RiLeafLine size={30} />}
                                {type === 'warm' && <TbTemperaturePlus size={30} />}
                                {type === 'temp_normal' && <TbTemperaturePlus size={30} />}
                                {type === 'temp_many' && <TbTemperaturePlus size={30} />}
                                {type === 'prec' && <GiPlantWatering size={30} />}
                                {type === 'prec_normal' && <GiPlantWatering size={30} />}
                                {type === 'prec_many' && <GiPlantWatering size={30} />}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            sx={{ mt: 0 }}
                            primary={
                                <Typography variant="subtitle1" sx={{ color: '#4c4c4c' }}>
                                    {type === 'humidity' && 'Влажность листа (3 дня)'}
                                    {type === 'frost' && 'Заморозки'}
                                    {type === 'warm' && 'Недостаток тепла'}
                                    {type === 'prec' && 'Недостаток влаги'}
                                    {type === 'prec_normal' && 'Достоточное количество влаги'}
                                    {type === 'prec_many' && 'Переизбыток влаги'}
                                    {type === 'temp_normal' && 'Достоточное количество тепла'}
                                    {type === 'temp_many' && 'Переизбыток тепла'}
                                </Typography>
                            }
                            secondary={
                                (type === 'humidity' && (
                                    <Typography variant="caption">
                                        {result.fact}/{result.min} min
                                    </Typography>
                                )) ||
                                (type === 'frost' && <Typography variant="caption">Вероятны заморозков в ближайшие дни</Typography>) ||
                                (type === 'warm' && <Typography variant="caption">Возможна задержка роста растения</Typography>) ||
                                (type === 'prec' && (
                                    <Typography variant="caption">Возможна задержка роста растения, увядание</Typography>
                                )) ||
                                (type === 'prec_normal' && (
                                    <Typography variant="caption">
                                        Выпало достаточное количество осадков для обеспечения растений влагой
                                    </Typography>
                                )) ||
                                (type === 'temp_normal' && (
                                    <Typography variant="caption">
                                        Достаточное количество тепла для обеспечения нормального роста и развития растений в период
                                        вегетации
                                    </Typography>
                                )) ||
                                (type === 'temp_many' && (
                                    <Typography variant="caption">
                                        Переизбыток тепла для растения может свидетельствовать, что фаза вегетации закончилась раньше, чем
                                        настроеный период. Рекомендован ранний сбор урожая.
                                    </Typography>
                                )) ||
                                (type === 'prec_many' && (
                                    <Typography variant="caption">Переизбыток влаги для растения в период вегетации</Typography>
                                ))
                            }
                        />
                    </ListItem>
                    {result.status && type === 'humidity' && (
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
                    {result.status && type === 'frost' && (
                        <>
                            <ListItem>
                                <Typography variant="body1">
                                    Заморозки негативно сказываются на росте и развитие растений. Рекоммендуется проверить данные. В случае
                                    необходимости провести мероприятия по защите растений (химические обработки, дождевание).
                                </Typography>
                            </ListItem>
                        </>
                    )}
                    {result.status && type === 'warm' && (
                        <ListItem>
                            <Typography variant="body1">
                                Рекомендуется подбор менее теплозависимых растений(гибридов) для данной локации
                            </Typography>
                        </ListItem>
                    )}
                    {result.status && type === 'prec' && (
                        <ListItem>
                            <Typography variant="body1">
                                Рекомендуется использование технологий орошения, подбор менее влагозависимых растений (гибридов),
                                основательная подготовка почвы в будущем сезоне для повышения продуктивной влаги в почве
                            </Typography>
                        </ListItem>
                    )}
                    {result.status && type === 'prec_many' && (
                        <ListItem>
                            <Typography variant="body1">
                                Данное явление может способствовать локализации болезней (в частности грибковых), а также различных
                                паразитов. Рекомендуется по необходимости проводить химические обработки.
                            </Typography>
                        </ListItem>
                    )}
                </List>
            </CardContent>
        </CardStyle>
    );
};

export default OtherCard;
