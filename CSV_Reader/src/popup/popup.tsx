import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import {createRoot} from 'react-dom/client'
import {Box, Button, Tabs, TextField} from '@mui/material';
import DropFileBox from '../DropFileBox/DropFileBox';
import {LinearProgressWithLabel} from "../ProgressBar/ProgressBar"
import 'fontsource-roboto'
import './popup.css'
import rootReducer from "../reducers/rootReducers";
import {applyMiddleware, legacy_createStore as createStore} from "redux";
import {Provider, useDispatch, useSelector} from 'react-redux';
import createEngine from 'redux-storage-engine-localstorage';
import * as storage from 'redux-storage';
import {Input, Tab} from "@material-ui/core";
import {AmazonSellerInformation, RESPONSE_TYPE} from "../reducers/exportReducer";
import {CONSTANTS} from "../constants/constants";
import {useSellerAmazonLink} from "../hooks/useSellerAmazonLink";
import {getPercentage} from "../utils/helper";


let last = 0;
let connectID = null;



const App: React.FC<{}> = () => {
    //STATES
    const [progress, setProgress] = React.useState(0);
    const [requestPerBatches, setRequestPerBatches] = useState<any>(5);
    const [delayInSeconds, setDelayInSeconds] = useState<any>(10);

    const state = useSelector((state: any) => state);
    let importRecord = state?.importRecords?.links;
    let exportRecord = state?.exportRecords?.exports?.filter(item => item.status === RESPONSE_TYPE.PENDING) as [AmazonSellerInformation]
    const failedRecord = state?.exportRecords?.exports?.filter(item => item.status === RESPONSE_TYPE.FAILED) as [AmazonSellerInformation]
    const completed = state?.exportRecords?.exports?.filter(item => item.status === RESPONSE_TYPE.COMPLETED);
    const runningMode = state?.processData?.running;
    const dispatcher = useDispatch();
    const [toggle, setToggle] = useState<boolean>(false);

    const handleClick = (e: React.MouseEvent) => {
        dispatcher({type: 'START'})
    }
    const handleTransform = (e: React.MouseEvent) => {
        dispatcher({
            type: 'TRANSFORM_IMPORT_LINK',
            payload: importRecord.map(
                link => ({
                    link: useSellerAmazonLink({link}),
                    originalLink: link
                }))
        })
        dispatcher({type: 'CLEAR_LIST'});
    }

    let animationRef = useRef<number>();

    const loop = (timeStamp) => {
        let batchResponse = [];
        let timeInSecond = timeStamp / 1000;
        let reactive = [];
        reactive = exportRecord.filter(item => item.status === RESPONSE_TYPE.PENDING).slice(0,requestPerBatches);
        if (timeInSecond - last >= delayInSeconds) {

            console.log("Fired 10 Seconds....")


            new Promise((resolve) => {
                console.log('promise')
                let innerPromiseChain = [];
                reactive.forEach(record => {
                    console.log('loop')
                    innerPromiseChain.push(fetch(record.url, {
                        headers: {
                            'Content-type': 'application/json'
                        }
                    }).then(async (response) => {
                        if (response.status === 200) {
                            const data = await response.json();
                            batchResponse.push({...data,...{url: record.url}, status: RESPONSE_TYPE.COMPLETED});
                        } else {
                            batchResponse.push({...record, ...{url: record.url},status: RESPONSE_TYPE.FAILED});
                        }

                    }));
                });
                Promise.all(innerPromiseChain).then(result => resolve(null))
            }).then(() => {
                console.log(batchResponse);
                dispatcher({type: 'UPDATE_RESPONSE', payload: batchResponse});
            })


            last = timeInSecond
        }

        if(reactive.length){
            animationRef.current = requestAnimationFrame(loop);
        }else{
            cancelAnimationFrame(animationRef.current);
        }


    }


    // We need to trigger the code to download

    useLayoutEffect(() => {
        if(exportRecord.length > 0){
            setProgress(getPercentage(completed.length, state?.exportRecords?.exports.length));
            console.log(progress);
        }

        if (runningMode && exportRecord.length > 0) {
            console.log('fired trigger')
            animationRef.current = requestAnimationFrame(loop);
        }
        if (exportRecord.length <= 0 && runningMode) {
            setToggle(false)
            dispatcher({type: 'STOP'})
            setProgress(0);
        }

        return () => cancelAnimationFrame(animationRef.current)

    }, [exportRecord, runningMode])


    return (
        <>
            <Box mx={'4px'} my={'16px'}>

                <h1 className='ext_title'>CSV Reader</h1>
                <DropFileBox/>

                <Box style={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <small>No of Batches</small>
                    <input  disabled={runningMode === true} type={"number"} value={requestPerBatches} onChange={
                        e => {
                            setRequestPerBatches(e.target.value)
                        }} placeholder={"No of Requests per Batch"}  />

                </Box>
                <Box style={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <small>Delay: (Seconds)</small>
                    <input  disabled={runningMode === true} type={"number"} value={delayInSeconds} onChange={
                        e => setDelayInSeconds(e.target.value)}
                            placeholder={"Delay in Seconds"}  />

                </Box>

                <Box sx={{width: '100%'}} style={{paddingTop: '40px'}}>
                    {exportRecord.length > 0 &&
                        <Box style={{
                            marginBottom: '10px'
                        }}>
                            {(<span style={{
                                fontSize: '1.1em',

                            }}>{`${exportRecord?.length} Records waiting to be exported`}</span>)}
                        </Box>}
                    <LinearProgressWithLabel value={progress}/>
                    <span style={{
                        margin: '5px 0px',
                        color: 'red',
                        fontStyle: 'italic',
                        display: 'block'
                    }}>{`${failedRecord.length} failed to export, see options page`}</span>
                    <span style={{
                        margin: '5px 0px',
                        color: 'green',
                        fontStyle: 'italic',
                        display: 'block'
                    }}>{`${importRecord.length} previously imported files, click button to fetch`}</span>
                </Box>
                {importRecord.length <= 0 && (
                    <Button disabled={runningMode} onClick={handleClick} style={{
                        margin: '29px 0',
                        width: '100%'
                    }
                    } variant="contained" size="small">
                        {runningMode ? 'Stop Fetching' : 'Start Fetching Amazon Details'}
                    </Button>
                )}
                {
                    importRecord.length > 0 && (
                        <Button onClick={handleTransform} style={{
                            margin: '29px 0',
                            width: '100%'
                        }
                        } variant="contained" size="small">
                            Import Previous Imported files
                        </Button>
                    )
                }


            </Box>
        </>
    )
}
// Create the persistence engine
const engine = createEngine('amazon-records');
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
const store = createStoreWithMiddleware(rootReducer);
const load = storage.createLoader(engine);
load(store).then((state) => {
    store.dispatch({type: 'LOAD_RECORD', payload: state.importRecords})
    store.dispatch({type: 'LOAD_EXPORT', payload: state.exportRecords})
})


const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>
)


