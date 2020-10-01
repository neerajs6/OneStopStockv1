export default  {
    getStockSymbols() {
        const stock = []
        const request = require('request');

        request('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=btf8alv48v6q15vvc6p0', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            body.forEach((item, index) => {
                stock.push({symbol:item['symbol'], company: item['description']});
            })

            return stock;
    
        });

        return stock;



    }


}