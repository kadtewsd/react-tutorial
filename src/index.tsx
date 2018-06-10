import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import <alias> from '<filePath>'
// import App from './App';
import FirstClass from './FirstClass';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root') as HTMLElement
// );
// const element = React.createElement('h1', {className: 'greeding'}, 'Hello World!');
// ReactDOM.render(element, document.getElementById('root'));

ReactDOM.render(
    <FirstClass name='kasakaid'/>,
    document.getElementById('root'),
);

registerServiceWorker();
