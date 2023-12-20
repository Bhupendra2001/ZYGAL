import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`

`
const InputCont = styled.div`
display : flex;
flex-direction : column;
margin : 20px;
`
const Input = styled.input`
 width : 200px;
 outline : none;
 padding : 5px;
`
const Label = styled.label`
color : teal;
`
const Button = styled.button`
margin : 20px;
padding : 8px;
background-color : #fff;
border : 1px solid gray;
color : green;
border-radius : 10px;

&:hover{
    color : red;
    cursor : pointer;
}

`
const Form = styled.form`
 border : 1px solid green;
 margin : auto;
 width : 400px;
 border-radius : 10px;

`
const Title = styled.h2`
color : teal;
text-align : center;
`
const Link = styled.a`
text-decoration: none;
cursor: pointer;
color: teal;
`
const Info = styled.p`
margin-left : 20px;
`
const Error = styled.p`
color : red;
`

const Register = () => {

  const [email, setEmail ] = useState('')
  const [password, setPassword] = useState('')
  const [name , setName] = useState('')
  const [error , setError] = useState('')

  const nevigate = useNavigate()
  const handleClick = async (e)=>{
    e.preventDefault()

    try{

      const res = await axios.post("http://localhost:3005/register", {name , email , password})
      alert("Register Successfully")
      nevigate('/')

    }catch(err){
      setError(err.response.data.message)
    }
  }

  return (
    <Container>
        <Form onSubmit={handleClick}>
            <Title>Register Page</Title>
            <InputCont>
            <Label> Enter Name</Label>
            <Input type='string' placeholder='enter name' required onChange={(e)=>setName(e.target.value)} />
            </InputCont>
            <InputCont>
            <Label>Enter Email</Label>
            <Input type='email' placeholder='enter email' required  onChange={(e)=>setEmail(e.target.value)}/>
            </InputCont>
            <InputCont>
            <Label> Enter Password</Label>
            <Input type='password' placeholder='enter password' required onChange={(e)=>setPassword(e.target.value)} />
            </InputCont>
            { error &&  <Error>{error}</Error>}
            <Button type='submit' >Submit</Button>
            <Info>If already have an account <Link href='/'>Login</Link> now</Info>
        </Form>
    </Container>
  )
}

export default Register