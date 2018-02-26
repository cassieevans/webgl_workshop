function clamp(a, min, max)
{
	if(a < min) return min;
	else if(a > max) return max;
	else return a;
}


function load_shader(name, url, uniforms)
{
	app.assets.load_count++;

	var rq = new XMLHttpRequest(); 
	rq.responseType = 'text';
    rq.open('GET', url, true);
    rq.onload = function(e)
    {
        if(e.target.status === 200)
        {
        	var result = e.target.response;
        	var split = result.split('========');
        	var vertex_shader = split[0];
        	var fragment_shader = split[1];

        	var material = new THREE.ShaderMaterial(
			{
				uniforms: uniforms,
				vertexShader: vertex_shader,
				fragmentShader: fragment_shader
			});

			app.assets.materials[name] = material;
			app.assets.load_count--;
        }
    }
    rq.send();
}

function load_mesh(name, url)
{
	app.assets.load_count++;

	var loader = new THREE.JSONLoader();
	loader.load
	(
		url,
		function(geometry, materials) 
		{
			app.assets.meshes[name] = geometry;
			app.assets.load_count--;
		}
	);
}

function load_texture(name, url)
{
	app.assets.load_count++;

	var loader = new THREE.TextureLoader();
	loader.load
	(
		url,
		function(texture)
		{
			app.assets.textures[name] = texture;
			app.assets.load_count--;
		}
	);
}

function debug_camera_controls(camera, dt)
{
	var speed = 1.0;
	if(key_held(Keys.A)) camera.position.x -= speed * dt;
	if(key_held(Keys.D)) camera.position.x += speed * dt;
	if(key_held(Keys.W)) camera.position.z -= speed * dt;
	if(key_held(Keys.S)) camera.position.z += speed * dt;
	if(key_held(Keys.E)) camera.position.y += speed * dt;
	if(key_held(Keys.Q)) camera.position.y -= speed * dt;
}