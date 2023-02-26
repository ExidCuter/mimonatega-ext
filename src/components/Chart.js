import {ResponsiveLine} from "@nivo/line";
import {Box, Paper, useMediaQuery} from "@mui/material";

function Chart({prices}) {
    const isDarkModeEnabled = useMediaQuery('(prefers-color-scheme: dark)');

    const calculateMax = () => {
        let max = 0;
        prices.forEach(currPrice => {
            if (currPrice.price > max) {
                max = currPrice.price;
            }

            if (currPrice.lowestProductPrice > max) {
                max = currPrice.lowestProductPrice;
            }

            if (currPrice.msrpPrice > max) {
                max = currPrice.msrpPrice;
            }
        });

        return max + 10;
    }

    const calculateMin = () => {
        let min = calculateMax();

        prices.forEach(currPrice => {
            if (currPrice.price < min) {
                min = currPrice.price;
            }

            if (currPrice.lowestProductPrice < min) {
                min = currPrice.lowestProductPrice;
            }

            if (currPrice.msrpPrice < min) {
                min = currPrice.msrpPrice;
            }
        });

        return min <= 0 ? 0 : min - 10;
    }


    const transformPricesToData = () => {
        const rawData = [];

        const msrpPrice = {
            id: "MSRP Cena",
            data: []
        }

        const price = {
            id: "Cena",
            data: []
        }

        prices.sort((a, b) => (new Date(a.parsedAt) > new Date(b.parsedAt)) ? 1 : -1)

        prices.forEach(currPrice => {
            price.data.push({
                x: currPrice.parsedAt.substr(0, 16),
                y: currPrice.price.toFixed(2)
            });

            msrpPrice.data.push({
                x: currPrice.parsedAt.substr(0, 16),
                y: currPrice.msrpPrice.toFixed(2)
            });
        });

        rawData.push(price);
        rawData.push(msrpPrice);

        return rawData;
    }

    return (
        <Box style={{height: 430, marginRight: 0}}>
            <ResponsiveLine
                theme={isDarkModeEnabled ? {
                    "textColor": "#ffffff",
                    "fontSize": 11,
                    "axis": {
                        "domain": {
                            "line": {
                                "stroke": "#ffffff",
                            }
                        },
                        "legend": {
                            "text": {
                                "fill": "#ffffff"
                            }
                        },
                        "ticks": {
                            "text": {
                                "fill": "#bdbdbd"
                            }
                        }
                    },
                    "grid": {
                        "line": {
                            "stroke": "#bdbdbd",
                        }
                    },
                    "legends": {
                        "title": {
                            "text": {
                                "fill": "#ffffff"
                            }
                        },
                        "text": {
                            "fill": "#ffffff"
                        },
                        "ticks": {
                            "text": {
                                "fill": "#ffffff"
                            }
                        }
                    },
                    "annotations": {
                        "text": {
                            "fontSize": 13,
                            "fill": "#333333",
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        },
                        "link": {
                            "stroke": "#000000",
                            "strokeWidth": 1,
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        },
                        "outline": {
                            "stroke": "#000000",
                            "strokeWidth": 2,
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        },
                        "symbol": {
                            "fill": "#000000",
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        }
                    },
                    "tooltip": {
                        "container": {
                            "background": "#484848",
                            "color": "#ffffff",
                        },
                    }
                }: {}}
                data={transformPricesToData()}
                margin={{top: 0, right: 40, bottom: 80, left: 70}}
                colors={{scheme: 'category10'}}
                xScale={{
                    type: "time",
                    format: "%Y-%m-%dT%H:%M",
                    precision: "minute"
                }}
                xFormat="time:%Y-%m-%d"
                yScale={{type: 'linear', max: calculateMax(), min: calculateMin()}}
                curve="monotoneX"
                axisBottom={null}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Cena',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                pointBorderWidth={2}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-left',
                        direction: 'column',
                        justify: false,
                        translateX: -50,
                        translateY: 50,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,

                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </Box>
    );
}

export default Chart;
