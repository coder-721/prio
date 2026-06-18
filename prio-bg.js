(() => {
  const cv = document.getElementById('prio-bg');
  const gl = cv.getContext('webgl', { antialias: true });
  if (!gl) return;
  const dpr = Math.min(devicePixelRatio || 1, 2);

  const VERT = `attribute vec2 a;varying vec2 v;
    void main(){ v=a*0.5+0.5; gl_Position=vec4(a,0.,1.); }`;

  const FRAG = `precision highp float;
    varying vec2 v;
    uniform vec2  u_res;
    uniform float u_time;
    uniform vec2  u_mouse;
    uniform vec2  u_mvel;
    uniform vec3  u_clicks[8];
    uniform vec3  u_accent;

    float h21(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
    float nz(vec2 p){
      vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
      return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),
                 mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);
    }
    vec2 asp(vec2 p){ p.x*=u_res.x/u_res.y; return p; }

    float cwave(vec2 uv){
      float w=0.;
      for(int i=0;i<8;i++){
        if(u_clicks[i].z<0.) continue;
        float age=u_time-u_clicks[i].z;
        if(age>3.) continue;
        float d=length(asp(uv-u_clicks[i].xy));
        w+=sin(d*20.-age*9.)*exp(-age*1.7)*exp(-d*2.2)*smoothstep(0.,.12,age);
      }
      return w;
    }

    void main(){
      vec2 uv=v, auv=asp(uv), amouse=asp(u_mouse);
      vec2 toCursor=auv-amouse; float dC=length(toCursor);
      float t=u_time*0.040;

      // Four-corner gradient sweeps fully with mouse
      vec2 p = uv + (u_mouse-0.5)*1.1;
      p += vec2(sin(t*0.50)*0.07, cos(t*0.38)*0.06);

      vec3 cA=vec3(0.16,0.62,0.98); // blue
      vec3 cB=vec3(0.85,0.70,1.00); // lilac
      vec3 cC=vec3(0.80,1.00,0.44); // lime
      vec3 cD=vec3(1.00,0.53,0.59); // coral
      vec3 cE=vec3(0.59,0.28,1.00); // violet

      float gx=smoothstep(0.,1.,clamp(p.x,0.,1.));
      float gy=smoothstep(0.,1.,clamp(p.y,0.,1.));
      vec3 grad=mix(mix(cA,cB,gx),mix(cC,cD,gx),gy);
      float ctr=exp(-dot(uv-vec2(0.5),uv-vec2(0.5))*3.2)*(0.55+0.45*sin(t*0.85));
      grad=mix(grad,cE,ctr*0.28);

      // Large Gaussian blobs that part for the cursor
      vec3 bcs[5]; bcs[0]=cC; bcs[1]=cB; bcs[2]=cD; bcs[3]=cE; bcs[4]=cA;
      float field=0.; vec3 bc=vec3(0.);
      for(int i=0;i<5;i++){
        float fi=float(i);
        vec2 c=vec2(0.5+0.40*sin(u_time*0.09*(0.55+fi*0.12)+fi*1.9),
                    0.5+0.36*cos(u_time*0.08*(0.50+fi*0.16)+fi*2.4));
        vec2 ac=asp(c);
        vec2 toM=ac-amouse; float dM=length(toM);
        ac+=normalize(toM+1e-5)*exp(-dM*1.0)*0.65;
        ac+=u_mvel*80.*exp(-dM*1.4);
        float w=exp(-dot(auv-ac,auv-ac)*3.5);
        field+=w; bc+=bcs[i]*w;
      }
      bc/=max(field,1e-4);
      vec3 col=mix(grad,bc,smoothstep(0.04,1.1,field)*0.13);

      // Soft additive cursor glow
      float glow =exp(-dC*dC*0.85);
      float inner=exp(-dC*dC*4.50);
      col+=glow *vec3(0.04,0.10,0.22)*0.48;
      col+=inner*vec3(0.07,0.15,0.30)*0.36;
      col=mix(col,bc,glow*0.13);

      // Click ripples
      float cw=cwave(uv);
      col+=cw*0.22*u_accent;
      col+=cw*0.07;

      float amt=clamp(0.48+glow*0.07+cw*0.10,0.,0.78);
      gl_FragColor=vec4(mix(vec3(1.),col,amt),1.);
    }`;

  const sh = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
      console.warn('Prio shader error:', gl.getShaderInfoLog(s));
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog); gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'a');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const U = n => gl.getUniformLocation(prog, n);
  const uRes    = U('u_res');
  const uTime   = U('u_time');
  const uMouse  = U('u_mouse');
  const uMvel   = U('u_mvel');
  const uClicks = U('u_clicks');
  const uAccent = U('u_accent');

  // Prio blue accent
  gl.uniform3f(uAccent, 0.16, 0.62, 0.98);

  let mouse  = [0.5, 0.5];
  let prev   = [0.5, 0.5];
  let target = [0.5, 0.5];
  let vel    = [0, 0];
  const clicks = new Float32Array(24);
  for (let i = 0; i < 8; i++) clicks[i * 3 + 2] = -1;
  let ci = 0;
  const start = performance.now();
  let time = 0;

  function resize() {
    cv.width  = Math.round(innerWidth  * dpr);
    cv.height = Math.round(innerHeight * dpr);
    gl.viewport(0, 0, cv.width, cv.height);
  }
  addEventListener('resize', resize);
  resize();

  addEventListener('pointermove', e => {
    target = [e.clientX / innerWidth, 1 - e.clientY / innerHeight];
  });
  addEventListener('pointerdown', e => {
    const b = ci * 3;
    clicks[b]     = e.clientX / innerWidth;
    clicks[b + 1] = 1 - e.clientY / innerHeight;
    clicks[b + 2] = time;
    ci = (ci + 1) % 8;
  });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function frame() {
    time = (performance.now() - start) / 1000;
    prev = [...mouse];
    mouse[0] += (target[0] - mouse[0]) * 0.22;
    mouse[1] += (target[1] - mouse[1]) * 0.22;
    vel = [mouse[0] - prev[0], mouse[1] - prev[1]];

    gl.uniform2f(uRes,   cv.width, cv.height);
    gl.uniform1f(uTime,  time);
    gl.uniform2f(uMouse, mouse[0], mouse[1]);
    gl.uniform2f(uMvel,  vel[0],   vel[1]);
    gl.uniform3fv(uClicks, clicks);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (!document.hidden && !reduced) requestAnimationFrame(frame);
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) requestAnimationFrame(frame);
  });

  frame();
  if (!reduced) requestAnimationFrame(frame);
})();
