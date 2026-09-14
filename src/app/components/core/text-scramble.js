'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const defaultChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default function TextScramble({
    children,
    duration = 0.8,
    speed = 0.04,
    characterSet = defaultChars,
    className,
    as: Component = 'p',
    trigger = true,
    onScrambleComplete,
    pausePoints = [],
    ...props
}) {
    const MotionComponent = motion.create(Component);

    const text = children;

    const createScrambledText = (revealPosition = 0) => {
        let scrambled = '';

        for (let i = 0; i < text.length; i++) {

            if (text[i] === ' ' || text[i] === '\n') {
                scrambled += text[i];
                continue;
            }

            if (revealPosition > i) {
                scrambled += text[i];
            } else {
                scrambled +=
                    characterSet[
                    Math.floor(
                        Math.random() * characterSet.length
                    )
                    ];
            }
        }

        return scrambled;
    };


    const [scrambledText, setScrambledText] = useState(() =>
        createScrambledText(0)
    );

    const [isAnimating, setIsAnimating] = useState(false);

    const displayText = scrambledText;


    const scramble = async () => {

        if (isAnimating) return;

        setIsAnimating(true);

        const steps = duration / speed;
        let step = 0;

        const sortedPausePoints = [...pausePoints].sort(
            (a, b) => a.index - b.index
        );

        let pauseIndex = 0;


        const interval = setInterval(async () => {

            let scrambled = '';

            const progress = step / steps;
            const revealPosition =
                progress * text.length;

            const currentPause =
                sortedPausePoints[pauseIndex];


            if (
                currentPause &&
                revealPosition >= currentPause.index
            ) {

                pauseIndex++;

                clearInterval(interval);

                await new Promise((resolve) =>
                    setTimeout(
                        resolve,
                        currentPause.duration
                    )
                );

                setIntervalTick();

                return;
            }


            for (let i = 0; i < text.length; i++) {

                if (
                    text[i] === ' ' ||
                    text[i] === '\n'
                ) {
                    scrambled += text[i];
                    continue;
                }

                if (revealPosition > i) {
                    scrambled += text[i];
                } else {
                    scrambled +=
                        characterSet[
                        Math.floor(
                            Math.random() *
                            characterSet.length
                        )
                        ];
                }
            }


            setScrambledText(scrambled);

            step++;


            if (step > steps) {

                clearInterval(interval);

                // 애니메이션이 끝나도 텍스트 유지
                setScrambledText(text);

                setIsAnimating(false);

                onScrambleComplete?.();
            }

        }, speed * 1000);


        const setIntervalTick = () => {

            const newInterval = setInterval(() => {

                let scrambled = '';

                const progress = step / steps;

                const revealPosition =
                    progress * text.length;

                const currentPause =
                    sortedPausePoints[pauseIndex];


                if (
                    currentPause &&
                    revealPosition >= currentPause.index
                ) {

                    pauseIndex++;

                    clearInterval(newInterval);

                    setTimeout(() => {
                        setIntervalTick();
                    }, currentPause.duration);

                    return;
                }


                for (let i = 0; i < text.length; i++) {

                    if (
                        text[i] === ' ' ||
                        text[i] === '\n'
                    ) {
                        scrambled += text[i];
                        continue;
                    }

                    if (revealPosition > i) {
                        scrambled += text[i];
                    } else {
                        scrambled +=
                            characterSet[
                            Math.floor(
                                Math.random() *
                                characterSet.length
                            )
                            ];
                    }
                }


                setScrambledText(scrambled);

                step++;


                if (step > steps) {

                    clearInterval(newInterval);

                    // 애니메이션이 끝나도 텍스트 유지
                    setScrambledText(text);

                    setIsAnimating(false);

                    onScrambleComplete?.();
                }

            }, speed * 1000);
        };
    };


    useEffect(() => {

        if (!trigger) return;

        scramble();

    }, [trigger]);


    return (
        <MotionComponent
            className={className}
            {...props}
            style={{
                whiteSpace: 'pre-wrap',
                ...props.style,
            }}
        >
            {displayText}
        </MotionComponent>
    );
}