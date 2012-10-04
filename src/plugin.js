var pluginFactory = function( _, anvil ) {

	var Plugin = function() {
		_.bindAll( this );
		this.name = "";
		this.activity = "";
		this.dependencies =[];
		this.commander = [];
		this.config = {};
		this.events = {};
	};

	Plugin.prototype.configure = function( config, command, done ) {
		done();
	};

	Plugin.prototype.on = function( eventName, handler ) {
		anvil.events.on( this.name + "." + eventName, handler );
	};

	Plugin.prototype.run = function( done, activity ) {
		done();
	};

	Plugin.prototype.raise = function( eventName ) {
		var e = this.events[ eventName ],
			fullArgs = Array.prototype.slice.call( arguments ),
			args = fullArgs.slice( 1 );
		if( args.length > 0 && e ) {
			var msg = _[ "object" ]( e, args );
			anvil.bus.publish( this.name, eventName, msg );
		}
		args.unshift( this.name + "." + eventName );
		anvil.events.raise.apply( undefined, args );
	};

	Plugin.prototype.subscribe = function( eventName, handler ) {
		anvil.bus.subscribe( this.name, eventName, handler );
	};

	anvil.plugin = function( instance ) {
		var base = new Plugin();
		var extended = _.extend( base, instance );
		_.bindAll( extended );
		return extended;
	};

};

module.exports = pluginFactory;