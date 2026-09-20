"use client"
import Image from "next/image";

import { useState, useEffect } from 'react';
import { motion } from "motion/react";


import { useRouter } from "next/navigation";
import {
    FullScreen,
    Header,
    HeaderImage,
    Container,
    SideContainer,
    NavBox,
    FooterBox,
    VideoContainer,
    Video,
    Line,
    InfoBox,
    Title,
    LinkContainer,
    StyledButton,
    Footer,
    BlankBox,
} from "./styles";

// import { useState } from "react";



export default function Page() {

    const [isPlaying, setIsPlaying] = useState(false);
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
        <FullScreen>
            <Header
                as={motion.div}
                animate={{
                    opacity: isPlaying ? 0 : 1,
                }}
                transition={{
                    duration: 0.7
                }}
            >
                <HeaderImage
                    src="/images/header_img.png"
                    alt="header"
                    width={1920}
                    height={148}
                />
            </Header>
            <Container>
                <SideContainer
                    as={motion.div}
                    animate={{
                        opacity: isPlaying ? 0 : 1,
                    }}
                    transition={{
                        duration: 0.7
                    }}
                >
                    <NavBox>
                        <Title>REMORY</Title>
                        <Line $width={288} $marginTop={"0px"} $thickness="4px"></Line>
                        <div>➢ Project</div>
                        <div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;➢ <span style={{ fontWeight: 700, textDecoration: "underline" }}>스몰토크 (Small Talk)(2026) </span>
                        </div>
                        <div>➢ About</div>
                        <div>➢ Material</div>
                        <div>➢ Contact</div>
                    </NavBox>
                    <FooterBox>
                        <Image
                            src="/images/videotape.png"
                            alt=""
                            width={61}
                            height={38}
                        />
                        <Footer>@2026 Art With Impact<br />@Team REMORY</Footer>
                        <Line $width={288} $marginTop={"10px"}></Line>

                    </FooterBox>

                </SideContainer>
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
                        as={motion.video}
                        src="/video/씬10-4의 사본.mp4"
                        controls
                        animate={{
                            opacity: isPlaying ? 0 : 1,
                        }}
                        transition={{
                            duration: 0.7
                        }}
                    />

                    <InfoBox as={motion.ul}
                        animate={{
                            opacity: isPlaying ? 0 : 1,
                        }}
                        transition={{
                            duration: 0.7
                        }}>

                        <li>Title: &lt;Small Talk&gt;</li>
                        <li>Year: 2026</li>
                        <li>Created for 2026 Art With Impact Program</li>
                        <li>Created by team REMORY (Jieun Lim, Juha Oh and Seyeon Cha)</li>
                        <li>Voice: Korean</li>
                        <li>Subtitle: English</li>

                    </InfoBox>
                    <InfoBox as={motion.ul}
                        animate={{
                            opacity: isPlaying ? 0 : 1,
                        }}
                        transition={{
                            duration: 0.7
                        }}>

                        <li>제목: &lt;스몰토크&gt;</li>
                        <li>제작 연도: 2026</li>
                        <li>2026 Art With Impact Program 출품작</li>
                        <li>제작: REMORY (임지은, 오주하, 차세연)</li>
                        <li>언어: 한국어</li>
                        <li>자막: 영어</li>

                    </InfoBox>


                    <LinkContainer>

                        <motion.div
                            animate={{
                                scale: isExpending ? 5 : 1,
                                x: isExpending ? -200 : 0,
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
            </Container>




        </FullScreen>
    );
}