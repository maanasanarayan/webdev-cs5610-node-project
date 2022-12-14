import * as stockDao from './stocks-dao.js'

export const getStocks = () => stocks;

const StocksController = (app) => {
    const createStock   = async (req, res) => {
        const stock = req.body
         //stock["_id"] = (new Date()).getTime() + ''
         stock["likes"] = 0
         stock["liked"] = false
         stock["title"] = stock['instrument_name']
        console.log("Stocks in createStock :", stock)
         //stocks.push(stock)
        const actualStock = await stockDao.createStock(stock)
        res.send(actualStock)
    }
    const findAllStocks = async (req, res) => {
        const stocksInDatabase = await stockDao.findAllStocks()
        res.send(stocksInDatabase)
    }
    const updateStock   = (req, res) => {
    }
    const deleteStock   = async (req, res) => {
        const sid = req.params['sid']
        const status = await stockDao.deleteStock(sid)
        /*stocks = stocks.filter(
             (m) => m._id !== mid)*/
        res.send(status)
    }

    app.post  ('/stocks', createStock)
    app.get   ('/stocks', findAllStocks)
    app.put   ('/stocks/:sid', updateStock)
    app.delete('/stocks/:sid', deleteStock)
}

export default StocksController;