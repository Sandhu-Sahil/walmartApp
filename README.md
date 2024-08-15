# thing changed in structure to run three 
>> Chages to be applied in three/build/three.cjs

at line no: 20178
```
const programLog = gl.getProgramInfoLog( program );
if ( programLog !== undefined ) {
    // console.log(programLog)
    programLog.trim()
}
const vertexLog = gl.getShaderInfoLog( glVertexShader );
if ( vertexLog !== undefined ) {
    // console.log(programLog)
    vertexLog.trim()
}
const fragmentLog = gl.getShaderInfoLog( glFragmentShader );
if ( fragmentLog !== undefined ) {
    // console.log(programLog)
    fragmentLog.trim()
}
```