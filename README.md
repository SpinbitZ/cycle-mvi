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
      ........................│                             │.........................
      ........................└───────❰ User Events ❰───────┘.........................
      ........................       ↖↖↖↖↖  DOM  ↙↙↙↙↙       .........................
      ........................     ( effector / sensor  )    .........................
      ........................ --< ( (    ↖↖↖  ↙↙↙    ) ) >--.........................
      ........................,  ( )( )    HUMAN   ( )( )  , .........................
      ............................:~~~==~~====+=~~~~~~:,,,,,..........................
      ...........................,~==+~+===~~=~==~~~~:::,,,..................,........
      ...........................=~=?+=+==+=++=++=+++==:,,..................,.........
      ...........................,:~+?+==++=???+?++++=~~,,.................,,.........
      ...........................==:=++=+++=+?I??===~~==:,.,...............,..........
      ...........................=+,:===+++==+++=~,~++,.,,................,,..........
      ..........................,:~:,~==+++==~~=:,+7++:,,,..........,.....,,..........
      ,,,......................:~~::=~=+.=+==~=,:~?++:,:,,................:,..........
      ,,::::,..................,~=++=++~,~?==~~:~~::::=:,:=~.............,:...........
      .....:~:.................~++?==+=,,~+?=+======++~,,:,,.............::...........
      ......:~~,.............,=+=++=?+=,,~+?+~=+=?~~=~~,.,.:.............:,...........
      .......:~~:,........,~=+==?+=?+=,~~~+?+=++=+=~==+,..,.............~:............
      ........,~~~=~~~==++++=~+?+++?=~,=~:+?+==?=~+=~=+~,..............,:,............
      ..........,:~==~~~~~~=??++=+?+=:,+~:+?+==+===?++~==:............,~,,............
      .,,...........,~+?+++=~~::+?+=:.:=:,=?++=+++=++?==~~~~:........=~:,.............
      ....:.......,++===~,,....=?+=:,.==.,=?+?=+?+=+=+???+==:,:,,:~=~~:,..............
      ....:..,..,~==,......,,,+??=,,,,+~.,=?++==++==+==++++++?++=~==~,................
      .,:.......=~,.,,,,.,,,,+?+~.,~,~=,,,=?=?==++=...,:::~~~~:~~~,,..................
      .....,..,~~,,,,..:::,~++=:..::.=~.:,~I++=~?+~..,............,,..................
      .....::,~~....,:~:.:+?+:,..~=::=,,~,=?==~=++:.,:,..,,..,.....~,.................
      ...:,..:~,..,~~,.:=+?~,..,:=~,=:.:~,=+==,==+,,,~~..,:,..,...,,:.................
      ..,....~:..:~,.:=++=,...,.=~.~~..~::+?+~,~=+,.,:==~,::~=++=~~~=~,...............
      .,....,:..~:.,=++~,...:,.~=.:=,..=~:+?=~.~=+~...:~====:,.......,::..............
      ,.....:,.:,.,=+~,...::..:=..=:..:~,:+?=:.:===.........,..,...,:..,..............
      ......:.,,.,~=:...:,...~~..,~..,=~.~++=..,~=+,..,....::......,....,.............
      ......,.:..:=:..,,....~,...,~..~=,.=+=~...:=+=..:,...,,.....,......,............
      ......,.,.:=:..,....,:.....,~.,=~..=+~:....~=+~..,....:....:.......,............
      ......,.,.~~,..,.,=,,.:....,:,=:..,=+~.....,:++:..:...,,..:........,............
      ......,.,,~:..,..:.,,..,:..:,=:..,,==~..,...,~=+:..,,..,.,........,.............
      .........:~,..,.,:.:.......:~,...,,~~:..,....,:==:...,..,:...,...,..............
      .,.....,.:~,,....~.,.....,~:....,,.~~:.........:~==:.....,,,....................
      ..,....,.,~,..,...~~:,:~~,.,:..,,..~~:....,,....,:~==~,..,...,..................
      ..,.......~:.........,......:.,,...~~:......,:,....::~=~~~==~~:,................
      ..........,::....,:,...,...,..:....:~~........,:..........,,,,,,,,,.............
      ...........,:,......:......,..:....,~:.........:......,...........,,,...........
      .......,....,:.......~..,.,...,.....:~:........,.....................,..........
      .............,:,.....:.....,...,.....:::......,:~~~~:...........................
      ...............,:,,,,..........,,.....:~~~~~=~~:,,,,:::,........................
       
                                          
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
                               ----------------------------     
                              ┌──❱ Intent ❱ MODEL ❱ View ❱──┐
                              │                             │

Essentially `IMV` models the UI "cycle" as a [unidirectional data-flow][] between `HUMAN` and `COMPUTER`.  But it is really a generalization of many cycles within cycles—an asynchronous flow that is effectively one-directional, and in a sense, one-dimensional. 

`IMV`, here, is a line.  Maximally simple. And this one UI line, or arc, is just one side of the data-cycle with the user.  Data comes into `COMPUTER` and into `I`, `M`, and `V`—from `DOM source` and user input.  Eventually it returns to `HUMAN` again through the `DOM sink`.  That is the cycle: from `HUMAN`, through `COMPUTER`, and back to `HUMAN` again. 

#### IMV as Basic Communication
>`IMV` is the basic cycle of communication in action.  First you see the communication. Then you process it for its `intent`, and store it in your mental `model`.  Then you display a new message or `view`, and wait for another round.

>Contrast that simple cycle with [MVC][] which is often shown as a triangle of interactions with various overlapping directions, back and forth, from imperative to reactive. Not to mention the various classes, interfaces and other OOP ceremony we can perhaps entirely avoid.  See this [MVC Diagram](http://i.stack.imgur.com/ocEWx.png). If this were on the larger UI data-cycle as a whole, on the `COMPUTER` side, it would not be a line, but perhaps a line with a couple loops.


### Inversion of Intent 

With reactive programming—such as even simple pub/sub—the control is largely inverted and injected (pushed).  And so, once the channels are composed it tends to be simpler and to "just flow".  

Intent is the reactive inversion of the controller.  It is state logic which "controls" by channeling asynchronous events into the reaction or update of state in model.  As the integrity of the application, with the model updated with the new intent, the other components, such as views, simply deterministically react.  

Intent, then, adapts input event streams into model state streams. And so any such adapter—generally a DOM event handler, perhaps wrapping a model hook observable—we could call an `intent`. 

#### Intents and Views
Any `view` with its matching `model` and `intent` would ideally share the same DOM elements in the cycle.  But views should never react directly to even their own DOM events, let alone to other views.  The direct reactions to DOM sources are implicit intents, and they need to be identified and isolated as the explicit state adapters we need them to be. Just as the end-phase render reactions by the DOM to the changing model need to be extracted into the `view` adapters.  The key to the reactive "control" of the flow, is this separation in `IMV` phases. 

The user input needs to be *understood* or *modelled* first as the "single source of truth" that all modules could potentially react to (depending on the scope of the state in question).  After the data is processed for `intent` and modelled accordingly, then the `view` knows the new *reasoned* state of the application with which to react.  Until that happens, any reaction is premature and wasted since views must inevitably maintain the integrity of state.  

#### Decentralized Control Inversion with Intent Hooks
The `intent` is the inversion of the `controller`—but at the small level, in a granular and composable fashion with very simple "intent hooks" (see below).  The intent hooks are the tributaries or the capilaries to begin the collective reactive `IMV` data-flow.

The `model` and `intent` hooks are easily imported and used as if native to a given module.  And perhaps it matters little about whether *all* the little intents are located and extracted, or even if they are ever "truly reactive" or even "merely interactive".  If state is isolated into models as event streams (hooks) which are reacted to by other modules, that *is* a distributed and [reactive][] control pattern.  

The `intent` is the beginning phase in the reactive unidirectional data-cycle. And extracting intent hooks from the view procedures will clean up and simplify the views, as the `model` and `intent` modules of the given component are fleshed out.  These `intent` modules, such as `panel_intent.js`, will be useful to aggregate, the various granular `intent` hooks, as they separate and invert the logic of control into the unidirectional `IMV` flow. 



### Model
Similarly, models consist of sets of "model hooks", which are generally observables or other composable functions.  These are just function hooks for subscribing or publishing, setting or getting data to and from keys in the model. 

So the "model" of any given component could be anything from an explicit `model` component and file, such as [operations_model.js][], to the sparse collection of `model` hooks a sub-module perhaps imports, composes, and reacts to. 

<a name="model-factory"></a>
#### Composable Model Factory
These model functions (observable-type functions) are implemented—in `operations`, for example—simply by importing and using factory functions from the [model-base.js][] parent module.  Thus it [favors composition][] for implementing a dynamic functional inheritance for the model modules as a whole, wherever they are to be implemented and imported.  

Once imported (composed) into the new model module, these base model factory functions are used directly, as if native to the module.  

It looks like this: 

	// top of `operations.js`
	
	import {makeGet, makeSet, makeSub, makePub} from './model_base'
	...
	
	// In the set of model functions at the bottom of the file
	// make and export setter key-hook for `statsDirtyKey` observable
	
	// Note that `statsDirtyKey` is a unique value for setting a property 
	// dynamically on an object; generally a string or index
	
	export const setStatsDirty = makePub(statsDirtyKey)
	
	...
	...
	
	// top of `panel.js`
	// import and compose model hooks as if native to the module
	
	import {
  		onStatsDirty,
  		setStatsDirty,
  		...
	} from './operations.js';
	
	...
	
	// subscribe with a listener to update the panel stats
	
	onStatsDirty(() => panel.create(MODE.STAT));
	
	...
	...
	
	// somewhere in `map.js`
	// import and compose model hooks as if native to the module
	
	// layers draw functionality remaining in map
	this.map.on('draw:created', function (e) {
		// don't want to know about panel's or operations' implementation details...
		// ... let alone do it for them...
		// so we call a model hook, telling model what we need it to know 
    	...
   		setStatsDirty();
    });

So you can have your obvious model hooks without calling attention to them with needless ceremony, such as `model.stats.setStatsDirty()`.  Or you could hang them off a central model as well.  Both styles could be used in conjunction (see [refactor branch][]).   

Currently, this off-the-cuff model-factory facilitates the generation of simple pub/sub (event-based or observable-based) models.  It is a set of factory functions for bootstrapping and plugging into a new model system of event-based data streams.  These are crude observables based currently on jQuery `callbacks`, but ideally they might use [RxJS][], or even [most.js][]. It also might be cleaner and more powerful, as well as more standards-based compliant, to switch the model—behind the `model_base` api—to use something like [CycleJS][] or [Redux][].


### View
The single and simple responsibility of the `view` is to funnel changes of state into DOM updates.  Ideally, views would be free from state and business logic, or really anything that is not simply rendering.  Views could simply be modules with `render` functions. Views would be merely reacting, at the end of the `IMV` flow, to the modeled intents in state.  

That makes it easy to compose views.  You can just import and compose a `subview`, into a larger `view` and declare it in the larger `render` function, passing whatever data required, if any.  Take this mock virtual DOM example:


	function render(data) {
        return div([
            subView1.render(data.s1),
            subView2.render(data.s2),
            h2(data.title)
        ]);
    }

For Phase One, however, we are just isolating the view procedures into modules, and composing them into the [MVI][] system more loosely.  So we might not see the `div` or `h2` like that yet.

While the view components are incomplete, impure for [MVI][], and the DOM is not virtual, it may look more imperative and messy like this:
    
    export const attachRequestEstimates = (s) => {
      self = s;
      var operation = model.op().key;
      if (operation != "LegionHunterSkylineOperation" && operation != "LegionCameraOperation") {
         estimators.map(id => {
         		div = panel_view.middle.append("div")
           	 	.classed('params panel-middle-selector', true)
          	
          	left = div.append('div')
            		.classed('panel-middle-left', true)
          
          	right = div.append('div')
            		.classed(`panel-middle-right approx-${id.toLowerCase()}`, true)
          
          	left.append('label')
            		.attr('for', "stats")
            		.text(`Approx ${id.toUpperCase()}`)
          
        })
      }
      attachComplete();
    };
    
>Note the state logic in the conditional regarding types of operations that do not render the estimates. These should, perhaps, be moved into an `intent` or `model`, somewhere:

And then composed in `panel_view.js`s `update` (render) function:

    update: function () {
        ...
        attachRequestEstimates(this);
    }

 
## Componentization
The following will be a tentative hierarchical description or map of the proposed componentization. This is supposed to be just a starting point for feedback so that we can shape and refine the end result. 

This proposed refactoring is found in a draft form in the [component refactor branch][].  The following will break down the reasoning behind the componentization here.

## Where are the Top-level Components?

### What is a Component
The generic meaning of `module` is a group of reusable code, which has no loyalties or restrictions to any given architecture.  Unlike a `component`, a `module` is *not* necessarily integrated via any higher-level or *architectural* pattern, such as a model, view, or intent.  And hence a `module` is often without the complexities required of a `component`.  

This is about as specific we need to get here as our components are going to contain minimal ceremony. As a general rule we can say that the components will tend to follow the "contracts" of [MVI][], meaning that the concerns will be split along such lines, or are in the process of such. This means that there will tend to be perhaps a `model`, `view`, and an `intent` file in each of them, generally, and perhaps often a component file tying them together. 

A `panel` component, for example, might look like this:

    ─ panel
      ├── panel.js
      ├── panel_intent.js
      ├── panel_model.js
      ├── panel_view.js
      └── views

With no naming convention specifically for a component, we can say that the root components will be the directories at the root or `app/` level.  And therefore, the code within these root directories will reinforce the identity of the given root component, such as `panel`, while splitting the concerns along [MVI][] lines.

### Current App Tree
As you can see below, with the current tree view of `app/`, while there is only one level of hierarchy, things are *starting* to get out of hand.  It's getting a bit too long, and with no apparent organizing principles.

    ─ app
      ├── KML.js
      ├── app.js
      ├── camera_layer.js
      ├── draw_layers.js
      ├── image_layer.js
      ├── jobpane.js
      ├── layers.js
      ├── leaflet.groupedlayercontrol.js
      ├── map.js
      ├── model_base.js
      ├── operations.js
      ├── panel.js
      └── tile_layers.js
      
### App 

`app.js` is the root component. It is small and declarative, and not really in need of much separation of concerns.  So it just remains as is: The one main component file importing, initializing, and connecting together the other root components. 

### Layers

When we dig deeper, into the functionality of the code we can begin to break things down into their natural smaller and more precise component categories.  For example, we can see even in the names that this has already been happening with perhaps a `layers` component.  We can see that there are various kinds of `layers`, and layer modules, such as: 

1. `camera_layer.js`,
1. `draw_layers.js`
1. `image_layer.js`, 
1. `tile_layers.js`, 
1. and this strange one `leaflet.groupedlayercontrol.js`. 

`KML.js` also appears to belong here under `layers`—but maybe it belongs in `map`?

#### Layer Controls
Why is `leaflet.groupedlayercontrol.js` strangely named compared to the others? It is as if the file-name itself were violating encapsulation and leaking its `leaflet.js` implementation details and framework jargon.  

Two questions come to mind:

1. Do we need to parse through leaflet jargon to know what the key role of this file is?  
1. Or does that kind of detail actually obscure **what** that file really does, with (perhaps now) irrelevant and coupling details about **how** it does what it does?

In separating `view` from `model`, and for the sake of component consistency, perhaps we could rename `leaflet.groupedlayercontrol.js` to `layer_controls_view.js`.  And then we could continue to clean up the view by extracting `model` and `intent` hooks, and whatever else therefrom into other modules and components.

And given the complexity and depth of concerns in `layer_controls_view`, it could certainly use a modular refactoring into sub-views as well. Much of `layer_controls_view` would likely be abstracted into `layers` as `intent` or `model`. 

#### Layers Component
With `layer_controls_view`, the `layers` component provides the view logic for the panel that operates on the layers.  Shows them, hides them, deletes them. But there is also the `layers.js` module itself, which consolidates `layers` functionality with a single interface.  

This, then is the list of module files making up the `layers` component, so far.  

    ─ layers
      ├── KML.js
      ├── camera_layer.js
      ├── canvas_layer.js
      ├── draw_layers.js
      ├── image_layer.js
      ├── layer_controls_view.js
      ├── layers.js
      ├── layers_intent.js
      ├── layers_model.js
      └── tile_layers.js

  

### Remaining Files
The remaining JS files are these: 

- `jobpane`,
- `map`,
- `model_base`,
- `operations`,
- `panel` 

And it seems to me that, along with `layers`, these categories are close to, or give hints to optimal bounds for the other top-level components.  

Many of these translate directly as root components already, including: `map`, `operations`, and `panel`.

### Map
While much of `map` has been extracted out and integrated behind the `layers` interface, especially in the [component refactor branch][], there is still a `map.js` file.  We could just leave it as is.  Or to make it a component, to give it the structure to separate its concerns, it might look like this below, where `map.js` is the main `map` component file, which integrates `map_intent`, `map_model`, and `map_view`.

    ─ map
      ├── map.js
      ├── map_intent.js
      ├── map_model.js
      └── map_view.js
              
#### Questions on Map and Layers

1. Do `layers` and `map` need a different relationship than siblings, as outlined here?  Does `layers` need to be a sub-component of `map`?  
1. Then where should `layer_controls` fit?
1. Should `layer_controls` be extracted into its own component at this level?
            
### Operations

In the [component refactor branch][] the operations have been cleaned up and modularized fairly extensively.  These are the main changes, which I feel help to make operations much more dynamic and manageable from an architectural perspective.

#### Operation modules

Each operation is now a module or component contained in the `operations/op/` directory.  See the following example module interface for the functions that each operation must implement and export as properties on the operation object:

    export const fastViewshed = {
         run,
         key,
         title,
         type,
         view,
         getReq,
         vals
    }; 
    
#### Operations List and MODE
Because each operation is now its own module and file, the operations array is now more maintainable.  It is extracted as its own `op_list.js` module, whose sole responsibility is to maintain the ordering of the operations array.  It simply imports each operation and places it in the exported array.

    import {fastViewshed} from './ops/fast_viewshed';
    import {connectedViewshed} from './ops/connected_viewshed';
    import {costDistance} from './ops/cost_distance';
    ...
    
    export const opList = [
      fastViewshed,
      connectedViewshed,
      costDistance,
      ...
    ];
    
This means that anytime your module needs the list, you just import it directly.

    import {opList} from '../operations/op_list';


The `MODE` object was used often enough, and in various ways, that it warranted its own simple `op_mode.js` module.

#### Sources

Originally I had `sources` and `operations` as sibling top-level components, but perhaps it is simpler and more sensible to put `sources` under `operations`, here: 

    ─ operations
      ├── op_list.js
      ├── op_mode.js
      ├── operations_intent.js
      ├── operations_model.js
      ├── ops
      │   ├── camera.js
      │   ├── connected_viewshed.js
      │   ├── cost_distance.js
      │   ... 
      │   └── viewshed_roi.js
      ├── sources_data.js
      ├── sources_getdomain.js
      └── sources_model.js
      
Note that various aspects of `sources` were extracted from various modules, such as `data`, `model`, and `getdomain`.

**Question**: Should `sources` be a root component, or a subcomponent under `operations`?

              
### Panel
In `panel`, much of the view procedure has been moved into `views/` modules.  These need to be further componentized along `IMV` lines to resolve some timing issues.  Many of these subviews could also be standardized and moved to a more general views location.  But perhaps implementing a virtual DOM library at that point would be more helpful.  

The draft refactor of the views from `panel` is shown here:

    ─ views
          ├── panel_add_param.js
          ├── panel_btn.js
          ├── panel_checkbox.js
          ├── panel_controls.js
          ├── panel_dropdown.js
          ├── panel_estimates.js
          ├── panel_input.js
          ├── panel_layout.js
          ├── panel_operation_selector.js
          ├── panel_slider.js
          ├── panel_source_selector.js
          └── panel_src_info.js

And a shallow view of the full component:

    ─ panel
      ├── panel_intent.js
      ├── panel_model.js
      ├── panel_view.js
      └── views
          
     

### What's Left?
And so now we have these root components:

- `app`
- `layers`
- `map`
- `operations`
- `panel`


And we have these remaining two files:

- `jobpane`,
- `model_base`,

### Request (or Job)
In the refactor branch, while cleaning up the concerns in `operations`, `map`, `panel`, and `jobpane`, another concern was isolated which I named `request`—it could also be called `jobs`.  It also became clear that `jobpane` is really just the `view` sub-component for the `jobs` or `request` component. `jobpane` simply displays the open requests. So, for the sake of conforming to a [MVI][] naming convention, `jobpane.js` becomes the `view` sub-component module within `request`, renamed `request_view.js`.

    ─ request
      ├── get_req_string.js
      ├── request.js
      ├── request_model.js
      ├── request_utils.js
      └── request_view.js
      
or:      

    ─ job
      ├── get_req_string.js
      ├── job.js
      ├── job_model.js
      ├── job_utils.js
      └── job_view.js
      
#### Get Request String

In untangling `requests` from `operations`, it seemed important to [DRY][] up and centralize the request string build logic, converting it into a parser util for generating request strings from params objects. It also seemed to make sense to move that concern to the `request` component itself, such as `request.getString`. 

So instead of this anonymous function stuck in the operations nest of arrays:

    function (packet, mode) {
        var opKey = 'LegionViewshedOperation',
          req = '';
        req += mode == MODE.RUN ? "/?REQUEST=Execute" : "/?REQUEST=GETINFO"
        req += "&FORMAT=GEOTIFF";
        req += "&USECOMPRESSION=FALSE";
        req += "&DATASOURCE=" + packet.source;
        req += "&OPERATION=" + opKey;
        req += "&BBOX=" + packet.bounds.replace(' ', '');
        req += "&PARAMETERS=";
        req += "OBSERVERHEIGHT:" + packet.oheight;
        req += ",OUTPUTTYPE:SUM";
        req += ",TARGETHEIGHT:" + packet.theight;
        req += ",OUTERRADIUS:" + packet.oradius;
        req += ",NORMALIZESCALEVALUE:255";
        if (packet.omethod != "") {
          req += ",OUTPUTMETHOD:" + packet.omethod;
        }
    
        if (mode == MODE.DRY) {
          doInfoBox(req);
        } else if (mode == MODE.STAT) {
          var sreq = req + ",OBSERVERCOORD:-77+38";
          doStats(sreq);
        } else {
          doReqWithOSM({packet, req, style:"REDSCALE"});
        }
    }

We have these `run`, and `getReq` api-contract functions on the operation modules, and it looks like this:

    const getReq = (packet, mode) => {
      return request.getString(packet, mode, {
        FORMAT: 'GEOTIFF',
        USECOMPRESSION: 'FALSE',
        PARAMETERS: {
          OBSERVERCOORD: packet.lng + "+" + packet.lat,
          OBSERVERHEIGHT: packet.oheight,
          TARGETHEIGHT: packet.theight,
          OUTERRADIUS: packet.oradius,
          NORMALIZESCALEVALUE: '255',
          OUTPUTMETHOD: (packet.omethod != "") ? packet.omethod : ''
        }
      });
    };
     
    const run = (packet, mode) => {
      request.doBasic({
        mode,
        req: getReq(packet, mode),
        label: packet.label,
        latlng: null,
        style: "binary_inverted_100"
      });
    };
    
This makes request string expression simpler, while giving control for centralizing consistency, such as with common headers, or formatting and assembling in general.  And as you can also see, or could expect, the request functions as well are moved into the `request` component.

### imv - framework files

What about `model_base`?  That's really just the [model factory][] support or `base` files for the [MVI][] pattern implementation.  So we need a component to contain that. 

We'll keep the mnemonic for the actual `IMV` data-flow sequence, and shift its phase also to lowercase; `imv`.  This will remind us of the simple linear data flow sequence from `intent`, through `model`, and out again to `view`.

The sole concern of the `imv` module is the support and standardization of the [MVI][] modules and component architectures.   

We might stub it out like this, for now, and expect it to remain fairly light-weight, even after the implementation of [RxJS][] observables:

    ─ imv
      ├── intent_base.js
      ├── model_base.js
      └── view_base.js


<a name="model-dir"></a>	
### model 
A central `model` is critical to the application data-flow, because it serves as a map of the flow of state through the application.  But this is a map of state event streams, into which any other module can simply tap, observe, and react. The central model is composed of "model hooks", or observables for reactively hooking into state on a granular level, with an api organized in whatever fashion helps to make sense of the complexities of the application state.    

In the [component refactor branch][] I have centralized the model as `legion_model`, which when imported and composed into modules is simply `model`.  Calling any hook hanging off the central `model` might look like this:

    import {model} from '../model/legion_model'
    ...
    model.onStatsDirty(() => panel_view.create(MODE.STAT)) 
    
It acts as the central hub for state that needs to be available at the global scope. And it is the state tree of the application.

We'll make the new root-level `model` module.  This will also contain the central `legion_model.js` which imports and composes the `model_base` modules.

The `model` component directory looks like this:

    ─ model
      ├── keys.js
      └── legion_model.js

But `model` really imports and composes modules from all the models, which might look like this:
    
    ─ legion_model
      ├── keys
      ├── layers_model
      ├── map_model
      ├── model_base
      ├── operations_model
      ├── panel_model
      ├── request_model
      └── sources_model

#### Model Tree API
For this Phase One of the refactor, and the [component refactor branch][], the model as a whole has a shallow hierarchical form.  Only one level, or flat.  Like this:

    MODEL TREE: one level
    
    export const model = {
      // BASIC MODEL
      setValue,
      ...
      
      // MAP
      
      // OPERATIONS
      op: getOp,
      setOp,
      getOp,
      onOp,
      ...
      MODE,
      
      // SOURCES
      src: getSource,
      setSource,
      
      // REQUESTS
      ...
      onRequest,
      setRequest,
      ...
      
      // KEYS
      keys
    };


With a central `legion_model`, and with every component also having its own model, generally, it could also look something like this, with two levels:

    MODEL TREE: two levels
    
    export const model = {
      base:{
         setValue,
         ...
      },
      ops: {
         setOp,
         getOp,
         onOp,
         ...
         MODE
      },
      src: {
         getSource,
         setSource,
         ...
      },
      req: {
         onRequest,
         setRequest,
         ...
      },
      keys
    };



Model could somewhat mirror or thread into the directory structure of the core components. Either way, the central `legion_model` simply imports and organizes the sub-model modules and hangs the hooks off as branches and leaves in whatever way works. 

And the practice in the [component refactor branch][] has been to import and compose models and model hooks at whatever scope makes sense. Sometimes it makes more sense to import the model hooks directly from the sub-models. And other times it makes sense to use the global api of the central model. 
               
    
### Components Recap
Recall now what the app directory used to look like:
   
    ─ app
      ├── KML.js
      ├── app.js
      ├── camera_layer.js
      ├── draw_layers.js
      ├── image_layer.js
      ├── jobpane.js
      ├── layers.js
      ├── leaflet.groupedlayercontrol.js
      ├── map.js
      ├── model_base.js
      ├── operations.js
      ├── panel.js
      └── tile_layers.js
      
And now, in the [component refactor branch][], and discussed above, we have a simpler shallow tree where every node is a component, like this:

    ─ app
      ├── app.js
      ├── imv
      ├── layers
      ├── map
      ├── model
      ├── operations
      ├── panel
      └── request

And here is the new full tree:   

    ─ app
      ├── app.js
      ├── imv
      │   ├── intent_base.js
      │   ├── model_base.js
      │   └── view_base.js
      ├── layers
      │   ├── KML.js
      │   ├── camera_layer.js
      │   ├── canvas_layer.js
      │   ├── draw_layers.js
      │   ├── image_layer.js
      │   ├── layer_controls_view.js
      │   ├── layers.js
      │   ├── layers_intent.js
      │   ├── layers_model.js
      ├── map
      │   ├── map.js
      │   ├── map_intent.js
      │   ├── map_model.js
      │   └── map_view.js
      ├── model
      │   ├── keys.js
      │   └── legion_model.js
      ├── operations
      │   ├── op_list.js
      │   ├── op_mode.js
      │   ├── operations_intent.js
      │   ├── operations_model.js
      │   ├── ops
      │   │   ├── camera.js
      │   │   ├── connected_viewshed.js
      │   │   ├── cost_distance.js
      │   │   ... 
      │   │   └── viewshed_roi.js
      │   ├── sources_data.js
      │   ├── sources_getdomain.js
      │   └── sources_model.js
      ├── panel
      │   ├── panel_intent.js
      │   ├── panel_model.js
      │   ├── panel_view.js
      │   └── views
      │       ├── panel_add_param.js
      │       ├── panel_btn.js
      │       ├── panel_checkbox.js
      │       ...
      │       └── panel_src_info.js
      └── request
          ├── get_req_string.js
          ├── request.js
          ├── request_model.js
          ├── request_utils.js
          └── request_view.js

The original `app/` directory had a depth of one, with thirteen files.  This new one has a depth of two, and many more, and much smaller files.  

Hopefully this is a good start towards a shallow componentization with a more optimal separation and decoupling integration of concerns.  


	
## Summary and Feedback
The direction ahead for the componentization has been explored tentatively herein in various ways, but generally along the simple lines of a separation of concerns into a natural linear flow, that of the unidirectional dataflow as outlined in [MV*][].  And hopefully this helps understand the important details in the changes and possibilities at hand.  

However, it is certain that key details have been missed, and that there are sub-optimal namings, pairings, groupings, and other errors of organization that need correcting and/or discussion.  Such feedback is welcome and greatly appreciated.  It's important to take into consideration all the things that I can't know at this point, or haven't considered.
 
Overall, as we see with the initial implementation of the [MV*][] componentization so far, this is a lightweight and very flexible architectural implementation.  Model, view and intent hooks are easily imported and composed unobtrusively, at a granular level, as if native to any module.  State can be managed simply through a mapping of the basic UI sequence for modeling and reacting to user intent.  This is what [MVI][] does, and much simpler than, and with far less ceremony and complexity than, say [MVC][].







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


[refactor documentation]:https://github.com/DigitalGlobe/LegionUI/wiki/Proposal-for-UI-Architecture-Refactor

[UI-Architecture]:https://github.com/DigitalGlobe/LegionUI/wiki/UI-Architecture
[current doc]:https://github.com/DigitalGlobe/LegionUI/wiki/UI-Architecture
[few and large]:https://github.com/DigitalGlobe/LegionUI/wiki/UI-Architecture#few-and-large


[compile phase]:https://github.com/DigitalGlobe/LegionUI/wiki/UI-Architecture#compile-phase
[model factory]:https://github.com/DigitalGlobe/LegionUI/wiki/UI-Architecture#model-factory


[panel.js]:https://github.com/DigitalGlobe/LegionUI/blob/master/Web/www/js/app/panel.js
[operations.js]:https://github.com/DigitalGlobe/LegionUI/blob/master/Web/www/js/app/operations.js
[model-base.js]:https://github.com/DigitalGlobe/LegionUI/blob/master/Web/www/js/app/model_base.js

[original refactor branch]:https://github.com/DigitalGlobe/LegionUI/tree/legion_refactor_jmorrison
[component refactor branch]:https://github.com/DigitalGlobe/LegionUI/tree/legion_refactor_components
[proposed refactor branch]:https://github.com/DigitalGlobe/LegionUI/tree/legion_refactor_components

[panel_operation_selector.js]:https://github.com/DigitalGlobe/LegionUI/blob/legion_refactor_components/Web/www/js/app/panel/panel_operation_selector.js
[panel_source_selector.js]:https://github.com/DigitalGlobe/LegionUI/blob/legion_refactor_components/Web/www/js/app/panel/panel_source_selector.js
[legion_model.js]:https://github.com/DigitalGlobe/LegionUI/blob/legion_refactor_components/Web/www/js/app/model/legion_model.js
[operations_model.js]:https://github.com/DigitalGlobe/LegionUI/blob/legion_refactor_components/Web/www/js/app/operations/operations_model.js
[requests.js]:https://github.com/DigitalGlobe/LegionUI/blob/legion_refactor_components/Web/www/js/app/request/request.js
[sources.js]:https://github.com/DigitalGlobe/LegionUI/blob/legion_refactor_components/Web/www/js/app/operations/sources_model.js

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







#Cycle-MVI-as-UI-Recursion

 Cycle.js is a "pure" form of a functional and reactive unidirectional data-flow.

 Cycle is not a circle, but a spiral.

 Nature wants to flow in a cycle.  Shake a bottle of water vigorously and you will get a vortex naturally.

##Cycles are coherent systems of flow. 
 Nature prefers order out of chaos.

 Software also has natural cycles and is capable of coherent flow, minimizing chaos complexity and disorder.

##There will be flow in any application, but coherence in flow is maximally simple flow.

 Challenge: Find a UI that doesn't function in some way as a cycle.

 Goal: Strive for coherence.


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






 # -model-centric-cycle-flow

 # -As functional flow it looks more like IVM, but a focus on the central role of the model gives us MVI.

 Linearly the functional flow is outside in, cycling with implicit USER function.
 # -USER: From the DOM source (user: read or input from),
 ## INTENT: transforming into focused intent,
 ## MODEL: then modelled as data input for the view (sink)
 ## VIEW: DOM driver for feeding back into the USER input or sink function and to return again into the DOM source, U.
 # -USER: DOM sink (user: write or render to)

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