import styled from '@emotion/styled';
import house from '../../assets/house_alt.jpg';

const LoginDiv = styled('div')`
  /* Sizing and Box Model */
  margin: auto;
  width: 100%;
  height: 800px;

  /* Grid */
  display: grid;
  gap: ${36 / 16}rem;
  grid-gap: ${36 / 16}rem;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: '. test login';
  align-items: center;

  /* Background */
  background-image: url(${house});
  background-repeat: no-repeat;
  background-attachment: fixed;

  @media only screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }

  .test-login-container {
    grid-area: test;

    display: flex;
    align-items: center;
    flex-direction: column;

    min-height: 50%;

    height: 50%;
    margin: auto;

    background-color: rgba(22, 21, 20, 0.5);
    background-blend-mode: multiply;

    h1 {
      width: 80%;
      color: var(--color-text-light);
      margin-bottom: 2rem;
      @media only screen and (max-width: 900px) {
        margin-right: 50px;
      }
    }
    button {
      margin-bottom: 1rem;
      @media only screen and (max-width: 900px) {
        margin-right: 15%;
      }
    }
    button:nth-of-type(1):hover {
      color: var(--color-button-background);
      background-color: var(--color-button-text);
    }
    @media only screen and (max-width: 900px) {
      order: 1;
      width: 100%;
      align-items: flex-end;
    }
  }
  .login-container {
    /* Grid */
    grid-area: login;

    /* Flexbox */
    display: flex;
    align-items: center;
    flex-direction: column;

    /* Sizing and Box Model */
    min-width: 240px;
    height: 100%;
    margin: auto;

    /* Background */
    /* Thanks https://stackoverflow.com/a/35177384 */
    background-color: rgba(22, 21, 20, 0.5);
    background-blend-mode: multiply;

    @media only screen and (max-width: 900px) {
      flex-direction: row;
      width: 100%;
      justify-content: space-around;
    }
  }
`;

export default LoginDiv;
