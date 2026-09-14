import styled from "styled-components";


export const TestimonyContainer = styled.div`
    position: relative;

    width: 100%;

    height: 150vh;

    overflow: hidden;
`;


export const TestimonyItem = styled.div`
    position: absolute;

    left: ${(props) =>
        props.$left};

    top: ${(props) =>
        props.$top};

    width: ${(props) =>
        props.$width};

    font-size: ${(props) =>
        props.$fontSize};

    font-family: ${(props) =>
        props.$fontFamily};

    line-height: 1;

    color: black;

    transform-origin: center center;

    will-change:
        left,
        top,
        transform;


    /*
        마지막 증언만 hover / click
    */

    ${(props) =>
        props.$isLast &&
        `
            pointer-events: auto;
            cursor: pointer;

            transition:
                color 0.2s ease;

            &:hover {
                color: red;
            }
        `}
`;


/* ========================================
   단어 위치 측정용
======================================== */

export const MeasurementLayer = styled.span`
    position: absolute;

    left: 0;

    top: 0;

    width: 100%;

    visibility: hidden;

    pointer-events: none;

    font: inherit;

    line-height: inherit;
`;


export const MeasurementWord = styled.span`
    display: inline;

    font: inherit;

    line-height: inherit;

    white-space: nowrap;
`;


/* ========================================
   Matter 단어 레이어
======================================== */

export const ShatterLayer = styled.div`
    position: absolute;

    inset: 0;

    pointer-events: none;
`;


/* ========================================
   Matter로 떨어지는 각각의 단어
======================================== */

export const ShatterWord = styled.span`
    position: absolute;

    left: ${(props) =>
        props.$x}px;

    top: ${(props) =>
        props.$y}px;

    font-size: ${(props) =>
        props.$fontSize};

    font-family: ${(props) =>
        props.$fontFamily};

    line-height: 1;

    white-space: nowrap;

    color: black;

    transform:
        rotate(
            ${(props) =>
        props.$angle}rad
        );

    transform-origin:
        center center;

    will-change:
        left,
        top,
        transform,
        color;

    pointer-events:
        ${(props) =>
        props.$isLast
            ? "auto"
            : "none"};

    ${(props) =>
        props.$isLast &&
        `
            cursor: pointer;

            transition:
                color 0.2s ease;

            &:hover {
                color: red;
            }
        `}
`;