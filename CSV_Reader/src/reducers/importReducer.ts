import {LOAD} from 'redux-storage';

export type ImportReducer = {
    link : string;
    date: Date;

}

export type ImportListReducer = {
    links: ImportReducer[];
}

const initState =  {
    links: [],
}

const importReducer = (state: ImportListReducer = initState, action: {type: string, payload: any}) => {
    switch (action.type) {

        case 'IMPORT_LINKS':
            // @ts-ignore
            let newLinks = [];
            action.payload.forEach(item => {
                const found = state.links.filter( record => record.link !== item.link);
                if(found.length){
                    newLinks.push(found[0]);
                }
            });
            return {
                links: [...state?.links, ...newLinks]
            }

        case 'LOAD_RECORD':
            return {
                links: [...state?.links,...action.payload.links]
            }
            break;
        case 'CLEAR_LIST':
             return {
                 links: []
             }

        default:
            return state

    }
}

export default importReducer;