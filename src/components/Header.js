import {AppBar, Badge, Button, Grid, Link, Skeleton, Toolbar, Typography} from "@mui/material";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function Header({onChartClicked, chartShown, isLoading}) {
    return (
        <header>
            <AppBar position="static" style={{background: 'white', boxShadow: 'none'}}>
                <Toolbar>
                    <Grid
                        justify="space-between"
                        container
                        spacing={1}>
                        <Grid item xs={9}>
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
                        </Grid>
                        <Grid item xs={3}>
                            {isLoading ? (
                                <></>
                            ) : (
                                <Button fullWidth color={"secondary"} variant="outlined" onClick={onChartClicked}>
                                    {chartShown ? (
                                        <InfoOutlinedIcon/>
                                    ) : (
                                        <ShowChartIcon/>
                                    )}
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </header>
    );
}

export default Header;
