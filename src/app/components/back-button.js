"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";

const Button = styled.button`
    position: absolute;
    top: 20px;
    left: 20px;

    border: none;
    background: none;
    padding: 0;

    text-decoration: underline;
    cursor: pointer;

    // background-color:gray;
`;

export default function BackButton() {
    const router = useRouter();

    return (
        <Button onClick={() => router.back()}>
            ← 돌아가기
        </Button>
    );
}