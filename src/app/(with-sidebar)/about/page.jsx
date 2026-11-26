import styled from "styled-components";
import Link from 'next/link';

export default function Page() {

    return (
        <Container>
            <Title>스몰토크</Title>
            <TextArea>
                ‘위안부’ 문제를 마주한 우리를 보여주는 액자식 구성의 단편영화

                〈스몰토크〉는 ‘타인의 고통을 우리는 어떻게 마주하는가 ?’라는 질문에서 출발한다.

                과거의 소녀 선애와 현대의 소녀 수연이 버스 정류장에서 만나 서로의 이야기를 듣는다.시공간을 건너온 두 사람의 대화는 과거와 현재 사이에 새로운 관계를 만든다.

                그러나 영화가 끝나는 순간 화면은 멈추고, 그 액자 밖으로 한 인물이 등장한다.그는 위안부 피해에 관한 기사와 영상을 찾아보지만 알아갈수록 지쳐간다.결국 SNS 알림 하나에 집중이 끊기고, 그는 화면 밖으로 도망친다.공감은 시작되었지만, 끝까지 지속될 수 있을까 ?
            </TextArea>
            <StyledLink href="https://youtu.be/D2sW4oIvaLM?si=IHbzC6wgGndo6zyo">
                ➢ YouTube

            </StyledLink>
            <Title>Remory</Title>
            <TextArea>
                안녕하세요. 2026 Art With Impact 프로그램에 참여하는 팀 REMORY입니다.

                저희는 예술과 기술을 통해 사회의 다양한 이야기를 새로운 방식으로 전달하고, 익숙한 문제를 낯선 시선으로 바라보는 방법을 고민합니다. 특히 타인의 고통을 단순히 동정하는 데 그치지 않고, 그들의 삶을 이해하며 지속적으로 마음을 기울이려면 어떻게 해야하는가에 집중합니다. 이번 활동을 통해 일본군 ‘위안부’ 문제를 바라보는 우리의 시선을 돌아보고, 일시적인 공감을 넘어 기억과 관심을 이어가는 경험을 만들어가고자 합니다.
            </TextArea>
        </Container>
    );
}
const StyledLink = styled(Link)`
color:black;
`
const Container = styled.div`

`;
const Title = styled.div`
    margin-top:50px;

    font-weight: 700;
    font-size: 20px;
    padding-bottom:20px;
`;
const Name = styled.span`
padding:10px 0px;
font-weight: 600;
`;
const Names = styled.div`
display:flex;
gap:30px;
padding-bottom:10px;
`;
const TextArea = styled.div`
padding-right:20%;
line-height: 1.6;

padding-bottom:20px;
`;