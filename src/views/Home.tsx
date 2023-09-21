import { Button } from 'antd';
import 'antd/lib/button/style';
import axios from 'axios';

import './Home.scoped.scss';

function Hello() {
  axios.get('http://localhost:8080/devices/Ullrich').then((a) => console.log(a.data));

  return (
    <>
      <h1>Home</h1>
      <p>Welcome to your React app!</p>
      <Button type="primary">Test</Button>
    </>
  );
}

export default Hello;
