"use client";

import { useState } from "react";
import styled from "styled-components";
import BackButton from "../components/back-button";
import TextScramble from "../components/core/text-scramble";
import { scenario } from "../data/scenario";
import { testimonies } from "../data/testimonies";

import { Nanum_Pen_Script } from "next/font/google";

const handwriting = Nanum_Pen_Script({
    subsets: ["latin"],
    weight: "400",
});

const lines = scenario
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

// [[id|텍스트]] 또는 (지문) 토큰 분리
const TOKEN = /(\[\[[^\]]+\]\]|\([^)]*\))/;

function parseSpeechTokens(speech) {
    return speech
        .split(TOKEN)
        .filter(Boolean)
        .map((part) => {
            if (part.startsWith("[[") && part.endsWith("]]")) {
                const raw = part.slice(2, -2);
                const pipeIndex = raw.indexOf("|");
                const id = pipeIndex >= 0 ? raw.slice(0, pipeIndex) : raw;
                const text = pipeIndex >= 0 ? raw.slice(pipeIndex + 1) : "";
                return { kind: "clickable", id, text };
            }
            if (part.startsWith("(") && part.endsWith(")")) {
                return { kind: "direction", text: part };
            }
            return { kind: "text", text: part };
        });
}

function getTestimonyEntry(id) {
    const entry = testimonies[id];
    if (!entry) return { speaker: "", text: "" };
    if (typeof entry === "string") return { speaker: "", text: entry };
    return { speaker: entry.speaker ?? "", text: entry.text ?? "" };
}

export default function MaterialPage() {
    // lineIndex -> 선택된 testimony id (예: { 42: "t01" })
    const [revealedByLine, setRevealedByLine] = useState({});
    const [hoveredId, setHoveredId] = useState(null);

    const revealLineWith = (lineIndex, id) => {
        setRevealedByLine((prev) => (prev[lineIndex] ? prev : { ...prev, [lineIndex]: id }));
    };

    const renderOriginalSpeech = (lineIndex, tokens) => {
        return tokens.map((item, idx) => {
            if (item.kind === "direction") {
                return <Direction key={idx}>{item.text}</Direction>;
            }

            if (item.kind === "clickable") {
                const isHovered = hoveredId === item.id;
                return (
                    <Clickable
                        key={idx}
                        role="button"
                        tabIndex={0}
                        $active={isHovered}
                        onClick={() => revealLineWith(lineIndex, item.id)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                revealLineWith(lineIndex, item.id);
                            }
                        }}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() =>
                            setHoveredId((prev) => (prev === item.id ? null : prev))
                        }
                    >
                        {item.text}
                    </Clickable>
                );
            }

            return <span key={idx}>{item.text}</span>;
        });
    };

    return (
        <PageWrapper>
            <BackButton />
            <Container>
                <Script>
                    {lines.map((line, i) => {
                        if (line.startsWith("### ")) {
                            return <SceneNumber key={i}>{line.slice(4).trim()}</SceneNumber>;
                        }
                        if (line.startsWith("## ")) {
                            return <Chapter key={i}>{line.slice(3).trim()}</Chapter>;
                        }
                        if (line.startsWith("@")) {
                            const colonIndex = line.indexOf(":");
                            const originalSpeaker =
                                colonIndex >= 0
                                    ? line.slice(1, colonIndex).trim()
                                    : line.slice(1).trim();
                            const speech =
                                colonIndex >= 0 ? line.slice(colonIndex + 1).trim() : "";

                            const activeTestimonyId = revealedByLine[i];
                            const isRevealed = Boolean(activeTestimonyId);
                            const testimony = isRevealed
                                ? getTestimonyEntry(activeTestimonyId)
                                : null;

                            const displayedSpeaker =
                                isRevealed && testimony?.speaker
                                    ? testimony.speaker
                                    : originalSpeaker;

                            const tokens = parseSpeechTokens(speech);

                            return (
                                <Dialogue key={i}>
                                    <Name $revealed={isRevealed}>
                                        {isRevealed ? (
                                            <TextScramble as="span" duration={1.5} characterSet=" ">
                                                {displayedSpeaker}
                                            </TextScramble>
                                        ) : (
                                            displayedSpeaker
                                        )}
                                    </Name>
                                    <Speech>
                                        {isRevealed ? (
                                            <Testimony>
                                                <TextScramble as="span" duration={13} characterSet=" ">
                                                    {testimony.text}
                                                </TextScramble>
                                            </Testimony>
                                        ) : (
                                            renderOriginalSpeech(i, tokens)
                                        )}
                                    </Speech>
                                </Dialogue>
                            );
                        }
                        return <Action key={i}>{line}</Action>;
                    })}
                </Script>
            </Container>
        </PageWrapper>
    );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
`;

const Container = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 50px 20% 80px;
`;

const Script = styled.article`
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.85;
  word-break: keep-all;
`;

const Chapter = styled.h3`
  margin: 64px 0 24px;
  padding-bottom: 8px;
  border-bottom: 1px solid #222;
  font-size: 20px;

  &:first-child {
    margin-top: 0;
  }
`;

const SceneNumber = styled.h4`
  margin: 40px 0 16px;
  font-size: 16px;
`;

const Action = styled.p`
  margin: 0 0 16px;
`;

const Dialogue = styled.div`
  display: grid;
  grid-template-columns: 76px 1fr;
  gap: 16px;
  margin: 24px 0;
  padding: 0 16px;
`;

const Name = styled.strong`
  font-weight: ${(props) => (props.$revealed ? "400" : "700")};
  color: black;
  font-family: ${(props) =>
        props.$revealed ? `${handwriting.style.fontFamily}, cursive` : "inherit"};
  font-size: ${(props) => (props.$revealed ? "1.28em" : "inherit")};
  transition: color 0.2s ease;
`;

const Speech = styled.p`
  margin: 0;
`;

const Direction = styled.span`
  color: #888;
`;

const Clickable = styled.span`
  cursor: pointer;
  color: ${(props) => (props.$active ? "gray" : "inherit")};
  background-color: ${(props) =>
        props.$active ? "rgba(155, 61, 46, 0.08)" : "transparent"};
  border-radius: 2px;
  transition: color 0.2s ease, background-color 0.2s ease;
`;

const Testimony = styled.span`
  font-family: ${handwriting.style.fontFamily}, cursive;
  font-size: 1.28em; /* 손글씨체는 기본 본문보다 작아 보이는 경우가 많아 살짝 키우면 균형이 맞아요 */
  line-height: 1.65;

  & > span {
    display: inline;
    white-space: pre-wrap;
  }
`;