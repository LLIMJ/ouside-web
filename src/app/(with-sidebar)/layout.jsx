"use client";

import Image from "next/image";
import styled from "styled-components";
import { motion } from "motion/react";
import SideContainer from "../components/side-container";
import { PlayingProvider, usePlaying } from "../components/playing-context";

export default function SidebarLayout({ children }) {
    return (
        <PlayingProvider>
            <LayoutBody>{children}</LayoutBody>
        </PlayingProvider>
    );
}

function LayoutBody({ children }) {
    const { isPlaying } = usePlaying();

    return (
        <FullScreen>
            <Header
                as={motion.div}
                animate={{ opacity: isPlaying ? 0 : 1 }}
                transition={{ duration: 0.7 }}
            >
                <HeaderImage
                    src="/images/header_img.png"
                    alt="header"
                    width={1920}
                    height={148}
                />
            </Header>
            <Wrapper>
                <SideContainer />
                <Content>{children}</Content>
            </Wrapper>
        </FullScreen>
    );
}

const FullScreen = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    flex-direction:column;
    font-family:'Pretendard';
    font-weight:400;
    font-size:16px;
`;
const Header = styled.div`
    width:100%;
    height:10%;
`;
const HeaderImage = styled(Image)`
    width:100%;
    height:100%;
    object-fit:cover;
`;
const Wrapper = styled.div`
    width:100%;
    flex:1;
    min-height:0;
    display:flex;
    gap:clamp(30px, 10vw, 334px);
`;
const Content = styled.main`
    flex:1;
    min-width:0;
    min-height:0;
    display:flex;
    flex-direction:column;
`;