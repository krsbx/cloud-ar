import React from 'react';
import { Container, Flex, Center, Text, Link } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Flex
      height={'100vh'}
      alignItems={'center'}
      backgroundColor={'telegram.100'}
    >
      <Container
        borderRadius={25}
        backgroundColor={'telegram.200'}
        pt={10}
        pb={10}
        size={'sm'}
      >
        <Center>
          <Flex flexDirection={'column'}>
            <Center>
              <Text color={'whiteAlpha.900'} fontWeight={500}>
                Welcome!
              </Text>
            </Center>
            <Center mt={2} mb={2}>
              <Text color={'whiteAlpha.900'} fontWeight={500}>
                This is just a Homepage
              </Text>
            </Center>
            <Center mt={2} mb={2}>
              <Text
                marginRight={'0.5rem'}
                color={'whiteAlpha.900'}
                fontWeight={500}
              >
                Already have an account?
              </Text>
              <Link
                href={'/login'}
                color={'orange.300'}
                _hover={{
                  color: 'orange.200',
                  dropShadow: '0px 0px 5px rgba(black, 0.5)',
                }}
              >
                Login
              </Link>
            </Center>
            <Center mt={2} mb={2}>
              <Text
                marginRight={'0.5rem'}
                color={'whiteAlpha.900'}
                fontWeight={500}
              >
                Don't have an account?
              </Text>
              <Link
                href={'/register'}
                color={'orange.300'}
                _hover={{
                  color: 'orange.200',
                  dropShadow: '0px 0px 5px rgba(black, 0.5)',
                }}
              >
                Register
              </Link>
            </Center>
          </Flex>
        </Center>
      </Container>
    </Flex>
  );
};

export default HomePage;
