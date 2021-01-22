import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    addCardPacks,
    CardPacksFilterType,
    CardPacksType,
    deleteCardPacks,
    getCardPacks, updateCardPacks
} from '../../Redux/reducers/cardsPackReducer';
import {RootStateType} from '../../Redux/store';
import Input from '../SuperComponents/Input/Input';
import Button from '../SuperComponents/Button/Button';
import DoubleRange from '../SuperComponents/DoubleRange/DoubleRange';

import style from './CardPacks.module.css'
import CardPacksElement from './CardPaksElement/CardPacksElement';
import UserIsNotAuthorized from '../Login/UserIsNotAuthorized';
import {Redirect} from 'react-router-dom';
import {path} from '../../App';

type CardPropsType = {}

const CardPacks: React.FC<CardPropsType> = (props) => {

    const cardPacks = useSelector<RootStateType, CardPacksType[]>(state => state.cardsPack.cardPacks)
    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)

    // const pageCount = useSelector<RootStateType, number>(state => state.cardsPack.pageCount)
    // const page = useSelector<RootStateType, number>(state => state.cardsPack.page)

    const filter = useSelector<RootStateType, CardPacksFilterType>(state => state.cardsPack.filter)

    const [inputValue, setInputValue] = useState<string>('')
    const [range, setRange] = useState([0, 15])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCardPacks(filter))
    }, [])

    const onSearch = () => {
        dispatch(getCardPacks({packName: inputValue, min: range[0], max: range[1]}))
    }

    function genID(serverNum: number) {
        return (serverNum + '' + (new Date).getTime());
    }

    //fake obj
    const cardTestObj: CardPacksType = {
        '_id': genID(5),
        name: 'New cart Sergey',
        type: 'Test cardPacks 007'
    }

    const onAddCardPacks = () => {
        dispatch(addCardPacks(cardTestObj))
    }

    const changeCardPacks = (cardsPack: CardPacksType) => {
        dispatch(updateCardPacks(cardsPack))
    }

    const removeCardPacks = (_id: string) => {
        dispatch(deleteCardPacks(_id))
    }

    if (!isAuth) {
        return <Redirect to={path.LOGIN}/>
    }

    return <div>
        <div className={style.search}>
            <DoubleRange range={range} setRange={setRange}/>
            <Input onChange={(e) => setInputValue(e.currentTarget.value)}/>
            <Button onClick={onSearch}>Search</Button>
            <Button onClick={onAddCardPacks}>Add CardPacks</Button>
            {
                cardPacks.map((p: CardPacksType) => <CardPacksElement key={p._id}
                                                                      cardPack={p}
                                                                      updateCardPacks={changeCardPacks}
                                                                      removeCardPacks={removeCardPacks}/>)
            }
        </div>
    </div>
}

export default CardPacks