import { Link } from 'react-router-dom';
import styled from 'styled-components';

//#region div
export const StandardContainer = styled.div`
  max-width: 32rem;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  @media (max-width: 32rem) {
    padding: 0;
    margin: 0 auto;
  }
`;

export const SplitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
  @media (max-width: 54rem) {
    grid-template-columns: 1fr;
    margin: auto;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const EmptyCollection = styled.div`
  color: var(--primary-color);
  padding: 1rem;
  display: block;
  text-align: center;
  border: 0.125rem solid var(--primary-color);
  border-top: 0;
  width: 100%;
`;
//#endregion

//#region p
export const EmptyBorderedSpace = styled.p`
  border-left: 0.125rem solid var(--primary-color);
  border-right: 0.125rem solid var(--primary-color);
  margin: 0;
  min-height: 0.5rem;
`;

export const MessageInBorderedSpace = styled.p`
  padding: 0.4rem 0.8rem;
  font-size: 1rem;
  border-left: 0.125rem solid var(--primary-color);
  border-right: 0.125rem solid var(--primary-color);
  margin: 0;
  min-height: 0.5rem;
`;
//#endregion

export const StandardForm = styled.form`
  margin: 1rem 0;
`;

export const TableInfo = styled.li`
  padding: 0 0.5rem;
  border-left: 0.125rem solid var(--primary-color);
  border-right: 0.125rem solid var(--primary-color);
  margin: 0;
  min-height: 0.5rem;
  span {
    padding: 0.1rem 0;
  }
  div {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

export const CollectionHeader = styled.h2`
  text-align: center;
  background: var(--primary-color);
  color: var(--secondary-color);
  padding: 0.3rem 0;
`;

export const CollectionLink = styled(Link)`
  display: inline-block;
  padding: 0.4rem 1.3rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  line-height: 1.6rem;
  display: block;
  width: 100%;
  background: var(--primary-color);
  color: var(--secondary-color);
  text-align: center;
  align-items: center;
`;

export const PageTitle = styled.h1`
  margin-bottom: 1rem;
  text-align: center;
`;

export const PFButton = styled.i<{ isSuccess: boolean }>`
  color: ${(props) =>
    props.isSuccess ? 'var(--success-color)' : 'var(--danger-color)'};
`;

export const WhiteSpaceSpan = styled.span`
  white-space: break-spaces;
`;
