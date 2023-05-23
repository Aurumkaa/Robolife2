import React from 'react';
import { Avatar, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const OtherCard = () => {
    return (
        <CardStyle>
            <CardContent sx={{ p: 2 }}>
                <List sx={{ p: 0, m: 0 }}>
                    <ListItem alignItems="flex-start" disableGutters sx={{ p: 0 }}>
                        <ListItemAvatar sx={{ mt: 0 }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.largeAvatar,
                                    color: theme.palette.primary.main,
                                    border: 'none',
                                    borderColor: theme.palette.primary.main,
                                    background: '#fff',
                                    marginRight: '12px'
                                }}
                            >
                                <TableChartOutlinedIcon fontSize="inherit" />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            sx={{ mt: 0 }}
                            primary={
                                <Typography variant="subtitle1" sx={{ color: theme.palette.primary[800] }}>
                                    Get Extra Space
                                </Typography>
                            }
                            secondary={<Typography variant="caption"> 28/23 GB</Typography>}
                        />
                    </ListItem>
                </List>
                <LinearProgressWithLabel value={80} />
            </CardContent>
        </CardStyle>
    );
};

export default OtherCard;
