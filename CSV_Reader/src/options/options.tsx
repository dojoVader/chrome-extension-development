import React, {useState} from 'react'
import Pagination from 'rc-pagination';
import {createRoot} from 'react-dom/client'
import 'fontsource-roboto'
import './options.css'
import {Box, Card, CardContent, Grid, Typography} from '@material-ui/core'
import rootReducer from "../reducers/rootReducers";
import {applyMiddleware, legacy_createStore as createStore} from "redux";
import {Provider, useSelector} from 'react-redux';
import createEngine from 'redux-storage-engine-localstorage';
import * as storage from 'redux-storage';
import {AmazonSellerInformation, RESPONSE_TYPE} from "../reducers/exportReducer";
import {ExportButton} from '../components/ExportButton'


// Create the persistence engine
const engine = createEngine('amazon-records');
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
const store = createStoreWithMiddleware(rootReducer);
const load = storage.createLoader(engine);
load(store).then((state) => {
    store.dispatch({type:'LOAD_EXPORT',payload: state.exportRecords})
})




const App: React.FC = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  //@ts-ignore
  today = mm + '/' + dd + '/' + yyyy;


  // Load the record from the store

 const dataTable = useSelector((state: any) => state.exportRecords)?.exports;

 

  const [perPage, setPerPage] = useState(7);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const [completed, setCompleted] = useState(false)

  const PerPageChange = (value) => {
      setSize(value);
      const newPerPage = Math.ceil(dataTable.length / value);
      if (current > newPerPage) {
          setCurrent(newPerPage);
      }
  }

    const getData = (current, pageSize): AmazonSellerInformation[] => {
        // Normally we should get the data from the server
        return dataTable.slice((current - 1) * pageSize, current * pageSize);
    };

    const PaginationChange = (page, pageSize) => {
      setCurrent(page);
      setSize(pageSize)
  }

  const PrevNextArrow = (current, type, originalElement) => {
      if (type === 'prev') {
          return <button><i className="fa fa-angle-double-left"></i></button>;
      }
      if (type === 'next') {
          return <button><i className="fa fa-angle-double-right"></i></button>;
      }
      return originalElement;
  }


return (
  <Box mx="6%" my="1%" >
    <Card style={{
        padding: '2%'
    }}>

      <CardContent>
        <Grid container direction='column' >
          <Typography style={{marginLeft: "auto", marginRight: "auto", color: "#2196f3", fontSize: "25px"}}>CSV Reader Status Table</Typography>
        </Grid>
      </CardContent>
        <Box sx={{ height: 500, width: '100%' }} style={{marginTop: "8px"}} >

        <div className="container-fluid mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-md-10">

                <div className="table-filter-info">
                <ExportButton data={dataTable} exportTitle={'export-json.csv'} title={'Export to JSON'}></ExportButton>
            </div>
              <div className="card p-5">
                <div className="card-body p-0"> 

                    <div className="table-responsive">
                      <table className="table table-text-small mb-0">
                        <thead className="thead-primary table-sorting">
                          <tr>
                              <th>brand name</th>
                              <th>asin</th>
                              <th>reviewisrepliedto</th>
                              <th>responsemessage</th>
                              <th>url</th>
                              <th>status</th>
                          </tr>
                        </thead>
                          <tbody>
                            {
                              getData(current, size).map((data, index) => {
                                return (
                                  <tr key={data.url}>
                                    <td>{data.brandName}</td>
                                    <td>{data.asin} </td>
                                      <td>{data.reviewIsRepliedTo}</td>
                                      <td>{data.responseMessage}</td>
                                      <td>{data.url}</td>

                                      <td><span style={data.status === RESPONSE_TYPE.COMPLETED ? {backgroundColor: "green", color: "white", padding: "5px", borderRadius: "3px"} : {backgroundColor: "red", color: "white", padding: "5px", borderRadius: "3px"}}>
                                      {data.status}</span>
                                      </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                          </table>
                      </div>
                      <div className="table-filter-info">  
                        <Pagination
                          className="pagination-data"
                          showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                          onChange={PaginationChange}
                          total={dataTable.length}
                          current={current}
                          pageSize={size}
                          showSizeChanger={false}
                          itemRender={PrevNextArrow}
                          onShowSizeChange={PerPageChange}
                        />
                    </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Card>
    </Box>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)

const root = createRoot(container)
root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )