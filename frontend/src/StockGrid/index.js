
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import StockGridDesktop from '../StockGridDesktop';
import StockGridMobile from '../StockGridMobile';

export default function StockGrid(){
  const theme = useTheme();
  const mobile  = useMediaQuery('(min-width:600px)');
  console.log(mobile)

  return (
      <span>
        {mobile ? <StockGridDesktop /> : <StockGridMobile />}
     </span>
  );
}