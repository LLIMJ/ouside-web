
import styled, { keyframes } from "styled-components";

const glow = keyframes`
    0% {
        text-shadow:
            0 0 5px white,
            0 0 10px white,
            0 0 20px white,
            0 0 40px white,
            0 0 80px white;
    }

    100% {
        text-shadow:
            0 0 10px #989797,
            0 0 20px #989797,
            0 0 40px #989797,
            0 0 80px #989797,
            0 0 160px #989797;
    }
`;

const Background = styled.div`
    background-color:black;
    width:100%;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const NeonText = styled.div`
    font-size: 3rem;
    color: #fff;
    line-height:90px;
    text-align:center;

    text-shadow:
        0 0 5px white,
        0 0 10px white,
        0 0 20px white,
        0 0 40px white,
        0 0 80px white;

    animation: ${glow} 1.5s infinite alternate;

    font-family: 'N3';
    
`;

export default function Page() {
    return (
        <Background>
            <NeonText>
                우리는 끝나지 않았습니다.
                <br />일본 정부가 우리 명예를 회복시켜주고 법적 사죄, 배상해야 끝이 날 것입니다.
            </NeonText>
        </Background >

    )
}