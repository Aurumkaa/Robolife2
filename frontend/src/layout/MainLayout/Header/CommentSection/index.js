import { Avatar, Box, ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCallback, useRef } from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import { useDispatch } from 'react-redux';

const CommentSection = () => {
    const theme = useTheme();
    const anchorRef = useRef();
    const dispatch = useDispatch();
    const handleClick = useCallback(() => {
        const modalWindowData = {
            status: true,
            date: new Date().getTime()
        };
        dispatch({
            type: 'SET_STATE_MODAL',
            ...modalWindowData
        });
    }, [dispatch]);
    return (
        <Box
            sx={{
                ml: 1,
                mr: 3,
                [theme.breakpoints.down('md')]: {
                    mr: 2
                }
            }}
            style={{ position: 'relative' }}
        >
            <ButtonBase sx={{ borderRadius: '12px' }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        transition: 'all .2s ease-in-out',
                        background: theme.palette.info.light,
                        color: 'white',
                        '&:hover': {
                            background: theme.palette.info.dark,
                            color: 'white'
                        }
                    }}
                    ref={anchorRef}
                    aria-haspopup="true"
                    onClick={handleClick}
                    color="inherit"
                >
                    <CommentIcon size="1.3rem" />
                </Avatar>
            </ButtonBase>
        </Box>
    );
};

export default CommentSection;
