
export type AmazonLink = {
  link: string;
}

const REGULAR_EXPRESSION_MATCHER_REVIEW = /.*\/customer-reviews\/(\w+)\//;
const SELLER_ENDPOINT_URI = `https://sellercentral.amazon.com/brandcustomerreviews/api/reviews/`;

export const useSellerAmazonLink = (props: AmazonLink) => {

    const amazonLink = REGULAR_EXPRESSION_MATCHER_REVIEW.exec(props.link);
    if(amazonLink !== null){
        return SELLER_ENDPOINT_URI.replace("/reviews/",`/reviews/${amazonLink[1]}`);
    }
}