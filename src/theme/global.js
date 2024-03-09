import styled from 'styled-components/native';

export const Main = styled.SafeAreaView`
  flex: 1;
  background: ${props => props.theme.background};
`
export const Scroll = styled.ScrollView`
  flex: 1;
`

export const View = styled.View`
`
export const Row = styled.View`
  flex-direction: row;
  display: flex;
`

export const Column = styled.View`
  flex-direction: column;
  display: flex;
`


export const Label = styled.Text`
  color: #d7d7d7;
  font-size: 18px;
  letter-spacing: -1px;
  font-family: ${props => props.theme.font.book};
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  letter-spacing: -2px;
  font-family: ${props => props.theme.font.medium};
`;


export const HeadTitle = styled.Text`
  color: #fff;
  font-size: 32px;
  letter-spacing: -1px;
  font-family: ${props => props.theme.font.bold};
`;

export const Spacer = styled.View`
  height: ${props => props.height || 16}px;
  width: ${props => props.width || 16}px;
`