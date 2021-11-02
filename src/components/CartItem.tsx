import React, {SyntheticEvent, useRef, useState} from 'react';
import styled from "styled-components";

interface IProps {
    name: string;
    id: number;
    setId: Function;
    stateId: number | undefined;
    arr: { name: string, id: number }[];
    setArr: Function;
}

export const CartItem = ({name, id, stateId, setId, arr, setArr}: IProps) => {
    const inputEl = useRef<HTMLInputElement | null>(null);
    const onButtonClick = () => {
        inputEl?.current?.focus();
    };
    const [value, setValue] = useState(name);
    const changeName = async (e: SyntheticEvent) => {
        e.stopPropagation();
        await setId(id);
        onButtonClick();
    }
    const changeNewName = (e: SyntheticEvent) => {
        e.stopPropagation();
        setId(undefined);
    }
    let timeoutId: ReturnType<typeof setTimeout> | NodeJS.Timer | any;
    const handleClick = (e: SyntheticEvent) => {
        if (e.type === "click") {
            timeoutId = setTimeout(() => setArr([...arr.filter(item => item.id === id), ...arr.filter(item => item.id !== id)]), 500);
        } else {
            clearTimeout(timeoutId - 1);
            clearTimeout(timeoutId);
            setArr([...arr.filter(item => item.id !== id), ...arr.filter(item => item.id === id)])
        }
    }

    return (
        <MainBlock onClick={handleClick} onDoubleClick={handleClick}>
            {stateId === id
                ? <>
                    <CustomInput value={value} onChange={e => setValue(e.target.value)}
                                 onClick={e => e.stopPropagation()} ref={inputEl}/>
                    <span onClick={changeNewName}>ok</span>
                </>
                : <>
                    <span>{value}</span>
                    <span onClick={changeName}>change</span>
                </>
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
  min-width: 300px;

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
