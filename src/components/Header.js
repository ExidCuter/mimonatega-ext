import {AppBar, Badge, Box, Button, Link, Stack, Toolbar, Typography, useMediaQuery} from "@mui/material";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function Header({onChartClicked, chartShown, isLoading}) {
    const isDarkModeEnabled = useMediaQuery('(prefers-color-scheme: dark)');

    return (
        <header>
            <AppBar position="static" style={{background: !isDarkModeEnabled ? 'white' : "#121212", boxShadow: 'none'}}>
                <Toolbar>
                    <Box sx={{width: "100%"}}>
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            spacing={1}>
                            <Badge
                                color="secondary"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                badgeContent="Beta">
                                <Typography component={Link} s to="/" style={{textDecoration: "none"}} type="title"
                                            variant={"h5"} color="textPrimary">
                                    MIMONATEGA
                                </Typography>
                            </Badge>

                            <Button color={"secondary"} variant="outlined" onClick={onChartClicked}>
                                {chartShown ? (
                                    <InfoOutlinedIcon/>
                                ) : (
                                    <ShowChartIcon/>
                                )}
                            </Button>
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
        </header>
    );
}

export default Header;
