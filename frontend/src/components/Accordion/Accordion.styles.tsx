import styled from '@emotion/styled';

export const AccordionItemHeader = styled('dt')`
  background: var(--color-bg-main);
  border-bottom: var(--border);
  padding: 0.25rem 0.75rem;
  text-align: left;
`;
export const AccordionItemBody = styled('dd')`
  text-align: left;
  background: var(--color-main-light);
  margin: 0;
  padding: 2rem;
  height: calc(100% - 124px);
`;
export const AccordionContainer = styled('dl')`
  border: var(--border);
  margin: 0;
  width: 50%;
  min-width: 350px;
  height: 100%;
`;
