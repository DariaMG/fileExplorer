import './style.less';

import React from 'react';

import { render } from 'react-dom';

//import HelloWorld from './components/hello';

//import InputTextBox from './components/elements';
import Tree from './components/elements';



//render(<HelloWorld who="world" />, document.getElementById('root'));

render(
  <Tree />,
  document.getElementById('root')
);

