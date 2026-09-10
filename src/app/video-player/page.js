// "use client"

// import { useState } from "react";
import styled from "styled-components";
import Link from 'next/link'

const FullScreen = styled.div`
    width:100vw;
    height:100vh;

    display:flex;
    justify-content:center;
`;
const VideoContainer = styled.div`
    width:500px;
    height:100vh;
    // background-color:lightgray;

    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;
const Video = styled.video`
    width:100%;
    // hight:283px;
    
`;
const Box = styled.div`
    display:flex;
    width:100%;
`;
const InfoBox = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    // background-color:gray;
    
`;
const ButtonBox = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    align-items:flex-end;
    text-decoration:underline;
    color:black;

    // width:100%;
`
const Title = styled.h4`
    margin-top:50px;
`;
const StyledLink = styled(Link)`
  text-decoration: underline;
  color: inherit; // 글자 색상을 부모와 같게 유지하고 싶을 때 사용
`;

export default function Page() {


    return (
        <FullScreen>
            <VideoContainer>
                <Video
                    src={"/video/씬10-4의 사본.mp4"}
                    controls

                />
                <Box>
                    <InfoBox>
                        <Title>스몰토크 (Small Talk)</Title>
                        <div>재생시간: 00분 00초</div>
                        <div>제작 기간: 00/00/00~00/00/00</div>
                        <div>출연: 000, 000</div>
                    </InfoBox>
                    <ButtonBox>
                        <StyledLink href={"/text"}>실제 증언 보기 →</StyledLink>
                    </ButtonBox>
                </Box>

            </VideoContainer>



        </FullScreen>
    );
}