import { motion } from "motion/react";


export default function FadeGirlImage({
    src,
    alt = "",
    top = 0,
    left = 0,
    delay = 0, // 페이드인 까지의 대기시간
    duration = 0.8, // 페이드 인/아웃 시간
    stay = 1.5, // 페이드 인 상태에서 유지 시간
    width = "auto",
    height = "auto",
    onComplete,
}) {
    return (
        <motion.img
            src={src}
            alt={alt}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: [0, 1, 1, 0],
            }}
            transition={{
                delay: delay,
                duration: duration * 2 + stay,
                times: [
                    0,
                    duration / (duration * 2 + stay),
                    (duration + stay) / (duration * 2 + stay),
                    1,
                ],
                ease: "easeInOut",
            }}
            onAnimationComplete={onComplete}
            style={{
                position: "absolute",
                top: top,
                left: left,
                width: width,
                height: height,
            }}
        />
    );
};

