var gl,
	canvas,
	buffer,
	program,
	mousex,
	mousey,
	orix=0,
	oriy=0,
	deltax=0,
	deltay=0,
	keyCode,
	animReq,
	state = 0;

	var shaderScript, shaderSource, vertexShader, fragmentShader;
	window.addEventListener('mousemove', function(e){

		mousex = -(e.clientX-window.innerWidth/2)/1500;
		mousey = -(e.clientY-window.innerHeight/2)/1500;

		deltax += (orix - mousex);
		deltay += (oriy - mousey);

		orix = mousex;
		oriy = mousey;
	})

	function gl_init(){

		canvas = document.getElementById('gl');
		gl = canvas.getContext("experimental-webgl");
		canvas.width = window.innerWidth/1.2;
		canvas.height = window.innerHeight/1.2;

		buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([
			     -1.0, -1.0,
			       1.0, -1.0,
			      -1.0,  1.0,
			      -1.0,  1.0,
			       1.0, -1.0,
			       1.0,  1.0]),
			gl.STATIC_DRAW
		);

		gl.viewport(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight);

		shaderScript = document.getElementById("2d-vertex-shader");
		shaderSource = shaderScript.text;
		vertexShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vertexShader, shaderSource);
		gl.compileShader(vertexShader);


		shaderScript = document.getElementById("2d-fragment-shader");
		shaderSource = shaderScript;
		fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fragmentShader, shaderSource);
		gl.compileShader(fragmentShader);

		program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		gl.useProgram(program);

		// render();
	}

	function render(){
		animReq = requestAnimationFrame(render, canvas);

		deltax += (0.-deltax)/30.;
		deltay += (0.-deltay)/30.;

		gl.clearColor(1.0,0.0,0.0,1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);


		var positionLocation = gl.getAttribLocation(program, "a_position");
		gl.enableVertexAttribArray(positionLocation);
		gl.vertexAttribPointer(positionLocation, 2 , gl.FLOAT, false, 0, 0);

		var u_resolutionLocation = gl.getUniformLocation(program, "u_resolution");

		var time = new Date();
		var cosT = Math.abs(Math.cos(time/1000));
		var sinT = Math.abs(Math.sin(time/1000));

		var u_timeLocation = gl.getUniformLocation(program, "u_time");
		gl.uniform1f(u_timeLocation, Math.abs(Math.sin(time/2000)));

		var u_timeLocation = gl.getUniformLocation(program, "u_costime");
		gl.uniform1f(u_timeLocation,cosT);
		var u_timeLocation = gl.getUniformLocation(program, "u_sintime");
		gl.uniform1f(u_timeLocation, sinT);

		var u_mouseLocation = gl.getUniformLocation(program, "u_mouse");
		gl.uniform1f(u_mouseLocation, mousex+deltax);
		var u_mouseyLocation = gl.getUniformLocation(program, "u_mousey");
		gl.uniform1f(u_mouseyLocation, mousey+deltay);

		gl.drawArrays(gl.TRIANGLES,0,6);

	}
