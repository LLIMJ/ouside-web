"use client"
import Image from "next/image";
import Link from 'next/link';


import { useState, useEffect } from 'react';
import { motion } from "motion/react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import { usePlaying } from "../../components/playing-context";


export default function Page() {

    const { isPlaying, setIsPlaying } = usePlaying();

    useEffect(() => {
        return () => setIsPlaying(false); // 페이지를 벗어나면 초기화
    }, [setIsPlaying]);
    const [isExpending, setIsExpending] = useState(false);

    const router = useRouter();


    useEffect(() => {
        if (!isPlaying) return;

        const timer = setTimeout(() => {
            setIsExpending(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, [isPlaying]);

    useEffect(() => {
        if (!isExpending) return;

        const timer = setTimeout(() => {
            router.push("/text");
        }, 3000);

        return () => clearTimeout(timer);
    }, [isExpending]);



    return (


        <VideoContainer
            as={motion.div}
            style={{
                overflow: "visible",
                // position: "fixed",
                zIndex: 10,
            }}>
            <Title as={motion.h4}
                animate={{
                    opacity: isPlaying ? 0 : 1,
                }}
                transition={{
                    duration: 0.7
                }}>스몰토크(Small Talk) (2026)</Title>

            <Video
                as={motion.div}
                animate={{
                    opacity: isPlaying ? 0 : 1,
                }}
                transition={{
                    duration: 0.7,
                }}
            >
                <iframe
                    src="https://www.youtube.com/embed/D2sW4oIvaLM"
                    title="SmallTalk"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </Video>

            <InfoBox as={motion.ul}
                animate={{
                    opacity: isPlaying ? 0 : 1,
                }}
                transition={{
                    duration: 0.7
                }}>

                <li>제작 연도: 2026</li>
                <li>2026 Art With Impact Program 출품작</li>
                <li>제작: REMORY (임지은, 오주하, 차세연)</li>
                <li>언어: 한국어</li>
                <li>자막: 영어</li>

            </InfoBox>
            <InfoBox as={motion.ul}
                animate={{
                    opacity: isPlaying ? 0 : 1,
                }}
                transition={{
                    duration: 0.7
                }}>


                <li>Year: 2026</li>
                <li>Created for 2026 Art With Impact Program</li>
                <li>Created by team REMORY (Jieun Lim, Juha Oh and Seyeon Cha)</li>
                <li>Voice: Korean</li>
                <li>Subtitle: English</li>

            </InfoBox>


            <LinkContainer>

                <motion.div
                    animate={{
                        scale: isExpending ? 5 : 1,
                        x: isExpending ? -270 : 0,
                        y: isExpending ? -300 : 0,
                    }}
                    transition={{
                        duration: 0.7,
                        // ease: "easeInOut",
                    }}
                    style={{
                        // position: "fixed",
                        zIndex: 10,
                    }}
                >
                    <img
                        src={isPlaying ? "/AWI_image/tape.gif" : "/AWI_image/tape.png"}
                        alt=""
                        width={213 / 1.5}
                        height={120 / 1.5}
                    />
                </motion.div>
                <StyledButton
                    onClick={() => setIsPlaying(true)}
                    as={motion.button}
                    animate={{
                        opacity: isPlaying ? 0 : 1,
                    }}
                    transition={{
                        duration: 0.7
                    }}
                >기억을 재생하겠습니까?</StyledButton>
            </LinkContainer>
            <Line as={motion.div}
                animate={{
                    opacity: isPlaying ? 0 : 1,
                }} transition={{
                    duration: 0.7
                }} $width="100%" $marginTop="0px"></Line>

            <BlankBox></BlankBox>
        </VideoContainer>

    );
}





const VideoContainer = styled.div`
    position:relative;  
    z-indes:2;

    flex:1;
    min-width:0;
    box-sizing:border-box;

    min-height: 0;
    overflow-y: auto;
    // overflow: visible;


    display:flex;
    flex-direction:column;
    align-items:flex-start;

    padding-bottom:50px;
    padding-right:20%;
    // margin-bottom:100px;
`;
const Video = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 600px;
  max-width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 338px; /* 600 * 9 / 16 보장 */
  margin-bottom: 40px;
  background-color: #111; /* 로딩 중 영역 확인용 */
  overflow: hidden;

  & > iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;
const Line = styled.div`
    width: ${(props) => props.$width};
    margin-top:${(props) => props.$marginTop};
    border-top: ${(props) => props.$thickness || "1px"} solid black;
`;
const InfoBox = styled.ul`
list-style: none;
padding-left: 0px;
    display: flex;
    flex-direction: column;
    gap: 12px; /* li 사이의 간격 조절 */

    margin-bottom:40px;
    
`;

const Title = styled.h4`
    margin-top:50px;

    font-weight: 700;
    font-size: 20px;
`;

const LinkContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center;

    margin-top:150px;
`;

const StyledButton = styled.button`
    text-decoration: underline;
    background-color: transparent; 
    border: none;
    outline: none;
    margin-right:30px;
    cursor: pointer;
`;



const BlankBox = styled.div`
    width:100%;
    height:30px;
    min-height:3px;
    flex-shrink:0;
`