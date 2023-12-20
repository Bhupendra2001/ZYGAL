import React, { useState  , useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 200px;
  margin: 20px;
  padding: 10px;
  outline: none;
  border: 1px solid black;
  border-radius: 5px;
  color: teal;
`;
const Heading = styled.h1`
  color: red;
  margin-left: 20px;
`;
const Button = styled.button`
  width: 150px;
  margin: 20px;
  background-color: #fff;
  border: 1px solid gray;
  padding: 10px;
  border-radius: 10px;

  &:hover {
    color: green;
    cursor: pointer;
  }
`;
const Labal = styled.label`
  color: blue;
  margin-left: 20px;
`;
const ShowTextCont = styled.div`
  border: 1px solid red;
  width: 300px;
  height: 400px;
  margin: 20px 20px 30px 20px;
  padding: 10px;
`;

export const Home = () => {

  const [input1 , setInput1] = useState('');
  const [input2 , setInput2] = useState('');
  const [cookieData, setCookieData] = useState([]);

  const nevigate = useNavigate()

  useEffect(() => {
    
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name.trim() === 'dataArray') {
        setCookieData(JSON.parse(value.trim()));
        return;
      }
    }
  }, []);

  const handleInput1Change = (e) => {
    setInput1(e.target.value);
  };

  const handleInput2Change = (e) => {
    setInput2(e.target.value);
  };

  const handleSubmit = () => {
    // Update array in state and store it in cookie
    const newDataArray = [...cookieData, input1];
    document.cookie = `dataArray=${JSON.stringify(newDataArray)}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/`;
   
  };

  const handleSearch = () => {
    // Retrieve data from cookie
    const matchingData = cookieData.filter(item => item.includes(input2));
    if (matchingData.length > 0) {
      setCookieData(matchingData);
    } else {
      setCookieData(["Data not found"]);
    }
  };


  const handleClearCookies = () => {
    // Clear all cookies
    document.cookie = 'dataArray=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setCookieData([]);
    // You may want to reset the input fields here
    setInput1('');
    setInput2('');
  };

  const handleLogout = () => {
   
    nevigate('/login')
  };


  return (
    <Container>
      <Heading> Home Page</Heading>

      <Labal> Submit text message</Labal>
      <Input type="text"  value={input1} onChange={handleInput1Change} />
      <Button onClick={handleSubmit}>Submit Button 1</Button>

      <Labal> Sreach text message</Labal>
      <Input type="text"  value={input2} onChange={handleInput2Change} />
      <Button onClick={handleSearch}>Search Button 2</Button>

      <Labal> Show Searched text message here</Labal>

      <ShowTextCont>
      {cookieData.length > 0 && (
        <div>
          <p>Stored Data:</p>
          <ul>
            {cookieData.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      </ShowTextCont>

      <Button onClick={handleClearCookies}>clear all button 3</Button>

      <Button onClick={handleLogout}> Logout</Button>
    </Container>
  );
};
