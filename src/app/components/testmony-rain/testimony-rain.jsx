"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

import TextScramble from "../core/text-scramble";

import {
    TestimonyContainer,
    TestimonyItem,
    MeasurementLayer,
    MeasurementWord,
    ShatterLayer,
    ShatterWord,
} from "./style";

import { testimonies } from "./testimonies";


const fonts = [
    "NotoSerif",
    "N1",
    "N2",
    "N3",
    "N4",
    "N5",
    "N6",
    "N7",
    "N8",
    "N9",
    "N10",
];

const sizes = [
    "16px",
    "20px",
    "28px",
    "32px",
    "40px",
];


// ----------------------------------------
// 마지막 증언 링크
// ----------------------------------------

const LAST_TESTIMONY_LINK =
    "https://contents.nahf.or.kr/item/level.do?levelId=iswt.d_0003";


// ----------------------------------------
// 랜덤 width
// ----------------------------------------

const MIN_WIDTH = 500;
const MAX_WIDTH = 700;

const ITEM_HEIGHT = 100;

const GAP_X = 80;
const GAP_Y = 50;


// ----------------------------------------
// 고정 랜덤
// ----------------------------------------

function seededRandom(seed) {
    let value = seed;

    return function () {
        value =
            (value * 9301 + 49297) % 233280;

        return value / 233280;
    };
}


// ----------------------------------------
// 증언별 width 생성
// ----------------------------------------

function generateWidths(count) {
    const random = seededRandom(98765);

    return Array.from(
        { length: count },
        () => {
            const width =
                MIN_WIDTH +
                random() *
                (MAX_WIDTH - MIN_WIDTH);

            return Math.round(width);
        }
    );
}


// ----------------------------------------
// 증언별 위치 생성
// ----------------------------------------

function generatePositions(
    count,
    width,
    height,
    widths
) {
    const random =
        seededRandom(12345);

    const positions = [];

    const paddingX = 40;
    const paddingY = 40;

    let attempts = 0;


    while (
        positions.length < count &&
        attempts < 100000
    ) {
        attempts++;

        const index =
            positions.length;

        const itemWidth =
            widths[index];


        const candidate = {
            x:
                paddingX +
                random() *
                Math.max(
                    1,
                    width -
                    itemWidth -
                    paddingX * 2
                ),

            y:
                paddingY +
                random() *
                Math.max(
                    1,
                    height -
                    ITEM_HEIGHT -
                    paddingY * 2
                ),

            width: itemWidth,
        };


        const overlaps =
            positions.some(
                (position) =>
                    candidate.x <
                    position.x +
                    position.width +
                    GAP_X &&

                    candidate.x +
                    candidate.width +
                    GAP_X >
                    position.x &&

                    candidate.y <
                    position.y +
                    ITEM_HEIGHT +
                    GAP_Y &&

                    candidate.y +
                    ITEM_HEIGHT +
                    GAP_Y >
                    position.y
            );


        if (!overlaps) {
            positions.push(
                candidate
            );
        }
    }


    // 공간이 부족해도
    // 모든 증언에 위치를 부여
    while (
        positions.length < count
    ) {
        const index =
            positions.length;

        const itemWidth =
            widths[index];


        positions.push({
            x:
                paddingX +
                random() *
                Math.max(
                    1,
                    width -
                    itemWidth -
                    paddingX * 2
                ),

            y:
                paddingY +
                random() *
                Math.max(
                    1,
                    height -
                    ITEM_HEIGHT -
                    paddingY * 2
                ),

            width: itemWidth,
        });
    }


    return positions;
}


// ----------------------------------------
// 단어 분리
// ----------------------------------------

function splitWords(text) {
    return text
        .trim()
        .split(/\s+/)
        .filter(Boolean);
}


export default function TestimonyRain() {

    // ----------------------------------------
    // 증언 등장 개수
    // ----------------------------------------

    const [activeCount, setActiveCount] =
        useState(0);


    // ----------------------------------------
    // 초기 위치
    // ----------------------------------------

    const [positions, setPositions] =
        useState([]);


    // ----------------------------------------
    // 증언 width
    // ----------------------------------------

    const [widths, setWidths] =
        useState([]);


    // ----------------------------------------
    // 떨어뜨리기 시작했는지
    // ----------------------------------------

    const [falling, setFalling] =
        useState(false);


    // ----------------------------------------
    // 측정된 단어 데이터
    // 이 state는 "한 번"만 업데이트됨
    // ----------------------------------------

    const [shatterWords, setShatterWords] =
        useState([]);


    // ----------------------------------------
    // container ref
    // ----------------------------------------

    const containerRef =
        useRef(null);


    // ----------------------------------------
    // 증언 DOM refs
    // ----------------------------------------

    const itemRefs =
        useRef([]);


    // ----------------------------------------
    // 측정용 단어 refs
    // ----------------------------------------

    const wordRefs =
        useRef([]);


    // ----------------------------------------
    // Matter로 움직일 단어 DOM refs
    // ----------------------------------------

    const shatterWordRefs =
        useRef([]);


    // ----------------------------------------
    // Matter engine
    // ----------------------------------------

    const engineRef =
        useRef(null);


    // ----------------------------------------
    // animation frame
    // ----------------------------------------

    const animationFrameRef =
        useRef(null);


    // ----------------------------------------
    // Matter bodies
    // ----------------------------------------

    const bodiesRef =
        useRef([]);


    // ----------------------------------------
    // 1. 초기 위치 생성
    // ----------------------------------------

    useEffect(() => {

        const updatePositions = () => {

            const newWidths =
                generateWidths(
                    testimonies.length
                );


            const newPositions =
                generatePositions(
                    testimonies.length,
                    window.innerWidth,
                    window.innerHeight * 1.5,
                    newWidths
                );


            setWidths(
                newWidths
            );

            setPositions(
                newPositions
            );
        };


        updatePositions();


        window.addEventListener(
            "resize",
            updatePositions
        );


        return () => {
            window.removeEventListener(
                "resize",
                updatePositions
            );
        };

    }, []);


    // ----------------------------------------
    // 2. 증언 순차 등장
    // ----------------------------------------

    useEffect(() => {

        let count = 0;


        const timer =
            setInterval(() => {

                count += 1;

                setActiveCount(
                    count
                );


                if (
                    count >=
                    testimonies.length
                ) {
                    clearInterval(
                        timer
                    );
                }

            }, 200);


        return () => {
            clearInterval(
                timer
            );
        };

    }, []);


    // ----------------------------------------
    // 3. 모든 증언 등장 후
    // 2초 대기
    // ----------------------------------------

    useEffect(() => {

        if (
            activeCount !==
            testimonies.length
        ) {
            return;
        }


        const timer =
            setTimeout(() => {

                setFalling(true);

            }, 7000);


        return () => {
            clearTimeout(
                timer
            );
        };

    }, [activeCount]);


    // ----------------------------------------
    // 마지막 증언 클릭
    // ----------------------------------------

    const handleLastTestimonyClick =
        () => {

            window.location.href =
                LAST_TESTIMONY_LINK;
        };


    // ----------------------------------------
    // 4. falling 시작
    // 원본 DOM의 모든 단어 위치 측정
    // ----------------------------------------

    useEffect(() => {

        if (!falling) {
            return;
        }


        const container =
            containerRef.current;


        if (!container) {
            return;
        }


        const containerRect =
            container.getBoundingClientRect();


        const measuredWords = [];


        let globalWordIndex = 0;


        /*
            각 증언의 MeasurementWord를
            순서대로 읽는다.
        */

        testimonies.forEach(
            (text, testimonyIndex) => {

                const words =
                    splitWords(text);


                words.forEach(
                    (word) => {

                        const element =
                            wordRefs.current[
                            globalWordIndex
                            ];


                        if (!element) {
                            globalWordIndex++;
                            return;
                        }


                        const rect =
                            element.getBoundingClientRect();


                        measuredWords.push({

                            id:
                                globalWordIndex,

                            text:
                                word,

                            x:
                                rect.left -
                                containerRect.left,

                            y:
                                rect.top -
                                containerRect.top,

                            width:
                                rect.width,

                            height:
                                rect.height,

                            fontSize:
                                element.dataset
                                    .fontSize,

                            fontFamily:
                                element.dataset
                                    .fontFamily,

                            testimonyIndex,

                            isLast:
                                testimonyIndex ===
                                testimonies.length - 1,

                        });


                        globalWordIndex++;
                    }
                );
            }
        );


        /*
            여기서 딱 한 번 React state 변경
        */

        setShatterWords(
            measuredWords
        );

    }, [falling]);


    // ----------------------------------------
    // 5. shatterWords가 만들어진 뒤
    // Matter 시작
    // ----------------------------------------

    useEffect(() => {

        if (
            !falling ||
            shatterWords.length === 0
        ) {
            return;
        }


        const container =
            containerRef.current;


        if (!container) {
            return;
        }


        const width =
            container.clientWidth;

        const height =
            container.clientHeight;


        // ------------------------------------
        // Engine
        // ------------------------------------

        const engine =
            Matter.Engine.create();


        engine.world.gravity.y = 1;


        engineRef.current =
            engine;


        // ------------------------------------
        // 바닥
        // ------------------------------------

        const floor =
            Matter.Bodies.rectangle(
                width / 2,
                height + 50,
                width,
                100,
                {
                    isStatic: true,
                }
            );


        // ------------------------------------
        // 왼쪽 벽
        // ------------------------------------

        const leftWall =
            Matter.Bodies.rectangle(
                -50,
                height / 2,
                100,
                height,
                {
                    isStatic: true,
                }
            );


        // ------------------------------------
        // 오른쪽 벽
        // ------------------------------------

        const rightWall =
            Matter.Bodies.rectangle(
                width + 50,
                height / 2,
                100,
                height,
                {
                    isStatic: true,
                }
            );


        // ------------------------------------
        // 모든 단어 → Matter Body
        // ------------------------------------

        const bodies =
            shatterWords.map(
                (word) => {

                    const body =
                        Matter.Bodies.rectangle(

                            word.x +
                            word.width / 2,

                            word.y +
                            word.height / 2,

                            word.width,

                            word.height,

                            {
                                restitution: 0.35,

                                friction: 0.4,

                                frictionAir: 0.015,
                            }
                        );


                    // 살짝 좌우로 흩어짐
                    Matter.Body.setVelocity(
                        body,
                        {
                            x:
                                (Math.random() -
                                    0.5) * 2,

                            y:
                                Math.random() * 0.5,
                        }
                    );


                    // 살짝 회전
                    Matter.Body.setAngularVelocity(
                        body,
                        (Math.random() -
                            0.5) * 0.04
                    );


                    return body;
                }
            );


        bodiesRef.current =
            bodies;


        // ------------------------------------
        // World
        // ------------------------------------

        Matter.World.add(
            engine.world,
            [
                floor,
                leftWall,
                rightWall,
                ...bodies,
            ]
        );


        // ------------------------------------
        // animation loop
        // ------------------------------------

        let lastTime =
            performance.now();


        const update =
            (currentTime) => {

                /*
                    이전 코드와 가장 중요한 차이:

                    ❌ setState()
                    ❌ map()
                    ❌ find()

                    전혀 사용하지 않음.
                */


                const delta =
                    Math.min(
                        currentTime -
                        lastTime,
                        32
                    );


                lastTime =
                    currentTime;


                Matter.Engine.update(
                    engine,
                    delta
                );


                bodies.forEach(
                    (body, index) => {

                        const element =
                            shatterWordRefs
                                .current[
                            index
                            ];


                        if (!element) {
                            return;
                        }


                        const x =
                            body.position.x;


                        const y =
                            body.position.y;


                        const angle =
                            body.angle;


                        element.style.left =
                            `${x}px`;


                        element.style.top =
                            `${y}px`;


                        element.style.transform =
                            `
                            translate(
                                -50%,
                                -50%
                            )
                            rotate(
                                ${angle}rad
                            )
                            `;
                    }
                );


                animationFrameRef.current =
                    requestAnimationFrame(
                        update
                    );
            };


        animationFrameRef.current =
            requestAnimationFrame(
                update
            );


        // ------------------------------------
        // cleanup
        // ------------------------------------

        return () => {

            if (
                animationFrameRef.current
            ) {
                cancelAnimationFrame(
                    animationFrameRef.current
                );
            }


            Matter.World.clear(
                engine.world
            );


            Matter.Engine.clear(
                engine
            );


            engineRef.current =
                null;


            bodiesRef.current =
                [];

        };

    }, [
        falling,
        shatterWords.length,
    ]);


    // ----------------------------------------
    // 아직 초기 위치 생성 중
    // ----------------------------------------

    if (
        positions.length !==
        testimonies.length ||
        widths.length !==
        testimonies.length
    ) {
        return null;
    }


    /*
        shatterWords가 생성되기 전에는
        원본 증언을 유지한다.

        shatterWords가 만들어진 순간
        원본을 숨기고 Matter 단어 표시.
    */

    const showOriginal =
        shatterWords.length === 0;


    return (

        <TestimonyContainer
            ref={containerRef}
            className="testimony-container"
            $falling={falling}
        >

            {/* ==================================
                원본 증언
            ================================== */}

            {showOriginal && (

                <>
                    {testimonies.map(
                        (text, index) => {

                            const fontSize =
                                sizes[
                                index %
                                sizes.length
                                ];


                            const fontFamily =
                                fonts[
                                index %
                                fonts.length
                                ];


                            const position =
                                positions[
                                index
                                ];


                            const width =
                                widths[
                                index
                                ];


                            const isLast =
                                index ===
                                testimonies.length -
                                1;


                            /*
                                이 증언보다 앞에 있는
                                단어가 몇 개인지 계산
                            */

                            let wordOffset = 0;


                            for (
                                let i = 0;
                                i < index;
                                i++
                            ) {

                                wordOffset +=
                                    splitWords(
                                        testimonies[
                                        i
                                        ]
                                    ).length;
                            }


                            return (

                                <TestimonyItem
                                    key={index}

                                    ref={(
                                        element
                                    ) => {

                                        itemRefs
                                            .current[
                                            index
                                        ] =
                                            element;
                                    }}

                                    $left={
                                        `${position.x}px`
                                    }

                                    $top={
                                        `${position.y}px`
                                    }

                                    $width={
                                        `${width}px`
                                    }

                                    $fontSize={
                                        fontSize
                                    }

                                    $fontFamily={
                                        fontFamily
                                    }

                                    $isLast={
                                        isLast
                                    }

                                    onClick={
                                        isLast
                                            ? handleLastTestimonyClick
                                            : undefined
                                    }
                                >

                                    {/* ----------------
                                        실제 텍스트
                                    ---------------- */}

                                    <TextScramble
                                        as="span"

                                        trigger={
                                            index <
                                            activeCount
                                        }

                                        duration={
                                            0.5
                                        }

                                        speed={
                                            0.1
                                        }

                                        characterSet=" "
                                    >
                                        {
                                            index <
                                                activeCount
                                                ? text
                                                : ""
                                        }
                                    </TextScramble>


                                    {/* ----------------
                                        측정용 텍스트

                                        실제 텍스트와
                                        똑같은 폰트/폭으로
                                        단어 위치 계산
                                    ---------------- */}

                                    <MeasurementLayer>

                                        {splitWords(
                                            text
                                        ).map(
                                            (
                                                word,
                                                wordIndex
                                            ) => {

                                                const globalIndex =
                                                    wordOffset +
                                                    wordIndex;


                                                return (

                                                    <MeasurementWord
                                                        key={
                                                            wordIndex
                                                        }

                                                        ref={(
                                                            element
                                                        ) => {

                                                            wordRefs
                                                                .current[
                                                                globalIndex
                                                            ] =
                                                                element;
                                                        }}

                                                        data-font-size={
                                                            fontSize
                                                        }

                                                        data-font-family={
                                                            fontFamily
                                                        }

                                                        data-testimony-index={
                                                            index
                                                        }
                                                    >
                                                        {word}
                                                    </MeasurementWord>

                                                );
                                            }
                                        )}

                                    </MeasurementLayer>

                                </TestimonyItem>
                            );
                        }
                    )}
                </>

            )}


            {/* ==================================
                Matter 단어
            ================================== */}

            {!showOriginal && (

                <ShatterLayer>

                    {shatterWords.map(
                        (word, index) => (

                            <ShatterWord
                                key={word.id}

                                ref={(element) => {

                                    shatterWordRefs
                                        .current[
                                        index
                                    ] =
                                        element;

                                }}

                                $x={word.x}
                                $y={word.y}

                                $fontSize={
                                    word.fontSize
                                }

                                $fontFamily={
                                    word.fontFamily
                                }

                                $isLast={
                                    word.isLast
                                }

                                onClick={
                                    word.isLast
                                        ? handleLastTestimonyClick
                                        : undefined
                                }
                            >
                                {word.text}
                            </ShatterWord>

                        )
                    )}

                </ShatterLayer>

            )}

        </TestimonyContainer>
    );
}