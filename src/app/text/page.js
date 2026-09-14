"use client"

import { useState } from "react";
import {
    FullScreen,
    TextBox,
    SketchingVideo,
    NextButton,
} from "./style";
import BackButton from '../components/back-button'
import TextScramble from '../components/core/text-scramble';
import TextMorphAnimation from "./text-morph";
import { testimonies } from "../components/testmony-rain/testimonies"
import TestimonyRain from "../components/testmony-rain/testimony-rain";


const line_real = [{
    line: `
따라갔어.
돈 벌게 해주겠다고... 
많이 벌게 해주겠다고... 
부자 된다고... 
그래서 따라갔었어.
`,
    testimony: `하루는, ‘도아야! 가라는 데로 가면, 우리가 부자가 된다’ 카고,
‘먹고 살기가 괜찮다’고 카고. 
그래 내가 가만히 생각하니까 내가 가면 나도 잘 먹고 잘 입고, 
부모 형제간도 잘 살고 할꺼니, 그래볼까 생각하고 있다 그랬더니. 
와 가지고는 아무 날은 데리고 간다고 해. 
거기 가서, 노력을 하면 돈을 부쳐 보내 살게 해준다고. 
그 참, 내가 가서 시키는 대로 하믄 돈을 부쳐 보내주면 부모형제가 살기가 괜찮을긴 갚다. 
그래 생각해서 따라 간 거지.
`
},
{
    line: `
싫다고 뿌리치면 맞았어.
뺨 때리고, 발로 차고... 
정말 몸이 내 몸이 아닌 것처럼 아프더라.
`,
    testimony: `
안 할려고 하니까. 뚜드려 패고 잡아갔고. 
죽기 살기로 두드려 패주지. 
잡아 갔고 죽도록 패주지 말로 못하요. 
밥도 굶고 사흘로 엎드려 있다가. 
그 뭐 자그마한 게 뭐. 건장한 장골들이 때려잡는데 
누가 그걸 견딜 수 있겠소. 말로 몬 해요.
`,
},
{
    line: `
그렇게 한 명이 나가면 또 다른 사람이 들어오고,
또 들어오고...
`,
    testimony: `
매일 군인들이 방 앞에 줄을 섰어요.
하루에 10명은 왔어요.
성병이 안 걸리려고 밑에다 가루를 뿌리고, 팔뚝에 606호 주사도 맞았어요.
고통스러웠어요.
`,
}];


export default function Page() {

    const [isChanging, setIsChanging] = useState(false);
    const [isNext, setIsNext] = useState(false);
    const [isTest3Changing, setIsTest3Changing] = useState(false);
    const [unexpected, setUnexpected] = useState(0);


    const line1 = line_real[0].line;
    const test1 = line_real[0].testimony;
    const line2 = line_real[1].line;
    const test2 = line_real[1].testimony;
    const line3 = line_real[2].line;
    const test3 = line_real[2].testimony;

    return (
        <>
            <BackButton />
            <FullScreen>
                {/* 스케치 비디오 */}
                {(unexpected != 2) &&
                    <SketchingVideo
                        src={isNext ?
                            "/sketch_video/sketch_video_1.mp4"
                            :
                            "/sketch_video/sketch_video_1.mp4"}
                        // controls
                        autoPlay
                        muted
                    />
                }

                {/* 다음 대사로 이동하는 버튼 */}
                {isNext ? <></> : <NextButton
                    onClick={() => {
                        setIsNext(true);
                        setIsChanging(false);
                    }}
                >넥스트</NextButton>}


                {/* 대사/증언이 나타나는  텍스트박스*/}
                {isNext ?
                    // 두번째 장면에 대한 대사와 증언
                    <>
                        {/* 왼쪽 대사/증언 */}
                        <TextBox
                            left="100px"
                            top="70%"
                            width="500px"
                            $textAlign="left"
                            // 대사 클릭시 isChanging-> true
                            onClick={() => {
                                // 왼쪽 대사는 바로 타이핑으로 증언으로 변환
                                setIsChanging(true);

                                // 오른쪽 대사는 3초 후 타이핑으로 증언 변환
                                setTimeout(() => {
                                    setIsTest3Changing(true);
                                }, 3000);

                                // 와다다 시작 대사는 6초 후 타이핑 등장
                                setTimeout(() => {
                                    setUnexpected(2);
                                }, 9000);
                            }}

                        >

                            {isChanging ? (
                                // 대사 클릭 후 true가 되며 증언을 스크램블
                                (unexpected != 2) && <TextScramble
                                    className='font-mono text-sm'
                                    duration={3}
                                    characterSet=' '
                                >
                                    {test2}
                                </TextScramble>
                            ) : (
                                // 클릭 전엔 false로 대사를 morph
                                <TextMorphAnimation
                                    texts={["", line2]}
                                    morphTime={4}
                                />
                            )}


                        </TextBox>
                        {/* 오른쪽 대사/증언 */}
                        <TextBox
                            left="700px"
                            top="80%"
                            width="500px"
                            $textAlign="right"
                        >

                            {isChanging ? (
                                // 왼대사 클릭 후 true가 되며 증언을 스크램블

                                isTest3Changing ?
                                    (unexpected != 2) && <TextScramble
                                        className='font-mono text-sm'
                                        duration={6}
                                        characterSet=' '
                                    >
                                        {test3}
                                    </TextScramble>
                                    : <></>
                            ) : (
                                // 클릭 전엔 false로 대사를 morph
                                <TextMorphAnimation
                                    texts={["", line3]}
                                    morphTime={6}
                                />
                            )}


                        </TextBox>
                    </>

                    :
                    // 첫번째 대사/증언
                    <TextBox
                        left="800px"
                        top="70px"
                        width="500px"
                        $textAlign="left"
                        onClick={() => {
                            setIsChanging(true);
                        }}
                    >

                        {isChanging ? (
                            // 클릭 후 : isChanging = true -> 증언으로 변화
                            <TextScramble
                                className='font-mono text-sm'
                                duration={15}
                                characterSet=' '
                            >
                                {test1}
                            </TextScramble>
                        ) : (
                            // 클릭 전 : isChanging = false -> 대사 등장
                            <TextMorphAnimation
                                texts={["", line1]}
                                morphTime={4}
                            />
                        )}


                    </TextBox>
                }
                {(unexpected == 1) && (
                    <TextBox
                        // 위치
                        left="600px"
                        top="100%"
                        // 박스 넓이
                        width="700px"
                        // 정렬
                        $textAlign="right"
                    >
                        <TextScramble
                            className='font-mono text-sm'
                            // duration={5}
                            characterSet=' '
                        >
                            {testimonies[0]}
                        </TextScramble>


                    </TextBox>
                )}
                {(unexpected == 2) && <TestimonyRain />}

            </FullScreen >
        </>
    );
}