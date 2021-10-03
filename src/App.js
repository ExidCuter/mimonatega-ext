import {Alert, AlertTitle, Container} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import Header from "./components/Header";
import DetailsTable from "./components/DetailsTable";
import Chart from "./components/Chart";

function App() {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [chartShown, setChartShown] = useState(false);
    const [isOnMimovrste, setOnMimovrste] = useState(false);
    const [alert, setAlert] = useState(false);
    const [url, setUrl] = useState("");

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
            readUrlAndGet("https://www.mimovrste.com/ssd-diski/wd-ssd-disk-green-sata3-635-cm-25-240-gb-wds240g2g0a"); // in browser debugging
        }

    }, []);

    const readUrlAndGet = (url) => {
        if (url.startsWith("https://www.mimovrste.com")) {
            setOnMimovrste(true);

            if (url.endsWith(".com")) {
                setAlert(true);
                return;
            }

            setUrl(`https://beta.mimonatega.td-fl.org/item?url=${url}`)
            axios.get(`https://api.mimonatega.td-fl.org/api/v1/items?search=${url}`)
                .then(res => {
                    if (res.data.data[0] === undefined) {
                        setAlert(true);
                    } else {
                        setItem(res.data.data[0]);
                        setLoading(false);
                    }
                })
                .catch((e) => {
                    setAlert(true);
                });
        }
    }

    return (
        <>
            <Header isLoading={loading} onChartClicked={() => {
                setChartShown(!chartShown)
            }} chartShown={chartShown}/>
            <Container maxWidth={"xs"} style={{padding: 0, width: 352}}>
                {isOnMimovrste ? (
                    !chartShown ? (
                        <DetailsTable item={item} isLoading={loading} url={url} alert={alert}/>
                    ) : (
                        <Chart prices={item.prices}/>
                    )
                ) : (
                    <Alert severity="error">
                        <AlertTitle>Napaka</AlertTitle>
                        Ne nahajate se na <strong>mimovrste.com</strong>
                    </Alert>
                )}

            </Container>
        </>
    );
}

export default App;
