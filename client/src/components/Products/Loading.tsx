import styled from "styled-components"

function Loading() {
  return (
    <LoadingStyle>
      <div className="follow-the-leader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoadingStyle>
  )
}

const LoadingStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  height: 100vh;

  .follow-the-leader {
    height: 14px;
    position: relative;
    width: 14px;
  }

  .follow-the-leader div {
    animation: follow-the-leader 1.875s infinite backwards;
    background-color: #ffffff;
    border-radius: 100%;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .follow-the-leader div:nth-child(1) {
    animation-delay: 0.15s;
    background-color: rgba(46, 113, 49, 0.9);
  }

  .follow-the-leader div:nth-child(2) {
    animation-delay: 0.3s;
    background-color: rgba(46, 113, 49, 0.8);
  }

  .follow-the-leader div:nth-child(3) {
    animation-delay: 0.45s;
    background-color: rgba(46, 113, 49, 0.7);
  }

  .follow-the-leader div:nth-child(4) {
    animation-delay: 0.6s;
    background-color: rgba(46, 113, 49, 0.6);
  }

  .follow-the-leader div:nth-child(5) {
    animation-delay: 0.75s;
    background-color: rgba(46, 113, 49, 0.5);
  }

  @keyframes follow-the-leader {
    0% {
      transform: rotate(0deg) translateY(-200%);
    }
    60%,
    100% {
      transform: rotate(360deg) translateY(-200%);
    }
  }
`

export default Loading
