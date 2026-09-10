
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

    // 특정 글자 위치에서 잠깐 멈춤
    // 예: [{ index: 3, duration: 1000 }]
    pausePoints = [],

    ...props
}) {
    const MotionComponent = motion.create(Component);

    const [scrambledText, setScrambledText] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const text = children;
    const displayText = scrambledText ?? children;

    const scramble = async () => {
        if (isAnimating) return;

        setIsAnimating(true);

        const steps = duration / speed;
        let step = 0;

        // pausePoints를 index 기준으로 정렬
        const sortedPausePoints = [...pausePoints].sort(
            (a, b) => a.index - b.index
        );

        let pauseIndex = 0;

        const interval = setInterval(async () => {
            let scrambled = '';

            const progress = step / steps;
            const revealPosition = progress * text.length;

            /*
             * 현재 revealPosition이 pause 지점에 도달했는지 확인
             */
            const currentPause =
                sortedPausePoints[pauseIndex];

            if (
                currentPause &&
                revealPosition >= currentPause.index
            ) {
                // 다음 pause로 넘어가기
                pauseIndex++;

                // 현재 interval을 멈추고
                clearInterval(interval);

                /*
                 * 현재 화면을 유지한 채
                 * 지정된 시간만큼 기다림
                 */
                await new Promise((resolve) =>
                    setTimeout(
                        resolve,
                        currentPause.duration
                    )
                );

                /*
                 * 다시 animation을 이어가기
                 */
                setIntervalTick();
                return;
            }

            /*
             * 글자 생성
             */
            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ') {
                    scrambled += ' ';
                    continue;
                }

                if (revealPosition > i) {
                    // 이미 나타난 글자
                    scrambled += text[i];
                } else {
                    // 아직 나타나지 않은 글자
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

                setScrambledText(null);
                setIsAnimating(false);

                onScrambleComplete?.();
            }
        }, speed * 1000);

        /*
         * pause 이후 animation을 다시 시작하는 함수
         */
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
                    if (text[i] === ' ') {
                        scrambled += ' ';
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

                    setScrambledText(null);
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
        >
            {displayText}
        </MotionComponent>
    );
}
