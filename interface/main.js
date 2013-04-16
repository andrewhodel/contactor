if (holla.supported == true) {

	$('#makeContact').click(function() {
	var name = $('#yourname').val();
	$('#yournamebox').html('connected as: '+name);

	$('#vc').show();
	$('#nb').hide();

	var server = holla.createClient({
		debug: true
	});

	server.on("presence", function(user) {
		if (user.online) {
			console.log(user.name + " is online.");
		} else {
			console.log(user.name + " is offline.");
		}
	});

	holla.createFullStream(function(err, stream) {
		if (err) throw err;
		holla.pipe(stream, $("#vme"));

		// accept inbound
		server.register(name, function(worked) {
			server.on("call", function(call) {
				console.log("Inbound call", call);

				call.addStream(stream);
				call.answer();

				call.ready(function(stream) {
					holla.pipe(stream, $("#vthem"));
				});
				call.on("hangup", function() {
					$("#vthem").attr('src', '');
				});
				$("#hangup").click(function() {
					call.end();
				});
			});

			//place outbound
				var toCall = 'me';
				var call = server.call(toCall);
				call.addStream(stream);
				call.ready(function(stream) {
					holla.pipe(stream, $("#vthem"));
				});
				call.on("hangup", function() {
					$("#vthem").attr('src', '');
				});
				$("#hangup").click(function() {
					call.end();
				});

		});
	});

	});

} else {

	alert('webRTC not supported, no video/audio chat for you and your bad browser!');

}
