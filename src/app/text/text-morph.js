"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 80px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const MorphContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    // filter: url("#threshold") blur(0.6px);
    filter: url("#threshold");
`;

const Text = styled.span`
    position: absolute;
    width: 100%;

    text-align: left;
    white-space: pre-line;
    user-select: none;

    font-size: 20px;
    font-weight: 400;

    letter-spacing: 5px;
`;

export default function TextMorphAnimation({
    texts,
    morphTime = 2.5,
    cooldownTime = 0.25,
}) {
    const [textIndex, setTextIndex] = useState(0);

    const text1Ref = useRef(null);
    const text2Ref = useRef(null);

    const animationRef = useRef(null);

    useEffect(() => {
        const text1 = text1Ref.current;
        const text2 = text2Ref.current;

        let textIndex = 0;
        let morph = 0;
        let cooldown = cooldownTime;

        let lastTime = performance.now();

        const animate = (currentTime) => {
            const dt = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            if (cooldown > 0) {
                cooldown -= dt;

                text1.style.filter = "";
                text1.style.opacity = "1";

                text2.style.filter = "";
                text2.style.opacity = "0";
            } else {
                morph += dt;

                let fraction = morph / morphTime;

                if (fraction >= 1) {
                    // 마지막 문자열까지 도달
                    if (textIndex === texts.length - 2) {
                        text1.style.filter = "";
                        text1.style.opacity = "0";

                        text2.style.filter = "";
                        text2.style.opacity = "1";

                        return;
                    }

                    textIndex += 1;
                    setTextIndex(textIndex);

                    morph = 0;
                    cooldown = cooldownTime;

                    animationRef.current =
                        requestAnimationFrame(animate);

                    return;
                }

                const firstFraction = 1 - fraction;
                const secondFraction = fraction;

                const firstBlur = Math.min(
                    3 / firstFraction - 3,
                    100
                );

                const secondBlur = Math.min(
                    3 / secondFraction - 3,
                    100
                );

                text1.style.filter = `blur(${firstBlur}px)`;
                text1.style.opacity =
                    Math.pow(firstFraction, 1);

                text2.style.filter = `blur(${secondBlur}px)`;
                text2.style.opacity =
                    Math.pow(secondFraction, 1);

            }

            animationRef.current =
                requestAnimationFrame(animate);
        };

        animationRef.current =
            requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, [texts.length, morphTime, cooldownTime]);

    return (
        <Container>
            <svg width="0" height="0">
                <defs>
                    <filter id="threshold">
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -140"
                        />
                    </filter>
                </defs>
            </svg>

            <MorphContainer>
                <Text ref={text1Ref}>
                    {texts[textIndex]}
                </Text>

                <Text ref={text2Ref}>
                    {texts[(textIndex + 1) % texts.length]}
                </Text>
            </MorphContainer>
        </Container>
    );
}