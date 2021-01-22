import {instance} from './api';
import {CardPacksFilterType, CardPacksType} from '../Redux/reducers/cardsPackReducer';

export type GetCardPacksResponseType = {
    cardPacks: CardPacksType[],
    page: number,
    pageCount: number,
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
    token: string,
    tokenDeathTime: string
}

export type UpdateCardsPackType = {
    _id: string,
    name: string
}

export const cardPacksAPI = {
    getCardPacks(filter: CardPacksFilterType, page: number = 1, pageCount: number = 15) {
        let {packName = '', min, max} = filter
        return instance.get<GetCardPacksResponseType>(`cards/pack?packName=${packName}&min=${min}&max=${max}&page=${page}&pageCount=${pageCount}`);
    },
    createCardsPack(cardsPack: CardPacksType) {
        return instance.post('cards/pack', {cardsPack});
    },
    updateCardsPack(cardsPack: CardPacksType) {
        return instance.put('cards/pack', {cardsPack});
    },
    deleteCardsPack(id: string) {
        return instance.delete(`cards/pack?id=${id}`);
    }
}