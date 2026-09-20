
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
    font-size: 2rem;
    color: #fff;

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
                잔혹한 전쟁이 가져온 나의 상처가 되풀이되지 않기를 바랍니다. <br />전쟁이 없는 세상을 원합니다.
            </NeonText>
        </Background >

    )
}