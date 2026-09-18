import styled from "styled-components";
import Image from "next/image";
import Link from 'next/link'


export const FullScreen = styled.div`
    width:100%;
    height:100vh;

    display:flex;
    flex-direction:column;

`;
export const Header = styled.div`
    width:100%;
    height:10%;
`;
export const HeaderImage = styled(Image)`
    width:100%;
    height:100%;
    object-fit:cover;
`;
export const Container = styled.div`
    width:100%;
    flex:1;
    display:flex;
    gap:clamp(30px, 10vw, 334px);
    
    box-sizing:border-box;
    min-height: 0;
`;
export const SideContainer = styled.div`

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
export const NavBox = styled.div`
    // margin-bottom:
    display:flex;
    flex-direction:column;
    gap:10px;
`;
export const FooterBox = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
`;
export const VideoContainer = styled.div`
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
export const Video = styled.video`
    width:600px;
    margin-bottom:40px;
    
`;
export const Line = styled.div`
    width: ${(props) => props.$width};
    margin-top:${(props) => props.$marginTop};
    border-top: 2.5px solid black;
`;
export const InfoBox = styled.ul`
    padding-left:20px;


    
`;

export const Title = styled.h4`
    margin-top:50px;
`;
export const LinkContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center;

    margin-top:150px;
`;

export const StyledButton = styled.button`
    text-decoration: underline;
    background-color: transparent; 
    border: none;
    outline: none;
    margin-right:30px;
    cursor: pointer;

    

`;
export const Footer = styled.div`
    margin:50px 0px;
`;
export const BlankBox = styled.div`
    width:100%;
    height:30px;
    min-height:3px;
    flex-shrink:0;
`