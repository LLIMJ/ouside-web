import styled from "styled-components";
export const FullScreen = styled.div`
    width: 100%;
    height: 100%;
`;

export const SketchingArea = styled.div`
    width: 40%;
    height: 40vh;
    background-color: gray;
`;
export const SketchingVideo = styled.video`
    margin-top:10%;
    width:55%;
    // height:10%
    margin-bottom: 10%;
    margin-left:300px;
    
`;

export const StyledSpan = styled.span`
    text-decoration: italic;
`;

export const TextBox = styled.div`
    position: absolute;
    left:${(props) => props.left};
    top:${(props) => props.top};
    width: ${(props) => props.width};
    // height: 500px;

    text-align:${(props) => props.$textAlign};

    cursor:pointer;
`;
export const NextButton = styled.button`
    position: absolute;
    top: 80%;
    left: 90%;

    border:none;
    background:none;
    width:50px;
    height:50px;
    cursor:pointer;
`;  