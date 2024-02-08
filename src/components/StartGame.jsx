import styled from "styled-components";
const StartGame = ({toggle}) => {
  return<Container>
    <div>
    <img src="./images/dices 1.png" alt="dices" />
    </div>
    <div className="content">
        <h1>DICE GAME</h1>  
        <Button onClick={toggle}>Play Now</Button>
        
    </div>
  </Container>;
};

export default StartGame;
 const Container = styled.div`
 max-width: 1180px;
 display: flex;
 height: 100vh;
 margin: auto;
 align-items: center;

 .content h1{
    font-size: 96px;

 }
 
 `;
 const Button = styled.button`
 color: white;
font-size: 16px;
font-family: Poppins;
background-color: black;
border-radius: 7px;
min-width: 220px;
height: 44px;
padding: 10px 18px;
border: 1px solid transparent;
cursor: pointer;
transition: 0.3s background-color ease-in;


&:hover{
    color: black;
    background-color: white;
    border: 1px solid black;
    transition: 0.3s background-color ease-in;
   
}
 `;