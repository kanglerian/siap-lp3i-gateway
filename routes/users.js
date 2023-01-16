require('dotenv').config();
const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const { URI_SERVICE_USER } = process.env;
const api = apiAdapter(URI_SERVICE_USER);

/* GET users listing. */
router.get('/', async (req, res) => {
  console.log(URI_SERVICE_USER);
  try {
    const user = await api.get('/users');
    return res.json(user);
  } catch (error) {
    if(error.code === 'ECONNREFUSED'){
      return res.status(500).json({
        status: 'error',
        message: 'service unavailable'
      });
    }
    // const { status, data } = error.response;
    // return res.status(status).json(data);
    console.log(error);
  }
});

/* GET users listing. */
router.post('/register', async (req, res) => {
  try {
    const user = await api.post('/users/register', req.body);
    return res.json(user.data);
  } catch (error) {
    if(error.code === 'ECONNREFUSED'){
      return res.status(500).json({
        status: 'error',
        message: 'service unavailable'
      });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
});


module.exports = router;
