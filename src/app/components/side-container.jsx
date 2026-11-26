"use client"

import Image from "next/image";
import Link from 'next/link';

import styled from "styled-components";
import { motion } from "motion/react";

import { usePlaying } from "./playing-context";

export default function SideContainer() {
    const { isPlaying } = usePlaying();

    return (
        <Container
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
                <NavItem href={"/video-player"}>➢ Project</NavItem>
                <NavItem href={"/video-player"}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;➢ <span style={{ fontWeight: 700, textDecoration: "underline" }}>스몰토크 (Small Talk)(2026) </span>
                </NavItem>
                <NavItem href={"/about"}>➢ About</NavItem>
                <NavItem href={"/material"}>➢ Material</NavItem>
                {/* <NavItem href={"/contact"}>➢ Contact</NavItem> */}
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

        </Container>
    );
}
const NavItem = styled(Link)`
cursor: pointer;
text-decoration:none;
color:black;
`;
const Container = styled.div`

    width:384px;
    padding-left:96px;
    box-sizing:border-box;

    overflow: hidden;

    display: flex;
    flex-direction:column;
    gap:171px;

    position:relative;
    z-index:1;

`;
const Title = styled.h4`
    margin-top:50px;

    font-weight: 700;
    font-size: 20px;
`;
const NavBox = styled.div`
    // margin-bottom:
    display:flex;
    flex-direction:column;
    gap:10px;
`;
const Line = styled.div`
    width: ${(props) => props.$width};
    margin-top:${(props) => props.$marginTop};
    border-top: ${(props) => props.$thickness || "1px"} solid black;
`;
const Footer = styled.div`
    margin:50px 0px;

    font-size: 12px;
`;
const FooterBox = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
`;