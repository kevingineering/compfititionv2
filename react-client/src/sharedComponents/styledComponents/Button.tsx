import styled from 'styled-components';

export const Button = styled.button`
  display: inline-block;
  padding: 0.4rem 1.3rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  line-height: 1.6rem;
`;

// Loading button styles

export const ButtonSplitDanger = `
  background: var(--danger-color);
  padding-left: 0;
  padding-right: 0;
  margin: 0;
`;

export const ButtonSplitPrimary = `
  background: var(--primary-color);
  padding-left: 0;
  padding-right: 0;
  margin: 0;
`;

export const ButtonSplitGray = `
  background: var(--gray-color);
  padding-left: 0;
  padding-right: 0;
  margin: 0;
`;

export const ButtonUser = `
  padding: 0.2rem 0.6rem;
  border-radius: 2rem;
  margin: 0.3rem 0.5rem 0.3rem auto;
  width: 5rem;
  line-height: 1.6rem;
`;

export const ButtonNoMargin = `
  margin: 0;
`;

export const ButtonRequestToJoin = `
  margin-top: 0;
  font-weight: bold;
  font-size: 1.17em;
`;
