import styled from 'styled-components';

export const CompTablePFButtons = styled.button<{
  isFirst: boolean;
  isToday?: boolean;
  isYesterday?: boolean;
}>`
  display: inline-block;
  background-color: var(--secondary-color);
  height: 1.825rem;
  width: 1.7rem;
  font-size: 1.1rem;
  border: none;
  border-left: 0.125rem solid var(--primary-color);
  cursor: default;
  ${(props) => (props.isToday || props.isYesterday) && 'cursor: pointer;'}
  vertical-align: top;
  border-bottom: 0.125rem solid var(--primary-color);
  ${(props) => props.isFirst && 'border-left: none;'}
  ${(props) => props.isToday && 'background-color: var(--today-color);'}
  ${(
    props
  ) =>
    props.isYesterday && 'background-color: var(--yesterday-color) !important;'}
`;

export const ListContainer = styled.div`
  margin: auto auto 2rem auto;
`;
