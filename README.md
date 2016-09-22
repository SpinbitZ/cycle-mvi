# MVI as Distributed Inversion of the Controller
                                          COMPUTER
                                    (  flattened simple  )    
                               - - - - - -M O D E L- - - - - 
                                        ↗↗↗  imv  ↘↘↘
                                    ↗↗↗↗↗  (trees)  ↘↘↘↘↘
                               ----------------------------     
                              ┌──❱ Intent ❱ MODEL ❱ View ❱──┐
                              │                             │
       ─ DOM source (touch) ─ ↑        1D data-flow         ↓ ─ DOM sink (display) ─
                              │                             │                               
                              └───────❰ User Events ❰───────┘                               
                                     ↖↖↖↖↖  DOM  ↙↙↙↙↙                                      
                                   ( effector / sensor  )                                   
                               --< ( (    ↖↖↖  ↙↙↙    ) ) >--                               
                              ,  ( )( )    HUMAN   ( )( )  ,                                
                                          HUMAN.                                             
                                         DHUDAN.                                             
                                         8HUMAND.  ..  .                                      
                                        8DDDDDD. .. ..,,                                     
                                       8DDDDDDD.   .    . .                                  
                                   ..IDDDDDDD8ZD..       ,,                                  
                               .DDD8DDDD8DDDDO8DDZ   ,.,:.                                   
                           .8...=DD~....DDDD,D8DD8$$7,.....                                  
                          ..D.....~DD88DDDDDZ ...,DDZ$$DDD8D.                                
                    88DDDI888,ID,.Z. .8DDD.DD...,  , :7?.D.DDD..                             
                  +,.. D...   .8DDDD8DDD.. D..DDDZD...+. .D..DD8.                            
                 D.   8=.       8....     ZD.  D.         8.  .DD.                           
               .8.   8.    .  ..        .88Z   .        .D.    ,DD...                        
              .8Z.   8.          .DDDD8D..OD.  .       .88?.    8D8DDDD8...                  
             .. D.   D.         D. .O. .   D?.              D.  8DDD..     ,DN8DI...         
             D. 8.   7      .. ..          8ZD. .ID8D7.      D. 8D..88D.     .8. .DD..       
             D.  D..  D.   .~.. D.      .  D..8..       D.    . D,.    DD.     .   . D.      
             D.   8.   D.       .8.       D.  D:.         .   .8D~.     7D.   ..   . .8.     
              D.  .D.   ~.,.  +.   .~.   $.   =  .   .       .88.O.    D. D8..  ~.... D.     
              $. O.8.   O     =.       ZDD.  D.  ..  ..      8D. O.   .8  8..8DZ. ......     
              8.   8.   .     ...   ,D..D.   .    .    .,.  8D.  .. ..  ..Z.    ID.    D.    
               =.      D.   ..    .8   Z.   .           .DDDD.    D.       $.     8. ..8.    
              . ....   ..   .    D..   D.  8.          DZ.DDD.     8.       8.    .8~..8.    
              8.?.    8.  ..    8.    D.   D.        .8..DDDD.       7..    D.     D. ..     
              8. :.   .   .    8      D.    ?.       8..DD. 8Z         O.   D.    +8. ..     
              8. . . D.  D.   $.     ..      +87.+D8. ZDZ.   88..       8.  D,.   8...       
              8.     .   ,    .=     D.        8...  D8..     D:,..     .   8... DD..        
               D..,  .   D.  :. ..   D.      .:.    88.        D.    .D.    . .D8.O.         
                I... .     8D.       D+.     D.  7$D.         D.      .   .,.D8..D.          
                 ... ..             D. .    8.     D.        8.         .D.DI.,...           
                    ... .    .    .D.      ..     ..    .,.D.     ..8D. .D.D.                
                      . .        D8.       I.     D.   ,,.8.     ....  8=. .?..              
                       .+,.       D.     O.      =... , .O..     .   ,8..  D.                
                        . 8.     D$.  .8..      D....,..D. .D?....  D...  ,.                 
                         .   .. .D.    .    .,8.. .  .~..    .   .D....8..                   
            ,             .8+ :D:.     .  D8...  $D,....        8..                          
                              .,.       8.  ..7. ..   ,I...ZD8..                             
                                   ZD8= 8.   .., ,,,  ..D.                                   
                                         .8.:. , ..,:. .                                     
                                           .. .,,                                            
                                           . .                                             
                                                                                             
                                                                                                  
                                                                                                  
                                                                                                  
       
                                          
Design Patterns such as MV\*—e.g. MVC, MVP, MVVM—are standard UI architecture tools to make conscious and deliberate the management of the hydra that is "application state", in all the possibilities and complexities of the user-interaction cycle. MV\*'s identity crisis around `controller` notwithstanding—the language of `model` and `view` is one that most UI devs know well—along with that of `pub` and `sub`. 

But these common MV* patterns tend to operate in the "imperative" or "[interactive][]" way typical of an Object Orientation.  This is very clear when you look at what the `controller` in [MVC][] does; it reaches out and controls various things, such as views and models.  This is the opposite of [reactive][].  

The directness and simplicity of imperative coding is best suited for the simple timing of (pull based) synchronous actions.  It is quite poorly matched for the chaotic asynchronous interactions with a user, or a server.  To greatly simplify the problem of asynchrony in general, an event or pub/sub and generally reactive (push-based) and declarative pattern is needed.  The choreography of events cannot be controlled effectively one by one. The flow itself needs to be channelled, in the simple declaration of the reactive channel, such as a composed chain of observables.

Perhaps this is why the role of [MVC][] and its `controller` is so *unstable* in the JavaScript UI engineering culture and toolset.  With the sub-optimal imperative and synchronous control basis, it is searching around the pattern-space for a better fit.

See [Anatomy of a JavaScript MV* Framework](https://www.sitepoint.com/anatomy-javascript-mv-framework/).

#### Note on Reactive vs. Interactive Programming
The "[reactive][] programming" paradigm has been around for decades, but has gained buzzword status for Web developers recently with the success of various popular UI frameworks, such as Facebook's [ReactJS][], and Netflix' use of [RxJS][].  The reason that reactive is so popular—as the evangelicals will tell you—is because it directly and simply cuts down the complexity of the UI interactions.  

It does this partly by simplifying the types or directions of control by preferring only one, namely the `reactive` one.  This pushes the architecture towards a [unidirectional data-flow][], see below.

But the `reactive` approach also simplifies the UI because each component becomes responsible for its own actions only.  Responsibility regarding the component becomes encapsulated within the component itself.  This increases [separation of concerns][] because components need to know little if anything about each other. What components really care about is the changing state of the application, which is extracted in the flow through the model.

For more on how reactive patterns simplify data-flow, see this [Reactive Primer][].


### MVI as Mirror of the UI Data-Cycle

There is a new MV* pattern, however: a "[reactive MVC][]" which is growing in the JS dev community.  It is called "model, view, intent" or [MVI][]. And because to me it feels the cleanest and simplest—and because it expresses the ideal of a reactive and unidirectional data-flow—it will be explored herein as the design pattern for organizing user-interactions, as simply and cleanly as possible. Essentially it is the design pattern which follows directly from the UI datacycle itself, as a smaller sub-cycle.   


#### MVI is IMV 
Taking from Andre Staltz's [What if the user was a function?][], we can outline the ideal, or perhaps really the underlying UI, or Human/Computer cycle as such.


                                                           
                                                        
                                         COMPUTER
                                    
                              ┌──❱ Intent ❱ Model ❱ View ❱──┐
                              │                             │
       ─ DOM source (touch) ─ ↑        1D data-flow         ↓ ─ DOM sink (display) ─
                              │                             │
                              └─────❰ User DOM events ❰─────┘
                        
                                          HUMAN
 

Because the [MVI][] name reflects an out-of-phase cycle starting instead with `Model`, see above, I will instead use the mnemonic symbol `IMV`, to denote the flow from `I` through `M`, and `V`.  Note that `Model` is central in the flow, critically opposite to `HUMAN` or the user.  This is likely why `Model` is always listed first.  On either side of `model`, data is being adapted from—and then back to—the DOM interface.

                                          COMPUTER
                                    (  flattened simple  )    
                               - - - - - -M O D E L- - - - - 
                                        ↗↗↗  imv  ↘↘↘
                                    ↗↗↗↗↗  (trees)  ↘↘↘↘↘
                               >>>-------------------------->     
                              ┌──❱ Intent ❱ MODEL ❱ View ❱──┐
                              │                             │

Essentially, `IMV` models the UI "cycle" as a [unidirectional data-flow][] between `HUMAN` and `COMPUTER`.  But it is really a generalization of many cycles within cycles—an asynchronous flow that is effectively one-directional, and in a sense, one-dimensional. 

`IMV`, here, is a line.  Maximally simple. And this one UI line, or arc, is just one side of the data-cycle with the user.  Data comes into `COMPUTER` and into `I`, `M`, and `V`—from `DOM source` and user input.  Eventually it returns to `HUMAN` again through the `DOM sink`.  That is the cycle: from `HUMAN`, through `COMPUTER`, and back to `HUMAN` again. 

#### IMV as Basic Communication
>`IMV` is the basic cycle of communication in action.  First you see the communication. Then you process it for its `intent`, and store it in your mental `model`.  Then you display a new message or `view`, and wait for another round.

>Contrast that simple cycle with [MVC][] which is often shown as a triangle of interactions with various overlapping directions, back and forth, from imperative to reactive. Not to mention the various classes, interfaces and other OOP ceremony we can perhaps entirely avoid.  If this were on the larger UI data-cycle as a whole, on the `COMPUTER` side, it would not be a line, but perhaps a line with a couple loops.

![MVC Diagram](http://www.patricksoftwareblog.com/wp-content/uploads/2015/07/Model-View-Controller-High-Level-Diagram.png)

### Inversion of Intent 

With reactive programming—such as even simple pub/sub—the control is largely inverted and injected (pushed).  And so, once the channels are composed it tends to be simpler and to "just flow", when it flows.  

Intent is the reactive inversion of the controller.  It is state logic which "controls" by channeling asynchronous events into the reaction or update of state in model.  For the integrity of the application, the model updated explicitly, declaratively, and deterministically with the new intent.  The other components, such as views, simply deterministically react to the new state in `model`.  

Intent, then, adapts input event streams into `model` state streams into which any `view` can tap. And so any such adapter—generally a DOM event handler, perhaps wrapping a model hook observable—we could call an `intent`. 

#### Intents and Views
Any `view` with its matching `model` and `intent` would ideally share the same DOM elements in the cycle.  But views should never react directly to even their own DOM events, let alone to other views.  The direct reactions to DOM sources are implicit intents, and they need to be identified and isolated as the explicit state adapters we need them to be. Just as the end-phase render reactions by the DOM to the changing model need to be extracted into the `view` adapters.  The key to the reactive "control" of the flow, is this separation in `IMV` phases. 

The user input needs to be *understood* or *modelled* first as the "single source of truth" that all modules could potentially react to (depending on the scope of the state in question).  After the data is processed for `intent` and modelled accordingly, then the `view` knows the new *reasoned* state of the application with which to react.  Until that happens, any reaction is premature and wasted since views must inevitably maintain the integrity of state.  

#### Decentralized Control Inversion with Intent Hooks
The `intent` is the inversion of the `controller`—but at the small level, in a granular and composable fashion with very simple "intent hooks" (see below).  The intent hooks are the tributaries or the capilaries to begin the collective reactive `IMV` data-flow.

The `model` and `intent` hooks are easily imported and used as if native to a given module.  And perhaps it matters little about whether *all* the little intents are located and extracted, or even if they are ever "truly reactive" or even "merely interactive".  If state is isolated into models as event streams (hooks) which are reacted to by other modules, that *is* a distributed and [reactive][] control pattern.  

The `intent` is the beginning phase in the reactive unidirectional data-cycle. And extracting intent hooks from the view procedures will clean up and simplify the views, as the `model` and `intent` modules of the given component are fleshed out.  These `intent` modules, such as `panel_intent.js`, will be useful to aggregate, the various granular `intent` hooks, as they separate and invert the logic of control into the unidirectional `IMV` flow. 



### Model
Similarly, models consist of sets of "model hooks", which are generally observables or other composable functions.  These are just function hooks for subscribing or publishing, setting or getting data to and from keys in the model. 

So the "model" of any given component could be anything from an explicit `model` component and file, such as `mymodel.js`, to the sparse collection of `model` hooks a sub-module perhaps imports, composes, and reacts to, or even just a small collection of model hooks in the same file. 

<a name="model-factory"></a>
#### Composable Model Factory
These model functions (observable-type functions) are implemented—in `mymodel`, for example—simply by importing and using factory functions from the `model-base.js` parent module.  Thus it [favors composition][] for implementing a dynamic functional inheritance for the model modules as a whole, wherever they are to be implemented and imported.  

Once imported (composed) into the new model module, these base model factory functions are used directly, as if native to the module.  

It looks like this: 

	// top of `mymodel.js`
	
	import {makeGet, makeSet, makeSub, makePub} from './model_base'
	...
	
	// In the set of model functions at the bottom of the file
	// make and export setter key-hook for `propsDirtyKey` observable
	
	// Note that `propsDirtyKey` is a unique value for setting a property 
	// dynamically on an object; generally a string or index
	
	export const setPropsDirty = makePub(propsDirtyKey)
	
	...
	...
	
	// top of `mymodule.js`
	// import and compose model hooks as if native to the module
	
	import {
  		onPropsDirty,
  		setPropsDirty,
  		...
	} from './mymodel.js';
	
	...
	
	// subscribe with a listener to update the module props
	
	onPropsDirty((props) => render(props));
	
	...
	...
	
	// somewhere in `othermodule.js`
	// import and compose model hooks as if native to the module
	
	myinput.on('change', (e) => {
		// don't want to know about any module's implementation details...
		// ... let alone do it for them...
		// so we call a model hook, telling model what we need it to know 
    	...
   		setPropsDirty();
    });

So you can have your obvious model hooks without calling attention to them with needless ceremony, such as `model.stats.setPropsDirty()`.  Or you could hang them off a central model as well.  Both styles could be used in conjunction.   




### View
The single and simple responsibility of the `view` is to funnel changes of state into DOM updates.  Ideally, views would be free from state and business logic, or really anything that is not simply rendering.  Views could simply be modules with `render` functions (stateless views). Views would be merely reacting, at the end of the `IMV` flow, to the modeled intents in state.  

That makes it easy to compose views.  You can just import and compose a `subview`, into a larger `view` and declare it in the larger `render` function, passing whatever data required, if any.  Take this mock virtual DOM example:


	function render(props) {
        return div([
            subView1.render(props.s1),
            subView2.render(props.s2),
            h2(data.title)
        ]);
    }


 


<a name="model-dir"></a>	
### Model as Single Source of Truth
We have an interesting phobia and confusion around "globals" in the javascript world.  This is generally because the interface of the application scope itself is poorly defined.  In any application all scopes are useful, including the application scope itself.  Many aspects of any application will find their natural home at the application scope.  The problem comes in when there is no methodology for isolating the application scope from the `window` scope exposed to the world.  In a module system such as webpack with [ES6+][] modules this is easily remedied because it handles that encapsulation explicitly.  Application scope is critical because it is the outer boundary of the application.  And for this reason it's critical to isolate and abstract from any global scope.  Doing this is critical to the integrity of the application.  

A central `model` is critical to the application data-flow, because it serves as a map of the flow of state through the application.  But this is a map of state event streams, into which any other module can simply tap, observe, and react. The central model is composed of "model hooks", or observables for reactively hooking into state on a granular level, with an api organized in whatever fashion helps to make sense of the complexities of the application state.    
    
It acts as the central hub for state that needs to be available at the global scope. And it is the state tree of the application.








[Reactive]:https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
[Reactive Primer]:https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
[MVC]:https://www.sitepoint.com/anatomy-javascript-mv-framework/
[Cycle-react]:https://github.com/pH200/cycle-react
[MVI-cycle]:http://cycle.js.org/model-view-intent.html
[MVI]:http://thenewstack.io/developers-need-know-mvi-model-view-intent/
[MV*]:https://www.sitepoint.com/anatomy-javascript-mv-framework/
[MV*]:#mvc-i
[reactive MVC]:http://futurice.com/blog/reactive-mvc-and-the-virtual-dom
[reactive]:https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
[interactive]:https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
[reactive vs passive]:http://cycle.js.org/streams.html
[passive]:http://cycle.js.org/streams.html
[google search on D3 with ReactJS]:https://www.google.com/search?q=D3%20reactJS&rct=j
[virtual DOM]:https://github.com/Matt-Esch/virtual-dom
[What if the user was a function?]:https://www.youtube.com/watch?v=1zj7M1LnJV4
[UI testing via DOM diffing]:http://software.nju.edu.cn/zychen/paper/2014ISSTA.pdf
[virtual DOM diffing]:http://software.nju.edu.cn/zychen/paper/2014ISSTA.pdf

[Webpack]:https://webpack.github.io/docs/
[Babel]:https://babeljs.io/
[SASS]:http://sass-lang.com/
[SMACSS]:https://smacss.com/
[Scalable Modular Architecture]:https://smacss.com/
[SMAS]:https://github.com/subtillioN/KickSMAS
[Atomic Design]:http://atomicdesign.bradfrost.com/chapter-2/
[ES6+]:http://es6-features.org
[ES.Next, or whatever]:http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/
[DRY]:https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[ES6 Modules]:http://www.2ality.com/2014/09/es6-modules-final.html
[object destructuring]:http://es6-features.org/#ObjectMatchingShorthandNotation
[componentized]:http://blogs.windriver.com/koning/2006/09/components.html
[single responsibility principle]:https://en.wikipedia.org/wiki/Single_responsibility_principle
[ReactJS]:https://facebook.github.io/react/
[reactive extensions]:https://facebook.github.io/react/
[so many in the industry]:https://www.google.com/search?q=D3%20reactJS&rct=j
[D3 in React video]:https://youtu.be/tS88bACG_k8?t=13m13s

[ELM]:elm-lang.org
[ELM:time-travel]:http://debug.elm-lang.org/
[RxJS]:https://github.com/Reactive-Extensions/RxJS
[most.js]:https://github.com/cujojs/most
[Redux]:http://redux.js.org/
[time-travel debugging]:https://github.com/cyclejs/cycle-time-travel
[CycleJS:time-travel]:https://github.com/cyclejs/cycle-time-travel
[CycleJS]:http://cycle.js.org/
[cycle]:http://cycle.js.org/dialogue.html
[model]:https://davidkpiano.gitbooks.io/react-redux-form/content/model_reducers.html
[unidirectional data-flow]:http://staltz.com/unidirectional-user-interface-architectures.html

[favors composition]:https://en.wikipedia.org/wiki/Composition_over_inheritance
[separation of concerns]:https://en.wikipedia.org/wiki/Separation_of_concerns

[milestone v0.1.0]:https://github.com/DigitalGlobe/LegionUI/milestone/4



NOTES: 



#Cycle-MVI-as-UI-Recursion

Cycle.js is a "pure" form of a functional and reactive unidirectional data-flow.

Cycle is not a circle, but a spiral.

Nature wants to flow in a cycle.  Shake a bottle of water vigorously and you will get a vortex naturally.

##Cycles are coherent systems of flow. 
Nature prefers order out of chaos.

Software also has natural cycles and is capable of coherent flow, minimizing chaos complexity and disorder.

There will be flow in any application, but coherence in flow is maximally simple flow.


##Cycles as spirals

Circles are closed off and dead.  The circle has to be broken into a spiral before it can begin to be dynamic.

    screenEvents = computer(interactionEvents)
    interactionEvents = user(screenEvents)
    
    a = f(b)
    b = g(a)

##PROBLEM? interactionEvents is used before it is ever defined.

 there is a 'circular' or rather a cyclical dependency here which you can see clearly in the composition or 'point-free' style:


 b = g(f(b))

 The problem is with the assignment.  In math this is an equation, not an assignment.

 Specifically this is the fixed-point equation.





 interactionEvents = user(computer(interactionEvents))





 a, or interactionEvents is the output of processing itself as input...
 ... and round it goes.





 Replace beginning with suitable proxy to bootstrap the process.






 -model-centric-cycle-flow

 -As functional flow it looks more like IVM, but a focus on the central role of the model gives us MVI.

 Linearly the functional flow is outside in, cycling with implicit USER function.
 -USER: From the DOM source (user: read or input from),
 INTENT: transforming into focused intent,
 MODEL: then modelled as data input for the view (sink)
 VIEW: DOM driver for feeding back into the USER input or sink function and to return again into the DOM source, U.
 -USER: DOM sink (user: write or render to)

 USER function via DOM drivers is the implicit output for the DOMSource input here.
    
     //
    
     function main(DOMSource) {
      // ---> output at the end is DOM sink or vTree$ which returns here as --> input from user function (drivers)
        return DOMSource.select(opt.el)
            //# -intent -->
            .events('scroll')
            .map(e => e.target.scrollTop)
            //# -model -->  - set whatever data the view requires
            .startWith(0)
            //# -view -->  -consume and react to the data by rendering the DOM
            .map(state => {
                //# -VIRTUAL-DOM --->  -sink or vTree$
                return div({id: opt.el}, [
                    div([
                        label('mvi-mod:: Property: ' + state + 'amounts'),
                        input('.prop', {type: 'range', min: 40, max: 150, value: state})
                    ])
                ])
            });
    }

 As functional composition, however, you can see more clearly how the cycle is inside out.

 This is how the v-tree is rendered through the DOM driver into the sink of the real world.
 And it is fundamentally a cycle whose output goes into the real-world "user function" and returns again as input into the central DOM source.

    ///// view(model(intent(SOURCES.DOM)))





 /////// MVI-as-embryogenetic
 2D or polar - the phase in the i/o user/computer cycle where the user is treated as a function.
 The user is both a SINK for side-effects (e.g. console.log() and rendering) and a SOURCE for intents and actions



 /////// Outside-in-IMV -
 // Intent gets Modeled and released into the user function (rendered) as a virtual DOM tree.
 // processing side-effects ---> channeled through "/// DRIVERS".
 /////// input-first (sensor) DOM source