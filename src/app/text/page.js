"use client"

import { useState } from "react";
import styled from "styled-components";
import Link from 'next/link'
import BackButton from '../components/back-button'
import TextScramble from '../components/core/text-scramble';
import { HangulMotion } from 'react-hangul-motion';

import { useHangulMotion } from "react-hangul-motion";


const seq = [
    "따라갔어. 돈 벌게 해주겠다고... 많이 벌게 해주겠다고... 부자 된다고... 그래서 따라갔었어.",
    `하루는, ‘도아야! 가라는 데로 가면, 우리가 부자가 된다’ 카고, ‘먹고 살기가 괜찮다’고 카고. 그래 내가 가만히 생각하니까 내가 가면 나도 잘 먹고 잘 입고, 부모 형제간도 잘 살고 할꺼니, 그래볼까 생각하고 있다 그랬더니. 와 가지고는 아무 날은 데리고 간다고 해. 거기 가서, 노력을 하면 돈을 부쳐 보내 살게 해준다고. 그 참, 내가 가서 시키는 대로 하믄 돈을 부쳐 보내주면 부모형제가 살기가 괜찮을긴 갚다. 그래 생각해서 따라 간 거지.`,
    "두번째 대사",
    '두번째 증언',
];


const FullScreen = styled.div`
    width:100vw;
    height:100vh;

    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    background-color:lightgray;
    gap:50px;
    `;
const SketchingArea = styled.div`
    width:40%;
    height:40vh;
    background-color:gray;
`;
const StyledSpan = styled.span`

    text-decoration:italic;
`

function Line({ seqNum, setSeq }) {

    return (
        <StyledSpan onClick={() => {
            if (seqNum == 0 || seqNum == 2) {
                setSeq(seqNum + 1);
            }
        }}>
            {seq[seqNum]}
        </StyledSpan>
    );
}

export function TextScrambleCustomCharacterDuration() {
    return (
        <></>
    );
}



export default function Page() {
    // 대사의 각 단어들의 타이핑 시작 여부를 저장하는 변수.
    // 앞선 단어의 타이핑이 끝나면 다음 단어의 타이핑을 시작하기 위해 이 상태 값을 바꿈!
    // const initial_switch = Array(words.length).fill(false);
    // const [type_switch, setSwitch] = useState(initial_switch);

    const [seqNum, setSeq] = useState(0);
    const line = seq[0];
    const words = line.split(" ")


    return (
        <>
            <BackButton />
            <FullScreen>
                <SketchingArea></SketchingArea>
                <Line seqNum={seqNum} setSeq={setSeq} />

                <TextScramble
                    className='font-mono text-sm'
                    duration={6}
                    characterSet=' '
                    pausePoints={[
                        { index: 5, duration: 800 },
                        { index: 20, duration: 1000 },
                        { index: 35, duration: 1000 },
                        { index: 44, duration: 800 },
                    ]}
                >
                    {seq[seqNum]}
                </TextScramble>
                <TextScramble
                    className='font-mono text-sm'
                    duration={25}
                    characterSet={"#$%^&"}

                >
                    {seq[1]}
                </TextScramble>


                {/* {line_type()} */}
            </FullScreen >
        </>
    );
}