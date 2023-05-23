import React from 'react';
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const CardActivityChanges = (data) => {
    return (
        <div>
            <Card
                sx={{
                    ':hover': {
                        backgroundColor: 'rgba(205,219,227,0.18)' // theme.shadows[20]
                    }
                }}
                style={{ padding: 15 }}
            >
                <Grid container>
                    <Grid item sx={{ marginTop: '5px' }}>
                        <EditIcon />
                    </Grid>
                    <Grid item>
                        <CardHeader style={{ padding: 5 }} subheader={new Date(Date.parse(data.data.created)).toLocaleString()} />
                        <CardContent style={{ padding: 5 }}>
                            <Typography variant="body2" component="p">
                                Изменены осадки от {new Date(data.data.date).toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
            <Divider variant="middle" />
        </div>
    );
};

export default CardActivityChanges;
