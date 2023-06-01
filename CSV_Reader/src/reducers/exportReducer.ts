import {ReducerAction} from "react";
import {ImportListReducer} from "./importReducer";
import * as url from "url";

export const enum RESPONSE_TYPE {
    FAILED = -1,
    PENDING = 0,
    COMPLETED = 1
}

export type AmazonSellerInformation = {
    brandName: string;
    asin: string;
    childAsin: string;
    asinTitle: string;
    asinThumbnail: string;
    asinWeightedStarRating: number;
    reviewId: string;
    reviewTitle: string;
    reviewText: string;
    reviewRating: number;
    reviewAuthorPublicName: string;
    reviewCreatedTimestamp: string;
    reviewHasImages: boolean;
    reviewIsVideo: boolean;
    reviewIsVerifiedPurchase: boolean;
    reviewMarkedAsDone: boolean;
    reviewIsRepliedTo: boolean;
    orderId: string;
    orderTimestamp: string;
    isSellerOfRecord: boolean;
    isDigitalOrder: boolean;
    isBuyerOptedOut: boolean;
    responseMessage: string;

    asinTotalReviewCount: string;
    url: string;
    status: RESPONSE_TYPE;
    originalLink: string;
    exportJSON?: string;


}

export type exportAmazonReducer = {
    exports: AmazonSellerInformation[];
}

const initState = {
    exports: []
}

const defaultProps: AmazonSellerInformation = {
    brandName: null,
    asin: null,
    childAsin: null,
    asinTitle: null,
    asinThumbnail: null,
    asinWeightedStarRating: null,
    reviewId: null,
    reviewTitle: null,
    reviewText: null,
    reviewRating: null,
    reviewAuthorPublicName: null,
    reviewCreatedTimestamp: null,
    reviewHasImages: null,
    reviewIsVideo: null,
    reviewIsVerifiedPurchase: null,
    reviewMarkedAsDone: null,
    reviewIsRepliedTo: null,
    orderId: null,
    orderTimestamp: null,
    isSellerOfRecord: null,
    isDigitalOrder: null,
    isBuyerOptedOut: null,
    responseMessage: null,
    url: null,
    status: RESPONSE_TYPE.PENDING,
    originalLink: null,
    asinTotalReviewCount: null

}

const exportReducer = (state: exportAmazonReducer = initState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'COMPLETED':
        case 'FAILED':
        case 'TIMEOUT':
            return state;
            break;

        case 'UPDATE':
            return {...state, ...action.payload}

        case 'TRANSFORM_IMPORT_LINK':
            const newStates = action.payload.map(item => ({
                ...defaultProps,
                ...{url: item.link, originalLink: item.originalLink }
            }));
            return {
                ...state,
                ...{exports: newStates}
            }

        case 'LOAD_EXPORT':
            return {
                ...state,
                ...action.payload
            }
        case 'UPDATE_RESPONSE':
            // We need to update the original record based on the record link
            action.payload.forEach(item => {
               state.exports.forEach((record,index) => {
                   if(record.url === item.url){
                       state.exports[index] = {...state.exports[index],...item}
                       state.exports[index].exportJSON = JSON.stringify(item);
                   }
               });

            });
            return {
                exports: [...state.exports]
            }
        default:
            return {
                ...state
            }


    }
}

export default exportReducer;