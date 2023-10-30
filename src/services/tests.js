import axios from "axios";

export const fetchData = async (url, options) => {
  const response = await fetch(url, options)
  const data = await response.json()
  return data
}


const createRequestOptions = (method, contentType, body, token) => {
  const headers = {
    Authorization: token ? `Bearer ${token}` : "",
  };

  // Solo si se proporciona contentType
  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  // Para las solicitudes GET o cuando no se proporciona un body, no incluyas el campo 'data'
  const requestOptions = {
    method,
    headers,
  };

  // Agrega un body a requestOptions solo si no es una solicitud GET y se proporciona un body
  if (method !== "GET" && body) {
    requestOptions.data = body;
  }

  return requestOptions;
};



export const options = {
  sendJSONContentPOST: (token, body) => {
    return createRequestOptions("POST", "application/json", body, token);
  },
  sendFormDataContentPOST: (token, body) => {
    return createRequestOptions("POST", "multipart/form-data", body, token);
  },
  getPage: (token) => {
    return createRequestOptions("GET", null, null, token);
  },
};


const DataManager = async ({
  pageParam = null,
  resourceIdentifier = null,
  data = '',
  Endpoint = null,
  PropertyBody = null,
}) => {
  if (!PropertyBody) {
    throw new Error("PropertyBody is missing");
  }

  const endpointURL =
    resourceIdentifier && pageParam
      ? `${Endpoint}/${resourceIdentifier}?page=${pageParam}`
      : resourceIdentifier
        ? `${Endpoint}/${resourceIdentifier}`
        : pageParam
          ? `${Endpoint}?page=${pageParam}`
          : Endpoint;

  const conf = options?.[PropertyBody]("token", data);
  const res = await executeHTTPRequest(endpointURL, conf);
  return res;
};



export const executeHTTPRequest = async (endpoint, options) => {
  const res = await axios(endpoint, options);
  return res;
};



/* 

import React, { useEffect } from 'react'
import { Box, FormControl, Stack, Input, FormLabel, Button, Flex } from '@chakra-ui/react'
import { useQuery, useMutation, useQueryClient } 
import { fetchData } from '../services/tests.js'
import { useNavigate } from 'react-router-dom'




// Endpoint: http://localhost:3001/api/users





const Login = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutations = {
    login: (data) => {
      return fetchData('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }
  }

  const handleMutation = ({ type, data }) => {
    return mutations[type](data)

  }



  const mutation = useMutation(handleMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },


  })

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')


  return (
    <Flex justifyContent="start" alignItems="center" height="100%">
      <Box w='30vw' >
        <Stack spacing={4} maxWidth="md" mx="auto" p={6} borderWidth={1} borderRadius={8}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Flex justifyContent='start' alignContent='center' w='100%' gap='1vh'>
            <Button colorScheme="blue" onClick={() => handleMutation({ type: 'login', data: { email: username, password } })}>
              Login
            </Button>
            <Button colorScheme='gray' onClick={() => {
              navigate('/')
            }}>
              Cancel
            </Button>
          </Flex>
        </Stack>
      </Box>
    </Flex >

  )

}

export default Login










*/