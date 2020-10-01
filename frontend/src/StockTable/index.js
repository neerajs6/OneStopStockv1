import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

function createData(name, stat, stat1, stat2) {
    return { name, stat, stat1, stat2};
  }
  
  const rows = [
    createData('Previous Close', '1,556.96', 'Market Cap', '1.039T'),
    createData('Open', '1,560.64', 'Beta (5Y Monthly)', '1.08'),
    createData('Bid', '1,536.66 x 1000', 'PE Ratio (TTM)', '33.68'),
  ];

  const useStyles = makeStyles({
    table: {
      
    },
  });



export default function StockTable() {
    const classes = useStyles();


    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>

          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell >{row.stat}</TableCell>
                <TableCell >{row.stat1}</TableCell>
                <TableCell >{row.stat2}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    )
}