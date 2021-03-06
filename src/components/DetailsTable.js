import {
    Alert,
    AlertTitle,
    Button,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Tooltip
} from "@mui/material";

function DetailsTable({item, prices, isLoading, url, alert}) {
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

        return max;
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

        return min
    }

    const getCurrentPrice = () => {
        prices.sort((a, b) => (new Date(a.parsedAt) > new Date(b.parsedAt)) ? 1 : -1)

        return prices[prices.length - 1].price;
    }

    return (
        <Paper style={{marginTop: 10}} variant={"outlined"}>
            { !alert ? (
                <Table width={"100%"}>
                    <TableBody>
                        <TableRow>
                            <TableCell align={"center"} colSpan={2}>
                                {isLoading ? (
                                    <Skeleton variant="rectangular" animation="wave" width={"100%"} height={130}/>
                                ) : (
                                    <img src={item.image + "/350/350"} alt={item.name} style={{marginTop: 10, marginBottom: 10, maxHeight: 130}}/>  // thenks klemn
                                )}

                            </TableCell>
                        </TableRow>
                        <Tooltip title="Cena se lahko razlikuje od trenutne cene izdelka" placement="top">
                            <TableRow>
                                <TableCell>
                                    Trenutna cena*
                                </TableCell>
                                <TableCell align="center">
                                    {isLoading ? (
                                        <Skeleton animation="wave" />
                                    ) : (
                                        `${getCurrentPrice().toFixed(2)} ???`
                                    )}

                                </TableCell>
                            </TableRow>
                        </Tooltip>
                        <Tooltip title="Zabele??ena cena je lahko napa??na" placement="top">
                            <TableRow>
                                <TableCell>
                                    Najni??ja zabele??ena cena*
                                </TableCell>
                                <TableCell align="center">
                                    {isLoading ? (
                                        <Skeleton animation="wave" />
                                    ) : (
                                        `${calculateMin().toFixed(2)} ???`
                                    )}
                                </TableCell>
                            </TableRow>
                        </Tooltip>
                        <Tooltip title="Zabele??ena cena je lahko napa??na" placement="top">
                            <TableRow>
                                <TableCell>
                                    Najvi??ja zabele??ena cena*
                                </TableCell>
                                <TableCell align="center">
                                    {isLoading ? (
                                        <Skeleton animation="wave" />
                                    ) : (
                                        `${calculateMax().toFixed(2)} ???`
                                    )}
                                </TableCell>
                            </TableRow>
                        </Tooltip>
                        <TableRow>
                            <TableCell align={"center"} colSpan={2} style={{borderBottom: "none"}}>
                                <Button variant={"outlined"} fullWidth onClick={() => {
                                    window.open(url, '_blank').focus();
                                }}>Ve?? informacij</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            ) : (
                <Alert severity="error">
                    <AlertTitle>Napaka</AlertTitle>
                    Odprite stran z izdelkom
                </Alert>
            )}
        </Paper>
    );
}

export default DetailsTable;
