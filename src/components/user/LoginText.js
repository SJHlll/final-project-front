import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const LoginText = () => {
  return (
    <>
      <Container
        component='main'
        maxWidth='xs'
        style={{ magin: '200px auto' }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component='h1' variant='h5'>
              로그인
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='email'
              label='email'
              name='email'
              autoComplete='email'
            />
          </Grid>
          <Grid>
            <TextField
              variant='outlined'
              required
              fullWidth
              name='password'
              label='on your password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='#007bfff'
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LoginText;
