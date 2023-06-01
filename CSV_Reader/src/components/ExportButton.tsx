import React from "react";
import {useSelector} from "react-redux";
import {Button} from "@mui/material";
import {AmazonSellerInformation, RESPONSE_TYPE} from "../reducers/exportReducer";
import {exportToCsv, searchForCommasInString} from "../utils/helper";

export type ExportButtonProps = {
    title: string;
    data: AmazonSellerInformation[],
    exportTitle: string;

}

export const ExportButton: React.FC<ExportButtonProps> = (props: ExportButtonProps) => {
    console.log(props.data)
    const exportRecords = useSelector((state: any) => state.exportRecords);
    const exportedItems = props.data.map(item => {
        return {
            ...item,
            exportJSON: item.exportJSON.replace(/\"/g, '""')
        }
    })

    const downloadCSV = (e: React.MouseEvent) => {
        let csvData = [];
        const [exportData] = exportedItems;
        const csvHeader =
            [
                'originalLink',
                'orderId',
                'brandName',
                'reviewId',
                'status',
                'asin',
                'childAsin',
                'asinTitle',
                'asinThumbnail',
                'asinWeightedStarRating',
                'reviewTitle',
                'reviewText',
                'reviewRating',
                'reviewAuthorPublicName',
                'reviewCreatedTimestamp',
                'reviewHasImages',
                'reviewIsVideo',
                'reviewIsVerifiedPurchase',
                'reviewMarkedAsDone',
                'reviewIsRepliedTo',
                'orderTimestamp',
                'isSellerOfRecord',
                'isDigitalOrder',
                'isBuyerOptedOut',
                'responseMessage',
                'url',
                'asinTotalReviewCount',
                'exportJSON'
            ]

        csvData.push(csvHeader); // Fill the CSV Format with Headers
        exportedItems.forEach(record => {
            const csvValues = {
                'originalLink': searchForCommasInString(record.originalLink,","),
                'orderId': searchForCommasInString(record.orderId,","),
                'brandName': searchForCommasInString(record.brandName,","),
                'reviewId': searchForCommasInString(record.reviewId,","),
                'status': searchForCommasInString(record.status,","),
                'asin': searchForCommasInString(record.asin,","),
                'childAsin': searchForCommasInString(record.childAsin,","),
                'asinTitle': searchForCommasInString(record.asinTitle,","),
                'asinThumbnail': searchForCommasInString(record.asinThumbnail,","),
                'asinWeightedStarRating': searchForCommasInString(record.asinWeightedStarRating,","),
                'reviewTitle': searchForCommasInString(record.reviewTitle,","),
                'reviewText': searchForCommasInString(record.reviewText,","),
                'reviewRating': searchForCommasInString(record.reviewRating,","),
                'reviewAuthorPublicName': searchForCommasInString(record.reviewAuthorPublicName,","),
                'reviewCreatedTimestamp': searchForCommasInString(record.reviewCreatedTimestamp,","),
                'reviewHasImages': searchForCommasInString(record.reviewHasImages,","),
                'reviewIsVideo': searchForCommasInString(record.reviewIsVideo,","),
                'reviewIsVerifiedPurchase': searchForCommasInString(record.reviewIsVerifiedPurchase,","),
                'reviewMarkedAsDone': searchForCommasInString(record.reviewMarkedAsDone,","),
                'reviewIsRepliedTo': searchForCommasInString(record.reviewIsRepliedTo,","),
                'orderTimestamp': searchForCommasInString(record.orderTimestamp,","),
                'isSellerOfRecord': searchForCommasInString(record.isSellerOfRecord,","),
                'isDigitalOrder': searchForCommasInString(record.isDigitalOrder,","),
                'isBuyerOptedOut': searchForCommasInString(record.isBuyerOptedOut,","),
                'responseMessage': searchForCommasInString(record.responseMessage,","),
                'url': searchForCommasInString(record.url,","),
                'asinTotalReviewCount': searchForCommasInString(record.asinTotalReviewCount,","),
                'exportJSON':  searchForCommasInString(record.exportJSON,",")
            }
            csvData.push(Object.values(csvValues));
        })
        return exportToCsv(props.exportTitle, csvData)

    }


    return (
        <>
            <Button onClick={downloadCSV} disabled={(exportedItems.length <= 0)}
                    title={exportedItems.length <= 0 ? 'There are no exported items' : ''} variant="contained"
                    size="medium">{props.title}</Button>
        </>
    )

}