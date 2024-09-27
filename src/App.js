import './App.css';
import { SyntheticEventComponent } from './preparation/syntheticEventWork';
import { Component } from './preparation/useLayoutEffectWork';
import { ModalWindow } from './preparation/usePortalWotk';
function App() {
    
    return (
        <div>
            
            <SyntheticEventComponent />
            {false}
        </div>
    );
    
    // return (
    //     <div className="App">
    //         <p>Current value: {counter}</p>
    //         <button onClick={onClickHandler}>Increment</button>
    //     </div>
    // );

    // return e('div', {className: 'central-div'}, [
    //     e('p', {className: 'info', key: 'info'}, [`Current value:`, {name: 'ela'}]),
    //     e('button', {className: 'increment-button', onClick: onClickHandler, key: 'button'}, 'Increment')
    // ])

    // return jsx('div', {className: 'parent', children: [
    //     jsx('p', {children: `Counter: ${counter}`, key: 'p'}),
    //     jsx('button', {className: 'increment-button', onClick: onClickHandler, children: 'Increment'})
    // ]})
}

export default App;
