import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styled from "styled-components";

const items = [
    {name: "Andrey", id: 22},
    {name: "Nick", id: 38},
    {name: "Vadim", id: 37},
    {name: "Alex", id: 46},
    {name: "John", id: 55},
    {name: "George", id: 64},
    {name: "Jim", id: 31},
    {name: "Ian", id: 20},
    {name: "Lu", id: 16},
    {name: "Pete", id: 5},
];

interface IProps {
    name: string;
    id: number;
    newName: string;
    setName: Function;
    setId: Function;
    stateId: number | undefined;
    arr: { name: string, id: number }[];
    setArr: Function;
    items: { name: string, id: number }[];
}

const NameItem = ({name, id, stateId, setId, arr, setArr, items, newName, setName}: IProps) => {
    const inputEl = useRef<any>(null);
    const onButtonClick = () => {
        inputEl?.current?.focus();
    };

    const [value, setValue] = useState(name);
    const changeName = async (e: any) => {
        e.stopPropagation();
        await setId(id);
        onButtonClick();
    }
    const changeNewName = (e: any) => {
        e.stopPropagation();
        setId(undefined);
    }
    const handle = setArr([...arr.filter(item => item.id === id), ...items.filter(item => item.id !== id)])
        // setArr([...items.filter(item => item.id !== id), ...arr.filter(item => item.id === id)])




    const handleClick = (node: any) => {
        let timeoutId: any;
        node.onclick("click", (event: any) => {
            timeoutId = setTimeout(() => 'handle', 500);
        })
        node.onDoubleClick("dblclick", (event: any) => {
            clearTimeout(timeoutId);
            clearTimeout(timeoutId - 1);
            console.log('Dblclick');
        })
    }

    return (
        <CartItem onClick={handleClick}>
            {stateId === id
                ? <CustomInput value={value}
                               type="text"
                               onChange={e => setValue(e.target.value)}
                               onClick={e => e.stopPropagation()} ref={inputEl}/>
                : <span>{value}</span>
            }
            {stateId === id
                ? <span onClick={changeNewName}>
                ok
            </span>
                : <span onClick={changeName}>
                change
            </span>
            }
        </CartItem>
    )
}

export const App = () => {
    const [newName, setNewName] = useState<string>("");
    const [id, setId] = useState<number | undefined>(undefined)
    const [arr, setArr] = useState(items);

    return (
        <MainBlock onClick={() => setId(undefined)}>
            {arr.map(item => (
                <NameItem key={item.id} {...item} items={items} arr={arr} setArr={setArr} stateId={id} newName={newName}
                          setName={setNewName} setId={setId}/>
            ))}
        </MainBlock>
    )
};

const MainBlock = styled.div`
  box-sizing: border-box;
  padding: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 20px;
`

const CartItem = styled.div`
  display: flex;
  font-size: 24px;
  justify-content: space-between;
  padding: 0 20px 0;
  grid-gap: 20px;
  border-radius: 4px;
  border: 1px solid;
  width: 300px;

  :hover {
    background-color: skyblue;
    transition: .5s;
    cursor: pointer;
  }
`

const CustomInput = styled.input`
  font-size: 24px;
  width: 150px;
  border: none;
  background-color: beige;
  outline: none;
`
