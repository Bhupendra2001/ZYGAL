import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios'

const Container = styled.div``
const Form = styled.form`
 border : 1px solid red;
 margin : auto;
 width : 400px;
 margin-top : 100px;
 border-radius : 10px;
`
const Input = styled.input`
 border : 1px solid green;
 outline : none;
 width : 200px;
 padding : 5px;

`
const Label = styled.label`

`
const Link = styled.a`
 text-decoration : none;

`
const InputCont = styled.div`

margin : 10px;
display : flex;

flex-direction : column;`
const Button = styled.button`
margin : 10px;
padding : 5px;
background-color : #fff;
border : 1px solid gray;
border-radius : 10px;

&:hover{
  border : 1px solid green;
  color : green;
  cursor : pointer;
}

`

const Title = styled.h2`
color : teal;
text-align : center;
`
const Account = styled.p`
margin : 10px;
`

const Error = styled.p`
color : red;
`

const Login = () => {

  const [email , setEmail ] = useState('')
  const [password , setPassword ] = useState('')

  const [error , setError] = useState('')
  
  const nevigate = useNavigate()
  const handleClick = async (e)=>{
    e.preventDefault()

    try{

      const res = await axios.post("http://localhost:3005/login", {email, password})
      alert("Login successfully")
      nevigate('/home')
       
    }catch(err){
     setError(err.response.data.message)
    }

  }

  return (
    <Container>
      <Form>
        <Title>Login Page</Title>
        <InputCont>
        <Label>Email</Label>
        <Input type='email' placeholder='enter email' onChange={(e)=>setEmail(e.target.value)} />
        </InputCont>
        <InputCont>
        <Label>Password</Label>
        <Input type='password' placeholder='enter password' onChange={(e)=>setPassword(e.target.value)} />
        </InputCont>
        { error &&  <Error>{error}</Error>}
        <Button onClick={handleClick}> Submit</Button>
        <Account>Don't have an account? <Link href='/register' >Sign Up</Link> </Account>
      </Form>
    </Container>
  )
}

export default Login