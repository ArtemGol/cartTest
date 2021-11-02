import React, {useState} from 'react';
import styled from "styled-components";
import {items} from "./constants/constants";
import {CartItem} from "./components/CartItem";

export const App = () => {
    const [id, setId] = useState<number | undefined>(undefined)
    const [arr, setArr] = useState(items);

    return (
        <MainBlock onClick={() => setId(undefined)}>
            {arr.map(item => (
                <CartItem key={item.id}
                          {...item}
                          arr={arr}
                          setArr={setArr}
                          stateId={id}
                          setId={setId}/>
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
