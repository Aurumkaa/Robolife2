import React from 'react';
import { Card, CardContent, CardHeader, Divider, Grid, Icon, Typography } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

// eslint-disable-next-line react/prop-types
const CardActivity = ({ data }) => {
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
                        <CommentIcon />
                    </Grid>
                    <Grid item>
                        <CardHeader style={{ padding: 5 }} subheader={new Date(Date.parse(data.created)).toLocaleString()} />
                        <CardContent style={{ padding: 5 }}>
                            <Typography variant="body2" component="p">
                                Оставлен комментарий "{data.message}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
            <Divider variant="middle" />
        </div>
    );
};

export default CardActivity;
