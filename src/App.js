import {Alert, AlertTitle, Container, createTheme, CssBaseline, Paper, ThemeProvider, ToggleButton, ToggleButtonGroup, useMediaQuery} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import Header from "./components/Header";
import DetailsTable from "./components/DetailsTable";
import Chart from "./components/Chart";
import {subMonths} from "date-fns";


function App() {
    const isDarkModeEnabled = useMediaQuery('(prefers-color-scheme: dark)');
    const darkTheme = createTheme({
        palette: {
            mode: isDarkModeEnabled ? 'dark' : 'light',
            background: {
                default: isDarkModeEnabled ? '#222222' : "#f5f5f5",
            },
        },
    })

    const [item, setItem] = useState(null);
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chartShown, setChartShown] = useState(false);
    const [isOnMimovrste, setOnMimovrste] = useState(false);
    const [alert, setAlert] = useState(false);
    const [url, setUrl] = useState("");
    const [period, setPeriod] = useState(3);


    useEffect(() => {
        let sUsrAg = navigator.userAgent;

        try {
            if (sUsrAg.indexOf("Firefox") > -1) {
                // eslint-disable-next-line no-undef
                browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
                    readUrlAndGet(tabs[0].url);
                })
            } else if (sUsrAg.indexOf("Chrome") > -1) {
                // eslint-disable-next-line no-undef
                chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
                    readUrlAndGet(tabs[0].url);
                });
            }
        } catch (e) {
            readUrlAndGet("https://www.mimovrste.com/led-lcd-televizorji/philips-43pus8007-12-4k-uhd-dled-televizor-saphi-os-ambilight"); // in browser debugging
        }

    }, [period]);

    const readUrlAndGet = (url) => {
        if (url.startsWith("https://www.mimovrste.com")) {
            setOnMimovrste(true);

            if (url.endsWith(".com") || url.endsWith(".com/")) {
                setAlert(true);
                return;
            }
            setLoading(true);
            setUrl(`https://beta.mimonatega.td-fl.org/item?url=${url}`)
            axios.get(`https://api.mimonatega.td-fl.org/api/v1/items?search=${url}`)
                .then(res => {
                    if (res.data.data[0] === undefined) {
                        setAlert(true);
                    } else {
                        setItem(res.data.data[0]);
                        axios.get(`https://api.mimonatega.td-fl.org/api/v1/items/prices/${res?.data?.data[0].id}`, {
                            params: {
                                from: subMonths(new Date(), period).toISOString(),
                                to: new Date().toISOString()
                            }
                        }).then(res => {
                            setPrices(res.data.data)
                            setLoading(false);
                        })
                    }
                })
                .catch((e) => {
                    setAlert(true);
                });
        }
    }

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <Header isLoading={loading} onChartClicked={() => {
                    setChartShown(!chartShown)
                }} chartShown={chartShown}/>
                <Container maxWidth={"xs"} style={{padding: 0, width: 352}}>
                    {isOnMimovrste ? (
                        !chartShown ? (
                            <DetailsTable item={item} prices={prices} isLoading={loading} url={url} alert={alert}/>
                        ) : (<Paper variant={"outlined"}>
                                <ToggleButtonGroup
                                    color="primary"
                                    size={"small"}
                                    value={period}
                                    sx={{p: 3, display: "flex", justifyContent: "flex-end"}}
                                    exclusive
                                    aria-label="period"
                                    onChange={(event, value) => {
                                        if (value) {
                                            setPeriod(value);
                                        }
                                    }}
                                >
                                    <ToggleButton value={3}>3 mesece</ToggleButton>
                                    <ToggleButton value={6}>6 mesecev</ToggleButton>
                                    <ToggleButton value={96}>Vse</ToggleButton>
                                </ToggleButtonGroup>
                                <Chart prices={prices}/>
                            </Paper>
                        )
                    ) : (
                        <Alert severity="error">
                            <AlertTitle>Napaka</AlertTitle>
                            Ne nahajate se na <strong>mimovrste.com</strong>
                        </Alert>
                    )}

                </Container>
            </ThemeProvider>
        </>
    );
}

export default App;
