import React, {useRef, useState} from 'react';
import styled from "styled-components";

interface IProps {
    name: string;
    id: number;
    setId: Function;
    stateId: number | undefined;
    arr: { name: string, id: number }[];
    setArr: Function;
    items: { name: string, id: number }[];
}

export const CartItem = ({name, id, stateId, setId, arr, setArr, items}: IProps) => {
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
    let timeoutId: ReturnType<typeof setTimeout> | NodeJS.Timer | any;
    const handleClick = (e: any) => {
        if (e.type === "click"){
            timeoutId = setTimeout(() => setArr([...arr.filter(item => item.id === id), ...items.filter(item => item.id !== id)]), 500);
        } else {
            clearTimeout(timeoutId - 1);
            clearTimeout(timeoutId);
            setArr([...items.filter(item => item.id !== id), ...arr.filter(item => item.id === id)])
        }
    }

    return (
        <MainBlock onClick={handleClick} onDoubleClick={handleClick}>
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
        </MainBlock>
    )
};

const MainBlock = styled.div`
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