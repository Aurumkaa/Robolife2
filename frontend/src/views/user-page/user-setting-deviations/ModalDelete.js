import React from 'react';
import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid } from '@mui/material';

const ModalDelete = ({ open, handleClose, data, dictDiviation }) => {
    return (
        <Dialog open={open.status} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }}>
            <DialogTitle sx={{ fontSize: '18px' }}>Удалить информирование об отклонении параметра</DialogTitle>
            <Divider />

            <DialogContent>
                <DialogContentText>
                    Вы действительно хотите удалить информирование об отклонении параметра{' '}
                    {dictDiviation?.find((el) => el.type === data?.find((val) => val.id === open.id)?.param_type)?.value}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={handleClose} value="true" variant="contained">
                            Да
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="error" onClick={handleClose}>
                            Отмена
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default ModalDelete;
